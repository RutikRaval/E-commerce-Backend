const categorySchema = require("../model/CategoryModel");

class CategoryService {
    getAllCategoryService = async (query = {}) => {
        try {
            const { active } = query;
            let filter = {};
            
            // Filter by active status if provided
            if (active !== undefined) {
                filter.isActive = active === 'true';
            }

            const allCategory = await categorySchema.find(filter).sort({ name: 1 });
            return {
                success: true,
                status: 200,
                message: "Categories fetched successfully", // Fixed message
                data: allCategory,
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };

    getCategoryByIdService = async (payload) => {
        try {
            const { id } = payload; // Use id instead of _id
            const category = await categorySchema.findById(id);

            if (!category) {
                return {
                    success: false,
                    status: 404,
                    message: "Category not found",
                };
            }

            return {
                success: true,
                status: 200,
                message: "Category fetched successfully",
                data: category,
            };
        } catch (error) {
            if (error.name === 'CastError') {
                return {
                    success: false,
                    status: 400,
                    message: "Invalid category ID",
                };
            }
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };

    addCategoryService = async (payload) => {
        try {
            const { name } = payload;

            const isExisting = await categorySchema.findOne({ name: name.toLowerCase() });

            if (isExisting) {
                return {
                    success: false,
                    status: 409,
                    message: "Category already exists",
                };
            }

            const category = await categorySchema.create({ name: name.toLowerCase() });

            return {
                success: true,
                status: 201,
                message: "Category created successfully",
                data: category,
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };

    // ADD THIS MISSING SERVICE METHOD
    updateCategoryService = async (payload) => {
        try {
            const { id, name } = payload;

            const category = await categorySchema.findById(id);
            if (!category) {
                return {
                    success: false,
                    status: 404,
                    message: "Category not found",
                };
            }

            // Check if new name already exists (excluding current category)
            if (name && name !== category.name) {
                const existingCategory = await categorySchema.findOne({ 
                    name: name.toLowerCase(),
                    _id: { $ne: id }
                });

                if (existingCategory) {
                    return {
                        success: false,
                        status: 409,
                        message: "Category name already exists",
                    };
                }
            }

            // Update category
            const updatedCategory = await categorySchema.findByIdAndUpdate(
                id,
                { 
                    name: name ? name.toLowerCase() : category.name 
                },
                { new: true, runValidators: true }
            );

            return {
                success: true,
                status: 200,
                message: "Category updated successfully",
                data: updatedCategory,
            };
        } catch (error) {
            if (error.name === 'CastError') {
                return {
                    success: false,
                    status: 400,
                    message: "Invalid category ID",
                };
            }
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };

    deleteCategoryService = async (payload) => {
        try {
            const { id } = payload; // Use id instead of _id

            const category = await categorySchema.findById(id);
            if (!category) {
                return {
                    success: false,
                    status: 404,
                    message: "Category not found",
                };
            }

            await categorySchema.findByIdAndDelete(id);

            return {
                success: true,
                status: 200,
                message: "Category permanently deleted",
                data:category
            };
        } catch (error) {
            if (error.name === 'CastError') {
                return {
                    success: false,
                    status: 400,
                    message: "Invalid category ID",
                };
            }
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };

    toggleCategoryService = async (payload) => {
        try {
            const { id } = payload; // Use id instead of _id

            const category = await categorySchema.findById(id);
            if (!category) {
                return {
                    success: false,
                    status: 404,
                    message: "Category not found",
                };
            }

            category.isActive = !category.isActive;
            await category.save();

            return {
                success: true,
                status: 200,
                message: category.isActive
                    ? "Category activated successfully"
                    : "Category deactivated successfully",
                data: category
            };
        } catch (error) {
            if (error.name === 'CastError') {
                return {
                    success: false,
                    status: 400,
                    message: "Invalid category ID",
                };
            }
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };
}

module.exports = new CategoryService();