import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProjectGallery from '@/components/projects/ProjectGallery';
import connectMongo from '@/lib/mongodb';
import Proyecto from '@/models/Proyecto';

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  await connectMongo();
  let proyecto;
  try {
    proyecto = await Proyecto.findById(params.id);
  } catch {
    return { title: "Proyecto no encontrado | Francisco Silva Arquitectura" };
  }
  if (!proyecto) return { title: "Proyecto no encontrado | Francisco Silva Arquitectura" };
  
  return {
    title: `${proyecto.name} | Francisco Silva Arquitectura`,
    description: proyecto.description,
  };
}

export default async function ProyectoDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await connectMongo();

  let proyecto;
  try {
    proyecto = await Proyecto.findById(params.id);
  } catch {
    notFound();
  }

  if (!proyecto) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <div className="bg-white border-b border-black/5">
        <Header />
      </div>

      <main className="flex-grow">
        <section className="relative h-[50vh] sm:h-[60vh] flex items-end pb-12">
          <Image
            src={proyecto.image}
            alt={proyecto.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 w-full sm:px-6 lg:px-8">
            <span className="mb-4 inline-block bg-white text-black px-4 py-1 text-xs font-bold uppercase tracking-[0.2em]">
              {proyecto.category}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              {proyecto.name}
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24">
            {/* Columna Principal - Memoria Descriptiva */}
            <div className="xl:col-span-8 min-w-0">
              <div className="space-y-16">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-6">Memoria Descriptiva</h2>
                  <div className="space-y-10">
                    <p className="text-xl sm:text-2xl lg:text-3xl lg:leading-tight text-black font-medium break-words">
                      {proyecto.description}
                    </p>

                    {proyecto.features && (
                      <div 
                        className="prose prose-zinc max-w-none w-full text-zinc-600 prose-p:leading-8 prose-img:rounded-none prose-headings:uppercase prose-headings:tracking-widest break-words"
                        dangerouslySetInnerHTML={{ __html: proyecto.features }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Lateral - Detalles Técnicos */}
            <div className="xl:col-span-4">
              <div className="xl:sticky xl:top-32 space-y-12">
                <div className="space-y-8 border-l-2 border-black pl-8">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2">Ubicación</p>
                    <p className="text-lg font-bold text-black">{proyecto.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2">Año del Proyecto</p>
                    <p className="text-lg font-bold text-black">{proyecto.year}</p>
                  </div>

                  {proyecto.squareMeters && (
                    <div>
                      <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase mb-2">Superficie</p>
                      <p className="text-lg font-bold text-black">{proyecto.squareMeters}</p>
                    </div>
                  )}
                </div>

                <div className="bg-zinc-50 p-8 border border-zinc-100 shadow-sm">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-6">¿Interesado en este servicio?</h3>
                  <Link 
                    href={`/contacto?subject=${encodeURIComponent('Consulta sobre ' + proyecto.name)}`}
                    className="w-full inline-flex items-center justify-center bg-black px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800"
                  >
                    Iniciar Consulta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {proyecto.gallery && proyecto.gallery.length > 0 && (
          <ProjectGallery 
            images={proyecto.gallery} 
            projectName={proyecto.name} 
          />
        )}

        {proyecto.planImage && (
          <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 border-t border-zinc-100">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-8">Información Técnica / Planos</h2>
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-50">
              <Image
                src={proyecto.planImage}
                alt={`Imagen complementaria de ${proyecto.name}`}
                fill
                className="object-contain p-8"
              />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
