import { Todo } from '../stores/todoStore';
import api from './api';

export const todoApi = {
  getAll: () => api.get<Todo[]>('/todos'),
  getById: (id: string) => api.get<Todo>(`/todos/${id}`),
  create: (title: string, description?: string) => api.post<Todo>('/todos', { title, description }),
  update: (id: string, updates: Partial<Todo>) => api.patch<Todo>(`/todos/${id}`, updates),
  delete: (id: string) => api.delete(`/todos/${id}`),
};