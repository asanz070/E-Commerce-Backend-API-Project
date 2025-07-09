// ECHO is on.
const express = require('express');
const router = express.Router();

const { getAllCategory, getCategoryById, createCategory } = require('../controllers/categoryController');

router.get('/', async (request, response) => {
    try {
        const category = await getAllCategory();
        response.status(200).json({ message: 'success', payload: category })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

router.get('/:id', async (request, response) => {
    try {
        const categoryId = await getCategoryById(request.params.id)
        response.status(200).json({ message: 'success', payload: categoryId })
    } catch (error) {
        response.status(404).json({ message: 'failure', payload: error })
    }
})

router.post('/', async (request, response) => {
    try {
        const newCategory = await createCategory(request.body);
        response.status(200).json({ message: 'success', payload: newCategory })
    } catch (error) {
        response.status(400).json({ message: 'failure', payload: error })
    }
})

module.exports = router