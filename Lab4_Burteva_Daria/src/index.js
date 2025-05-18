import { transactions } from './transactions.js';
import { generateId, formatDate } from './utils.js';
import { renderTransaction, calculateTotal } from './ui.js';

document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();

  if (!description || isNaN(amount)) {
    alert('Пожалуйста, введите корректные данные');
    return;
  }

  const tx = {
    id: generateId(),
    date: formatDate(),
    amount,
    category,
    description
  };

  transactions.push(tx);
  renderTransaction(tx);
  calculateTotal();
  e.target.reset();
});

document.getElementById('transactions-table').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const tr = e.target.closest('tr');
    const id = tr.dataset.id;

    const index = transactions.findIndex(tx => tx.id === id);
    if (index !== -1) transactions.splice(index, 1);

    tr.remove();
    calculateTotal();
  }
});

document.querySelector('#transactions-table tbody').addEventListener('click', (e) => {
  const tr = e.target.closest('tr');
  if (!tr) return;

  const id = tr.dataset.id;
  const tx = transactions.find(tx => tx.id === id);

  if (tx) {
    document.getElementById('full-description').textContent = `Полное описание: ${tx.description}`;
  }
});
