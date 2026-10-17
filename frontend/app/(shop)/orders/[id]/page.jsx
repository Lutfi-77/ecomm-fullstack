import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { orders } from "@/data/orders";

export default function OrderDetailPage({ params }) {
  const order = orders.find(o => o.id === params.id) || orders[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Order Tracking: {order.id}</h1>
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <p className="text-sm text-gray-500 mb-4">Courier: {order.tracking.courier} | Receipt: {order.tracking.receipt}</p>
          <div className="relative border-l-2 border-primary ml-4 space-y-8">
            {['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'In Transit', 'Arrived', 'Out for Delivery', 'Delivered'].map((step, i) => (
              <div key={step} className="relative pl-8">
                <div className="absolute -left-[1.25rem] top-0 bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">{i + 1}</div>
                <h4 className={`font-semibold ${i < order.tracking.timeline.length ? 'text-gray-900' : 'text-gray-400'}`}>{step}</h4>
                <p className="text-xs text-gray-400">{i < order.tracking.timeline.length ? order.tracking.timeline[i]?.time || 'Completed' : 'Pending'}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
