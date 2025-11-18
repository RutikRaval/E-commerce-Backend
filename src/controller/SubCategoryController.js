const SubCategory = require("../service/SubCategory");

class SubCategoryController {

     getAllSubCategoryController = async (req, res) => {
            try {
                const result = await SubCategory.getAllSubCategoryService(req.query); 
    
                return res.status(result.status).json({
                    success: result.success,
                    message: result.message,
                    data: result.data || null
                });
    
            } catch (error) {
                console.error("Get All Sub Category error:", error);
                return res.status(500).json({
                    success: false,
                    message: "Internal Server Error",
                    error: error.message
                });
            }
        };

    addSubCategoryController = async (req, res) => {
        try {
            console.log(req.body);
            
            const result = await SubCategory.addSubCategoryService(req.body);

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null
            });

        } catch (error) {
            console.error("Add Sub Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };

    deleteSubCategoryController = async (req, res) => {
        try {
            const result = await SubCategory.deleteSubCategoryService({ id: req.params.id }); 

            return res.status(result.status).json({
                success: result.success,
                message: result.message,
                data: result.data || null

            });

        } catch (error) {
            console.error("Delete Sub Category error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    };


}

module.exports = new SubCategoryController();
