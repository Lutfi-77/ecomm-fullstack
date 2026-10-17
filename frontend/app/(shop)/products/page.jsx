import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { products } from "@/data/products";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="hidden md:block bg-white p-4 rounded-2xl shadow h-fit">
            <h3 className="font-bold mb-3">Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Category</h4>
                <ul className="space-y-1 text-sm">
                  <li><input type="checkbox" className="mr-2" /> Electronics</li>
                  <li><input type="checkbox" className="mr-2" /> Fashion</li>
                  <li><input type="checkbox" className="mr-2" /> Home</li>
                  <li><input type="checkbox" className="mr-2" /> Beauty</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Price Range</h4>
                <input type="range" className="w-full" />
              </div>
            </div>
          </aside>

          <div className="col-span-3">
            <div className="flex justify-between mb-4 items-center">
              <input type="text" placeholder="Search products..." className="border rounded-xl px-4 py-2 w-64" />
              <select className="border rounded-xl px-4 py-2">
                <option>Sort by: Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 12).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition block">
                  <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-xl" />
                  <h3 className="font-semibold mt-2">{p.name}</h3>
                  <p className="text-primary font-bold">${p.price}</p>
                  <div className="text-yellow-500 text-sm">{'★'.repeat(Math.floor(p.rating))}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
