// ECHO is on.
const Category = require('../models/categoryModel');

// Create Category
const createCategory = async (categoryData) => {
    try {
        const newCategory = await Category.create(categoryData);
        return newCategory
    } catch (error) {
        throw error
    }
}

// Get Categories
const getAllCategory = async () => {
    try {
        const getCategory = await Category.find();
        return getCategory
    } catch (error) {
        throw error
    }
}

// Get Category by id
const getCategoryById = async (id) => {
    try {
        const categoryId = await Category.findById(id)
        return categoryId
    } catch (error) {
        throw error;
    }
}


module.exports = {
    createCategory,
    getAllCategory,
    getCategoryById
}