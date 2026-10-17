import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ProductDetailPage({ params }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={`https://picsum.photos/seed/p${params.id}/600/600`} alt="product" className="w-full rounded-2xl" />
            <div className="flex gap-2 mt-4">
              {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/p${params.id}-${i}/100/100`} className="w-20 h-20 rounded-xl" />)}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Product {params.id}</h1>
            <p className="text-primary text-2xl font-bold mt-2">$499,000</p>
            <p className="text-gray-600 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Great quality product.</p>
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-primary text-white py-3 rounded-xl">Add to Cart</button>
              <button className="flex-1 border border-primary text-primary py-3 rounded-xl">Buy Now</button>
            </div>
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold mb-3">Reviews</h3>
              <div className="space-y-3">
                <div className="border p-3 rounded-xl"><p className="font-semibold">User A ★★★★★</p><p className="text-sm text-gray-600">Great product!</p></div>
                <div className="border p-3 rounded-xl"><p className="font-semibold">User B ★★★★☆</p><p className="text-sm text-gray-600">Very good quality.</p></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
