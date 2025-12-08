import { ProductTable } from '@/components/products/ProductTable';

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
    <div className="container mx-auto h-full w-full pt-10 pb-10">
      <ProductTable data={products} />
    </div>
  );
}