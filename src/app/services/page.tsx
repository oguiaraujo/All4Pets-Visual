import { ServicesTable } from '@/components/services/servicesTable';

export const revalidate = 3600;

export default function ServicesPage() {
  return <ServicesTable />;
}