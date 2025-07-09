// ECHO is on.
const Product = require('../models/productModel');

// Create Product
const createProduct = async (productData) => {
    try {
        const newProduct = await Product.create(productData);
        return newProduct
    } catch (error) {
        throw error
    }
}

// Get All Products
const getAllProducts = async (query) => {
    try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;

        const queryObject = {};

        const sortObject = {};

        if (query.category) {
            queryObject.category = query.category
        }

        if (query.minPrice || query.maxPrice) {
            queryObject.price = {};
            if (query.minPrice) queryObject.price.$gte = Number(query.minPrice);
            if (query.maxPrice) queryObject.price.$lte = Number(query.maxPrice);
        }


        if (query.sortBy) {
            if (query.sortOrder === 'desc') {
                sortObject[query.sortBy] = -1;
            } else {
                sortObject[query.sortBy] = 1;
            }
        }

        if (query.stock === 'true') {
            queryObject.stock = { $gte: 0 }
        }

        const products = await Product.find(queryObject).sort(sortObject).skip(skip).limit(limit);
        return products
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct,
    getAllProducts
}