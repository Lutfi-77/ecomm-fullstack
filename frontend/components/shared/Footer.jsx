export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white font-bold mb-3">Logo</h3>
        <p className="text-sm">© 2026 MyShop. All rights reserved.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <ul className="text-sm space-y-1">
          <li>Electronics</li><li>Fashion</li><li>Home</li><li>Beauty</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Info</h4>
        <ul className="text-sm space-y-1">
          <li>About Us</li><li>Contact</li><li>Shipping</li><li>Returns</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-3">Social</h4>
        <ul className="text-sm space-y-1">
          <li>Instagram</li><li>Facebook</li><li>Twitter</li>
        </ul>
      </div>
    </footer>
  );
}
