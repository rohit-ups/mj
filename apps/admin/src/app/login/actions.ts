"use server";

import { redirect } from "next/navigation";

interface ActionResult {
  success: boolean;
  error?: string;
  field?: string;
}

export async function login(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || email.trim() === "") {
    return { success: false, error: "Email is required", field: "email" };
  }

  if (!password || password.trim() === "") {
    return { success: false, error: "Password is required", field: "password" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address", field: "email" };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "admin@surfschool.com" && password === "password") {
    redirect("/");
  }

  return { success: false, error: "Invalid email or password", field: "password" };
}
