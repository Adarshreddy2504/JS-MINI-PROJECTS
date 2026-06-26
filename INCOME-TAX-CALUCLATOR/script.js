const caluclateBtn=document.getElementById("calculateBtn");

caluclateBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const income=document.getElementById("income");
    const amount=parseInt(income.value);
    const result=document.getElementById("result");
    let tax=0;

    if (amount <= 300000) {
        tax = 0;
    }
    else if (amount <= 600000) {
        tax = (amount - 300000) * 0.05;
    }
    else if (amount <= 900000) {
        tax = (amount - 600000) * 0.10 + 15000;
    }
    else if (amount <= 1200000) {
        tax = (amount - 900000) * 0.15 + 15000 + 30000;
    }
    else if (amount <= 1500000) {
        tax = (amount - 1200000) * 0.20 + 15000 + 30000 + 45000;
    }
    else {
        tax = (amount - 1500000) * 0.30 + 15000 + 30000 + 45000 + 60000;
    }

    result.textContent=`Tax Amount: ₹${tax}`
})