import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function Home({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchTasks() }, []);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch('/api/tasks');
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }

  async function addTask(payload) {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const t = await res.json();
      setTasks(prev => [t, ...prev]);
    } else {
      const e = await res.json();
      alert('Error: ' + (e.error || 'Unable to create task'));
    }
  }

  async function updateTask(id, payload) {
    const res = await fetch('/api/tasks/' + id, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const updated = await res.json();
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      setEditing(null);
    } else {
      const e = await res.json();
      alert('Error: ' + (e.error || 'Unable to update'));
    }
  }

  async function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    const res = await fetch('/api/tasks/' + id, { method: 'DELETE' });
    if (res.ok) {
      setTasks(prev => prev.filter(t => t.id !== id));
    } else {
      const e = await res.json();
      alert('Error: ' + (e.error || 'Unable to delete'));
    }
  }

  async function toggleComplete(id, current) {
    await updateTask(id, { title: current.title, description: current.description, completed: !current.completed });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-200">Hi, <strong>{user.name}</strong></span>
          <button 
            onClick={onLogout} 
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Task Form */}
        <div className="mb-6">
          <TaskForm 
            onCreate={addTask} 
            editing={editing} 
            onUpdate={updateTask} 
            onCancel={() => setEditing(null)} 
          />
        </div>

        {/* Task List */}
        <section className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Tasks</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400">No tasks yet. Add one above!</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map(t => (
                <TaskItem 
                  key={t.id} 
                  task={t} 
                  onEdit={() => setEditing(t)} 
                  onDelete={() => deleteTask(t.id)} 
                  onToggle={() => toggleComplete(t.id, t)} 
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
