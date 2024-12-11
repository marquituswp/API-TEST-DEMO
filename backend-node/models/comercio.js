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
        unique: true
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

}, 
{
    timestamps: true,
});

// Creo el modelo de la colección comercio y lo exporto, añadiendo eliminación lógica
comercioSchema.plugin(mongooseDelete,{overrideMethods: "all"})
const commerceModel = mongoose.model("comercio", comercioSchema);

module.exports = commerceModel 

