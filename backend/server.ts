import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import app from './src/app';

const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000;

function startServer(): void {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Gagal Menjalankan Server', error);
    process.exit(1);
  }
}

startServer();
