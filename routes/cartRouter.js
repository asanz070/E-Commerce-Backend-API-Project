// ECHO is on.
const express = require('express');
const router = express.Router();

const { getCart, getCartByCustomerId, createCart } = require('../controllers/cartController');

router.get('/', async (request, response) => {
    try {
        const fullCart = await getCart();
        response.status(200).json({ message: 'success', payload: fullCart })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

router.get('/:customerId', async (request, response) => {
    try {
        const singleCart = await getCartByCustomerId(request.params.customerId);
        response.status(200).json({ message: 'success', payload: singleCart });
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error });
    }
});

router.post('/', async (request, response) => {
    try {
        console.log()
        const newCart = await createCart(request.body);
        response.status(200).json({ message: 'success', payload: newCart })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router