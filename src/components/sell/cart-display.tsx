"use client";

import { useCart, CartItem } from "../../context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Trash2, X } from "lucide-react";
import { Input } from "../ui/input";

export default function CartDisplay() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Current Sale</CardTitle>
        {items.length > 0 && (
          <Button variant="ghost" size="icon" onClick={clearCart}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items in cart.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    className="h-8 w-16"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                    min="1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <Button className="w-full" size="lg" disabled={items.length === 0}>
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}