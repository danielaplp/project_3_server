const  { Schema, model } = require('mongoose')

const parkingSchema = new Schema({
    parkingPic: String,
    type: String,
    startLocation: {
        lat: Number,
        lng: Number
    },
    endLocation: {
        lat: Number,
        lng: Number
    },
    
    quantity: Number,
    creator: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
});

const Parking = model('Parking', parkingSchema);

module.exports = Parking;
