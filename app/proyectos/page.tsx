import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AllProyectos from "@/components/home/AllProyectos";

export default async function ProyectosPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : "";
  const category = typeof searchParams.category === 'string' ? searchParams.category : "";
  
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
          </div>
        }>
          <AllProyectos searchParamsParsed={{ q, category }} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
