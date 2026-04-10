import ProyectoForm from "@/components/admin/ProyectoForm";
import connectMongo from "@/lib/mongodb";
import Proyecto from "@/models/Proyecto";
import { notFound } from "next/navigation";

export default async function EditProyectoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectMongo();
  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    notFound();
  }

  // Convert Mongoose doc to lean object for the client component
  const initialData = {
    name: proyecto.name,
    category: proyecto.category,
    location: proyecto.location,
    year: proyecto.year,
    description: proyecto.description,
    image: proyecto.image,
    planImage: proyecto.planImage,
    squareMeters: proyecto.squareMeters,
    features: proyecto.features,
    isFeatured: proyecto.isFeatured,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black uppercase tracking-widest text-black">Editar Proyecto</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          Actualiza los datos del proyecto seleccionado.
        </p>
      </div>
      <ProyectoForm initialData={initialData} pkgId={proyecto._id.toString()} />
    </div>
  );
}
