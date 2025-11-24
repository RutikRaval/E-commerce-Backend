const SubCategorySchema = require("../model/SubCategoryModel");
const Category = require('../model/CategoryModel')

class SubCategoryService {

    getAllSubCategoryService = async (query = {}) => {
        try {
            
            const { active } = query;
            
            let filter = {};

            if (active !== undefined) {
                filter.isActive = active === 'true';
            }

            const allSubCategory = await SubCategorySchema.find(filter).sort({ name: 1 }).populate('categoryId');
            return {
                success: true,
                status: 200,
                message: "Sub Categories fetched successfully", 
                data: allSubCategory,
            };
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };
    addSubCategoryService = async (payload) => {
        try {
            const { categoryId, name } = payload;
            console.log(payload);

            const category = await Category.findById(categoryId);

            if (!category) {
                return {
                    success: false,
                    status: 404,
                    message: "Parent Category not found",
                };
            }

            const existing = await SubCategorySchema.findOne({ name, categoryId });
            if (existing) {
                return {
                    success: false,
                    status: 409,
                    message: "Subcategory already exists in this category"
                };
            }
            const subCategory = await SubCategorySchema.create({
                name,
                categoryId
            });
            return {
                success: true,
                status: 201,
                message: "Subcategory created successfully",
                data: subCategory
            };

        } catch (error) {
            return {
                success: false,
                status: 500,
                message: error.message,
            };
        }
    };



    deleteSubCategoryService = async (payload) => {
        try {
            const { id } = payload;

            const subCategory = await SubCategorySchema.findById(id);
            if (!subCategory) {
                return {
                    success: false,
                    status: 404,
                    message: "Sub Category not found",
                };
            }

            await SubCategorySchema.findByIdAndDelete(id);

            return {
                success: true,
                status: 200,
                message: "Sub Category permanently deleted",
                data: subCategory
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

module.exports = new SubCategoryService();