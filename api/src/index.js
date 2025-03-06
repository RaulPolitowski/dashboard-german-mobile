const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database');
require('dotenv').config();

// Inicializa o Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Sequelize
// Use 'aws' para conectar ao banco de dados na AWS, ou 'development' para local
const env = process.env.DB_ENV || process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(
  dbConfig[env].database,
  dbConfig[env].username,
  dbConfig[env].password,
  {
    host: dbConfig[env].host,
    dialect: dbConfig[env].dialect,
    port: dbConfig[env].port,
    logging: dbConfig[env].logging,
    dialectOptions: dbConfig[env].dialectOptions
  }
);

// Importa os modelos
const Financial = require('./models/financial.model');
const Expense = require('./models/expense.model');
const Sale = require('./models/sale.model');

// Inicializa os modelos com o Sequelize
Financial.init(sequelize);
Expense.init(sequelize);
Sale.init(sequelize);

// Teste de conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincroniza os modelos com o banco de dados (cria as tabelas se não existirem)
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

// Importa as rotas
const financialRoutes = require('./routes/financial.routes');
const salesRoutes = require('./routes/sales.routes');
const expensesRoutes = require('./routes/expenses.routes');

// Define as rotas
app.use('/api/financial', financialRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/expenses', expensesRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do Dashboard Financeiro' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, sequelize };
