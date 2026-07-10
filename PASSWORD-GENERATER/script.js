const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");

//password set
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

generateButton.addEventListener("click", makePassword);

copyButton.addEventListener("click", () =>{
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .then(() =>{
            showCopySuccess();
        })
        .catch(err =>{
            console.error("Failed to copy password:", err);
        });
});

function makePassword(){
    const length = Number(lengthSlider.value);
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numbersCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
        alert("Please select at least one character type.");
        return;
    }

    const newPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordInput.value = newPassword;
    updateStrengthBar(newPassword, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
}

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let characterSet = "";
    if (includeUppercase) characterSet += uppercaseLetters;
    if (includeLowercase) characterSet += lowercaseLetters;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    let password = "";

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(
            Math.random() * characterSet.length
        );
        password += characterSet[randomIndex];
    }
    return password;
}

function updateStrengthBar(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const passwordLength = password.length;
    const typesSelected = [includeUppercase, includeLowercase, includeNumbers, includeSymbols].filter(Boolean).length;

    let strength = typesSelected * 17.5;
    const lengthScore = Math.min((passwordLength / 12) * 30, 30);
    strength += lengthScore;
    strength = Math.round(Math.min(strength, 100));

    let color;
    let label;
    let displayWidth;

    if(strength < 50){
        color = "#ef4444";
        label = "Weak";
        displayWidth = (strength / 50) * 33;
    }
    else if(strength < 80){
        color = "#f59e0b";
        label = "Medium";
        displayWidth = 34 + ((strength - 50) / 30) * 33;
    }
    else{
        color = "#22c55e";
        label = "Strong";
        displayWidth = 67 + ((strength - 80) / 20) * 33;
    }

    strengthBar.style.width = displayWidth + "%";
    strengthBar.style.background = color;

    strengthLabel.textContent = label;
    strengthLabel.style.color = color;
}

function showCopySuccess() {
    copyButton.classList.remove("far", "fa-copy");
    copyButton.classList.add("fas", "fa-check");
    copyButton.style.color = "#22c55e";

    setTimeout(() => {
        copyButton.classList.remove("fas", "fa-check");
        copyButton.classList.add("far", "fa-copy");
        copyButton.style.color = "";
    }, 1500);
}

window.addEventListener("load", () => {
    lengthValue.textContent = lengthSlider.value;
    makePassword();
});

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
    makePassword();
});

uppercaseCheckbox.addEventListener("change", makePassword);
lowercaseCheckbox.addEventListener("change", makePassword);
numbersCheckbox.addEventListener("change", makePassword);
symbolsCheckbox.addEventListener("change", makePassword);