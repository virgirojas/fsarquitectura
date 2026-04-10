import Link from "next/link";
import Image from "next/image";
import { logoutAction } from "@/app/actions/auth";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('auth_token');
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-black border-b border-white/10 text-white sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_fs_white.png"
              alt="Francisco Silva Arquitectura Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <span className="rounded-none bg-zinc-800 px-2 py-1 text-[10px] font-bold tracking-widest text-zinc-400">
              ADMIN
            </span>
          </div>
          {isLoggedIn && (
            <nav className="flex items-center gap-8">
              <Link href="/admin" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">Proyectos</Link>
              <Link href="/admin/contactos" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">Contactos</Link>
              <Link href="/admin/contenidos" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">Contenidos</Link>
              <Link href="/" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition border-l border-white/10 pl-8">Web</Link>
              <form action={logoutAction}>
                <button type="submit" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition">Salir</button>
              </form>
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
