const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    return sum + (item.productId.price * item.quantity);
  }, 0);
};

// Get Cart by Customer ID
const getCartByCustomerId = async (customerId) => {
  try {
    const cart = await Cart.findOne({ customer: customerId })
      .populate('customer', 'name email')
      .populate('items.productId', 'name category price');

    if (cart) {
      cart.total = calculateTotal(cart.items);
    }

    return cart;
  } catch (error) {
    throw error;
  }
};

// Add Item to Cart
const addItemToCart = async (customerId, productId, quantity) => {
  try {

    const product = await Product.findOne({ product: productId })

    if (!product) {
      throw error
    }

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = await Cart.create({
        customer: customerId,
        items: [{ productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    return await cart.populate('items.productId', 'name category price');
  } catch (error) {
    throw error;
  }
};

// Remove Item from Cart
const removeItemFromCart = async (customerId, productId) => {
  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );
    await cart.save();

    return await cart.populate('items.productId', 'name category price');
  } catch (error) {
    throw error;
  }
};

// Update Item Quantity
const updateItemQuantity = async (customerId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (!item) throw new Error('Item not found in cart');

    item.quantity = quantity;
    await cart.save();

    return await cart.populate('items.productId', 'name category price');
  } catch (error) {
    throw error;
  }
};

// Clear Cart
const clearCart = async (customerId) => {
  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) throw new Error('Cart not found');

    cart.items = [];
    await cart.save();

    return cart;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCartByCustomerId,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
};