const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const {BookModel} = require("../models/bookModel")

const bookRouter = express.Router()
bookRouter.use(auth)

// Add new book
bookRouter.post("/add", async(req, res)=>{
    try {
        const book = new BookModel(req.body)
        await book.save()
        res.status(200).send({"msg":"Book added", "Book": req.body})
    } catch (error) {
        res.status(400).send({"Error":error})
    }
})

// Get All books
bookRouter.get("/", async(req, res)=>{
    try {
        const books = await BookModel.find()
        res.status(200).send({"Books": books})
    } catch (error) {
        res.status(200).send({"msg": error})
    }
})

// Update a book by id
bookRouter.patch("/update/:id", async(req, res)=>{
    const {id} = req.params
    try {
        await BookModel.findByIdAndUpdate({_id:id}, req.body)
        res.status(200).send({"msg":`Book has been updated`})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

// Deete a book by id
bookRouter.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Book has been deleted`})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})

module.exports = {bookRouter}