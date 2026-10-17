export const reviews = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  productId: (i % 5) + 1,
  user: `User ${i + 1}`,
  rating: Math.floor(Math.random() * 2) + 4,
  comment: "Great product, highly recommend!",
  date: '2026-08-25'
}));
