const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const webSchema = new mongoose.Schema(
    {
        Ciudad:{
            type: String
        },
        Actividad:{
            type:String
        },
        Titulo:{
            type:String
        }
    }
)