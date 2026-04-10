import ProyectoForm from "@/components/admin/ProyectoForm";

export default function NewProyectoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black uppercase tracking-widest text-black">Crear Nuevo Proyecto</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Completa los detalles para agregar una nueva obra o proyecto al portfolio.
        </p>
      </div>
      <ProyectoForm />
    </div>
  );
}
