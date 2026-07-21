const calculateBtn=document.getElementById("calculateBtn");

calculateBtn.addEventListener("click",function (e){
    e.preventDefault();

    const incomeInput=document.getElementById("income");
    const amount=Number(incomeInput.value);
    const result=document.getElementById("result");

    let tax=0;

    if (isNaN(amount) || amount < 0) {
        result.textContent="Please enter a valid income.";
        return;
    }

    if(amount <= 300000){
        tax=0;
    }
    else if(amount <= 600000){
        tax=(amount - 300000) * 0.05;
    }
    else if(amount <= 900000){
        tax=(amount - 600000)*0.10+15000;
    }
    else if(amount <= 1200000){
        tax=(amount - 900000)*0.15+45000;
    }
    else if(amount <= 1500000){
        tax=(amount - 1200000)*0.20+90000;
    }
    else{
        tax=(amount - 1500000)*0.30+150000;
    }

    result.textContent=`Tax Amount: ₹${tax.toLocaleString("en-IN")}`;
});