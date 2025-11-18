const mongoose = require('mongoose')


const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        index: true
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    }
}, { timestamps: true })

module.exports = mongoose.model("SubCategory", subCategorySchema)
