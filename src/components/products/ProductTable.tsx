"use client"; 

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
import { MoreHorizontal, Pencil, Trash } from 'lucide-react'; 
import { useRouter } from 'next/navigation'; 

interface Product {
  id: string;
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

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  const handleEdit = (id: string) => {
    router.push(`/products/${id}`); 
  };

  const handleDelete = (id: string) => {
    alert(`Preparando para excluir produto: ${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead> 
            <TableHead>Data de Validade</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="w-[80px]"></TableHead> 
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}