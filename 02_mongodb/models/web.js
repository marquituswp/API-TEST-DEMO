const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

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
            type:Array
        },
        images:{
            type:Array
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
        }
    },
    {
        timestamps:true
    }
);

webSchema.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("web",webSchema)