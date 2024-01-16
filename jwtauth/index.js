const express = require("express")
const {connection} = require("./db")
const dotenv = require("dotenv").config()
const {userRouter} = require("./routes/userRoutes")
const {auth} = require("./middlewares/authUser")
const {blacklist} = require("./blacklist")

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.use("/users", userRouter)

// Home Page
app.get("/", (req, res)=>{
    res.send({"msg": "Welcome to Home Page"})
})

// Series Data
app.get("/series", auth, (req, res)=>{
    res.status(200).send({"msg":"Series Data ......"})
})

// Logout
app.get("/logout", async(req, res)=>{
    const token = req.headers.authorization
    try {
        blacklist.push(token)
        res.status(200).send({"msg":"Logout Successful"})
    } catch (error) {
        res.send({"msg":error})
    }
})
app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Express Server is running on port ${PORT} and database is also connected`)
    } catch (error) {
        
    }
})