"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1));
    }
  }, [selectedIndex, images.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1));
    }
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <>
      <section className="bg-zinc-50 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-100">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 mb-12">Galería del Proyecto</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="relative aspect-[3/2] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
                onClick={() => handleOpen(idx)}
              >
                <Image
                  src={img}
                  alt={`${projectName} gallery image ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
        >
          <button 
            className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white transition-colors"
            onClick={handleClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            className="absolute left-6 z-[110] p-4 text-white/50 hover:text-white transition-colors hidden sm:block"
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button 
            className="absolute right-6 z-[110] p-4 text-white/50 hover:text-white transition-colors hidden sm:block"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div 
            className="relative h-[85vh] w-[95vw] lg:w-[80vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${projectName} focus image`}
              fill
              className="object-contain transition-all duration-500"
              priority
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1.5 backdrop-blur-md rounded-full text-white/80 text-xs font-bold tracking-widest">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
