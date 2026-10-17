import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full border rounded-xl p-3" />
          <input type="email" placeholder="Email" className="w-full border rounded-xl p-3" />
          <input type="password" placeholder="Password" className="w-full border rounded-xl p-3" />
          <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">Register</button>
        </form>
        <p className="text-center text-sm mt-4">Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link></p>
      </div>
    </main>
  );
}
