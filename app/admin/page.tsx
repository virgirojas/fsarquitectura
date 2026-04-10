import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Proyecto from "@/models/Proyecto";
import { deleteProyecto } from "@/app/actions/proyectos";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectMongo();
  const proyectos = await Proyecto.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-black">Proyectos del Estudio</h1>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Administra el portfolio de obras y proyectos de arquitectura.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Link
            href="/admin/new"
            className="inline-flex items-center justify-center rounded-none bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-zinc-800"
          >
            + Nuevo Proyecto
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-black/5 rounded-none bg-white">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                  <tr>
                    <th scope="col" className="py-4 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-widest text-black sm:pl-6">Proyecto</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Ubicación</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Año</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Categoría</th>
                    <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {proyectos.map((proyecto) => (
                    <tr key={proyecto._id.toString()} className="hover:bg-zinc-50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold text-black sm:pl-6 flex items-center gap-2">
                        {proyecto.isFeatured && <span title="Destacado" className="text-black">⭐️</span>}
                        {proyecto.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 font-medium">{proyecto.location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 font-medium">{proyecto.year}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-none bg-zinc-100 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-black ring-1 ring-inset ring-black/5">
                          {proyecto.category}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end gap-6 uppercase tracking-widest">
                        <Link href={`/admin/edit/${proyecto._id}`} className="text-black hover:text-zinc-500 font-bold">
                          Editar
                        </Link>
                        <form action={async () => {
                          "use server";
                          await deleteProyecto(proyecto._id.toString());
                        }}>
                          <button type="submit" className="text-red-600 hover:text-red-800 font-bold">Borrar</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {proyectos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-sm font-medium text-zinc-400 italic">No hay proyectos cargados en el portfolio.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
