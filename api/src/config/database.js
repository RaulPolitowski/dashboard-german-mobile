// Configuração da conexão com o PostgreSQL
module.exports = {
  development: {
    username: "postgres", // Seu usuário PostgreSQL local
    password: "sua_senha_local", // Substitua pela sua senha PostgreSQL local
    database: "dashboard_db", // Nome do banco de dados local
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    logging: true // Habilitado para depuração
  },
  aws: {
    username: "postgres", // Substitua pelo seu usuário AWS
    password: "sua_senha_aws", // Substitua pela sua senha AWS
    database: "dashboard_db", // Substitua pelo nome do seu banco de dados AWS
    host: "seu-endpoint-rds.amazonaws.com", // Substitua pelo endpoint do seu RDS
    dialect: "postgres",
    port: 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
