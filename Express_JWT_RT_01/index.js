const express = require("express")
const {connection} = require("./db")
const dotenv = require("dotenv").config()
const {userRouter} = require("./routes/userRoute")
const {auth} = require("./middlewares/authUser")

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.use("/users", userRouter)

// Home Page
app.get("/", (req, res)=>{
    res.send({"msg": "Welcome to Home Page"})
})

// Post Data
app.get("/posts", auth, (req, res)=>{
    res.status(200).send({"msg":"Post Data ......"})
})

// Products data
app.get("/products", (req, res)=>{
    res.send({"msg":"Product data ....."})
})

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Express Server is running on port ${PORT} and database is also connected`)
    } catch (error) {
        
    }
})