const { z } = require("zod");

class SubCategoryValidation {
    addSubCategoryValidation = z.object({
        name: z.string({
            required_error: "Category name is required",
            invalid_type_error: "Category name must be a string",
        })
            .trim()
            .min(1, "Category name cannot be empty")
            .regex(/^[A-Za-z\s]+$/, "Category name must contain only alphabets"),

        categoryId: z.string({
            required_error: "Category ID is required",
            invalid_type_error: "Category ID must be a string",
        })
            .trim()
            .min(1, "Category ID cannot be empty")
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid Category ID format (must be ObjectId)") 
    });

}

module.exports = new SubCategoryValidation();