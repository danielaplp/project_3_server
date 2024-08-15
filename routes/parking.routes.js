const router = require('express').Router();
const Parking = require("../models/Parking.model");

router.post('/parking', async(req, res, next) => {
    try {
        const { type, startLocation, endLocation, quantity, parkingPic } = req.body

        const newParking = await Parking.create({
            type,
            startLocation,
            endLocation,
            quantity,
            parkingPic,
        });

        res.status(201).json(newParking);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.get('/parking', async(req, res, next) => {
    try {
        const allParkings = await Parking.find()

        res.status(200).json(allParkings);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});


router.get('/parking/:parkingId', async(req, res, next) => {
    try {
        const {parkingId} = req.params
        const singleParking = await Parking.findById(parkingId).populate("parking");

        res.status(200).json(singleParking);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.put('/parking/:parkingId', async(req, res, next) => {
    try {
        
     const {parkingId} = req.params
     const { type, startLocation, endLocation, quantity, parkingPic } = req.body;

     const updatedParking = await Parking.findByIdAndUpdate(parkingId, {
        type,
        startLocation,
        endLocation,
        quantity,
        parkingPic,
     }, 
     {new: true});

     res.status(200).json(updatedParking);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.delete('/parking/:parkingId', async(req, res, next) => {
    try {
        
     const {parkingId} = req.params

     await Parking.findOneAndDelete(parkingId);


     res.status(204).send()

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;

