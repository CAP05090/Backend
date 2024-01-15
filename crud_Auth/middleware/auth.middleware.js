const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
    const token = req.headers.authorization
    jwt.verify(token, "masai", (err, decoded)=>{
        if(decoded){
            next()
        } else{
            res.status(400).send({"error":err})
        }
    })
}

module.exports = {auth}