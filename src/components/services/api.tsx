// ALTERE conforme os endpoints do seu amigo
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; // URL do Django

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  category: string;
  description?: string;
}

export const servicesApi = {
  // GET todos os serviços
  getAll: async (): Promise<Service[]> => {
    const response = await fetch(`${API_BASE}/services/`);
    if (!response.ok) throw new Error('Erro ao buscar serviços');
    return response.json();
  },

  // GET um serviço
  getById: async (id: number): Promise<Service> => {
    const response = await fetch(`${API_BASE}/services/${id}/`);
    return response.json();
  },

  // POST criar serviço
  create: async (data: any): Promise<Service> => {
  console.log('Enviando para API:', data);
  
  const response = await fetch(`${API_BASE}/services/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  console.log('Resposta status:', response.status);
  const text = await response.text();
  console.log('Resposta texto:', text);
  
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${text}`);
  }
  
  return JSON.parse(text);
},

  // PUT atualizar serviço
  update: async (id: number, data: Partial<Service>): Promise<Service> => {
    const response = await fetch(`${API_BASE}/services/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar serviço');
    return response.json();
  },

  // DELETE serviço
  delete: async (id: number): Promise<boolean> => {
    const response = await fetch(`${API_BASE}/services/${id}/`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};