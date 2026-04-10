"use server";

import connectMongo from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { revalidatePath } from "next/cache";

export async function savePageContentAction(formData: FormData): Promise<void> {
  try {
    await connectMongo();
    
    const pageKey = formData.get('pageKey') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (!pageKey || !title || !content) {
      console.error("Missing fields for savePageContentAction");
      return;
    }

    await PageContent.findOneAndUpdate(
      { pageKey },
      { pageKey, title, content, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    
    revalidatePath(`/admin/contenidos`);
    revalidatePath(`/${pageKey}`);
  } catch (error) {
    console.error("Error saving page content:", error);
  }
}
