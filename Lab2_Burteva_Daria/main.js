// Шаг 1: Создание массива транзакций
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

// Шаг 2: Функции для анализа транзакций

const getUniqueTransactionTypes = (transactions) => [...new Set(transactions.map(t => t.transaction_type))];

const calculateTotalAmount = (transactions) => transactions.reduce((sum, t) => sum + t.transaction_amount, 0);

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

const getTransactionByType = (transactions, type) => transactions.filter(t => t.transaction_type === type);

const getTransactionsInDateRange = (transactions, startDate, endDate) => {
    return transactions.filter(t => {
        const date = new Date(t.transaction_date);
        return date >= new Date(startDate) && date <= new Date(endDate);
    });
};

const getTransactionsByMerchant = (transactions, merchantName) => transactions.filter(t => t.merchant_name === merchantName);

const calculateAverageTransactionAmount = (transactions) => transactions.length === 0 ? 0 : calculateTotalAmount(transactions) / transactions.length;

const getTransactionsByAmountRange = (transactions, minAmount, maxAmount) => transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);

const calculateTotalDebitAmount = (transactions) => calculateTotalAmount(getTransactionByType(transactions, "debit"));

const findMostTransactionsMonth = (transactions) => {
    const counts = transactions.reduce((acc, t) => {
        const month = new Date(t.transaction_date).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
};

const findMostDebitTransactionMonth = (transactions) => findMostTransactionsMonth(getTransactionByType(transactions, "debit"));

const mostTransactionTypes = (transactions) => {
    const debitCount = getTransactionByType(transactions, "debit").length;
    const creditCount = getTransactionByType(transactions, "credit").length;
    return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
};

const getTransactionsBeforeDate = (transactions, date) => transactions.filter(t => new Date(t.transaction_date) < new Date(date));

const findTransactionById = (transactions, id) => transactions.find(t => t.transaction_id === id);

const mapTransactionDescriptions = (transactions) => transactions.map(t => t.transaction_description);

// Тестирование функций
console.log(getUniqueTransactionTypes(transactions));
console.log(calculateTotalAmount(transactions));
console.log(calculateTotalAmountByDate(transactions, 2024, 3));
console.log(getTransactionByType(transactions, "debit"));
console.log(getTransactionsInDateRange(transactions, "2024-03-01", "2024-03-03"));
console.log(getTransactionsByMerchant(transactions, "Amazon"));
console.log(calculateAverageTransactionAmount(transactions));
console.log(getTransactionsByAmountRange(transactions, 50, 200));
console.log(calculateTotalDebitAmount(transactions));
console.log(findMostTransactionsMonth(transactions));
console.log(findMostDebitTransactionMonth(transactions));
console.log(mostTransactionTypes(transactions));
console.log(getTransactionsBeforeDate(transactions, "2024-03-03"));
console.log(findTransactionById(transactions, "2"));
console.log(mapTransactionDescriptions(transactions));


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
console.log(getUniqueTransactionTypes(transactionsSet1));
console.log(calculateTotalAmount(transactionsSet1));
console.log(calculateTotalAmountByDate(transactionsSet1, 2024, 2));
console.log(getTransactionByType(transactionsSet1, "debit"));
console.log(getTransactionsInDateRange(transactionsSet1, "2024-02-15", "2024-02-17"));
console.log(getTransactionsByMerchant(transactionsSet1, "Uber"));
console.log(calculateAverageTransactionAmount(transactionsSet1));
console.log(getTransactionsByAmountRange(transactionsSet1, 50, 300));
console.log(calculateTotalDebitAmount(transactionsSet1));
console.log(findMostTransactionsMonth(transactionsSet1));
console.log(findMostDebitTransactionMonth(transactionsSet1));
console.log(mostTransactionTypes(transactionsSet1));
console.log(getTransactionsBeforeDate(transactionsSet1, "2024-02-17"));
console.log(findTransactionById(transactionsSet1, "2"));
console.log(mapTransactionDescriptions(transactionsSet1));

console.log("\nтест с вторым сетом:");
console.log(getUniqueTransactionTypes(transactionsSet2));
console.log(calculateTotalAmount(transactionsSet2));
console.log(calculateTotalAmountByDate(transactionsSet2, 2024, 1));
console.log(getTransactionByType(transactionsSet2, "credit"));
console.log(getTransactionsInDateRange(transactionsSet2, "2023-12-25", "2024-01-10"));
console.log(getTransactionsByMerchant(transactionsSet2, "Shell"));
console.log(calculateAverageTransactionAmount(transactionsSet2));
console.log(getTransactionsByAmountRange(transactionsSet2, 50, 500));
console.log(calculateTotalDebitAmount(transactionsSet2));
console.log(findMostTransactionsMonth(transactionsSet2));
console.log(findMostDebitTransactionMonth(transactionsSet2));
console.log(mostTransactionTypes(transactionsSet2));
console.log(getTransactionsBeforeDate(transactionsSet2, "2024-01-10"));
console.log(findTransactionById(transactionsSet2, "5"));
console.log(mapTransactionDescriptions(transactionsSet2));