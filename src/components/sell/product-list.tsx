"use client";

import { useCart } from "../../context/cart-context";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  [key: string]: any;
};

export default function ProductList({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle className="text-base">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{formatCurrency(product.price)}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => addToCart(product)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}