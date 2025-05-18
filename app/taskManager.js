let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function addTask(text) {
  const task = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
}

export function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
}

export function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
}

export function getTasks(filter = 'all', search = '') {
  return tasks.filter(task => {
    const matchStatus =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    const matchSearch = task.text.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
