"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/sell", label: "Sell", icon: ShoppingCart },
  { href: "/products", label: "Products", icon: Package },
  { href: "/sales", label: "Sales", icon: LineChart },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative hidden h-screen border-r bg-gray-100/40 transition-all duration-300 md:block dark:bg-gray-800/40",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <Package className="h-6 w-6" />
            <span className={cn(isCollapsed && "hidden")}>EasyPOS</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  pathname === href && "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                )}
                href={href}
              >
                <Icon className="h-4 w-4" />
                <span className={cn(isCollapsed && "hidden")}>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <form action="/auth/signout" method="post">
            <Button className="w-full justify-start" size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              <span className={cn(isCollapsed && "hidden")}>Logout</span>
            </Button>
          </form>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 -right-5 h-10 w-10 rounded-full border bg-white hover:bg-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </Button>
    </div>
  );
}