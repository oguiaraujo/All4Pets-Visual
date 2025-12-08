import { ProductForm } from '@/components/products/ProductForm';

export const dynamic = 'force-dynamic';

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

interface EditProductPageProps {
  params: {
    id: string;
  };
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
      console.error(`Erro API Django: ${res.status} ${res.statusText}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Erro de conexão:", error);
    return null;
  }
}


export default async function EditProductPage(props: EditProductPageProps) {
  
  const resolvedParams = await props.params; 
  const productIdString = resolvedParams.id; 
    
  const product = await getProductById(productIdString);

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erro: Produto não encontrado</h1>
        <p className="text-gray-600">
            Não foi possível carregar o produto ID: 
            <strong>{productIdString || 'ID indefinido/inválido'}</strong>.
            <br />
            Verifique se o Django está rodando, se o ID existe na base de dados, e se a rota Next.js está correta (app/products/[id]/page.tsx).
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      
      <ProductForm initialData={product} /> 
    </div>
  );
}