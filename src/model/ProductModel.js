const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
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
    brand: {
        type: String,
        default: "",
    },

    price: {
        type: Number,
        required: true,
    },

    discountPrice: {
        type: Number,
        default: null, // Example: price - discount
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    totalStock: {
        type: Number,
        default: 0,
    },
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String },
            stock: { type: Number, default: 0 },

            // 👍 Images based on color
            images: [
                {
                    url: { type: String, required: true },
                    alt: { type: String, default: "" },
                },
            ],
        },
    ],
    rating: {
        type: Number,
        default: 0,
    },

    numReviews: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)