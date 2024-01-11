const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://127.0.0.1:27017/Movie_Store")

const movieSchema = mongoose.Schema({
    title:{type:String, required:true},
    release_year:{type:Number, require:true},
    genre:{type:String, required:true}
},{
    versionKey:false
})

const MovieModel = mongoose.model("Movie", movieSchema)

module.exports = {connection, MovieModel}