export default function SellerOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b"><tr><th className="p-4">Order ID</th><th className="p-4">Date</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Total</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {[1,2,3,4,5].map(i => (
              <tr key={i} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">ORD-100{i}</td>
                <td className="p-4">2026-09-0{i}</td>
                <td className="p-4">Customer {i}</td>
                <td className="p-4"><select className="border rounded px-2 py-1"><option>Processing</option><option>Shipped</option><option>Delivered</option></select></td>
                <td className="p-4">$300,000</td>
                <td className="p-4 text-primary hover:underline cursor-pointer">Details</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
