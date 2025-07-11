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

// Create Add Item to Cart
const addItemToCart = async (customerId, productId, quantity) => {
    // Add Item to Cart
    const addItemToCart = async (customerId, productId, quantity) => {
        try {
            // Step 1: Check if quantity is valid
            if (quantity < 1) {
                throw new Error('Quantity has to be at least 1.');
            }

            // Step 2: Make sure the product actually exists in the database
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('That product does not exist.');
            }

            // Step 3: Look for a cart that belongs to the customer
            let cart = await Cart.findOne({ customer: customerId });

            // Step 4: If no cart exists, make one with the new product inside
            if (!cart) {
                const newCart = new Cart({
                    customer: customerId,
                    items: [
                        {
                            productId: productId,
                            quantity: quantity
                        }
                    ]
                });

                await newCart.save(); // save it to the database
                return newCart; // send it back
            }

            // Step 5: If the cart exists, check if the product is already in the cart
            let itemFound = false;

            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i];

                // Convert IDs to strings to compare them
                if (item.productId.toString() === productId.toString()) {
                    // If it's already there, just add more to the quantity
                    item.quantity += quantity;
                    itemFound = true;
                    break;
                }
            }

            // Step 6: If the product was not in the cart, add it as a new item
            if (!itemFound) {
                cart.items.push({
                    productId: productId,
                    quantity: quantity
                });
            }

            // Step 7: Save the updated cart
            await cart.save();

            // Step 8: Return the updated cart
            return cart;

        } catch (error) {
            throw error
        }
    };

}

const updateItemQuantity = async (customerId, productId, newQuantity) => {
    try {
        if (newQuantity < 1) {
            throw error
        }

        // Find the customer's cart
        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            throw error
        }

        // Find the item inside the cart
        let itemUpdated = false;

        for (let item of cart.items) {
            if (item.productId.toString() === productId.toString()) {
                item.quantity = newQuantity;
                itemUpdated = true;
                break;
            }
        }

        if (!itemUpdated) {
            throw error
        }

        await cart.save();
        return cart;
    } catch (error) {
        throw error
    }
};

const removeItemFromCart = async (customerId, productId) => {
    try {
        const cart = await Cart.findOne({ customer: customerId });
        if (!cart) {
            throw error
        }

        // Keep only items that DON'T match the productId
        const updatedItems = cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });

        // If no item was removed
        if (updatedItems.length === cart.items.length) {
            throw error
        }

        cart.items = updatedItems;
        await cart.save();
        return cart;
    } catch (error) {
        throw error
    }
};

const clearCart = async (customerId) => {
    try {
        const cart = await Cart.findOne({ customer: customerId });

        if (!cart) {
            throw error
        }

        cart.items = []; // Just set items to an empty array
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
};

const getCartWithTotal = async (customerId) => {
    try {
        const cart = await Cart.findOne({ customer: customerId })
            .populate('items.productId', 'name price'); // Get product names + prices

        if (!cart) {
            throw error
        }

        let total = 0;

        for (let item of cart.items) {
            const price = item.productId.price;
            const quantity = item.quantity;
            total += price * quantity;
        }

        return {
            cart: cart,
            totalPrice: total
        };
    } catch (error) {
        throw error
    }
};

module.exports = {
    getCart,
    getCartByCustomerId,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartWithTotal
};
