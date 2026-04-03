import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Nhớ đuôi .js
import borrowingRoutes from './routes/borrowingRoute.js'; // Nhớ đuôi .js
import bookRoutes from './routes/bookRoute.js'; // Nhớ đuôi .js
import authorRoutes from './routes/authorRoute.js'; // Nhớ đuôi .js
import statsRoutes from './routes/statsRoute.js'; // Nhớ đuôi .js


// Load biến môi trường
dotenv.config();

const app = express();
const allowedOrigins = [
  "https://app.com",
  "https://admin.app.com",
  "http://localhost:3000"
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin || allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Origin not allowed"));
      }
    },
    credentials: true,
  })
);

// Middleware quan trọng: Giúp Express hiểu được dữ liệu JSON
// Nếu thiếu dòng này, req.body sẽ bị undefined
app.use(express.json());

// Kết nối Database
connectDB();

// Route gốc
// Mọi request bắt đầu bằng /api/borrowings sẽ đi vào borrowingRoutes
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/stats', statsRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});