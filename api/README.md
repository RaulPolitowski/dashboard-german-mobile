# API do Dashboard Financeiro

Esta API foi desenvolvida para integrar o Dashboard Financeiro com um banco de dados PostgreSQL, permitindo o gerenciamento eficiente de dados financeiros, despesas e vendas.

## Estrutura do Projeto

```
api/
├── src/
│   ├── config/        # Configurações do banco de dados
│   ├── controllers/   # Controladores para cada entidade
│   ├── models/        # Modelos Sequelize
│   ├── routes/        # Rotas da API
│   └── index.js       # Arquivo principal da aplicação
├── .env.example       # Exemplo de variáveis de ambiente
├── package.json       # Dependências do projeto
└── README.md          # Este arquivo
```

## Requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

## Configuração

1. **Instalar dependências**

```bash
cd api
npm install
```

2. **Configurar variáveis de ambiente**

Copie o arquivo `.env.example` para `.env` e ajuste as configurações conforme necessário:

```bash
cp .env.example .env
```

3. **Criar o banco de dados**

Crie um banco de dados PostgreSQL com o nome especificado no arquivo `.env` (por padrão, `dashboard_db`).

## Executando a API

### Modo de desenvolvimento

```bash
npm run dev
```

### Modo de produção

```bash
npm start
```

## Endpoints da API

### Financeiro

- `GET /api/financial` - Obter todos os registros financeiros
- `GET /api/financial/:id` - Obter um registro financeiro específico
- `GET /api/financial/summary` - Obter resumo financeiro (suporta filtros por mês/ano)
- `POST /api/financial` - Criar um novo registro financeiro
- `PUT /api/financial/:id` - Atualizar um registro financeiro
- `DELETE /api/financial/:id` - Excluir um registro financeiro

### Despesas

- `GET /api/expenses` - Obter todas as despesas
- `GET /api/expenses/:id` - Obter uma despesa específica
- `GET /api/expenses/category` - Obter despesas agrupadas por categoria
- `POST /api/expenses` - Criar uma nova despesa
- `PUT /api/expenses/:id` - Atualizar uma despesa
- `DELETE /api/expenses/:id` - Excluir uma despesa

### Vendas

- `GET /api/sales` - Obter todas as vendas
- `GET /api/sales/:id` - Obter uma venda específica
- `GET /api/sales/summary` - Obter resumo de vendas (suporta filtros por mês/ano/vendedor)
- `POST /api/sales` - Criar uma nova venda
- `PUT /api/sales/:id` - Atualizar uma venda
- `DELETE /api/sales/:id` - Excluir uma venda

## Integração com o Frontend

Para integrar esta API com o frontend do Dashboard, você precisa configurar as chamadas de API no frontend para apontar para os endpoints corretos. Por exemplo:

```javascript
// Exemplo de chamada para obter dados financeiros
const fetchFinancialData = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/financial');
    const data = await response.json();
    // Processar os dados...
  } catch (error) {
    console.error('Erro ao buscar dados financeiros:', error);
  }
};
```

## Segurança

Esta implementação inclui configuração básica de CORS para permitir a comunicação entre o frontend e a API. Para ambientes de produção, considere implementar:

- Autenticação JWT
- Rate limiting
- HTTPS
- Validação de entrada mais rigorosa

## Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
