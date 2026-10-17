"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 }, { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 }, { name: 'Sun', sales: 3490 },
];

export default function OverviewPage() {
  return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[ { label: 'Total Sales', value: '$12,450' }, { label: 'Orders', value: '150' }, { label: 'Products', value: '30' }, { label: 'Views', value: '1,200' } ].map(stat => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow h-80">
          <h3 className="font-bold mb-4">Sales Analytics</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <h3 className="font-bold p-6 border-b">Recent Orders</h3>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50"><tr className="border-b"><th className="p-4">Order ID</th><th className="p-4">Customer</th><th className="p-4">Status</th><th className="p-4">Total</th></tr></thead>
            <tbody>
              { [1,2,3,4].map(i => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4">ORD-100{i}</td>
                  <td className="p-4">Customer {i}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                  <td className="p-4">$250,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
