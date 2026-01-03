import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: [true, "Product name must be unique"],
      trim: true, // remove whitespace
      maxLenghth: [100, "Product name should not exceed 100 characters"],
      minlength: [2, "Product name should be at least 2 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    description: {
      type: String,
      maxLength: [200, "Product description should not exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      min: [0, "Product quantity cannot be negative"],
      default: 0,
    },
  },
  { timestamps: true } // automatically manage createdAt and updatedAt fields
);


const Product = mongoose.model("Product", productSchema);
export default Product;