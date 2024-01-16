const express = require("express")
const {UserModel} = require("../models/userModel")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config()

// Register User
userRouter.post("/registation", async(req, res)=>{
    const {username, email, password} = req.body
    try {
        bcrypt.hash(password, 7, async function(err, hash) {
            if(err){
                res.send({"msg":err})
            } else{
                const user = new UserModel({username, email, password:hash})
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
                    res.cookie('RToken', refreshToken, {
                        httpOnly: true, sameSite: "None", secure: true, maxAge: 24*60*60*1000
                    })
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
                res.send({"msg":accessToken})
            }
        })
    } else {
        res.send({"msg":"Unauthorized"})
    }
})

module.exports = {userRouter}