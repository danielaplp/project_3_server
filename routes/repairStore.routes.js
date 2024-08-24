 const router = require('express').Router();
const RepairStore = require("../models/RepairStore.model");

router.post('/repairstore', async(req, res, next) => {
    try {
        const { location, name } = req.body

        const newRepairStore = await RepairStore.create({
        
            location, name
        });

        res.status(201).json(newRepairStore);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.get('/repairstore', async(req, res, next) => {
    try {
        const allRepairStores = await RepairStore.find()

        res.status(200).json(allRepairStores);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/repairstore/:repairstoreId', async(req, res, next) => {
    try {
        const {repairstoreId} = req.params
        const singleRepairStore = await RepairStore.findById(repairstoreId).populate("repairstore");

        res.status(200).json(singleRepairStore);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.put('/repairstore/:repairstoreId', async(req, res, next) => {
    try {
        
     const {repairstoreId} = req.params
     const { location, name} = req.body;

     const updatedRepairStore = await RepairStore.findByIdAndUpdate(repairstoreId, {
    
        location, name
    
     }, 
     {new: true});

     res.status(200).json(updatedRepairStore);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.delete('/repairstore/:repairstoreId', async(req, res, next) => {
    try {
        
     const {repairstoreId} = req.params

     await RepairStore.findOneAndDelete(repairstoreId);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;

 