// ECHO is on.
const Cart = require('../models/cartModel');

const Product = require('../models/productModel');
const { } = require('../controllers/productController')

const Customer = require('../models/customerModel');
const { getCustomerById } = require('../controllers/customerController')

// Get All Cart Items
const getCart = async () => {
    try {
        const cart = await Cart.find()
            .populate('customer', 'name email')
            .populate('items.productId', 'name category price')
        return cart
    } catch (error) {
        throw error
    }
}

// Get Cart by CustomerId
const getCartByCustomerId = async (customerId) => {
    try {
        const singleCart = await Cart.findOne({ customer: customerId })
            .populate('customer', 'name email address phone')
            .populate('items.productId', 'name category price');
        return singleCart;
    } catch (error) {
        throw error;
    }
}

// Create Cart
const createCart = async (cartData) => {
    try {
        console.log(cartData)
        const newCart = await Cart.create(cartData);
        return newCart
    } catch (error) {
        throw error
    }
}

// Create Add Item to Cart
const addItemToCart = async (customerId, productId, quantity) => {
    const customer = await getCustomerById(customerId);

}

module.exports = {
    getCart,
    getCartByCustomerId,
    createCart
}