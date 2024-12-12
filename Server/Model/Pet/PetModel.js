const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    species:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    vaccinationHistory:{
        type:Array,
    },
    nextVaccinationDue:{
        type:String
    }
    
})


const petModel = mongoose.model("petModel",petSchema);
module.exports = petModel;





