const jwt = require("jsonwebtoken")
const { BlackListModel } = require("../models/balcklistModel")
const dotenv = require("dotenv").config()

const auth = async(req, res, next) =>{
    const {token} = req.headers.authorization?.split(" ")[1]
    if(token){
        const blacktoken = await BlackListModel.find({token})
        if (blacktoken){
            res.split(200).send({"msg":"Please Login Again"})
        } else {
            jwt.verify(token, process.env.AccessKey, (err, decoded)=>{
                if(err){
                    res.send({"msg":"Wrong Token or please login again"})
                } else{
                    req.body.userId = decoded.userId
                    next()
                }
            })
        }
    } else {
        res.seatus(200).send({"msg":"Token not found"})
    }
    
}

module.exports = {auth}