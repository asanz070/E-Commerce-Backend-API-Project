// ECHO is on
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// ✅ Get Cart by Customer ID
const getCartByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const cart = await Cart.findOne({ customer: customerId })
      .populate('customer', 'name email')
      .populate('items.productId', 'name category price');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this customer.' });
    }

    const total = cart.items.reduce((acc, item) => {
      return acc + (item.productId.price * item.quantity);
    }, 0);

    res.json({ cart, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create or Replace Cart with Array of Items
const createOrReplaceCart = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Customer and a non-empty items array are required.' });
    }

    // Validate all products
    for (const item of items) {
      if (!item.productId || typeof item.quantity !== 'number') {
        return res.status(400).json({ message: 'Each item must include productId and quantity (number).' });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
    }

    // Create or replace cart
    let cart = await Cart.findOneAndUpdate(
      { customer },
      { customer, items },
      { new: true, upsert: true, runValidators: true }
    );

    cart = await cart.populate('items.productId', 'name price');
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Add a Single Item to Cart
const addItemToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const customerId = req.params.customerId;

  try {
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({
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
    }

    await cart.save();
    const populatedCart = await cart.populate('items.productId', 'name price');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Remove an Item from Cart
const removeItemFromCart = async (req, res) => {
  const customerId = req.params.customerId;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: 'Item removed successfully.', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Quantity for a Product in Cart
const updateItemQuantity = async (req, res) => {
  const customerId = req.params.customerId;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    const item = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: 'Item not found in cart.' });

    item.quantity = quantity;
    await cart.save();

    res.json({ message: 'Quantity updated successfully.', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Clear All Items from Cart
const clearCart = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    cart.items = [];
    await cart.save();

    res.json({ message: 'Cart cleared.', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCartByCustomerId,
  createOrReplaceCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
};
