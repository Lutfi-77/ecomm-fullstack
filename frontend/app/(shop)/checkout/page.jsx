import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold mb-4">Shipping Address</h3>
              <input type="text" placeholder="Address" className="w-full border rounded-xl p-2 mb-3" defaultValue="123 Main St, Jakarta" />
              <input type="text" placeholder="City" className="w-full border rounded-xl p-2 mb-3" defaultValue="Jakarta" />
              <input type="text" placeholder="Zip Code" className="w-full border rounded-xl p-2" defaultValue="12345" />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold mb-4">Shipping Method</h3>
              <div className="space-y-2">
                <label className="flex justify-between border p-3 rounded-xl cursor-pointer"><span>Regular (3-5 days)</span><span>$15,000</span></label>
                <label className="flex justify-between border p-3 rounded-xl cursor-pointer bg-primary/5 border-primary"><span>Express (1-2 days)</span><span>$30,000</span></label>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold mb-4">Payment Method</h3>
              <div className="space-y-2">
                <label className="block border p-3 rounded-xl cursor-pointer bg-primary/5 border-primary">Bank Transfer</label>
                <label className="block border p-3 rounded-xl cursor-pointer">E-Wallet</label>
                <label className="block border p-3 rounded-xl cursor-pointer">Cash on Delivery</label>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow h-fit">
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-center border-b pb-3">
                <img src="https://picsum.photos/seed/ck1/100/100" className="w-16 h-16 rounded-xl" />
                <div className="flex-1"><h4 className="font-semibold">Product A</h4><p className="text-sm">Qty: 2</p></div>
                <span>$500,000</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>$500,000</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$30,000</span></div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>$530,000</span></div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl mt-4 hover:bg-primary-dark transition">Place Order</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
