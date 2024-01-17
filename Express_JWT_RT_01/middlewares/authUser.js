const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

const auth = (req, res, next)=> {
    const token = req.headers.authorization
    jwt.verify(token, process.env.Access_Key, (err, decoded)=> {
        if(decoded){
            next()
        } else {
            res.status(400).send({"error":err})
        }
    })
}

module.exports = {auth}