const userModel = require('../model/UserModel')
const { verifyToken } = require('../utils/jwt')

exports.auth = async (req, res, next) => {
    const token = req.cookies.token || req?.body?.token || req?.query?.token || req?.headers["authorization"]        
    if (!token) {
        return res.status(401).json({ message: "Unauthorized token not found" })
    }
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    try {
        const decode = verifyToken(token)
        const user = await userModel.findById(decode.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user
        next()
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}