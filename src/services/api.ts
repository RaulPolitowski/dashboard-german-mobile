// Configuração base da API
const API_BASE_URL = 'http://localhost:9006';

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

// Serviço financeiro
export const financialService = {
  getAll: () => fetchApi('/dados'),
};

// Mantendo os outros serviços como fallback
export const salesService = {
  getAll: () => Promise.resolve([]),
};

export const expensesService = {
  getAll: () => Promise.resolve([]),
};
