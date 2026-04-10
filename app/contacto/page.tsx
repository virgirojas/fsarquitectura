"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { submitContact } from "@/app/actions/contact";

export default function ContactoPage() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [captchaActive, setCaptchaActive] = useState({ a: 0, b: 0 });
  const [userMath, setUserMath] = useState("");

  useEffect(() => {
    setCaptchaActive({ 
      a: Math.floor(Math.random() * 10) + 1, 
      b: Math.floor(Math.random() * 10) + 1 
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (parseInt(userMath) !== captchaActive.a + captchaActive.b) {
      setError("La respuesta matemática de seguridad es incorrecta.");
      return;
    }

    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const response = await submitContact(formData);

    if (response.success) {
      setSuccess(true);
      setCaptchaActive({ 
        a: Math.floor(Math.random() * 10) + 1, 
        b: Math.floor(Math.random() * 10) + 1 
      });
      setUserMath("");
    } else {
      setError(response.error || "Algo salió mal.");
    }
    setIsPending(false);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        
        <div className="relative z-10 w-full max-w-4xl rounded-none border border-black/5 bg-zinc-50/50 p-8 sm:p-16">
          <div className="mb-16 border-l-4 border-black pl-8 text-left">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
              Contacto
            </span>
            <h1 className="mt-4 text-5xl font-black uppercase tracking-tighter text-black sm:text-6xl">Hablemos de tu obra</h1>
            <p className="mt-6 text-lg text-zinc-600 max-w-2xl font-medium">
              Estamos listos para materializar tus ideas. Completa el formulario y nos pondremos en contacto para coordinar una reunión inicial.
            </p>
          </div>

          {success ? (
            <div className="bg-black p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-6 text-2xl font-black uppercase tracking-widest text-white">Mensaje enviado</h3>
              <p className="mt-4 text-base text-zinc-400 font-medium tracking-wide">Tu consulta ha sido recibida. Nos comunicaremos a la brevedad.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-10 inline-flex bg-white px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-zinc-200"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {error && (
                <div className="bg-red-600 p-4 text-xs font-bold uppercase tracking-widest text-white flex items-center gap-3">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-black border-b border-black/10 pb-2 mb-4">Nombre completo</label>
                  <input required type="text" name="name" id="name" className="block w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none transition placeholder:text-zinc-300" placeholder="JUAN PEREZ" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-black border-b border-black/10 pb-2 mb-4">Email</label>
                  <input required type="email" name="email" id="email" className="block w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none transition placeholder:text-zinc-300" placeholder="EMAIL@EJEMPLO.COM" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-black border-b border-black/10 pb-2 mb-4">Teléfono</label>
                  <input type="tel" name="phone" id="phone" className="block w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none transition placeholder:text-zinc-300" placeholder="+54 9..." />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-black uppercase tracking-widest text-black border-b border-black/10 pb-2 mb-4">Tipo de Servicio</label>
                  <select required name="subject" id="subject" className="block w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none transition appearance-none cursor-pointer">
                    <option value="">SELECCIONA UNA OPCIÓN</option>
                    <option value="Proyecto Nuevo">PROYECTO NUEVO</option>
                    <option value="Reforma / Ampliación">REFORMA / AMPLIACIÓN</option>
                    <option value="Dirección de Obra">DIRECCIÓN DE OBRA</option>
                    <option value="Consulta General">CONSULTA GENERAL</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-black border-b border-black/10 pb-2 mb-4">Mensaje / Detalles del Proyecto</label>
                <textarea required name="message" id="message" rows={4} className="block w-full rounded-none border-b border-black/10 bg-transparent px-0 py-3 text-black focus:border-black focus:outline-none transition resize-none placeholder:text-zinc-300" placeholder="DESCRÍBENOS TU IDEA, UBICACIÓN, METROS ESTIMADOS..."></textarea>
              </div>

              <div className="bg-zinc-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <label htmlFor="captcha" className="block text-xs font-black uppercase tracking-widest text-black mb-1">Verificación</label>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">¿CUÁNTO ES {captchaActive.a} + {captchaActive.b}?</span>
                </div>
                <input 
                  required 
                  type="number" 
                  name="captcha" 
                  id="captcha" 
                  value={userMath}
                  onChange={(e) => setUserMath(e.target.value)}
                  className="block w-full sm:w-32 bg-white border border-black/5 px-4 py-3 text-center text-sm font-bold focus:border-black focus:outline-none transition" 
                  placeholder="?" 
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-black px-6 py-5 text-center text-xs font-black uppercase tracking-[0.3em] text-white transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "PROCESANDO ENVÍO..." : "ENVIAR CONSULTA"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
