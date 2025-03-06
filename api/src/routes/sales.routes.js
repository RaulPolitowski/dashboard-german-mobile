const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale.controller');

// Rotas para operações de vendas
router.get('/', saleController.getAllSales);
router.get('/summary', saleController.getSalesSummary);
router.get('/:id', saleController.getSaleById);
router.post('/', saleController.createSale);
router.put('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

module.exports = router;
