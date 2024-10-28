const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

// Defino el esquema de la colección web
const webSchema = new mongoose.Schema(
    {
        city:{
            type: String
        },
        activity:{
            type:String
        },
        title:{
            type:String
        },
        summary:{
            type:String
        },
        texts:{
            type:[String]
        },
        images:{
            type:[String]
        },
        reviews:{
            scoring:{
                type:Number
            },
            points:{
                type:Number
            },
            review:{
                type:String
            }
        },
        cifCommerce:{
            type:String,
            unique: true,
            default:"cif"
        }
    },
    {
        timestamps:true
    }
);

// Creo el modelo de la colección web y lo exporto, añadiendo eliminación lógica
webSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("web",webSchema)