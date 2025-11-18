const express = require("express")
const { rateLimiter } = require("../middleware/RateLimiter")
const {  validateSchema } = require("../middleware/Validate")
const { registerSchema, loginSchema } = require("../auth/AuthValidation")
const AuthController = require("../controller/AuthController")
const router = express.Router()
router.use(express.json())
router.post('/register',rateLimiter,validateSchema(registerSchema), AuthController.registerController)
router.post('/login',rateLimiter,validateSchema(loginSchema), AuthController.loginController)

module.exports = router