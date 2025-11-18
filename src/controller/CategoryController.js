const Category = require("../service/Category");

class CategoryController {
    getAllCategoryController = async (req, res) => {
        try {
            const result = await Category.getAllCategoryService(req.query); 

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Get All Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    getCategoryByIdController = async (req, res) => {
        try {
            const result = await Category.getCategoryByIdService({ id: req.params.id }); 

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Get Category by ID error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    addCategoryController = async (req, res) => {
        try {
            const result = await Category.addCategoryService(req.body);

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Add Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    // ADD THIS MISSING CONTROLLER
    updateCategoryController = async (req, res) => {
        try {
            const result = await Category.updateCategoryService({
                id: req.params.id,
                ...req.body
            });

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Update Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    deleteCategoryController = async (req, res) => {
        try {
            const result = await Category.deleteCategoryService({ id: req.params.id }); // Use id instead of _id

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null

            });

        } catch (error) {
            console.error("Delete Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    toggleCategoryController = async (req, res) => {
        try {
            const result = await Category.toggleCategoryService({ id: req.params.id }); // Use id instead of _id

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Toggle Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };
}

module.exports = new CategoryController();
