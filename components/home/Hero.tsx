import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-white lg:min-h-screen flex flex-col lg:flex-row border-b border-black/5">
      {/* Contenido Izquierda */}
      <div className="flex w-full flex-col justify-center px-6 py-20 lg:w-1/2 lg:px-20 xl:px-32">
        <div className="max-w-xl">
          <span className="mb-6 inline-block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Estudio de Arquitectura
          </span>

          <h1 className="mb-8 text-5xl font-black uppercase leading-[1.05] tracking-tighter text-black sm:text-7xl lg:text-8xl">
            Proyectamos <br /> tu visión.
          </h1>

          <p className="mb-12 text-base font-medium leading-relaxed text-zinc-500 sm:text-lg">
            Especialistas en arquitectura residencial y comercial con un enfoque minimalista, funcional y de alta calidad constructiva. Diseñamos, dirigimos y construimos cada detalle de tu obra.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center bg-black px-10 py-5 text-xs font-black uppercase tracking-[0.25em] text-white transition hover:bg-zinc-800"
            >
              Ver Proyectos
            </Link>

            <Link
              href="/contacto"
              className="inline-flex items-center justify-center border-2 border-black/10 bg-transparent px-10 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:bg-black/5"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen Derecha */}
      <div className="relative h-[60vh] w-full lg:h-auto lg:w-1/2 overflow-hidden bg-zinc-100">
        <Image
          src="/hero_generic.jpg"
          alt="Proyecto Arquitectónico Francisco Silva"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </section>
  );
}
