const Expense = require('../models/expense.model');

// Obter todas as despesas
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter uma despesa por ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar uma nova despesa
exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar uma despesa
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }
    await expense.update(req.body);
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Excluir uma despesa
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Despesa não encontrada' });
    }
    await expense.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter despesas por categoria
exports.getExpensesByCategory = async (req, res) => {
  try {
    const { category, month, year } = req.query;
    
    let whereClause = {};
    if (category) whereClause.category = category;
    if (month) whereClause.month = month;
    if (year) whereClause.year = parseInt(year);
    
    const expenses = await Expense.findAll({ where: whereClause });
    
    // Agrupar por categoria
    const categorySummary = {};
    
    expenses.forEach(expense => {
      const cat = expense.category;
      if (!categorySummary[cat]) {
        categorySummary[cat] = {
          total: 0,
          items: []
        };
      }
      
      categorySummary[cat].total += parseFloat(expense.amount);
      categorySummary[cat].items.push(expense);
    });
    
    res.status(200).json(categorySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
