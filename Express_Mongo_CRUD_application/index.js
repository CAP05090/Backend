const express = require("express")
const cors = require("cors")
const {connection} = require("./db.js")
const {bookRouter} = require("./routes/bookRoute.js")
const {checkURL} = require("./middleware/checkURL.js")

const app = express()
const port = 8080;

app.use(express.json())
app.use(cors())

app.use("/books", checkURL, bookRouter)

app.get("/", (req, res)=>{
    res.setHeader("Content-type", "text/html")
    res.send(`<h1>WELCOME TO BOOKSTORE MANAGEMENT SYSTEM</h1>`)
})

app.listen(port, async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error)
    }
    console.log(`Express is running on port ${port}`)
    console.log("Database is also conneced")
})
