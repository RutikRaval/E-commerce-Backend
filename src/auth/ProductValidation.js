const { z } = require("zod");

const imageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().optional(),
});

const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().optional(),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
  images: z
    .array(imageSchema)
    .min(1, "At least one image is required for each variant"),
});

// ----------------------------
// PRODUCT VALIDATION
// ----------------------------
exports.productValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),

    category: z.string().min(1, "Category is required"),
    subCategory: z.string().min(1, "Sub-category is required"),

    brand: z.string().optional(),

    price: z
      .number()
      .min(1, "Price must be greater than 0"),

    discountPrice: z
      .number()
      .nullable()
      .optional(),

    isFeatured: z.boolean().optional(),

    variants: z
      .array(variantSchema)
      .min(1, "At least one variant is required"),

  })
  .superRefine((data, ctx) => {
    // discountPrice must be < price
    if (data.discountPrice !== null && data.discountPrice !== undefined) {
      if (data.discountPrice >= data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount price must be less than original price",
        });
      }
    }
  });
