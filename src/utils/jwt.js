const jwt = require('jsonwebtoken')

const key = process.env.JWT_KEY
const expiryTime = process.env.JWT_EXPIRE

const generateToken=(payload)=>{
    console.log(payload);
    
    return jwt.sign(payload, key, { expiresIn: expiryTime })
}

const verifyToken=(payload)=>{
    return jwt.verify(payload,key)
}

module.exports={
    generateToken,
    verifyToken
}