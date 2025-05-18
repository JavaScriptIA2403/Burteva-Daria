export const transactions = [];

/**
 * Удаление транзакции по ID
 * @param {string} id - ID транзакции
 */
export function deleteTransaction(id) {
  const index = transactions.findIndex(tx => tx.id === id);
  if (index !== -1) transactions.splice(index, 1);
}
