import { ProductTable } from '@/components/products/ProductTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string; 
  nome: string;     
  descricao: string; 
  preco: number;
  categoria: string;  
  data_validade: string;
  estoque: number;
}

async function getProducts(): Promise<Product[]> {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      throw new Error(`Falha ao buscar dados: ${res.status}`);
    }

    return res.json(); 
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return []; 
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

 return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Listagem de Produtos</h1>
        
        <Link href="/products/create" passHref>
          <Button>Novo Produto</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado. Comece a cadastrar!</p>
      ) : (
        <ProductTable data={products} />
      )}
    </div>
  );
}