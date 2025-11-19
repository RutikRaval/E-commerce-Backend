const { z } = require("zod");

// ----------------------------
// IMAGE SCHEMA (for colorImages)
// ----------------------------
const colorImageItemSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().min(1, "Alt text is required"),
});

// colorImages array item
const colorImageSchema = z.object({
  color: z.string().min(1, "Color is required"),
  images: z
    .array(colorImageItemSchema)
    .min(1, "At least one image is required per color"),
});

// ----------------------------
// VARIANT SCHEMA
// ----------------------------
const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().optional(),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
});

// ----------------------------
// PRODUCT VALIDATION
// ----------------------------
exports.productValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),

    category: z.string().min(1, "Category ID is required"),
    subCategory: z.string().min(1, "Sub-category ID is required"),

    brand: z.string().optional(),

    price: z.number().min(1, "Price must be greater than 0"),

    discountPrice: z.number().nullable().optional(),

    isFeatured: z.boolean().optional(),

    totalStock: z.number().optional(),

    // New ➤ Color Images
    colorImages: z
      .array(colorImageSchema)
      .optional(),

    // Updated ➤ Variants (NO images now)
    variants: z
      .array(variantSchema)
      .min(1, "At least one variant is required"),

    rating: z.number().optional(),
    numReviews: z.number().optional(),
  })

  // Custom Validation
  .superRefine((data, ctx) => {
    // discount < price
    if (data.discountPrice != null) {
      if (data.discountPrice >= data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount price must be less than original price",
        });
      }
    }
  });
