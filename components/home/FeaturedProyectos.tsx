import connectMongo from "@/lib/mongodb";
import Proyecto from "@/models/Proyecto";
import Link from "next/link";
import ProyectoCard from "./ProyectoCard";

export default async function FeaturedProyectos() {
  await connectMongo();
  const featured = await Proyecto.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(3);

  return (
    <section
      id="destacados"
      className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Portfolio
          </span>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Proyectos Destacados
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-600">
            Una selección de nuestras obras más emblemáticas en arquitectura residencial y comercial.
          </p>
        </div>

        <Link href="/proyectos" className="inline-flex items-center gap-2 border-b-2 border-black pb-1 text-sm font-bold uppercase tracking-widest text-black transition hover:text-zinc-600 hover:border-zinc-400">
          Ver todos los trabajos
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((proyecto) => (
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
    </section>
  );
}
