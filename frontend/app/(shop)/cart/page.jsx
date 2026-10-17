import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function CartPage() {
  const cartItems = [
    { id: 1, name: "Product A", price: 250000, qty: 2, image: "https://picsum.photos/seed/cart1/200/200" },
    { id: 2, name: "Product B", price: 150000, qty: 1, image: "https://picsum.photos/seed/cart2/200/200" }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-primary font-bold">${item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 border rounded">-</button>
                  <span>{item.qty}</span>
                  <button className="px-2 border rounded">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-2xl shadow h-fit">
            <h3 className="font-bold mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>$650,000</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$15,000</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="text-red-500">-$50,000</span></div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>$615,000</span></div>
            </div>
            <button className="w-full bg-primary text-white py-3 rounded-xl mt-4 hover:bg-primary-dark transition">Checkout</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
