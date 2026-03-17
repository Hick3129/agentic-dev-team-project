import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

export const todoRouter = (prisma: any) => {
  const router = express.Router();

  // GET /api/todos
  router.get('/', async (req: Request, res: Response) => {
    try {
      const { completed } = req.query;
      const where = completed === 'true' || completed === 'false' ? { completed: completed === 'true' } : undefined;
      const todos = await prisma.todo.findMany({ where, orderBy: { createdAt: 'desc' } });
      res.json(todos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'DATABASE_ERROR', message: '資料庫錯誤' });
    }
  });

  // GET /api/todos/:id
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const todo = await prisma.todo.findUnique({ where: { id: req.params.id } });
      if (!todo) return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      res.status(500).json({ success: false, error: 'DATABASE_ERROR', message: '資料庫錯誤' });
    }
  });

  // POST /api/todos
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body;
      if (!title || typeof title !== 'string' || title.length > 100) {
        return res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: '標題必填且最多 100 字元' });
      }
      const todo = await prisma.todo.create({
        data: {
          title: title.trim(),
          description: description?.trim(),
        },
      });
      res.status(201).json(todo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'INTERNAL_ERROR', message: '建立失敗' });
    }
  });

  // PATCH /api/todos/:id
  router.patch('/:id', async (req: Request, res: Response) => {
    try {
      const { title, description, completed } = req.body;
      const updates: Prisma.TodoUpdateInput = {};
      if (title !== undefined) updates.title = title.trim();
      if (description !== undefined) updates.description = description?.trim();
      if (completed !== undefined) updates.completed = completed;
      const todo = await prisma.todo.update({
        where: { id: req.params.id },
        data: updates,
      });
      res.json(todo);
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Todo not found' });
      }
      res.status(500).json({ success: false, error: 'INTERNAL_ERROR', message: '更新失敗' });
    }
  });

  // DELETE /api/todos/:id
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await prisma.todo.delete({ where: { id: req.params.id } });
      res.json({ success: true, message: 'Deleted' });
    } catch (err) {
      if (err.code === 'P2025') {
        return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'Todo not found' });
      }
      res.status(500).json({ success: false, error: 'INTERNAL_ERROR', message: '刪除失敗' });
    }
  });

  return router;
};