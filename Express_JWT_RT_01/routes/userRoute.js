const express = require("express")
const {UserModel} = require("../models/userModel")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const dotenv = require("dotenv").config()

userRouter.use(cookieparser())

// Register User
userRouter.post("/register", async(req, res)=>{
    const {username, password, email} = req.body
    try {
        bcrypt.hash(password, 7, async function(err, hash) {
            /// console.log(username, hash, email)
            if(err){
                res.send({"msg":err})
            } else{
                const user = new UserModel({username, password:hash, email})
                await user.save()
                res.status(200).send({"msg":"Registration Successful"})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// Login User
userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const accessToken = jwt.sign({email:user.email}, process.env.Access_Key, {expiresIn: "10m"}) // generate Access token
                    const refreshToken = jwt.sign({emai:email}, process.env.Refresh_Key, {expiresIn:"24h"}) // generate Refresh Toke
                    res.cookie('RToken', refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24*60*60*1000 }) // Storing Rfresh Token in Cookies
                    res.status(200).send({"msg":"login Succesful", "token":accessToken})
                } else{
                    res.status(200).send({"msg":"Register first or wrong crendentials"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"err":error})
    }
})

// Refresh User 
userRouter.post("/refresh", (req, res)=>{
    const refreshToken = req.headers.authorization
    // const refreshToken = req.cookies.RtToken
    if(refreshToken) {
        jwt.verify(refreshToken, process.env.Refresh_Key, (err, decoded)=>{
            if(err){
                res.status(400).send({"msg":"Unauthorized user"})
            } else {
                const accessToken = jwt.sign({email:"user.email"}, process.env.Access_Key, {expiresIn:"10m"})
                res.send({"Token":accessToken})
            }
        })
    } else {
        res.send({"msg":"Unauthorized"})
    }
})


module.exports = {userRouter}