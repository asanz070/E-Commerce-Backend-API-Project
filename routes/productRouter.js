// ECHO is on.
const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct, getProductById } = require('../controllers/productController');

router.get('/', async (request, response) => {
    try {
        const product = await getAllProducts(request.query);
        response.status(200).json({ message: 'success', payload: product })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

router.get('/:productId', async (request, response) => {
    try {
        const productId = await getProductById(request.params.productId)
        response.status(200).json({ message: 'success', payload: productId })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

router.post("/", async (request, response) => {
    try {
        const newProduct = await createProduct(request.body);
        response.status(200).json({ message: 'success', payload: newProduct })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router