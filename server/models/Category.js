const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img:{
            type:String,
            required: true
        },
        description:{
            type:String,
        },
        deleted: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Categoty', categorySchema)