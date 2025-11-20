"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  sku: z.string().optional(),
  stock_quantity: z.coerce.number().int().optional(),
  category_id: z.string().uuid().optional().nullable(),
});

export async function addProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = productSchema.safeParse({
    ...rawFormData,
    category_id: rawFormData.category_id === "" ? null : rawFormData.category_id,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("products").insert([
    { ...validatedFields.data, user_id: user.id },
  ]);

  if (error) return { error: "Failed to add product: " + error.message };

  revalidatePath("/products");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = productSchema.safeParse({
    ...rawFormData,
    category_id: rawFormData.category_id === "" ? null : rawFormData.category_id,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("products")
    .update(validatedFields.data)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: "Failed to update product: " + error.message };

  revalidatePath("/products");
  revalidatePath("/sell");
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in." };

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: "Failed to delete product: " + error.message };

  revalidatePath("/products");
  revalidatePath("/sell");
  return { success: true };
}