const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    alt: { type: String, required: true },
}, { _id: false });

const colorImageSchema = new mongoose.Schema({
    color: { type: String, required: true },
    images: [imageSchema]
}, { _id: false });

const variantSchema = new mongoose.Schema({
    color: { type: String, required: true },
    size: { type: String },
    stock: { type: Number, default: 0 },
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },

    brand: { type: String, default: "" },

    price: { type: Number, required: true },

    discountPrice: { type: Number, default: null },

    isFeatured: { type: Boolean, default: false },

    totalStock: { type: Number, default: 0 },

    // No _id added here
    colorImages: [colorImageSchema],

    // No _id added here
    variants: [variantSchema],

    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model('Products', productSchema);
