"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-jwt-key-for-local-dev-123");

export async function loginAction(prevState: unknown, formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (password === adminPassword) {
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(getSecret());

    (await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    redirect("/admin");
  }

  return { success: false, error: "Contraseña incorrecta." };
}

export async function logoutAction() {
  (await cookies()).delete("auth_token");
  redirect("/admin/login");
}

export async function verifyAuth() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) throw new Error("No autorizado");

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    throw new Error("No autorizado");
  }
}
