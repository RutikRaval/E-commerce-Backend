const productSchema = require('../model/ProductModel')
const categorySchema = require('../model/CategoryModel')
const subCategorySchema = require('../model/SubCategoryModel');
const { success } = require('zod');

class ProductService {

    addProduct = async (payload) => {
        const {
            name,
            description,
            category,
            subCategory,
            brand,
            price,
            discountPrice,
            variants
        } = payload;

        const isExisting = await productSchema.findOne({ name: name })
        if (isExisting) {
            return {
                success: false,
                status: 400,
                message: `${name} already exists.`
            }
        }

        const isCategory = await categorySchema.findById(category);
        if (!isCategory) {
            return {
                success: false,
                status: 400,
                message: "Invalid category ID"
            };
        }

        // Validate subcategory
        const isSubCategory = await subCategorySchema.findById(subCategory);
        if (!isSubCategory) {
            return {
                success: false,
                status: 400,
                message: "Invalid sub-category ID"
            };
        }

        if (discountPrice && discountPrice >= price) {
            return {
                success: false,
                status: 400,
                message: "Discount price must be less than original price"
            };
        }

        let totalStock = 0;
        if (variants && variants.length > 0) {
            totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);
        }

        const product = await productSchema.create({
            name,
            description,
            category,
            subCategory,
            brand,
            price,
            discountPrice,
            variants,
            totalStock
        });
        return {
            success: true,
            status: 201,
            message: "Product created successfully",
            data: product
        };
    }

    getAllProduct = async (query={}) => {
        const {id}=query
        let filter={}
        if(id !== undefined){
            filter._id=id
        }
        const product= await productSchema.find(filter).sort({name:1})
        return{
            success:true,
            status:200,
            message:"Products fetched successfully",
            data:product
        }
    }
}

module.exports = new ProductService()