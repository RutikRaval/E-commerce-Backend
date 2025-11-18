const { z } = require("zod");

class CategoryValidation {
    addCategoryValidation = z.object({
        name: z.string({
            required_error: "Category name is required",
            invalid_type_error: "Category name must be a string",
        })
            .trim()
            .min(1, "Category name cannot be empty")
            .regex(/^[A-Za-z\s]+$/, "Category name must contain only alphabets")
    });

    // ADD THIS VALIDATION
    updateCategoryValidation = z.object({
        name: z.string({
            required_error: "Category name is required",
            invalid_type_error: "Category name must be a string",
        })
            .trim()
            .min(1, "Category name cannot be empty")
            .regex(/^[A-Za-z\s]+$/, "Category name must contain only alphabets")
            .optional() 
    });
}

module.exports = new CategoryValidation();