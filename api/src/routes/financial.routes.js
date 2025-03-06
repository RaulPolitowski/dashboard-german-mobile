const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financial.controller');

// Rotas para operações financeiras
router.get('/', financialController.getAllFinancials);
router.get('/summary', financialController.getFinancialSummary);
router.get('/:id', financialController.getFinancialById);
router.post('/', financialController.createFinancial);
router.put('/:id', financialController.updateFinancial);
router.delete('/:id', financialController.deleteFinancial);

module.exports = router;
