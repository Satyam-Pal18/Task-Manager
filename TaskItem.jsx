export default function TaskItem({ task, onEdit, onDelete, onToggle }) {
  return (
    <li className={`p-4  gap-10 rounded shadow flex justify-between items-center transition transform hover:scale-105 
      ${task.completed ? 'bg-green-100 line-through text-gray-500' : 'bg-gray-50'}
    `}>
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-gray-700">{task.description}</p>
      </div>
      <div className="flex gap-8">
        <button 
          onClick={onToggle} 
          className={`px-3 py-1 rounded text-white ${task.completed ? 'bg-yellow-500' : 'bg-green-500'} hover:opacity-80 transition`}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button 
          onClick={onEdit} 
          className="px-3 py-1 rounded bg-blue-500 text-white hover:opacity-80 transition"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          className="px-3 py-1 rounded bg-red-500 text-white hover:opacity-80 transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
