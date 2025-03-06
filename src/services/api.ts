// Configuração base da API
const API_BASE_URL = 'http://localhost:3001/api';

// Função auxiliar para fazer requisições
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

// Serviços específicos
export const financialService = {
  getAll: () => fetchApi('/financial'),
  getById: (id: number) => fetchApi(`/financial/${id}`),
  getSummary: () => fetchApi('/financial/summary'),
  create: (data: any) => fetchApi('/financial', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: any) => fetchApi(`/financial/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchApi(`/financial/${id}`, {
    method: 'DELETE',
  }),
};

export const salesService = {
  getAll: () => fetchApi('/sales'),
  getById: (id: number) => fetchApi(`/sales/${id}`),
  getSummary: () => fetchApi('/sales/summary'),
  create: (data: any) => fetchApi('/sales', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: any) => fetchApi(`/sales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchApi(`/sales/${id}`, {
    method: 'DELETE',
  }),
};

export const expensesService = {
  getAll: () => fetchApi('/expenses'),
  getById: (id: number) => fetchApi(`/expenses/${id}`),
  getByCategory: () => fetchApi('/expenses/category'),
  create: (data: any) => fetchApi('/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: number, data: any) => fetchApi(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: number) => fetchApi(`/expenses/${id}`, {
    method: 'DELETE',
  }),
};
