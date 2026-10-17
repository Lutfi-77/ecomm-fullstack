import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`👤 User Service is running on http://localhost:${PORT}`);
  console.log(`========================================`);
});
