export const orders = Array.from({ length: 15 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  date: '2026-09-01',
  status: ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'][i % 5],
  total: Math.floor(Math.random() * 2000000) + 100000,
  items: [
    { name: 'Product A', qty: 1, price: 500000 },
    { name: 'Product B', qty: 2, price: 250000 }
  ],
  tracking: {
    courier: 'JNE Express',
    receipt: `REG12345678${i}`,
    timeline: [
      { status: 'Order Created', time: '2026-09-01 10:00' },
      { status: 'Confirmed', time: '2026-09-01 12:00' },
      { status: 'Shipped', time: '2026-09-02 09:00' }
    ]
  }
}));
