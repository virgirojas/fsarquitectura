import connectMongo from "@/lib/mongodb";
import ContactQuery from "@/models/ContactQuery";

export const dynamic = "force-dynamic";

export default async function AdminContactosDashboard() {
  await connectMongo();
  const contactos = await ContactQuery.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8 border-l-4 border-black pl-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-widest text-black">Consultas de Contacto</h1>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Mensajes recibidos a través de la web del estudio.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-black/5 rounded-none bg-white">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                  <tr>
                    <th scope="col" className="py-4 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-widest text-black sm:pl-6">Fecha</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Remitente</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Contacto</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Asunto</th>
                    <th scope="col" className="px-3 py-4 text-left text-xs font-bold uppercase tracking-widest text-black">Mensaje</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {contactos.map((c) => (
                    <tr key={c._id.toString()} className="hover:bg-zinc-50 transition-colors font-medium">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-zinc-400 sm:pl-6">
                        {new Date(c.createdAt).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-black uppercase tracking-tight">{c.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <a href={`mailto:${c.email}`} className="text-black hover:underline block font-bold">{c.email}</a>
                        {c.phone && <span className="text-[10px] mt-1 block text-zinc-400 font-bold uppercase">{c.phone}</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className="inline-flex items-center rounded-none bg-zinc-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-black ring-1 ring-inset ring-black/5">
                          {c.subject}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-zinc-600 max-w-sm">
                        <p className="line-clamp-2 italic" title={c.message}>&quot;{c.message}&quot;</p>
                      </td>
                    </tr>
                  ))}
                  {contactos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-sm font-medium text-zinc-400 italic">No hay consultas de contacto recientes.</td>
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
