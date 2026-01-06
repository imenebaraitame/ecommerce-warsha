import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,  
            unique: true,    
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                },
                price: {
                    type: Number,
                    required: true,
                    min: [0, 'Price cannot be negative'],
                }
            }
        ],
        total: {
            type: Number,
            required: true,
            min: [0, 'Total cannot be negative'],
            default: 0,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;