const userModel = require('../model/UserModel')
const { verifyToken } = require('../utils/jwt')

exports.auth = async (req, res, next) => {
    const istoken = req?.body?.token || req?.query?.token || req?.headers["authorization"]

    if (!istoken) {
        return res.status(401).json({ message: "Unauthorized token not found" })
    }

    try {
        const decode = verifyToken(istoken)
        const user = userModel.findById(decode.id)
        req.user = user
        next()
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}