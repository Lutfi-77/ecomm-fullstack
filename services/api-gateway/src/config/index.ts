import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  services: {
    user: process.env.USER_SERVICE_URL || 'http://localhost:5001',
    product: process.env.PRODUCT_SERVICE_URL || 'http://localhost:5002',
    order: process.env.ORDER_SERVICE_URL || 'http://localhost:5003',
    payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:5004',
  },
};
