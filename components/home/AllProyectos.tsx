import connectMongo from "@/lib/mongodb";
import Proyecto from "@/models/Proyecto";
import ProyectoCard from "./ProyectoCard";

export default async function AllProyectos({ searchParamsParsed }: { searchParamsParsed?: { q: string, category: string } }) {
  await connectMongo();
  
  const mongooseFilters: Record<string, unknown>[] = [];
  
  if (searchParamsParsed?.q) {
    mongooseFilters.push({
      $or: [
        { name: { $regex: searchParamsParsed.q, $options: 'i' } },
        { category: { $regex: searchParamsParsed.q, $options: 'i' } },
        { location: { $regex: searchParamsParsed.q, $options: 'i' } }
      ]
    });
  }

  if (searchParamsParsed?.category) {
    mongooseFilters.push({
      category: { $regex: searchParamsParsed.category, $options: 'i' }
    });
  }

  const filter = mongooseFilters.length > 0 ? { $and: mongooseFilters } : {};

  const allProyectos = await Proyecto.find(filter).sort({ createdAt: -1 });

  return (
    <div
      id="proyectos"
      className="relative bg-white pb-20 pt-16 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 border-l-4 border-black pl-8">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">
            Portfolio
          </span>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-black sm:text-5xl">
            Todos los Proyectos
          </h2>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg font-medium">
            {searchParamsParsed && (searchParamsParsed.q || searchParamsParsed.category)
              ? `Resultados de búsqueda:` 
              : "Explora nuestra trayectoria a través de obras que combinan diseño, técnica y funcionalidad."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {allProyectos.map((proyecto) => (
            <ProyectoCard
              key={proyecto._id.toString()}
              proyecto={{
                id: proyecto._id.toString(),
                name: proyecto.name,
                category: proyecto.category,
                location: proyecto.location,
                year: proyecto.year,
                image: proyecto.image,
                description: proyecto.description
              }}
            />
          ))}
        </div>

        {allProyectos.length === 0 && (
          <div className="text-center py-32 px-4 border border-zinc-100 bg-zinc-50">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-none bg-black mb-4 text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest text-black">No se encontraron resultados</h3>
            <p className="mt-1 text-zinc-500 font-medium">Intenta con otros términos o categorías.</p>
          </div>
        )}
      </div>
    </div>
  );
}
