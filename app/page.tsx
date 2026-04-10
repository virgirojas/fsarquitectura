import FeaturedProyectos from "@/components/home/FeaturedProyectos";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main>
        <Hero />
        <FeaturedProyectos />
      </main>

      <Footer />
    </div>
  );
}
