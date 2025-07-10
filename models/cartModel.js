// ECHO is on.
const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    customer: {
        type: ObjectId,
        ref: 'Customer',
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
},
    {
        timestamps: true
    }
)

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;