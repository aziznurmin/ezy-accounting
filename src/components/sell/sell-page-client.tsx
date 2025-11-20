"use client";

import { useState } from "react";
import { CartProvider } from "../../context/cart-context";
import ProductList from "./product-list";
import CartDisplay from "./cart-display";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
};

type Category = {
  id: string;
  name: string;
};

export default function SellPageClient({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ProductList products={filteredProducts} />
          </div>
        </div>
        <div className="lg:col-span-1">
          <CartDisplay />
        </div>
      </div>
    </CartProvider>
  );
}