"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center transition hover:opacity-80">
          <Image
            src="/logo_fs_white.png"
            alt="Francisco Silva Arquitectura Logo"
            width={180}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            Inicio
          </Link>
          <Link
            href="/proyectos"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            Proyectos
          </Link>
          <Link
            href="/#destacados"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            Destacados
          </Link>
          <Link
            href="/contacto"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 transition hover:text-white"
          >
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/contacto" className="hidden sm:inline-flex items-center justify-center rounded-none bg-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black transition hover:bg-zinc-200">
            Consultar
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center text-white transition"
            aria-label="Alternar menú"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-black absolute w-full shadow-2xl">
          <nav className="flex flex-col px-6 py-10 space-y-8">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
            >
              Inicio
            </Link>
            <Link 
              href="/proyectos" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
            >
              Proyectos
            </Link>
            <Link 
              href="/#destacados" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
            >
              Destacados
            </Link>
            <Link 
              href="/contacto" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
            >
              Contacto
            </Link>
            
            <div className="pt-8 border-t border-white/10">
              <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center bg-white px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-black">
                Consultar
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
