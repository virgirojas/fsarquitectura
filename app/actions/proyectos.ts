"use server";

import { revalidatePath } from "next/cache";
import connectMongo from "@/lib/mongodb";
import Proyecto from "@/models/Proyecto";
import { verifyAuth } from "./auth";


async function handleFileUpload(imageFile: File | null): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) return null;
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const mimeType = imageFile.type || "image/jpeg";
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

export async function createProyecto(formData: FormData) {
  await verifyAuth();
  await connectMongo();

  const imageFile = formData.get("image") as File;
  const imageUrl = await handleFileUpload(imageFile);

  const planFile = formData.get("planImage") as File;
  const planUrl = await handleFileUpload(planFile);

  const galleryFiles = formData.getAll("gallery") as File[];
  const galleryUrls = [];
  for (const file of galleryFiles) {
    const url = await handleFileUpload(file);
    if (url) galleryUrls.push(url);
  }

  const proyecto = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    location: formData.get("location") as string,
    year: formData.get("year") as string,
    description: formData.get("description") as string,
    image: imageUrl || "",
    gallery: galleryUrls,
    planImage: planUrl || "",
    squareMeters: (formData.get("squareMeters") as string) || "",
    bedrooms: (formData.get("bedrooms") as string) || "",
    features: (formData.get("features") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  await Proyecto.create(proyecto);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/proyectos");
}

export async function updateProyecto(id: string, formData: FormData) {
  await verifyAuth();
  await connectMongo();

  const proyecto: any = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    location: formData.get("location") as string,
    year: formData.get("year") as string,
    description: formData.get("description") as string,
    squareMeters: (formData.get("squareMeters") as string) || "",
    bedrooms: (formData.get("bedrooms") as string) || "",
    features: (formData.get("features") as string) || "",
    isFeatured: formData.get("isFeatured") === "on",
  };

  const imageFile = formData.get("image") as File;
  const imageUrl = await handleFileUpload(imageFile);
  if (imageUrl) {
    proyecto.image = imageUrl;
  }

  const planFile = formData.get("planImage") as File;
  const planUrl = await handleFileUpload(planFile);
  if (planUrl) {
    proyecto.planImage = planUrl;
  }

  const galleryFiles = formData.getAll("gallery") as File[];
  if (galleryFiles.length > 0 && galleryFiles[0].size > 0) {
    const galleryUrls = [];
    for (const file of galleryFiles) {
      const url = await handleFileUpload(file);
      if (url) galleryUrls.push(url);
    }
    proyecto.gallery = galleryUrls;
  }

  await Proyecto.findByIdAndUpdate(id, { $set: proyecto });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/proyectos");
}

export async function deleteProyecto(id: string) {
  await verifyAuth();
  await connectMongo();
  await Proyecto.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/proyectos");
}
