import { supabase } from "./supabaseClient";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  is_active: boolean;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    "https://leao-parts-api.vercel.app/api/products"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return await response.json();
}

export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}) {
  const { data, error } = await supabase.from("products").insert([product]);

  if (error) throw error;
  return data;
}
