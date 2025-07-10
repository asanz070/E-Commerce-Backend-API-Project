// ECHO is on.
const Customer = require('../models/customerModel');

// Create Customer
const createCustomer = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData);
        return newCustomer
    } catch (error) {
        throw error
    }
}

// Get Customer
const getAllCustomer = async () => {
    try {
        const customers = await Customer.find();
        return customers
    } catch (error) {
        throw error
    }
}

// Get Customer by id
const getCustomerById = async (id) => {
    try {
        const customerId = await Customer.findById(id)
        return customerId
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCustomer,
    getAllCustomer,
    getCustomerById
}