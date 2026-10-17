import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

const heroImages = Array.from({ length: 3 }, (_, i) => `https://picsum.photos/seed/hero${i}/1200/400`);

const categories = [
  { name: "Electronics", icon: "💻" },
  { name: "Fashion", icon: "👗" },
  { name: "Home", icon: "🏠" },
  { name: "Beauty", icon: "💄" }
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative h-80 overflow-hidden rounded-2xl mb-8">
          <Image src={heroImages[0]} alt="Hero" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold">Big Sale Up To 50% Off</h1>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-2">{c.icon}</div>
                <span className="font-semibold">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Flash Sale</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 text-center">
                <div className="text-red-600 font-bold mb-2">02:15:30</div>
                <Image src={`https://picsum.photos/seed/fs${i}/200/200`} alt="product" width={200} height={200} className="rounded-xl" />
                <div className="font-semibold mt-2">$199</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                <Image src={`https://picsum.photos/seed/new${i}/300/300`} alt="new" width={300} height={300} className="rounded-xl" />
                <h3 className="font-semibold mt-2">New Product {i}</h3>
                <p className="text-primary font-bold">$399</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
