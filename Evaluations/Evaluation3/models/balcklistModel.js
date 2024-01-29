const mongoose = require("mongoose")

const blackListSchema = mongoose.Schema({
    blackListToken:{type:String, required:true},
    date: {type:String, required:true}
}, {
    versionKey:false
})

const BlackListModel = mongoose.model("BlackListedToken", blackListSchema)

module.exports = {BlackListModel}