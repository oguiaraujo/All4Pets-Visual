"use client"; 

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash, Search, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { useToast } from '@/hooks/use-toast'; 
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'; 

interface Product {
  id: string;
  codigo: string; 
  nome: string; 
  descricao: string;
  preco: number;
  categoria: string; 
  data_validade: string;
  estoque: number;
}

interface ProductTableProps {
  data: Product[];
}

export function ProductTable({ data }: ProductTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const API_URL_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;
  
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  const handleEdit = (id: string) => {
    router.push(`/products/${id}`); 
  };
  
  const handleNewProduct = () => {
    router.push('/products/new');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja desativar este produto? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const res = await fetch(`${API_URL_BASE}/${id}/`, { 
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Falha ao desativar produto: ${res.statusText}`);
      }

      toast({
        title: 'Sucesso',
        description: 'Produto desativado com sucesso!',
      });
      router.refresh(); 

    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao desativar o produto.',
        variant: 'destructive',
      });
    }
  };
  
  const filteredData = data.filter(product => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    const matchesName = product.nome.toLowerCase().includes(lowerCaseSearch);
    const matchesCode = product.codigo.toLowerCase().includes(lowerCaseSearch);
    
    return matchesName || matchesCode;
  });

  const isInitialEmptyState = data.length === 0;
  
  const welcomeMessage = isInitialEmptyState
    ? "Ainda não há produtos cadastrados. Clique no botão 'Novo Produto' para começar."
    : "Visualize, edite ou exclua seus produtos na tabela abaixo.";


  return (
    <Card className="w-full h-full"> 
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          
          <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                  Listagem de Produtos
              </CardTitle>
              <CardDescription>{welcomeMessage}</CardDescription>
          </div>
          
          <Button onClick={handleNewProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
          </Button>

      </CardHeader>
      
      <CardContent className="space-y-4">
        
        {isInitialEmptyState ? (
          <div className="flex items-center justify-center w-full min-h-[400px]">
            <p className="text-gray-500">{welcomeMessage}</p>
          </div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> 
              <Input 
                placeholder="Pesquisar por nome ou código..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="rounded-md border max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead className="w-[100px]">CÓDIGO</TableHead>
                    <TableHead>NOME</TableHead>
                    <TableHead>CATEGORIA</TableHead>
                    <TableHead>VALIDADE</TableHead>
                    <TableHead>ESTOQUE</TableHead>
                    <TableHead className="text-right">PREÇO</TableHead>
                    <TableHead className="w-[80px]"></TableHead> 
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                      <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
                          <TableCell>{product.codigo}</TableCell>
                          <TableCell>{product.nome}</TableCell>
                          <TableCell>{product.categoria}</TableCell>
                          <TableCell>{product.data_validade}</TableCell>
                          <TableCell>{product.estoque}</TableCell>
                          <TableCell className="text-right">
                              {formatCurrency(product.preco)}
                          </TableCell>
                          <TableCell>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Abrir menu</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                          <Pencil className="mr-2 h-4 w-4" />
                                          Editar
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                                          <Trash className="mr-2 h-4 w-4" />
                                          Excluir
                                      </DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          </TableCell>
                      </TableRow>
                    ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                              Nenhum produto encontrado com o termo de pesquisa: <strong>{searchTerm}</strong>.
                          </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}