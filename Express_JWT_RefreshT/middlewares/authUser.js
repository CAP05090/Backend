const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const {blacklist} = require("../blacklist")

const auth = (req, res, next)=>{
    const token = req.headers.authorization
    if(token){
        if (blacklist.includes(token)){
            res.send({"msg":"Session Expire Please Login Again"})
        }
    }
    jwt.verify(token, process.env.Access_Key, (err, decoded)=>{
        if(decoded){
            next()
        } else {
            res.status(400).send({"msg":err})
        }
    })
}

module.exports = {auth}