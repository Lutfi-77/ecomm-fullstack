export default function SellerSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Store Settings</h1>
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div><label className="block text-sm font-semibold mb-1">Store Name</label><input type="text" className="w-full border rounded-xl p-3" defaultValue="My Awesome Store" /></div>
        <div><label className="block text-sm font-semibold mb-1">Store Description</label><textarea className="w-full border rounded-xl p-3 h-24">Best gadgets in town.</textarea></div>
        <div><label className="block text-sm font-semibold mb-1">Bank Account</label><input type="text" className="w-full border rounded-xl p-3" defaultValue="BCA - 1234567890" /></div>
        <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold">Save Changes</button>
      </div>
    </div>
  );
}
