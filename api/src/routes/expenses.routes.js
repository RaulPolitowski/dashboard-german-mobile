const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');

// Rotas para operações de despesas
router.get('/', expenseController.getAllExpenses);
router.get('/category', expenseController.getExpensesByCategory);
router.get('/:id', expenseController.getExpenseById);
router.post('/', expenseController.createExpense);
router.put('/:id', expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
