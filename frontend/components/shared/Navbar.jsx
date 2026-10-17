"use client";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";

export default function Navbar({ seller }) {
  return (
    <header className="bg-white shadow-sm border-b py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <Link href="/" className="text-2xl font-bold text-primary">{seller ? 'Seller Portal' : 'Logo'}</Link>
      {seller ? (
        <nav className="flex space-x-6 text-sm font-medium">
          <Link href="/dashboard/overview">Overview</Link>
          <Link href="/dashboard/products">Products</Link>
          <Link href="/dashboard/orders">Orders</Link>
        </nav>
      ) : (
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/products" className="hover:text-primary transition">Products</Link>
          <Link href="/cart" className="relative"><ShoppingCart className="inline w-5 h-5"/> Cart<span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">3</span></Link>
          <Link href="/login"><User className="inline w-5 h-5"/> Account</Link>
        </nav>
      )}
      <Menu className="md:hidden w-6 h-6" />
    </header>
  );
}
