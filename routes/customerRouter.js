// ECHO is on.
const express = require('express');
const router = express.Router();

const { getAllCustomer, createCustomer, getCustomerById } = require('../controllers/customerController');

router.get('/', async (request, response) => {
    try {
        const customers = await getAllCustomer();
        response.status(200).json({ message: 'success', payload: customers })
    } catch (error) {
        response.status(200).json({ message: 'failure', paylaod: error })
    }
})

router.get('/:customerId', async (request, response) => {
    try {
        const customerId = await getCustomerById(request.params.customerId)
        response.status(200).json({ message: 'success', payload: customerId })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

router.post('/', async (request, response) => {
    try {
        const newCustomer = await createCustomer(request.body);
        response.status(200).json({ message: 'success', payload: newCustomer })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router