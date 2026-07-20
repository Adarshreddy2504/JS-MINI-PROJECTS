const contactForm=document.getElementById('contact-form');
const firstNameInput=document.getElementById('first-name');
const emailInput=document.getElementById('email');
const submitBtn=document.querySelector('.submit-btn');
const thankYouBlock=document.getElementById('thank-you-block');
const thankYouText=document.getElementById('thank-you-text');

contactForm.addEventListener('submit', function (event){
    event.preventDefault();

    const firstName=firstNameInput.value;
    const email=emailInput.value;

    if(!email.includes('@')){
        alert('Please enter a valid email address.');
        return;
    }

    submitBtn.innerText='Sending...';

    setTimeout(function (){
        thankYouText.innerText='Thank you, ' + firstName + '! Your message has been sent successfully.';
        thankYouBlock.style.display='block';

        contactForm.reset();
        submitBtn.innerText = 'Send Message';
    }, 1500);
});