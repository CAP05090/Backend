const mongoose = require("mongoose")

const bookSchems = mongoose.Schema({
    Title:{type:String, required: true},
    Author: {type:String, required: true},
    Price: {type:Number, required: true},
    Publisher:String,
    Description:String
},{
    versionKey: false
})

const BookModel = mongoose.model("book", bookSchems)

module.exports = {BookModel}