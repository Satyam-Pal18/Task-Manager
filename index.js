const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const DATA_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(bodyParser.json());

// load/save helpers
function loadTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// Validation middleware
function validateTask(req, res, next) {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
  }
  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string.' });
  }
  next();
}

// APIs
app.get('/api/tasks', (req, res) => {
  const tasks = loadTasks();
  res.json(tasks);
});

app.get('/api/tasks/:id', (req, res) => {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

app.post('/api/tasks', validateTask, (req, res) => {
  const tasks = loadTasks();
  const { title, description } = req.body;
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: (description || '').trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  tasks.unshift(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', validateTask, (req, res) => {
  const tasks = loadTasks();
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const { title, description, completed } = req.body;
  tasks[idx] = {
    ...tasks[idx],
    title: title.trim(),
    description: (description || '').trim(),
    completed: typeof completed === 'boolean' ? completed : tasks[idx].completed,
    updatedAt: new Date().toISOString()
  };
  saveTasks(tasks);
  res.json(tasks[idx]);
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = loadTasks();
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const removed = tasks.splice(idx, 1)[0];
  saveTasks(tasks);
  res.json({ success: true, removed });
});

// static serve (optional) - will serve built client if present
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on port', PORT));
