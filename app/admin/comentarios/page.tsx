import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";
import { createReviewAction, deleteReviewAction, toggleReviewActiveAction } from "@/app/actions/reviews";

export default async function AdminComentarios() {
  await connectMongo();
  const reviews = await Review.find().sort({ createdAt: -1 });

  return (
    <div>
      <div className="mb-8 border-l-4 border-black pl-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-black">Gestión de Reseñas</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">Administra los testimonios y comentarios de clientes.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
        {/* Formulario Crear */}
        <div className="rounded-none border border-black/5 bg-white p-8 shadow-sm">
          <h2 className="mb-8 text-xs font-black uppercase tracking-[0.2em] border-b border-zinc-100 pb-4 text-black">Cargar Reseña</h2>
          <form action={createReviewAction} className="space-y-8">
            <div>
              <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-black">Nombre del Cliente</label>
              <input type="text" name="clientName" required className="w-full rounded-none border border-zinc-200 px-4 py-3 outline-none focus:border-black font-bold text-black" placeholder="NOMBRE COMPLETO" />
            </div>
            <div>
              <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-black">Comentario / Testimonio</label>
              <textarea name="reviewText" required rows={4} className="w-full rounded-none border border-zinc-200 px-4 py-3 outline-none focus:border-black font-medium text-zinc-600" placeholder="ESCRIBE EL TESTIMONIO AQUÍ..." />
            </div>
            <div>
              <label className="mb-3 block text-[10px] font-black uppercase tracking-widest text-black">Calificación</label>
              <select name="rating" className="w-full rounded-none border border-zinc-200 px-4 py-3 outline-none focus:border-black font-bold text-black appearance-none cursor-pointer">
                <option value="5">★★★★★ - 5 ESTRELLAS</option>
                <option value="4">★★★★☆ - 4 ESTRELLAS</option>
                <option value="3">★★★☆☆ - 3 ESTRELLAS</option>
                <option value="2">★★☆☆☆ - 2 ESTRELLAS</option>
                <option value="1">★☆☆☆☆ - 1 ESTRELLA</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-black px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-zinc-800">
              Guardar Reseña
            </button>
          </form>
        </div>

        {/* Lista de Reseñas */}
        <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-[10px] font-black uppercase tracking-widest text-black">
              <tr>
                <th className="px-6 py-5">Cliente / Valoración</th>
                <th className="px-6 py-5">Testimonio</th>
                <th className="px-6 py-5">Estado</th>
                <th className="px-6 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {reviews.map((r) => (
                <tr key={r._id.toString()} className="transition hover:bg-zinc-50 font-medium">
                  <td className="px-6 py-6">
                    <div className="font-bold text-black uppercase tracking-tight">{r.clientName}</div>
                    <div className="text-black text-xs mt-1">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
                  </td>
                  <td className="px-6 py-6 max-w-xs text-zinc-500 italic">"{r.reviewText}"</td>
                  <td className="px-6 py-6">
                    <span className={`inline-flex items-center rounded-none px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${r.isActive ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                      {r.isActive ? 'Visible' : 'Oculta'}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right flex items-center justify-end gap-6 h-full uppercase text-[10px] font-black tracking-widest">
                    <form action={toggleReviewActiveAction.bind(null, r._id.toString(), r.isActive)}>
                      <button type="submit" className="text-black hover:text-zinc-500 underline underline-offset-4">Cambiar</button>
                    </form>
                    <form action={deleteReviewAction.bind(null, r._id.toString())}>
                      <button type="submit" className="text-red-600 hover:text-red-800 underline underline-offset-4">Borrar</button>
                    </form>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 italic">
                    No hay reseñas cargadas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
