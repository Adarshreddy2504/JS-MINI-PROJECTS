const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    if (description === "" || isNaN(amount)) {
        return;
    }
    transactions.push({
        id: Date.now(),
        description,
        amount
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    transactionFormEl.reset();
}

function updateTransactionList() {
    transactionListEl.innerHTML = "";
    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach(transaction => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");

    li.classList.add("transaction");
    li.classList.add(transaction.amount < 0 ? "expense" : "income");

    li.innerHTML = `
        <span class="description">${transaction.description}</span>
        <span class="amount">
            ${transaction.amount < 0 ? "-" : "+"}$${Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
            ×
        </button>
    `;

    return li;
}

function updateSummary() {
    const balance = transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );

    const income = transactions.filter(transaction => transaction.amount > 0).reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions.filter(transaction => transaction.amount < 0).reduce((acc, transaction) => acc + transaction.amount, 0);

    balanceEl.textContent = `$${balance.toFixed(2)}`;
    incomeAmountEl.textContent = `$${income.toFixed(2)}`;
    expenseAmountEl.textContent = `$${Math.abs(expense).toFixed(2)}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    updateTransactionList();
    updateSummary();
}

updateTransactionList();
updateSummary();



