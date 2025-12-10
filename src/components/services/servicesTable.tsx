'use client';

import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ServiceFormModal } from './serviceFormModal';

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  category: string;
  description?: string;
}

const initialServices: Service[] = [
  { id: 1, name: 'Banho Completo', price: 60.00, duration: 60, category: 'Banho', description: 'Banho completo com shampoo especial' },
  { id: 2, name: 'Tosa Higiênica', price: 45.00, duration: 45, category: 'Tosa', description: 'Tosa na região íntima e patas' },
  { id: 3, name: 'Consulta Veterinária', price: 120.00, duration: 30, category: 'Consulta', description: 'Consulta com veterinário' },
  { id: 4, name: 'Banho e Tosa', price: 90.00, duration: 90, category: 'Banho', description: 'Pacote completo' },
  { id: 5, name: 'Vacinação', price: 80.00, duration: 20, category: 'Consulta', description: 'Aplicação de vacinas' },
];

export function ServicesTable() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
                         (service.description?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleSave = (serviceData: Service) => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === serviceData.id ? serviceData : service
      ));
    } else {
      setServices([...services, { ...serviceData, id: Date.now() }]);
    }
  };

  const categories = ['Todas', ...new Set(services.map(s => s.category))];

  return (
    <div className="p-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Listagem de Serviços</CardTitle>
              <CardDescription>
                Visualize, edite ou exclua serviços na tabela abaixo.
              </CardDescription>
            </div>
            
            <Button onClick={handleAdd} className="default">
              <Plus className="h-4 w-4 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar por nome ou descrição..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>NOME</TableHead>
                  <TableHead className="w-32">CATEGORIA</TableHead>
                  <TableHead className="w-24">DURAÇÃO</TableHead>
                  <TableHead className="w-32">PREÇO</TableHead>
                  <TableHead className="w-24 text-right">AÇÕES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{service.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{service.name}</div>
                          {service.description && (
                            <div className="text-xs text-gray-500 truncate max-w-xs">
                              {service.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.category === 'Banho' ? 'bg-blue-100 text-blue-800' :
                          service.category === 'Tosa' ? 'bg-purple-100 text-purple-800' :
                          service.category === 'Consulta' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {service.category}
                        </span>
                      </TableCell>
                      <TableCell>{service.duration} min</TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          R$ {service.price.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(service)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(service.id)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum serviço encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-2 sm:mb-0">
              Mostrando {filteredServices.length} de {services.length} serviços
            </div>
          </div>
        </CardContent>
      </Card>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        service={editingService}
        onSave={handleSave}
      />
    </div>
  );
}