import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            id="contacto"
            className="relative overflow-hidden border-t border-black/10 bg-white text-zinc-600"
        >
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-12 grid gap-8 border-l-4 border-black bg-zinc-50 p-8 md:grid-cols-[1.3fr_0.7fr]">
                    <div>
                        <span className="inline-flex rounded-none border border-black/10 bg-black/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-black">
                            Proyectos con Identidad
                        </span>

                        <h2 className="mt-4 max-w-2xl text-3xl font-black uppercase tracking-tight text-black sm:text-4xl">
                            Diseñamos espacios que inspiran y perduran
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-500 font-medium sm:text-base">
                            Desde el concepto hasta la ejecución, acompañamos cada etapa del proceso
                            arquitectónico con un enfoque vanguardista y funcional.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <a
                            href="https://wa.me/5492994587355"
                            className="inline-flex items-center justify-center bg-black px-5 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-zinc-800"
                        >
                            Hablar por WhatsApp
                        </a>

                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center border-2 border-black/10 bg-transparent px-5 py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-black/5"
                        >
                            Solicitar consulta
                        </Link>
                    </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
                    <div>
                        <Link href="/" className="inline-block transition hover:opacity-80">
                            <Image
                                src="/logo_fs_new.jpg"
                                alt="Francisco Silva Arquitectura Logo"
                                width={180}
                                height={60}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500 font-medium">
                            Estudio de arquitectura centrado en la creación de valor a través del diseño,
                            la innovación y el compromiso con cada proyecto.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                                Residencial
                            </span>
                            <span className="border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                                Comercial
                            </span>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="border border-black/10 bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition hover:border-black hover:text-black"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="border border-black/10 bg-zinc-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-600 transition hover:border-black hover:text-black"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-black border-b border-black/10 pb-2">Explorar</h3>

                        <ul className="mt-5 space-y-4 text-sm text-zinc-500 font-medium">
                            <li>
                                <a href="/proyectos" className="transition hover:text-black">Proyectos Destacados</a>
                            </li>
                            <li>
                                <a href="/proyectos" className="transition hover:text-black">Todos los Trabajos</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-black border-b border-black/10 pb-2">Estudio</h3>

                        <ul className="mt-5 space-y-4 text-sm text-zinc-500 font-medium">
                            <li>
                                <a href="/nosotros" className="transition hover:text-black">Nosotros</a>
                            </li>
                            <li>
                                <a href="/contacto" className="transition hover:text-black">Contacto</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold uppercase tracking-wider text-black border-b border-black/10 pb-2">Contacto</h3>

                        <div className="mt-5 space-y-6 text-sm text-zinc-500 font-medium">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                    Email
                                </p>
                                <a
                                    href="mailto:hola@franciscosilva.com.ar"
                                    className="mt-1 block text-black transition hover:text-zinc-600"
                                >
                                    hola@franciscosilva.com.ar
                                </a>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                    Teléfono
                                </p>
                                <a
                                    href="tel:+5492994587355"
                                    className="mt-1 block text-black transition hover:text-zinc-600"
                                >
                                    +54 9 2994 58-7355
                                </a>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                                    Ubicación
                                </p>
                                <p className="mt-1 text-black">
                                    Neuquén, Argentina
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-4 border-t border-black/10 pt-8 text-xs uppercase tracking-widest text-zinc-400 font-bold md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} Francisco Silva Arquitectura. Todos los derechos reservados.</p>

                    <div className="flex flex-wrap gap-4">
                        <a href="/privacidad" className="transition hover:text-black">
                            Privacidad
                        </a>
                        <a href="/terminos" className="transition hover:text-black">
                            Términos
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}