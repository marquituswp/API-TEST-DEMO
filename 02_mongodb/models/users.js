const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

// Defino el esquema de la colección usuario
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        age:{
            type:Number
        },
        city:{
            type:String
        },
        interests:{
            type:[String]
        },
        allowOffers:{
            type:Boolean
        },
        role:{
            type:["admin","user"],
            default:"user"
        }
    },
    {
        timestamps:true
    }
)

// Creo el modelo de la colección usuario y lo exporto, añadiendo eliminación lógica
userSchema.plugin(mongooseDelete,{overrideMethods: "all"})
module.exports = mongoose.model("user",userSchema)