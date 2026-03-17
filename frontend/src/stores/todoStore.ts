import { create } from 'zustand';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  fetchTodos: () => Promise<void>;
  createTodo: (title: string, description?: string) => Promise<void>;
  sync: () => Promise<void>;
}

const loadFromLocalStorage = (): Todo[] => {
  try {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch (e) {
    console.warn('Failed to save todos to localStorage', e);
  }
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: loadFromLocalStorage(),
  filter: 'all',

  setTodos: (todos) => {
    set({ todos });
    saveToLocalStorage(todos);
  },

  addTodo: (todo) => set((state) => {
    const newTodos = [todo, ...state.todos];
    return { todos: newTodos };
  }),

  updateTodo: (id, updates) => set((state) => {
    const newTodos = state.todos.map(t => t.id === id ? { ...t, ...updates } : t);
    return { todos: newTodos };
  }),

  removeTodo: (id) => set((state) => {
    const newTodos = state.todos.filter(t => t.id !== id);
    return { todos: newTodos };
  }),

  setFilter: (filter) => set({ filter }),

  fetchTodos: async () => {
    try {
      const res = await api.get<Todo[]>('/todos');
      set({ todos: res.data });
      saveToLocalStorage(res.data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    }
  },

  createTodo: async (title, description) => {
    try {
      const res = await api.post<Todo>('/todos', { title, description });
      set((state) => ({ todos: [res.data, ...state.todos] }));
      saveToLocalStorage([res.data, ...useTodoStore.getState().todos]);
    } catch (err) {
      console.error('Failed to create todo', err);
      throw err;
    }
  },

  sync: async () => {
    // 這裡實作雙向同步邏輯（可選，MVP 先不用）
  },
}));