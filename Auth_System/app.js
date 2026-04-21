import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import dotenv from 'dotenv';
import morgan from 'morgan';
import pool from './Config/db.js';

//dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import usersRouter from './routes/UserRoutes.js';

let indexRouter;
async function loadIndexRouter() {
  indexRouter = (await import('./routes/index.js')).default;
}
loadIndexRouter().catch(console.error);

const app = express();

// Logging
app.use(morgan('dev'));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files
app.use(express.static(join(__dirname, 'public')));

// Wait for router
setTimeout(() => {
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
}, 100);

// Test DB connection
async function testDB() {
  try {
    await pool.getConnection();
    console.log('✅ MySQL pool ready');
  } catch (err) {
    console.error('❌ DB Connection failed:', err.message);
  }
}
testDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
