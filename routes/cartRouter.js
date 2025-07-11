// ECHO is on.
const express = require('express');
const router = express.Router();

const { getCart, getCartByCustomerId, createCart, addItemToCart, updateItemQuantity, removeItemFromCart, clearCart } = require('../controllers/cartController');

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
        const newCart = await createCart(request.body);
        response.status(200).json({ message: 'success', payload: newCart })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

router.post('/:customerId/add', async (request, response) => {
    try {
        const { productId, quantity } = request.body;
        const customerId = request.params.customerId;

        const updatedCart = await addItemToCart(customerId, productId, quantity);
        response.status(200).json({ message: 'success', payload: updatedCart });
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message });
    }
});

router.put('/:customerId/update/:productId', async (request, response) => {
    try {
        const { quantity } = request.body;
        const { customerId, productId } = request.params;
        const updatedCart = await updateItemQuantity(customerId, productId, quantity);
        response.status(200).json({ message: 'success', payload: updatedCart });
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message });
    }
});

router.delete('/customerId/remove/:productId', async (request, response) => {
    try {
        const { customerId, productId } = request.params;
        const updatedCart = await removeItemFromCart(customerId, productId);
        response.status(200).json({ message: 'success', payload: updatedCart })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })

    }
})

router.delete('/customerId/clear', async (request, response) => {
    try {
        const { customerId } = request.params;
        const clearedCart = await clearCart(customerId)
        response.status(200).json({ message: 'success', payload: clearedCart })
    } catch (error) {
        response.status(400).json({ message:'failure', payload: error.message })
    }
})

router.get('/customerId/total', async (request, response) => {
    try {
        const { customerId } = request.params;
        const result = await getCartWithTotal(customerId);
        response.status(200).json({ message: 'success', payload: result })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error.message })
    }
})

module.exports = router