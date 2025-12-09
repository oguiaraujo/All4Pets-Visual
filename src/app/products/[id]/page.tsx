import { ProductEditContent } from '@/components/products/ProductEditContent'; 

export async function generateStaticParams() {
  const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
  
  const productsResponse = await fetch(API_URL_BASE, { cache: 'force-cache' }); 
  
  if (!productsResponse.ok) {
    return []; 
  }
  
  const products = await productsResponse.json();
  
  return products.map((product: { id: string }) => ({
    id: product.id.toString(),
  }));
}


interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage(props: EditProductPageProps) {
  
  const resolvedParams = await props.params; 
  const productIdString = resolvedParams.id; 
    
  return (
    <div className="container mx-auto py-10">
      <ProductEditContent productIdString={productIdString} /> 
    </div>
  );
}