const  { Schema, model } = require('mongoose')

const cycleRouteSchema = new Schema({

    type: {
        type: String,
        enun: [
            "Lane",
            "Path",
        ]
    },
  
    startLocation: {
        lat: Number,
        lng: Number
    },
    endLocation: {
        lat: Number,
        lng: Number
    },
});

const CycleRoute = model('CycleRoute', cycleRouteSchema);

module.exports = CycleRoute;