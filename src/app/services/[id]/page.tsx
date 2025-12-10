export default function ServiceDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1>Detalhes do Serviço {params.id}</h1>
      <p>Página dinâmica funcionando!</p>
    </div>
  );
}