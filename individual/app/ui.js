import { addTask, deleteTask, toggleTask, getTasks } from './taskManager.js';

const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const search = document.getElementById('search');
const filter = document.getElementById('status-filter');

export function renderTasks() {
  const tasks = getTasks(filter.value, search.value);
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add('task-text');
    span.onclick = () => {
      toggleTask(task.id);
      renderTasks();
    };

    const btn = document.createElement('button');
    btn.textContent = 'Удалить';
    btn.onclick = () => {
      deleteTask(task.id);
      renderTasks();
    };

    const actions = document.createElement('div');
    actions.classList.add('task-actions');
    actions.appendChild(btn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

export function setupUI() {
  form.onsubmit = e => {
    e.preventDefault();
    const value = input.value.trim();
    if (value === '') return alert('Введите задачу!');
    addTask(value);
    input.value = '';
    renderTasks();
  };

  search.oninput = renderTasks;
  filter.onchange = renderTasks;
}
