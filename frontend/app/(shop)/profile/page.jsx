import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div><h2 className="text-xl font-bold">John Doe</h2><p className="text-gray-500">john@example.com</p></div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600">123 Main St, Jakarta, 12345</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recent Orders</h3>
            <div className="space-y-2">
              <div className="border p-3 rounded-xl flex justify-between"><span>ORD-1001</span><span className="text-green-600">Completed</span></div>
              <div className="border p-3 rounded-xl flex justify-between"><span>ORD-1002</span><span className="text-blue-600">Processing</span></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
