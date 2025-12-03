import React, { useState, useEffect } from 'react';

export default function TaskForm({ onCreate, editing, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setDescription(editing.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editing]);

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    if (editing) {
      onUpdate(editing.id, { title, description });
    } else {
      onCreate({ title, description });
      setTitle('');
      setDescription('');
    }
  }

  return (
    <form 
      onSubmit={submit} 
      className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mb-6 transition-transform transform hover:scale-105"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {editing ? 'Edit Task' : 'Add Task'}
      </h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition resize-none"
        rows={4}
      />

      <div className="flex gap-3 justify-end">
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          {editing ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}
