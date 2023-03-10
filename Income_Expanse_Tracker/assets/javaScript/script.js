// Select elements from the DOM
const balance = document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans = document.querySelector("#trans");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const form = document.querySelector("#form");

// Dummy transaction data
// const dummyData = [
//   { id: 1, description: "Salary", amount: 300 },
//   { id: 2, description: "Rent", amount: -150 },
//   { id: 3, description: "Groceries", amount: -50 },
// ];

// let transactions = dummyData;
const localStorageTrans=JSON.parse(localStorage.getItem("exp_inc"));  
let transactions=localStorage.getItem("exp_inc") !== null ? localStorageTrans:[];
// Load initial transaction details
function loadTransactionDetails(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "exp" : "inc");
  item.innerHTML = `
    ${transaction.description}
    <span>${sign} ₹${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  trans.appendChild(item);
}

// Remove a transaction
function removeTransaction(id) {

    transactions = transactions.filter((transaction) => transaction.id !== id);
    localStorageTrans();
    refreshPage();
  
}
function updateAmount() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((amount) => amount < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  balance.innerHTML = `₹${total}`;
  inc_amt.innerHTML = `₹${income}`;
  exp_amt.innerHTML = `₹${expense}`;
}

// Refresh the transaction details on the page
function refreshPage() {
  trans.innerHTML = "";
  transactions.forEach(loadTransactionDetails);
  updateAmount();
  updateLocalStorage();
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter a description and amount");
    return;
  }
  const transaction = {
    id: transactions.length + 1,
    description: description.value,
    amount: parseInt(amount.value),
  };
  transactions.push(transaction);
  refreshPage();
  description.value = "";
  amount.value = "";
});

// Load initial transaction details and update amounts
window.addEventListener("load", () => {
  refreshPage();
});
function updateLocalStorage(){
    localStorage.setITem("exp_inc",JSON.stringify(transactions));
}