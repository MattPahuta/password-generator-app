// Character sets for password generation
// symbols list from OWASP (https://owasp.org/www-community/password-special-characters)
const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!\"#$%& '()*+,-./:;<=>?@[\]^_`{|}~"
};
// Global variables
const passwordOutput = document.getElementById("passwordOutput");
const copyBtn = document.getElementById("copyBtn");
const strengthBars = document.querySelectorAll(".bar");
const strengthRating = document.getElementById("strengthRating");
const alertDialog = document.getElementById("alert");
const alertCloseBtn = document.getElementById("alert-close-btn");

// Generate password
function generatePassword(length, options) {
  let allChars = "";
  let password = "";
  if (options.uppercase) allChars += CHAR_SETS.uppercase;
  if (options.lowercase) allChars += CHAR_SETS.lowercase;
  if (options.numbers) allChars += CHAR_SETS.numbers;
  if (options.symbols) allChars += CHAR_SETS.symbols;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

// Display generated password
function renderPassword(password) {
  passwordOutput.textContent = password;
  passwordOutput.style.opacity = 1;
  passwordOutput.dataset.copy = "ready";
}

// Evaluate password strength
function evaluatePasswordStrength(password, options) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (options.uppercase && /[A-Z]/.test(password)) score += 1;
  if (options.lowercase && /[a-z]/.test(password)) score += 1;
  if (options.numbers && /[0-9]/.test(password)) score += 1;
  if (options.symbols && /[!#$%& '()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) score += 1;
  renderStrengthOutput(score)
}

// Render password strength label and indicator bars
function renderStrengthOutput(ratingScore) {
  resetStrengthOutput();
  const legend = {};
  switch (ratingScore) {
    case 0:
    case 1:
    case 2:
      legend.ratingLabel = "Too Weak!";
      legend.barCount = 1;
      legend.barColor = 'hsl(0, 91%, 63%)';
      break;
    case 3:
      legend.ratingLabel = "Weak";
      legend.barCount = 2;
      legend.barColor = 'hsl(13, 95%, 66%)';
      break;
    case 4:
      legend.ratingLabel = "Medium";
      legend.barCount = 3;
      legend.barColor = 'hsl(42, 91%, 68%)';
      break;
    default:
      legend.ratingLabel = "Strong";
      legend.barCount = 4;
      legend.barColor = 'hsl(127, 100%, 82%)';
  }

  const styledBars = Array.from(strengthBars).slice(0, legend.barCount);
  strengthRating.textContent = legend.ratingLabel;
  styledBars.forEach(bar => {
    bar.style.backgroundColor = legend.barColor;
    bar.style.borderColor = legend.barColor;
  });
}

// Reset strength label and indicator bars
function resetStrengthOutput() {
  strengthRating.textContent = "";
  strengthBars.forEach(bar => { 
    bar.style.backgroundColor = 'transparent';
    bar.style.borderColor = 'hsl(252, 11%, 91%)';
  });
}

// Handle password form submit 
function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("passwordForm");
  const formData = new FormData(form);
  const length = parseInt(formData.get("length"));
  const options = {
    uppercase: formData.has("uppercase"),
    lowercase: formData.has("lowercase"),
    numbers: formData.has("numbers"),
    symbols: formData.has("symbols")
  };

  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    alertDialog.showModal();
    return;
  }
  const password = generatePassword(length, options);
  evaluatePasswordStrength(password, options);
  renderPassword(password);
}

// Handle Password copy to clipboard
async function handlePasswordCopy() {
  const password = passwordOutput.textContent;
  const copyMessage = document.getElementById("copyMessage");

  if (passwordOutput.dataset.copy === "ready") {
    copyMessage.textContent = "copied";
    await navigator.clipboard.writeText(password);
    setTimeout(() => {
      copyMessage.style.transition = "all 1s";
      copyMessage.style.opacity = 0;
      setTimeout(() => {
        copyMessage.style.removeProperty("opacity");
        copyMessage.style.removeProperty("transition");
        copyMessage.textContent = "";
      }, 1000);
    }, 1000);
  }
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("passwordForm");
  const lengthInput = document.getElementById('lengthInput');
  const lengthValueOutput = document.getElementById('lengthOutput');
  lengthInput.addEventListener("input", (event) => {
    lengthValueOutput.textContent = event.target.value;
  });
  passwordForm.addEventListener("submit", handleFormSubmit);
  copyBtn.addEventListener('click', handlePasswordCopy);
  alertCloseBtn.addEventListener('click', () => {
    alertDialog.close();
  });
});
