const toggle=document.getElementById("billing-toggle");
const basicPrice=document.getElementById("basic-price");
const proPrice=document.getElementById("pro-price");
const enterprisePrice=document.getElementById("enterprise-price");

toggle.addEventListener("change",() =>{
    if(toggle.checked){
        basicPrice.textContent="4999";
        proPrice.textContent="9999";
        enterprisePrice.textContent="24999";
        document.querySelectorAll(".period").forEach(period=>{
            period.textContent="/year";
        });
    }
    else{
        basicPrice.textContent="499";
        proPrice.textContent="999";
        enterprisePrice.textContent="2499";
        document.querySelectorAll(".period").forEach(period=>{
            period.textContent="/month";
        });
    }
});