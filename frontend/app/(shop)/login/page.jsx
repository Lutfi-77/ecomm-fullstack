import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full border rounded-xl p-3" />
          <input type="password" placeholder="Password" className="w-full border rounded-xl p-3" />
          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">Login</button>
        </form>
        <p className="text-center text-sm mt-4">Don't have an account? <Link href="/register" className="text-primary hover:underline">Register</Link></p>
      </div>
    </main>
  );
}
