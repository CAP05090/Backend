const express = require("express")
const { connection } = require("./db")
const dotenv = require("dotenv").config()
const {userRouter} = require("./routes/userRoute")
const { bookRouter } = require("./routes/bookRoute")
const { limiter } = require("./middlewares/limiter.middleware")

const app = express()
const PORT = process.env.PORT

app.use(limiter)
app.use(express.json())
app.use("/users", userRouter)
app.use("/books", bookRouter)

// Home Page
app.get("/", (req, res)=>{
    res.send({"Message":"Welcome to BookStore"})
})


app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on port ${PORT} and DB is connected`)
    } catch (error) {
        console.log(error)
    }
})