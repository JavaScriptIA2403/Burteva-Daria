const transactions = [
    {
        transaction_id: "1",
        transaction_date: "2024-03-01",
        transaction_amount: 150.75,
        transaction_type: "debit",
        transaction_description: "Grocery shopping",
        merchant_name: "SuperMart",
        card_type: "debit"
    },
    {
        transaction_id: "2",
        transaction_date: "2024-03-02",
        transaction_amount: 200.00,
        transaction_type: "credit",
        transaction_description: "Online purchase",
        merchant_name: "Amazon",
        card_type: "credit"
    },
    {
        transaction_id: "3",
        transaction_date: "2024-03-03",
        transaction_amount: 75.50,
        transaction_type: "debit",
        transaction_description: "Restaurant bill",
        merchant_name: "Foodie Place",
        card_type: "debit"
    }
];


/**
 * Получить уникальные типы транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {Array<string>} Уникальные типы транзакций.
 */
const getUniqueTransactionTypes = (transactions) => [...new Set(transactions.map(t => t.transaction_type))];

/**
 * Вычисляет общую сумму всех транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {number} Общая сумма транзакций.
 */
const calculateTotalAmount = (transactions) => transactions.reduce((sum, t) => sum + t.transaction_amount, 0);

/**
 * Вычисляет сумму транзакций за указанную дату.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {number} [year] - Год.
 * @param {number} [month] - Месяц (1-12).
 * @param {number} [day] - День.
 * @returns {number} Сумма транзакций за выбранную дату.
 */
const calculateTotalAmountByDate = (transactions, year, month, day) => {
    return transactions
        .filter(t => {
            const date = new Date(t.transaction_date);
            return (!year || date.getFullYear() === year) &&
                   (!month || date.getMonth() + 1 === month) &&
                   (!day || date.getDate() === day);
        })
        .reduce((sum, t) => sum + t.transaction_amount, 0);
};

/**
 * Возвращает транзакции по типу (например, "debit" или "credit").
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {string} type - Тип транзакции.
 * @returns {Array<Object>} Отфильтрованные транзакции.
 */
const getTransactionByType = (transactions, type) => transactions.filter(t => t.transaction_type === type);

/**
 * Получает транзакции в заданном диапазоне дат.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {string} startDate - Начальная дата (ISO строка).
 * @param {string} endDate - Конечная дата (ISO строка).
 * @returns {Array<Object>} Транзакции в заданном диапазоне.
 */
const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
};

/**
 * Получает транзакции по названию продавца.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {string} merchantName - Название продавца.
 * @returns {Array<Object>} Транзакции с данным продавцом.
 */
const getTransactionsByMerchant = (transactions, merchantName) => transactions.filter(t => t.merchant_name === merchantName);

/**
 * Вычисляет среднюю сумму транзакции.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {number} Средняя сумма транзакции.
 */
const calculateAverageTransactionAmount = (transactions) => transactions.length === 0 ? 0 : calculateTotalAmount(transactions) / transactions.length;

/**
 * Получает транзакции в указанном диапазоне сумм.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {number} minAmount - Минимальная сумма.
 * @param {number} maxAmount - Максимальная сумма.
 * @returns {Array<Object>} Транзакции, попадающие в диапазон.
 */
const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);

/**
 * Вычисляет сумму только дебетовых транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */
const calculateTotalDebitAmount = (transactions) => calculateTotalAmount(getTransactionByType(transactions, "debit"));

/**
 * Определяет месяц с наибольшим количеством транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {string} Месяц (1–12) с наибольшим количеством транзакций.
 */
const findMostTransactionsMonth = (transactions) => {
    const counts = transactions.reduce((acc, t) => {
        const month = new Date(t.transaction_date).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

/**
 * Определяет месяц с наибольшим количеством дебетовых транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {string} Месяц (1–12) с наибольшим количеством дебетовых транзакций.
 */
const findMostDebitTransactionMonth = (transactions) => findMostTransactionsMonth(getTransactionByType(transactions, "debit"));

/**
 * Определяет, какого типа транзакций больше — "debit", "credit" или они равны.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {string} Тип с наибольшим количеством транзакций или "equal".
 */
const mostTransactionTypes = (transactions) => {
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;
    return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
};

/**
 * Получает транзакции до заданной даты.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {string} date - Дата в формате ISO.
 * @returns {Array<Object>} Транзакции до указанной даты.
 */
const getTransactionsBeforeDate = (transactions, date) => transactions.filter(t => new Date(t.transaction_date) < new Date(date));

/**
 * Находит транзакцию по идентификатору.
 * @param {Array<Object>} transactions - Список транзакций.
 * @param {string} id - Идентификатор транзакции.
 * @returns {Object|undefined} Найденная транзакция или undefined.
 */
const findTransactionById = (transactions, id) => transactions.find(t => t.transaction_id === id);

/**
 * Возвращает массив описаний всех транзакций.
 * @param {Array<Object>} transactions - Список транзакций.
 * @returns {Array<string>} Массив описаний транзакций.
 */
const mapTransactionDescriptions = (transactions) => transactions.map(t => t.transaction_description);
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactions));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactions));
console.log("Сумма транзакций за март 2024:", calculateTotalAmountByDate(transactions, 2024, 3));
console.log("Дебетовые транзакции:", getTransactionByType(transactions, "debit"));
console.log("Транзакции с 2024-03-01 по 2024-03-03:", getTransactionsInDateRange(transactions, "2024-03-01", "2024-03-03"));
console.log("Транзакции от Amazon:", getTransactionsByMerchant(transactions, "Amazon"));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactions));
console.log("Транзакции в диапазоне от 50 до 200:", getTransactionsByAmountRange(transactions, 50, 200));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactions));
console.log("Месяц с наибольшим числом транзакций:", findMostTransactionsMonth(transactions));
console.log("Месяц с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactions));
console.log("Тип транзакций, которых больше:", mostTransactionTypes(transactions));
console.log("Транзакции до 2024-03-03:", getTransactionsBeforeDate(transactions, "2024-03-03"));
console.log("Поиск транзакции по ID 2:", findTransactionById(transactions, "2"));
console.log("Описания всех транзакций:", mapTransactionDescriptions(transactions));


const transactionsSet1 = [
    { transaction_id: "1", transaction_date: "2024-02-15", transaction_amount: 120.50, transaction_type: "debit", transaction_description: "Coffee Shop", merchant_name: "Starbucks", card_type: "debit" },
    { transaction_id: "2", transaction_date: "2024-02-16", transaction_amount: 300.00, transaction_type: "credit", transaction_description: "Electronics Purchase", merchant_name: "Best Buy", card_type: "credit" },
    { transaction_id: "3", transaction_date: "2024-02-17", transaction_amount: 50.75, transaction_type: "debit", transaction_description: "Taxi Ride", merchant_name: "Uber", card_type: "debit" }
];

const transactionsSet2 = [
    { transaction_id: "4", transaction_date: "2023-12-25", transaction_amount: 500.00, transaction_type: "credit", transaction_description: "Gift Shopping", merchant_name: "Amazon", card_type: "credit" },
    { transaction_id: "5", transaction_date: "2024-01-05", transaction_amount: 100.00, transaction_type: "debit", transaction_description: "Groceries", merchant_name: "Walmart", card_type: "debit" },
    { transaction_id: "6", transaction_date: "2024-01-10", transaction_amount: 200.00, transaction_type: "debit", transaction_description: "Gas", merchant_name: "Shell", card_type: "debit" }
];

console.log("тест с первым сетом:");
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactionsSet1));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactionsSet1));
console.log("Сумма транзакций за февраль 2024:", calculateTotalAmountByDate(transactionsSet1, 2024, 2));
console.log("Дебетовые транзакции:", getTransactionByType(transactionsSet1, "debit"));
console.log("Транзакции с 2024-02-15 по 2024-02-17:", getTransactionsInDateRange(transactionsSet1, "2024-02-15", "2024-02-17"));
console.log("Транзакции от Uber:", getTransactionsByMerchant(transactionsSet1, "Uber"));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactionsSet1));
console.log("Транзакции в диапазоне от 50 до 300:", getTransactionsByAmountRange(transactionsSet1, 50, 300));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactionsSet1));
console.log("Месяц с наибольшим числом транзакций:", findMostTransactionsMonth(transactionsSet1));
console.log("Месяц с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactionsSet1));
console.log("Тип транзакций, которых больше:", mostTransactionTypes(transactionsSet1));
console.log("Транзакции до 2024-02-17:", getTransactionsBeforeDate(transactionsSet1, "2024-02-17"));
console.log("Поиск транзакции по ID 2:", findTransactionById(transactionsSet1, "2"));
console.log("Описания всех транзакций:", mapTransactionDescriptions(transactionsSet1));

console.log("\nтест с вторым сетом:");
console.log("Уникальные типы транзакций:", getUniqueTransactionTypes(transactionsSet2));
console.log("Общая сумма транзакций:", calculateTotalAmount(transactionsSet2));
console.log("Сумма транзакций за январь 2024:", calculateTotalAmountByDate(transactionsSet2, 2024, 1));
console.log("Кредитные транзакции:", getTransactionByType(transactionsSet2, "credit"));
console.log("Транзакции с 2023-12-25 по 2024-01-10:", getTransactionsInDateRange(transactionsSet2, "2023-12-25", "2024-01-10"));
console.log("Транзакции от Shell:", getTransactionsByMerchant(transactionsSet2, "Shell"));
console.log("Средняя сумма транзакции:", calculateAverageTransactionAmount(transactionsSet2));
console.log("Транзакции в диапазоне от 50 до 500:", getTransactionsByAmountRange(transactionsSet2, 50, 500));
console.log("Общая сумма дебетовых транзакций:", calculateTotalDebitAmount(transactionsSet2));
console.log("Месяц с наибольшим числом транзакций:", findMostTransactionsMonth(transactionsSet2));
console.log("Месяц с наибольшим числом дебетовых транзакций:", findMostDebitTransactionMonth(transactionsSet2));
console.log("Тип транзакций, которых больше:", mostTransactionTypes(transactionsSet2));
console.log("Транзакции до 2024-01-10:", getTransactionsBeforeDate(transactionsSet2, "2024-01-10"));
console.log("Поиск транзакции по ID 5:", findTransactionById(transactionsSet2, "5"));
console.log("Описания всех транзакций:", mapTransactionDescriptions(transactionsSet2));