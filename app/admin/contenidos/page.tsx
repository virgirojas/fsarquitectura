import connectMongo from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { savePageContentAction } from "@/app/actions/content";

export default async function AdminContenidos() {
  await connectMongo();
  let nosotros = await PageContent.findOne({ pageKey: 'nosotros' });

  if (!nosotros) {
    nosotros = { title: "Nuestra Historia", content: "Viviendas Triunfo: Transformando sueños en hogares.\n\nSomos una empresa constructora con amplia trayectoria..." };
  }

  return (
    <div>
      <div className="mb-8 border-l-4 border-black pl-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-black">Gestor de Contenidos</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">Administra los textos institucionales del estudio.</p>
      </div>

      <div className="rounded-none border border-black/5 bg-white p-10 shadow-sm max-w-4xl">
        <h2 className="mb-8 text-xs font-black uppercase tracking-[0.2em] border-b border-zinc-100 pb-4 text-black">Sección: Nosotros</h2>
        <form action={savePageContentAction} className="space-y-10">
          <input type="hidden" name="pageKey" value="nosotros" />
          
          <div>
            <label className="mb-4 block text-xs font-black uppercase tracking-widest text-black border-l-2 border-black pl-4">Título de la Página</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={nosotros.title} 
              required 
              className="w-full rounded-none border border-zinc-200 px-4 py-4 outline-none focus:border-black transition font-bold text-black" 
            />
          </div>

          <div>
            <label className="mb-4 block text-xs font-black uppercase tracking-widest text-black border-l-2 border-black pl-4">Cuerpo del Texto</label>
            <textarea 
              name="content" 
              defaultValue={nosotros.content} 
              required 
              rows={12} 
              className="w-full rounded-none border border-zinc-200 px-4 py-4 outline-none focus:border-black transition whitespace-pre-wrap font-medium text-base leading-relaxed text-zinc-700" 
            />
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400 italic">Los saltos de línea se interpretan automáticamente como párrafos en la web.</p>
          </div>

          <button type="submit" className="w-full sm:w-auto bg-black px-10 py-4 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-zinc-800">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}
