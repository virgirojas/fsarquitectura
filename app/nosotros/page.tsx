import connectMongo from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function Nosotros() {
  await connectMongo();
  let nosotros = await PageContent.findOne({ pageKey: 'nosotros' });

  if (!nosotros) {
    nosotros = {
      title: "Sobre Francisco Silva Arquitectura",
      content: "La información institucional aún no ha sido cargada."
    };
  }

  // Pre-process newlines into paragraphs
  const paragraphs = (nosotros.content || "").split('\n').filter((p: string) => p.trim() !== '');

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-black pl-8">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              EL ESTUDIO
            </span>
            <h1 className="mt-2 text-5xl font-black tracking-tight text-black sm:text-6xl uppercase tracking-tighter">
              {nosotros.title}
            </h1>
          </div>
          <div className="prose prose-lg text-black bg-zinc-50 p-10 sm:p-16 rounded-none border border-black/5 font-medium leading-relaxed">
            {paragraphs.map((p: string, idx: number) => (
              <p key={idx} className="mb-10 last:mb-0">{p}</p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
