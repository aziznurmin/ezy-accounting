"use client";

import { ProductTable } from "@/components/products/product-table";
import { AddProductDialog } from "@/components/products/add-product-dialog";

type Category = {
  id: string;
  name: string;
  [key: string]: any;
};

type Product = {
  id: string;
  name: string;
  price: number;
  sku: string | null;
  stock_quantity: number | null;
  categories: { name: string } | null;
  [key: string]: any;
};

export default function ProductsPageClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <AddProductDialog categories={categories} />
      </div>
      <ProductTable products={initialProducts} />
    </div>
  );
}