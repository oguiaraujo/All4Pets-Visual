
import { ProductForm } from '@/components/products/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Produto</h1>
      <ProductForm /> 
    </div>
  );
}