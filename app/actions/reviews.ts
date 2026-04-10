"use server";

import connectMongo from "@/lib/mongodb";
import Review from "@/models/Review";
import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData): Promise<void> {
  try {
    await connectMongo();
    
    const clientName = formData.get('clientName') as string;
    const reviewText = formData.get('reviewText') as string;
    const ratingStr = formData.get('rating') as string;
    const rating = ratingStr ? parseInt(ratingStr, 10) : 5;
    
    const newReview = new Review({
      clientName,
      reviewText,
      rating,
      isActive: true
    });
    
    await newReview.save();
    
    revalidatePath("/admin/comentarios");
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating review:", error);
  }
}

export async function deleteReviewAction(id: string): Promise<void> {
  try {
    await connectMongo();
    await Review.findByIdAndDelete(id);
    
    revalidatePath("/admin/comentarios");
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting review", error);
  }
}

export async function toggleReviewActiveAction(id: string, currentStatus: boolean): Promise<void> {
  try {
    await connectMongo();
    await Review.findByIdAndUpdate(id, { isActive: !currentStatus });
    
    revalidatePath("/admin/comentarios");
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating review", error);
  }
}
