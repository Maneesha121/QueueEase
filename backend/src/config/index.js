/**
 * QueueEase V2 — Configuration Module
 * Central configuration for the Express backend.
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  
  // MongoDB
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/queueease',
  
  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    expire: process.env.JWT_EXPIRE || '7d',
  },
  
  // Firebase Admin
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
  
  // ML Microservice
  mlService: {
    url: process.env.ML_SERVICE_URL || 'http://localhost:8001',
    apiKey: process.env.ML_API_KEY || 'queueease-ml-api-key-2024',
  },
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  socketCorsOrigin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:5173',
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  
  // Queue defaults
  queue: {
    maxPerSlot: 5,
    slotDurationMinutes: 15,
    emergencyPriorityWeight: 10,
  },
};
