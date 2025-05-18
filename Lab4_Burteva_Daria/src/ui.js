import { transactions } from './transactions.js';

export function renderTransaction(tx) {
  const tbody = document.querySelector('#transactions-table tbody');

  const tr = document.createElement('tr');
  tr.className = tx.amount >= 0 ? 'green' : 'red';
  tr.dataset.id = tx.id;

  tr.innerHTML = `
    <td>${tx.date}</td>
    <td>${tx.category}</td>
    <td>${tx.description.split(' ').slice(0, 4).join(' ')}</td>
    <td><button class="delete-btn">Удалить</button></td>
  `;

  tbody.appendChild(tr);
}

export function calculateTotal() {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  document.getElementById('total-amount').textContent = total.toFixed(2);
}
