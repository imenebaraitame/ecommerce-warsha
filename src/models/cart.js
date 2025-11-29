import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                },
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: [0, 'Total price cannot be negative'],
            default: 0,
        },
    },
    { timestamps: true } // automatically manage createdAt and updatedAt fields
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;