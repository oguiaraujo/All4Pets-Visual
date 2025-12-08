"use client";

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from  "@/hooks/use-toast"


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

interface ProductFormProps {
  initialData?: Product; 
}


const formSchema = z.object({
  codigo: z.string().min(1, 'O código é obrigatório.'), 
  nome: z.string().min(3, 'O nome é obrigatório e deve ter no mínimo 3 caracteres.'),
  descricao: z.string().min(5, 'A descrição é obrigatória.'),
  preco: z.coerce.number().positive('O preço deve ser um valor positivo.'),
  estoque: z.coerce.number().int('O estoque deve ser um número inteiro.').min(0, 'Estoque não pode ser negativo.'),
  categoria: z.string().min(1, 'A categoria é obrigatória.'),
  data_validade: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido. Use AAAA-MM-DD.'),
});

type ProductFormValues = z.infer<typeof formSchema>;

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

  const defaultValues: ProductFormValues = initialData
    ? {
        codigo: initialData.codigo ?? '', 
        nome: initialData.nome ?? '',
        descricao: initialData.descricao ?? '',
        categoria: initialData.categoria ?? '',
        data_validade: initialData.data_validade ?? new Date().toISOString().split('T')[0],
        preco: Number(initialData.preco ?? 0),
        estoque: Number(initialData.estoque ?? 0), 
      }
    : {
        codigo: '', 
        nome: '',
        descricao: '',
        preco: 0,
        estoque: 0, 
        categoria: '',
        data_validade: new Date().toISOString().split('T')[0],
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormValues) => {
    const isEditing = !!initialData;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `${API_URL_BASE}/${initialData.id}/` : `${API_URL_BASE}/`; 
    
    
    const payload = {
        ...values,
        preco: String(values.preco),
        estoque: String(values.estoque), 
    };
    

    if (!isEditing) {
    }

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
            const errorMessage = JSON.stringify(errorData); 
            throw new Error(`Erro de validação: ${errorMessage}`);
        }
        throw new Error(`Falha ao ${isEditing ? 'editar' : 'cadastrar'} produto: ${res.status} ${res.statusText}`);
      }

      const action = isEditing ? 'editado' : 'cadastrado';
      toast({
        title: 'Sucesso',
        description: `Produto ${action} com sucesso!`,
      });

      router.push('/products');
      router.refresh();

    } catch (error) {
      console.error(error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder="A001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Ração para Cachorros" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Alimento, Medicamento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estoque"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_validade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Validade (AAAA-MM-DD)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} /> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Detalhes do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting 
            ? 'Salvando...' 
            : initialData ? 'Salvar Edição' : 'Cadastrar Produto'}
        </Button>
      </form>
    </Form>
  );
}