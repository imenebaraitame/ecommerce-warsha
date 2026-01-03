import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        isUnique: true,
        trim: true, // remove whitespace
    }
}, { timestamps: true } // automatically manage createdAt and updatedAt fields
);

const Category = mongoose.model('Category', categorySchema);

export default Category;