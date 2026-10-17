export const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000000) + 50000,
  category: ['Electronics', 'Fashion', 'Home', 'Beauty'][i % 4],
  rating: (Math.random() * 2 + 3).toFixed(1),
  image: `https://picsum.photos/seed/${i + 1}/400/400`,
  stock: Math.floor(Math.random() * 100),
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}));
