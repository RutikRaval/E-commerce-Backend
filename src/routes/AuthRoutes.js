const express = require("express")
const { registerController } = require("../controller/AuthController")
const { rateLimiter } = require("../middleware/RateLimiter")
const {  validateSchema } = require("../middleware/Validate")
const { registerSchema } = require("../auth/AuthValidation")
const router = express.Router()
router.use(express.json())
console.log("ROUTER:>>>>")
router.post('/register',validateSchema(registerSchema), registerController)
// router.post('/register', registerController)

module.exports = router