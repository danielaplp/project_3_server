const  { Schema, model } = require('mongoose')

const repairStoreSchema = new Schema({
  
   name: String,
    location: {
        lat: Number,
        lng: Number
    },
  
    creator: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    }
});

const RepairStore = model('RepairStore', repairStoreSchema);

module.exports = RepairStore;
