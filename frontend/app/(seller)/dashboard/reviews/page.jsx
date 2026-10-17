export default function SellerReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Customer Reviews</h1>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between mb-2"><h3 className="font-bold">User {i}</h3><span className="text-yellow-500">★★★★★</span></div>
            <p className="text-gray-600 text-sm mb-4">"Great quality product, fast shipping!"</p>
            <div className="flex gap-2"><input type="text" placeholder="Reply..." className="flex-1 border rounded-xl px-4 py-2" /><button className="bg-primary text-white px-4 py-2 rounded-xl">Send</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
