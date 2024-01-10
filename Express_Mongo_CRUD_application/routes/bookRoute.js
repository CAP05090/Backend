const express = require("express")
const {BookModel} = require("../models/bookModel.js")
const bookRouter = express.Router()
// creating book
bookRouter.post("/add", async(req, res)=>{
    try {
        const data = req.body
        const book = new BookModel(data)
        await book.save()
        res.send({"message":"New Book Added To Database"})
    } catch (error) {
        res.send({"err": error})
    }
})

// Read Books
bookRouter.get("/search", async(req, res)=>{
    let query = req.query
    try {
        const book = await BookModel.find(query)
        res.send(book)
    } catch (error) {
        res.send({"err":error})
    }
})

// updating book data
bookRouter.patch("/update/:userId", async(req, res)=>{
    try {
        let {userId} = req.params
        let data = req.body
        await BookModel.findByIdAndUpdate({_id:userId}, data)
        console.log(userId, data)
        res.send({"message":"Book has been Updated"})
    } catch (error) {
        res.send({"err":error})
    }
})

// deleting book
bookRouter.delete("/delete/:userId", async(req, res)=>{
    try {
        let {userId} = req.params
        await BookModel.findByIdAndDelete({_id:userId})
        console.log(userId)
        res.send({"message":"Book has been Deleted"})
    } catch (error) {
        res.send({"err":error})
    }
})


module.exports = {bookRouter}