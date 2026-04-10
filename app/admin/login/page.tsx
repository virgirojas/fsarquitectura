"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";
import Image from "next/image";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-10%] top-0 h-[600px] w-[600px] bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-secondary)_0.18,transparent_50%)] opacity-30" />
      <div className="pointer-events-none absolute right-[-10%] bottom-0 h-[600px] w-[600px] bg-[radial-gradient(circle_at_bottom_left,var(--color-brand-accent)_0.12,transparent_40%)] opacity-20" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-black/80 backdrop-blur rounded-2xl border border-white/20 shadow-sm mb-6">
          <Image src="/logo_fs_white.png" alt="Francisco Silva Arquitectura Logo" width={180} height={60} className="h-10 w-auto" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
          Acceso Administrativo
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div className="bg-white/80 backdrop-blur-xl px-6 py-10 shadow-2xl sm:rounded-[2rem] sm:px-12 border border-white/20">
          <form action={formAction} className="space-y-6">
            {state && !state.success && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-100 font-medium text-center">
                {state.error}
              </div>
            )}
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-2xl border border-slate-200 bg-white/50 px-4 py-3.5 text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full justify-center rounded-2xl bg-brand-primary px-5 py-4 text-sm font-bold text-white shadow-[0_10px_30px_-10px_var(--color-brand-primary)] transition-all hover:scale-[1.01] hover:bg-brand-primary/95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isPending ? "Ingresando..." : "Ingresar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
