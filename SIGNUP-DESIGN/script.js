const form=document.querySelector('form');
const emailInput=document.querySelector('.input-group input');
const signupContainer=document.querySelector('.signup-container');


form.addEventListener('submit', function(event){
    event.preventDefault();
    const emailValue=emailInput.value.trim();

    if(emailValue!==""){
        showSuccessMessage(emailValue);
    }
});

function showSuccessMessage(email){
    signupContainer.innerHTML=`
        <div class="icon-container" style="background: linear-gradient(135deg, #00dfa2, #007bff); box-shadow: 0 8px 20px rgba(0, 223, 162, 0.3);">
            <i class="fas fa-paper-plane" style="font-size: 2rem; color: #ffffff;"></i>
        </div>
        <h2 style="color: #2b1055; font-size: 1.8rem; font-weight: 800; margin-bottom: 12px;">You're on the list!</h2>
        <p style="color: #6b5b95; font-size: 0.95rem; line-height: 1.6; margin-bottom: 25px;">
            We've sent a confirmation email to <br>
            <strong style="color: #7f00ff;">${email}</strong>.<br>
            Get ready for awesome coding tips!
        </p>
        <button id="back-btn" style="width: 100%; margin-top: 10px;">Awesome!</button>
    `;

    const backBtn=document.getElementById('back-btn');
    backBtn.addEventListener('click',function() {
        location.reload();
    });
}