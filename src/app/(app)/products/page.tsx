import { createClient } from "@/lib/supabase/server";
import ProductsPageClient from "@/components/products/products-page-client";

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select(`
    *,
    categories ( name )
  `);
  const { data: categories } = await supabase.from("categories").select("*");

  return (
    <ProductsPageClient
      initialProducts={products ?? []}
      categories={categories ?? []}
    />
  );
}