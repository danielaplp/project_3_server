const router = require('express').Router();
const CycleRoute = require("../models/CycleRoute.model");

router.post('/cycleroutes', async(req, res, next) => {
    try {
        const { startLocation, endLocation, type } = req.body

        const newCycleRoute = await CycleRoute.create({
        
            startLocation, endLocation, type

        });

        res.status(201).json(newCycleRoute);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.get('/cycleroutes', async(req, res, next) => {
    try {
        const allCycleRoutes = await CycleRoute.find()

        res.status(200).json(allCycleRoutes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/cycleroutes/:cycleroutesId', async(req, res, next) => {
    try {
        const {cycleRouteId} = req.params
        const singleCycleRoute = await CycleRoute.findById(cycleRouteId).populate("cycleroute");

        res.status(200).json(singleCycleRoute);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.put('/cycleroutes/:cycleroutesId', async(req, res, next) => {
    try {
        
     const {cycleRouteId} = req.params
     const { startLocation, endLocation, type } = req.body;

     const updatedCycleRoute = await CycleRoute.findByIdAndUpdate(cycleRouteId, {
    
        startLocation, endLocation, type
    
     }, 
     {new: true});

     res.status(200).json(updatedCycleRoute);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.delete('/cycleroutes/:cycleroutesId', async(req, res, next) => {
    try {
        
     const {cycleRouteId} = req.params

     await CycleRoute.findOneAndDelete(cycleRouteId);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;

