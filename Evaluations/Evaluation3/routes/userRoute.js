const express = require("express")
const dotenv = require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/userModel")
const { BlackListModel } = require("../models/balcklistModel")

const userRouter = express.Router()

// Register User
userRouter.post("/register", async(req, res)=>{
    const {name, email, pass, city, age} = req.body
    try {
        bcrypt.hash(pass, 7, async(err, hash)=>{
            if (err){
                res.status(400).send({"message":"Something went wrong during Hashing password"})
            } else {
                const user = new UserModel({name, email, pass:hash, city, age})
                await user.save()
                res.status(200).send({"msg":"The new user has been registered", "registeredUser":req.body})
            }
        })
    } catch (error) {
        res.status(400).send({"message":error})
    }
})

// Login User
userRouter.post("/login", async(req, res)=>{
    const {email, pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(result){
                    const acceccToken = jwt.sign({userID: user._id, email}, process.env.AccessKey, {expiresIn: "2h"})
                    const refreshToken = jwt.sign({userID:user._id, email}, process.env.RefreshKey, {expiresIn: "5h"})
                    res.cookie("Token", refreshToken, {
                        httpOnly: true, 
                        sameSite:"None", 
                        secure: true, 
                        maxAge: 24*60*60*1000
                    })
                    res.status(200).send({"msg":"Login Successful!", "Accessoken": acceccToken, "RefreshToken": refreshToken})
                } else {
                    res.status(200).status({"msg":"Wrong Crenditial"})
                }
            })
        } else{
            res.status(200).send({"msg":"Email not Found"})
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

// Refresh Token
userRouter.post("/refreshtoken", (req, res)=>{
    const refreshToken = req.headers.authorization?.split(" ")[1]
    if(refreshToken) {
        jwt.verify(refreshToken, process.env.RefreshKey, (err, decoded)=>{
            if(err){
                res.status(400).send({"msg":"Refresh Token expires"})
            } else{
                const acceccToken = jwt.sign({UserID: "user._id"}, process.env.AccessKey, {expiresIn: "2h"})
                res.status(200).send({"newToken":acceccToken})
            }
        })
    } else {
        res.status(400).send({"msg":"Login first token not found"})
    }
})

// Logout Users
userRouter.get("/logout", async(req, res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    try {
        const tokens = new BlackListModel({blackListToken: token, date: new Date()})
        await tokens.save()
        res.status(200).send({"msg":"User has been logged out"})
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

module.exports = {userRouter}