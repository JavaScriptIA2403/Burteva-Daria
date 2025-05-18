export function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  /** Форматирование текущей даты */
  export function formatDate() {
    return new Date().toLocaleString();
  }