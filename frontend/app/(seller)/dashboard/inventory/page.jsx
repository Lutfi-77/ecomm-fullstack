export default function SellerInventoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b"><tr><th className="p-4">Product Name</th><th className="p-4">SKU</th><th className="p-4">Current Stock</th><th className="p-4">Alert</th></tr></thead>
          <tbody>
            {[ { name: "Product A", stock: 5 }, { name: "Product B", stock: 50 }, { name: "Product C", stock: 2 } ].map((item, i) => (
              <tr key={i} className="border-b">
                <td className="p-4">{item.name}</td>
                <td className="p-4">SKU-00{i}</td>
                <td className="p-4">{item.stock}</td>
                <td className="p-4">{item.stock < 10 ? <span className="text-red-500 font-bold">Low Stock!</span> : 'Normal'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
