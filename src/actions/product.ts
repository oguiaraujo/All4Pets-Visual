"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

interface ProductFormValues {
    codigo: string; 
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: string;
    data_validade: string;
}

export async function saveProductAction(formData: ProductFormValues & { id?: string }) {
    const isEditing = !!formData.id;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL_BASE}/${formData.id}/` : `${API_URL_BASE}/`; 
    
    const payload = {
        ...formData,
        preco: String(formData.preco),
        estoque: String(formData.estoque),
    };

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            if (res.status === 400) {
                const errorData = await res.json();
                throw new Error(`Erro de validação: ${JSON.stringify(errorData)}`);
            }
            throw new Error(`Falha ao ${isEditing ? 'editar' : 'cadastrar'} produto: ${res.status} ${res.statusText}`);
        }

    } catch (error) {
        throw error;
    }

    revalidatePath('/products');
    if (isEditing) {
      revalidatePath(`/products/${formData.id}`);
    }

    redirect('/products');
}

export async function deleteProductAction(id: string) {
    const url = `${API_URL_BASE}/${id}/`;

    try {
        const res = await fetch(url, { 
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            throw new Error(`Falha ao desativar produto: ${res.status} ${res.statusText}`);
        }
        
    } catch (error) {
        throw error;
    }

    revalidatePath('/products');
}