
import { ProductForm } from '@/components/products/ProductForm';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface EditProductPageProps {
  params: {
    id: string; 
  };
}

async function getProductById(id: string): Promise<Product | null> {
  const API_URL_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; 
  
  try {
    const res = await fetch(`${API_URL_BASE}/products/${id}`, {
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      console.warn(`Produto com ID ${id} não encontrado.`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Erro na busca do produto:", error);
    return null;
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Produto Não Encontrado</h1>
        <p>Não foi possível carregar o produto com ID: {params.id}. Verifique a URL e a conexão com a API.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Editar Produto: {product.name}</h1>
      
      <ProductForm initialData={product} /> 
    </div>
  );
}