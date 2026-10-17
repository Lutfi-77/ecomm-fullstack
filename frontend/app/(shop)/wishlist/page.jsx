import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function WishlistPage() {
  const items = [1, 2, 3, 4, 5].map(i => ({ id: i, name: `Wishlist Item ${i}`, price: i * 100000 }));

  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition text-center">
              <img src={`https://picsum.photos/seed/wish${item.id}/300/300`} alt="wishlist" className="w-full h-48 object-cover rounded-xl mb-2" />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary font-bold">${item.price.toLocaleString()}</p>
              <button className="mt-2 w-full bg-primary text-white py-2 rounded-xl hover:bg-primary-dark transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
