const  { Schema, model } = require('mongoose')

const zone30Schema = new Schema({
  
    location: [{
        lat: Number,
        lng: Number
    },
]
});

const Zone30 = model('Zone30', zone30Schema);

module.exports = Zone30;
