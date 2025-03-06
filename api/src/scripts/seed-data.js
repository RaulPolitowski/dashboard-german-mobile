const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

// Modelos
const Financial = require('../models/financial.model');
const Expense = require('../models/expense.model');
const Sale = require('../models/sale.model');

// Usar configuração AWS
const env = 'aws'; // Altere para 'development' se quiser testar localmente
const sequelize = new Sequelize(
  dbConfig[env].database,
  dbConfig[env].username,
  dbConfig[env].password,
  {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    port: dbConfig[env].port,
    logging: console.log,
    dialectOptions: dbConfig[env].dialectOptions
  }
);

// Dados de exemplo - Financeiro
const financialData = [
  {
    date: new Date('2025-01-15'),
    inflow: 15000.00,
    outflow: 8500.00,
    result: 6500.00,
    month: 'Janeiro',
    year: 2025
  },
  {
    date: new Date('2025-02-15'),
    inflow: 18000.00,
    outflow: 9200.00,
    result: 8800.00,
    month: 'Fevereiro',
    year: 2025
  },
  {
    date: new Date('2025-03-15'),
    inflow: 17500.00,
    outflow: 9800.00,
    result: 7700.00,
    month: 'Março',
    year: 2025
  }
];

// Dados de exemplo - Despesas
const expenseData = [
  {
    date: new Date('2025-03-01'),
    category: 'Aluguel',
    description: 'Aluguel do escritório',
    amount: 3500.00,
    paymentMethod: 'Transferência',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-05'),
    category: 'Serviços',
    description: 'Internet e telefone',
    amount: 450.00,
    paymentMethod: 'Cartão de Crédito',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-10'),
    category: 'Salários',
    description: 'Pagamento de funcionários',
    amount: 4500.00,
    paymentMethod: 'Transferência',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-15'),
    category: 'Marketing',
    description: 'Campanha publicitária',
    amount: 1200.00,
    paymentMethod: 'Cartão de Crédito',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-20'),
    category: 'Suprimentos',
    description: 'Material de escritório',
    amount: 350.00,
    paymentMethod: 'Dinheiro',
    month: 'Março',
    year: 2025
  }
];

// Dados de exemplo - Vendas
const salesData = [
  {
    date: new Date('2025-03-02'),
    product: 'Produto A',
    quantity: 5,
    unitPrice: 1200.00,
    totalAmount: 6000.00,
    customer: 'Cliente 1',
    salesperson: 'Vendedor 1',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-05'),
    product: 'Produto B',
    quantity: 3,
    unitPrice: 800.00,
    totalAmount: 2400.00,
    customer: 'Cliente 2',
    salesperson: 'Vendedor 2',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-10'),
    product: 'Produto C',
    quantity: 2,
    unitPrice: 1500.00,
    totalAmount: 3000.00,
    customer: 'Cliente 3',
    salesperson: 'Vendedor 1',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-15'),
    product: 'Produto A',
    quantity: 4,
    unitPrice: 1200.00,
    totalAmount: 4800.00,
    customer: 'Cliente 4',
    salesperson: 'Vendedor 3',
    month: 'Março',
    year: 2025
  },
  {
    date: new Date('2025-03-20'),
    product: 'Produto D',
    quantity: 1,
    unitPrice: 3000.00,
    totalAmount: 3000.00,
    customer: 'Cliente 5',
    salesperson: 'Vendedor 2',
    month: 'Março',
    year: 2025
  }
];

// Função para popular o banco de dados
async function seedDatabase() {
  try {
    // Testar conexão
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronizar modelos com o banco de dados
    console.log('Sincronizando modelos...');
    await Financial.sync({ alter: true });
    await Expense.sync({ alter: true });
    await Sale.sync({ alter: true });

    // Inserir dados financeiros
    console.log('Inserindo dados financeiros...');
    for (const data of financialData) {
      await Financial.create(data);
    }

    // Inserir despesas
    console.log('Inserindo despesas...');
    for (const data of expenseData) {
      await Expense.create(data);
    }

    // Inserir vendas
    console.log('Inserindo vendas...');
    for (const data of salesData) {
      await Sale.create(data);
    }

    console.log('Dados inseridos com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    process.exit(1);
  }
}

// Executar a função
seedDatabase();
