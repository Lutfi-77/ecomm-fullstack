import { products } from "@/data/products";

export default function SellerProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-xl">+ Add New Product</button>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b"><tr><th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {products.slice(0, 10).map(p => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 flex items-center gap-3"><img src={p.image} className="w-10 h-10 rounded-lg object-cover" /> {p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">${p.price.toLocaleString()}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Active</span></td>
                <td className="p-4 text-primary hover:underline cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
