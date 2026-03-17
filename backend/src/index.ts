import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import todoRouter from './routes/todos.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const prisma = new PrismaClient();

// 環境變數處理（簡化版，可用 dotenv）
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// 速率限制
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { success: false, error: 'RATE_LIMIT_EXCEEDED', message: '請求過於頻繁' },
});
app.use('/api', limiter);

//Routes
app.use('/api/todos', todoRouter(prisma));

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});