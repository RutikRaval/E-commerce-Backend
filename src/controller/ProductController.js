const ProductService = require("../service/ProductService");

class ProductController {
    addProduct = async (req, res) => {
        try {
            const result = await ProductService.addProduct(req.body)
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                user: result.data || null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }

    getAllProduct = async (req, res) => {
        try {
            const result=await ProductService.getAllProduct(req.query)
            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                product: result.data || null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = new ProductController()