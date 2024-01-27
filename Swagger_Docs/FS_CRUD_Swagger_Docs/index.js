const express = require("express")
const dotenv = require("dotenv").config()
const {connection} = require("./db")
const {userRouter} = require("./routes/userRoute")
const swaggerjsdoc = require("swagger-jsdoc")
const swaggerui = require("swagger-ui-express")
const { movieRouter } = require("./routes/movieRoute")

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.use("/users", userRouter)
app.use("/movie", movieRouter)

// Swaggers Docs
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            { url:"http://localhost:8080" },
            { url:"http://localhost:4500"},
            { url:"http://localhost:3000"}
        ]},
        apis:["./routes/*.js"]
}

// Open API Specs
const openAPIspecs = swaggerjsdoc(options)

// build the swagger with the help of openAPI
app.use("/docs", swaggerui.serve, swaggerui.setup(openAPIspecs))

app.get("/", (req, res)=>{
    req.header("Content/type", "text/html")
    res.send("<h1>Welcome to Home Page</h1>")
})
app.listen(PORT, async()=>{
    try {
        await connection
        console.log(`Server is running on Port ${PORT} and db is connected`)
    } catch (error) {
        console.log("error: ", error)
    }
})