"use server";

import connectMongo from "@/lib/mongodb";
import ContactQuery from "@/models/ContactQuery";

export async function submitContact(formData: FormData) {
  try {
    await connectMongo();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      return { success: false, error: "Por favor, completa todos los campos requeridos." };
    }

    const query = new ContactQuery({
      name,
      email,
      phone,
      subject,
      message,
    });

    await query.save();

    return { success: true };
  } catch (error) {
    console.error("Error saving contact query:", error);
    return { success: false, error: "Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo." };
  }
}
