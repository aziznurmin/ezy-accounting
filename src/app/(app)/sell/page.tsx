import { createClient } from "@/lib/supabase/server";
import SellPageClient from "../../../components/sell/sell-page-client";

export default async function SellPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("*");
  const { data: categories } = await supabase.from("categories").select("*");

  return <SellPageClient initialProducts={products ?? []} categories={categories ?? []} />;
}