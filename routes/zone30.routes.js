const router = require('express').Router();
const Zone30 = require("../models/Zone30.model");

router.post('/zone30', async(req, res, next) => {
    try {
        const { startLocation, endLocation } = req.body

        const newZone30 = await Zone30.create({
        
            startLocation, endLocation
        });

        res.status(201).json(newZone30);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.get('/zone30', async(req, res, next) => {
    try {
        const allZones30 = await Zone30.find()

        res.status(200).json(allZones30);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/zon30/:zone30Id', async(req, res, next) => {
    try {
        const {zone30Id} = req.params
        const singleZone30 = await Zone30.findById(zone30Id).populate("zon30");

        res.status(200).json(singleZone30);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.put('/zone30/:zone30Id', async(req, res, next) => {
    try {
        
     const {zone30Id} = req.params
     const { startLocation, endLocation } = req.body;

     const updatedZone30 = await Zone30.findByIdAndUpdate(zone30Id, {
    
        startLocation, endLocation
    
     }, 
     {new: true});

     res.status(200).json(updatedZone30);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.delete('/zone30/:zone30Id', async(req, res, next) => {
    try {
        
     const {zone30Id} = req.params

     await Zone30.findOneAndDelete(zone30Id);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;

