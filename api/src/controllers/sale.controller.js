const Sale = require('../models/sale.model');

// Obter todas as vendas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter uma venda por ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar uma nova venda
exports.createSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma venda
exports.updateSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    await sale.update(req.body);
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir uma venda
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }
    await sale.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter resumo de vendas por período
exports.getSalesSummary = async (req, res) => {
  try {
    const { month, year, salesperson } = req.query;
    
    let whereClause = {};
    if (month) whereClause.month = month;
    if (year) whereClause.year = parseInt(year);
    if (salesperson) whereClause.salesperson = salesperson;
    
    const sales = await Sale.findAll({ where: whereClause });
    
    // Calcular totais
    const summary = {
      totalSales: sales.length,
      totalAmount: 0,
      salesByProduct: {},
      salesBySalesperson: {},
      data: sales
    };
    
    sales.forEach(sale => {
      summary.totalAmount += parseFloat(sale.totalAmount);
      
      // Agrupar por produto
      const product = sale.product;
      if (!summary.salesByProduct[product]) {
        summary.salesByProduct[product] = {
          quantity: 0,
          amount: 0
        };
      }
      summary.salesByProduct[product].quantity += sale.quantity;
      summary.salesByProduct[product].amount += parseFloat(sale.totalAmount);
      
      // Agrupar por vendedor
      const seller = sale.salesperson;
      if (!summary.salesBySalesperson[seller]) {
        summary.salesBySalesperson[seller] = {
          sales: 0,
          amount: 0
        };
      }
      summary.salesBySalesperson[seller].sales += 1;
      summary.salesBySalesperson[seller].amount += parseFloat(sale.totalAmount);
    });
    
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
