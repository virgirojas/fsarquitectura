import Image from "next/image";
import Link from "next/link";

export type ProyectoInfo = {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
}

type ProyectoCardProps = {
  proyecto: ProyectoInfo;
};

export default function ProyectoCard({ proyecto }: ProyectoCardProps) {
  return (
    <article className="group overflow-hidden rounded-none bg-white shadow-sm transition-all duration-300 hover:shadow-xl flex flex-col h-full border border-zinc-100">
      <div className="relative h-80 overflow-hidden bg-zinc-100">
        <Image
          src={proyecto.image}
          alt={proyecto.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <span className="absolute left-6 top-6 bg-black px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md">
          {proyecto.category}
        </span>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">
            {proyecto.name}
          </h3>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-zinc-500 mb-8 flex-grow line-clamp-3">
          {proyecto.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-8">
          <div className="flex flex-col border-l-2 border-black pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Ubicación</p>
            <p className="mt-1 text-base font-bold text-black">
              {proyecto.location}
            </p>
          </div>

          <div className="flex flex-col border-l-2 border-black pl-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Año</p>
            <p className="mt-1 text-base font-bold text-black">
              {proyecto.year}
            </p>
          </div>
        </div>

        <Link href={`/proyectos/${proyecto.id}`} className="mt-auto flex w-full items-center justify-center bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-zinc-800">
          Ver Proyecto
        </Link>
      </div>
    </article>
  );
}
