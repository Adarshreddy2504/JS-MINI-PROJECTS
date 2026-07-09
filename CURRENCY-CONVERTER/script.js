const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("DOMContentLoaded", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies(){
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency =>{
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";

    } catch(error){
        console.error(error);
        resultDiv.textContent = "Failed to load currencies.";
    }
}

async function convertCurrency(e){
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if(isNaN(amount) || amount <= 0) {
        resultDiv.textContent = "Please enter a valid amount.";
        return;
    }

    if(from === to){
        resultDiv.textContent =`${amount} ${from} = ${amount.toFixed(2)} ${to}`;
        return;
    }

    try{
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = amount * rate;

        resultDiv.textContent =
            `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;

    }
    catch(error){
        console.error(error);
        resultDiv.textContent ="Conversion failed. Please try again.";
    }
}