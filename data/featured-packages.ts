import { TravelPackage } from "@/types/travel-package";

export const featuredPackages: TravelPackage[] = [
  {
    id: 1,
    title: "Río de Janeiro Express",
    location: "Brasil",
    duration: "5 días / 4 noches",
    price: "USD 1.290",
    date: "Salida: 18 Abr 2026",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    description: "Playas, ciudad y excursiones para una escapada inolvidable.",
    tag: "Destacado",
  },
  {
    id: 2,
    title: "Cartagena Premium",
    location: "Colombia",
    duration: "7 días / 6 noches",
    price: "USD 1.850",
    date: "Salida: 10 May 2026",
    image:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
    description: "Historia, mar Caribe y hoteles seleccionados.",
    tag: "Recomendado",
  },
  {
    id: 3,
    title: "Madrid + París",
    location: "Europa",
    duration: "10 días / 8 noches",
    price: "USD 2.990",
    date: "Salida: 02 Jun 2026",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    description: "Dos capitales icónicas en un solo paquete con acompañamiento.",
    tag: "Top ventas",
  },
];
