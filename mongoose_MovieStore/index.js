const express = require("express")
const cors = require("cors")
const {movieRouter} = require("./Routes/movieRoute.js")
const {connection, MovieModel} = require("./db.js")

const app = express()
const port = 8080

app.use(express.json())
app.use(cors())

app.use("/movie", movieRouter)

app.get("/", (req, res)=>{
    res.setHeader("Content-type","text/html")
    res.send("<h1>Welcome to Movie Store</h1>")
})

app.listen(port, async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port ${port}`)
    console.log("Database is successfully connected to server")
})
