import { ProductForm } from './ProductForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Product {
    id: string;
    codigo: string; 
    nome: string;
    descricao: string;
    preco: number;
    estoque: number; 
    categoria: string;
    data_validade: string;
}

async function getProductById(id: string): Promise<Product | null> {
    const productId = parseInt(id, 10);
    
    if (isNaN(productId) || productId <= 0) {
      return null;
    }
    
    const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
    
    try {
      const res = await fetch(`${API_URL_BASE}/${productId}/`, { 
        cache: 'no-store'
      });
  
      if (!res.ok) {
        return null;
      }
  
      return res.json();
    } catch (error) {
      return null;
    }
}

export async function ProductEditContent({ productIdString }: { productIdString: string }) {
    
    const product = await getProductById(productIdString); 

    if (!product) {
        return (
             <Card className="border-red-500">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-red-600">Erro: Produto não encontrado</CardTitle>
                    <CardDescription className="text-gray-600">O produto ID <strong>{productIdString}</strong> não existe ou a API não está acessível.</CardDescription>
                </CardHeader>
            </Card>
        );
    }
    
    return <ProductForm initialData={product} />;
}