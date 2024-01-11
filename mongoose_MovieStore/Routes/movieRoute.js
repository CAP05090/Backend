const express = require("express")
const {connection, MovieModel} = require("../db.js")
const movieRouter = express.Router()

// creating movie
movieRouter.post("/add", async(req, res)=>{
    try {
        const data = req.body
        const movie = new MovieModel(data)
        await movie.save()
        res.send({"message":"New movie Added To Database"})
    } catch (error) {
        res.send({"err": error})
    }
})

// Read movies
movieRouter.get("/", async(req, res)=>{
    let query = req.query
    try {
        const movie = await MovieModel.find(query)
        res.send(movie)
    } catch (error) {
        res.send({"err":error})
    }
})

// updating movie data
movieRouter.patch("/update/:userId", async(req, res)=>{
    try {
        let {userId} = req.params
        let data = req.body
        await MovieModel.findByIdAndUpdate({_id:userId}, data)
        res.send({"message":`movie id ${userId} has been Updated`})
    } catch (error) {
        res.send({"err":error})
    }
})

// deleting movie
movieRouter.delete("/delete/:userId", async(req, res)=>{
    try {
        let {userId} = req.params
        await MovieModel.findByIdAndDelete({_id:userId})
        res.send({"message":`movie id ${userId} has been Deleted`})
    } catch (error) {
        res.send({"err":error})
    }
})


module.exports = {movieRouter}