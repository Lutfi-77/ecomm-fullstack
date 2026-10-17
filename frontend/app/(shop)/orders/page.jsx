import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { orders } from "@/data/orders";
import Link from "next/link";

export default function OrdersPage() {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800"
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b"><tr className="text-sm font-semibold"><th className="p-4">Order ID</th><th className="p-4">Date</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Action</th></tr></thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">${order.total.toLocaleString()}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span></td>
                  <td className="p-4"><Link href={`/orders/${order.id}`} className="text-primary hover:underline">Track</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
