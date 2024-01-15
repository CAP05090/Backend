const express = require("express")
const {UserModel} = require("../models/userModel.js")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()
// Register user
userRouter.post("/register", async(req, res)=>{
    try {
        const user = new UserModel(req.body)
        await user.save()
        res.send({"msg":"register Successful"})
    } catch (error) {
        res.send({"err":error})
    }
})
// Login User
userRouter.post("/login", async(req, res)=>{
    const {email, pass} = req.body
    try {
        const user = await UserModel.findOne({email:email, pass:pass})
        if(user){
            // generating token for authentication
            const token = jwt.sign({Email:email, Pass:pass}, "masai",{expiresIn:"1h"})
            res.status(200).send({"msg":"Login Sccessful", "token":token})
        } else{
            res.status(200).send({"msg":"Register first or Wrong Crendentials"})
        }
    } catch (error) {
        res.status(400).send({"err": error})
    }
})


module.exports = {userRouter}