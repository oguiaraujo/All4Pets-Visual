'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ServiceFormModal } from './serviceFormModal';
import { servicesApi, Service } from '@/components/services/api'; // ← Importar da API

export function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  // Carregar serviços da API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesApi.getAll();
      setServices(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        await servicesApi.delete(id);
        setServices(services.filter(service => service.id !== id));
      } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        alert('Erro ao excluir serviço');
      }
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleSave = async (serviceData: Service) => {
    try {
      if (editingService) {
        // Atualizar
        const updated = await servicesApi.update(serviceData.id, serviceData);
        setServices(services.map(s => s.id === serviceData.id ? updated : s));
      } else {
        // Criar
        const newService = await servicesApi.create(serviceData);
        setServices([...services, newService]);
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço');
    }
  };

  // Filtros (mantém local)
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
                         (service.description?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todas', ...new Set(services.map(s => s.category))];

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-center">Carregando serviços...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            
            <Button onClick={handleAdd} variant="default">
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


          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>NOME</TableHead>
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
                      {services.length === 0 ? 'Nenhum serviço cadastrado' : 'Nenhum serviço encontrado'}
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