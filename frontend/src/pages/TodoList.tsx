import { useState } from 'react';
import { useTodoStore } from '../stores/todoStore';
import { todoApi } from '../services/todoApi';

export default function TodoList() {
  const { todos, filter, updateTodo, removeTodo, setFilter } = useTodoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await todoApi.create(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      // 可以選擇重新 fetch 或 rely on store 更新
      useTodoStore.getState().fetchTodos();
    } catch (err) {
      alert('新增失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await todoApi.update(id, { completed });
      updateTodo(id, { completed });
    } catch (err) {
      alert('更新失敗');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定刪除？')) return;
    try {
      await todoApi.delete(id);
      removeTodo(id);
    } catch (err) {
      alert('刪除失敗');
    }
  };

  const startEdit = (id: string, currentTitle: string, currentDescription?: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const submitEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    try {
      await todoApi.update(id, { title: editTitle.trim(), description: editDescription.trim() || undefined });
      updateTodo(id, { title: editTitle.trim(), description: editDescription.trim() || undefined });
      cancelEdit();
    } catch (err) {
      alert('編輯失敗');
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">標題</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="輸入待辦標題"
            maxLength={100}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">描述（選填）</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            placeholder="輸入描述"
            maxLength={500}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? '新增中...' : '新增'}
        </button>
      </form>

      {/* Filters */}
      <div className="flex space-x-4">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded ${filter === f ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            {f === 'all' ? '全部' : f === 'active' ? '未完成' : '已完成'}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="space-y-3">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div className="flex-1">
              {editingId === todo.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border p-1"
                    maxLength={100}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full border p-1"
                    maxLength={500}
                  />
                  <div className="space-x-2">
                    <button onClick={() => submitEdit(todo.id)} className="text-green-600">儲存</button>
                    <button onClick={cancelEdit} className="text-gray-600">取消</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}
                  </h3>
                  {todo.description && <p className="text-gray-600 text-sm">{todo.description}</p>}
                  <p className="text-xs text-gray-400">建立於 {new Date(todo.createdAt).toLocaleString('zh-TW')}</p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, !todo.completed)}
              />
              <button onClick={() => startEdit(todo.id, todo.title, todo.description)} className="text-blue-600">編輯</button>
              <button onClick={() => handleDelete(todo.id)} className="text-red-600">刪除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}