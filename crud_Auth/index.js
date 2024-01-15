const express = require("express")
const dotenv = require("dotenv").config()
const {connection} = require("./db")
const {userRouter} = require("./routes/userRoute")
const {auth} = require("./middleware/auth.middleware")

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use("/users", userRouter)

app.get("/", (req, res)=>{
    res.send("Welcome to Home Page")
})

// Product Data Page
app.get("/products", auth, (req, res)=>{
    res.status(200).send({"msg":"Product Data ...."})
})

// Post Page
app.get("/posts", auth, (req, res)=>{
    res.status(200).send({"msg":"Post Data ...."})
})

// Todo Data Page
app.get("/todos", auth, (req, res)=>{
    res.status(200).send({"msg":"Todo Data ...."})
})

app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on PORT ${PORT} Database is also connect`)
    } catch (error) {
        console.log(error)
    }
})
