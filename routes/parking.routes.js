const router = require('express').Router();
const Parking = require("../models/Parking.model");
const User = require("../models/User.model")

router.post('/parking', async(req, res, next) => {
    try {
        const { type, location, quantity, parkingPic, userId } = req.body

        const newParking = await Parking.create({
            type,
            location,
            quantity,
            parkingPic,
            creator: userId
        });

        await User.findByIdAndUpdate(userId, {
            $push: {
              createdParkings: newParking._id
            }
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
        const singleParking = await Parking.findById(parkingId);

        res.status(200).json(singleParking);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error")
    }
});

router.put('/parking/:parkingId', async(req, res, next) => {
    try {
        
     const {parkingId} = req.params
     const { type, location, quantity, parkingPic, userId } = req.body;

     const foundParking = await Parking.findById(parkingId)

     if (userId !== foundParking.creator.toString()) {
        res.status(403).send("Unathorized user")
        return
     }

     const updatedParking = await Parking.findByIdAndUpdate(
        parkingId, {
        type,
        location,
        quantity,
        parkingPic
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

