const mongoose = require('mongoose');
const mongooseDelete = require("mongoose-delete")
// Defino el esquema de la colección comercio
const comercioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cif:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    page_id:{
        type: Number,
        required: true,
        unique: true
    },
    // parámetro deleted para saber si el comercio ha sido eliminado o no (eliminación lógica)
}, 
{
    timestamps: true,
});

// Creo el modelo de la colección comercio y lo exporto
comercioSchema.plugin(mongooseDelete,{overrideMethods: "all"})
const comercioModel = mongoose.model("comercio", comercioSchema);

module.exports = comercioModel 

