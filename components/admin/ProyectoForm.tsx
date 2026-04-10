"use client";

import { createProyecto, updateProyecto } from "@/app/actions/proyectos";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IProyecto } from "@/models/Proyecto";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function ProyectoForm({
  initialData,
  pkgId,
}: {
  initialData?: IProyecto;
  pkgId?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [featuresContent, setFeaturesContent] = useState(initialData?.features || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (initialData && pkgId) {
        await updateProyecto(pkgId, formData);
      } else {
        await createProyecto(formData);
      }
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Error guardando el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 sm:p-8 rounded-none shadow-sm ring-1 ring-black/10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Nombre del Proyecto</label>
          <input required defaultValue={initialData?.name} type="text" name="name" placeholder="Ej: Casa Bosque" className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>
        
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Imagen de Portada (JPG/PNG)</label>
          <input 
            required={!initialData?.image} 
            type="file" 
            accept="image/*" 
            name="image" 
            className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-black transition file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:bg-black file:text-white" 
          />
          {initialData?.image && (
            <p className="mt-2 text-xs text-zinc-500">
              Imagen actual: <a href={initialData.image} target="_blank" rel="noreferrer" className="text-black underline break-all font-bold">Ver imagen</a>.
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Galería de Fotos (Múltiples)</label>
          <input 
            type="file" 
            multiple
            accept="image/*" 
            name="gallery" 
            className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-black transition file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:bg-black file:text-white" 
          />
          {initialData?.gallery && initialData.gallery.length > 0 && (
            <p className="mt-2 text-xs text-zinc-500">
              {initialData.gallery.length} fotos cargadas en la galería. <span className="text-zinc-400 italic">(Subir nuevas reemplazará las anteriores)</span>
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Plano o Imagen Adicional (Opcional)</label>
          <input 
            type="file" 
            accept="image/*" 
            name="planImage" 
            className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-black transition file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:bg-black file:text-white" 
          />
          {initialData?.planImage && (
            <p className="mt-2 text-xs text-zinc-500">
              Imagen actual: <a href={initialData.planImage} target="_blank" rel="noreferrer" className="text-black underline break-all font-bold">Ver imagen</a>.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Ubicación</label>
          <input required defaultValue={initialData?.location} type="text" name="location" placeholder="Ej: Córdoba, Argentina" className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Año</label>
          <input required defaultValue={initialData?.year} type="text" name="year" placeholder="Ej: 2023" className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>

        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Categoría</label>
          <input required defaultValue={initialData?.category} type="text" name="category" placeholder="Ej: Residencial" className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>

        <div>
           <label className="block text-sm font-bold uppercase tracking-widest text-black">Superficie (m²)</label>
           <input defaultValue={initialData?.squareMeters} type="text" name="squareMeters" placeholder="Ej: 150 m²" className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black">Descripción Corta</label>
          <textarea required defaultValue={initialData?.description} name="description" rows={3} className="mt-1 block w-full rounded-none border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black transition" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-bold uppercase tracking-widest text-black mb-2">Memoria Descriptiva / Detalles</label>
          <input type="hidden" name="features" value={featuresContent} />
          <div className="bg-white rounded-none border border-zinc-200 overflow-hidden [&_.ql-editor]:min-h-[250px] [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-zinc-200 [&_.ql-container]:border-0 [&_.ql-editor]:text-zinc-600">
            <ReactQuill 
              theme="snow" 
              value={featuresContent} 
              onChange={setFeaturesContent} 
              placeholder="Escribe la memoria descriptiva completa aquí..."
            />
          </div>
        </div>

        <div className="sm:col-span-2 flex items-center gap-3 bg-zinc-50 p-4 rounded-none border border-zinc-200">
          <input 
            type="checkbox" 
            name="isFeatured" 
            id="isFeatured" 
            defaultChecked={initialData?.isFeatured} 
            className="h-5 w-5 rounded-none border-zinc-300 text-black focus:ring-black cursor-pointer" 
          />
          <label htmlFor="isFeatured" className="text-sm font-bold uppercase tracking-wide text-black cursor-pointer select-none">
            ¿Destacar en Inicio?
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-black px-6 py-2 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-70"
        >
          {loading ? "Guardando..." : "Guardar Proyecto"}
        </button>
      </div>
    </form>
  );
}
