const  { Schema, model } = require('mongoose')

const parkingSchema = new Schema({
    parkingPic: String,
    type: String,
    location:[ {
        lat: Number,
        lng: Number
    },
],
    quantity: Number,
});

const Parking = model('Parking', parkingSchema);

module.exports = Parking;
