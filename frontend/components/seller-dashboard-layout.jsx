"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Overview", href: "/dashboard/overview", icon: "📊" },
  { label: "Produk", href: "/dashboard/products", icon: "📦" },
  { label: "Pesanan", href: "/dashboard/orders", icon: "📝" },
  { label: "Inventori", href: "/dashboard/inventory", icon: "📋" },
  { label: "Reviews", href: "/dashboard/reviews", icon: "💬" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" }
];

export default function SellerDashboardLayout({ children }) {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <span className="font-bold text-gray-900 leading-tight block">MyShop</span>
            <span className="text-xs text-gray-400">Seller Center</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-primary transition"
          >
            ← Kembali ke Toko (Buyer)
          </Link>
        </div>
      </aside>

      {/* Main Area: Topbar + Page Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Sticky Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-800">Seller Dashboard</h1>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <span className="text-gray-600">
              Halo, <strong className="text-gray-900">John Doe</strong>
            </span>
            <Link
              href="/dashboard/settings"
              className="text-gray-500 hover:text-primary transition font-medium"
            >
              Settings
            </Link>
            <button className="bg-red-50 text-red-600 hover:bg-red-100 font-medium px-4 py-2 rounded-xl text-xs transition">
              Logout
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
