const express = require("express")
const { rateLimiter } = require("../middleware/RateLimiter")
const { validateSchema } = require("../middleware/Validate")
const { productValidation } = require("../auth/ProductValidation")
const ProductController = require("../controller/ProductController")
const { auth } = require("../middleware/AuthToken")
const router = express.Router()

router.use(express.json())

router.post('/',rateLimiter,auth,validateSchema(productValidation),ProductController.addProduct)
router.get('/',rateLimiter,auth,ProductController.getAllProduct)
router.get('/latest',rateLimiter,auth,ProductController.getLatestProduct)

module.exports = router