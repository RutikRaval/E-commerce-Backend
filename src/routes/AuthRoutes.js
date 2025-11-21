const express = require("express")
const {  validateSchema } = require("../middleware/Validate")
const { registerSchema, loginSchema } = require("../auth/AuthValidation")
const AuthController = require("../controller/AuthController")
const { rateLimiter } = require("../middleware/RateLimiter")
const { auth } = require("../middleware/AuthToken")

const authRouter = express.Router()

authRouter.use(express.json())

authRouter.post('/register',rateLimiter,validateSchema(registerSchema), AuthController.registerController)
authRouter.post('/login',rateLimiter,validateSchema(loginSchema), AuthController.loginController)
authRouter.get('/check',rateLimiter,auth, AuthController.auth)
authRouter.get('/logout',auth, AuthController.logoutController)


module.exports = authRouter