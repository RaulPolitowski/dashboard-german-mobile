const Financial = require('../models/financial.model');

// Obter todos os registros financeiros
exports.getAllFinancials = async (req, res) => {
  try {
    const financials = await Financial.findAll();
    res.status(200).json(financials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter um registro financeiro por ID
exports.getFinancialById = async (req, res) => {
  try {
    const financial = await Financial.findByPk(req.params.id);
    if (!financial) {
      return res.status(404).json({ message: 'Registro financeiro não encontrado' });
    }
    res.status(200).json(financial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar um novo registro financeiro
exports.createFinancial = async (req, res) => {
  try {
    const financial = await Financial.create(req.body);
    res.status(201).json(financial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar um registro financeiro
exports.updateFinancial = async (req, res) => {
  try {
    const financial = await Financial.findByPk(req.params.id);
    if (!financial) {
      return res.status(404).json({ message: 'Registro financeiro não encontrado' });
    }
    await financial.update(req.body);
    res.status(200).json(financial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir um registro financeiro
exports.deleteFinancial = async (req, res) => {
  try {
    const financial = await Financial.findByPk(req.params.id);
    if (!financial) {
      return res.status(404).json({ message: 'Registro financeiro não encontrado' });
    }
    await financial.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter resumo financeiro por período
exports.getFinancialSummary = async (req, res) => {
  try {
    const { month, year } = req.query;
    
    let whereClause = {};
    if (month) whereClause.month = month;
    if (year) whereClause.year = parseInt(year);
    
    const financials = await Financial.findAll({ where: whereClause });
    
    // Calcular totais
    const summary = {
      totalInflow: 0,
      totalOutflow: 0,
      totalResult: 0,
      data: financials
    };
    
    financials.forEach(item => {
      summary.totalInflow += parseFloat(item.inflow);
      summary.totalOutflow += parseFloat(item.outflow);
      summary.totalResult += parseFloat(item.result);
    });
    
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
