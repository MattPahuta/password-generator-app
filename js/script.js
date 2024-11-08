// Character sets for password generation
const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:',.<>?/"
};

// Get character length value from input range slider
// - values from 1 to 20
// Get checked values from character type selection checkboxes
// - uppercase, lowercase, numbers, symbols
// - must make minimum of 1 selection
// Listen for 'submit' events on button
// - collect form data
// - call generatePassword function
// - clear any existing displayed passwords from output field
// - call render password function

// *** Display Logic ***
// Render generated password in output field
// - clear placeholder value
// - update opacity to 1
// Listen for clicks on 'copy' button, allow for copying to clipboard of generated pw
// Render strength rating in Strength field
// - update label to correct value (too weak!, weak, medium, strong)
// - update strength bars to render corresponding color coding


const optionsTest = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false
}

// Generate password from selected length and character options
function generatePassword(length, options) {
  let allChars = '';
  let password = '';
  // Add selected pw attribute options
  if (options.uppercase) allChars += CHAR_SETS.uppercase;
  if (options.lowercase) allChars += CHAR_SETS.lowercase;
  if (options.numbers) allChars += CHAR_SETS.numbers;
  if (options.symbols) allChars += CHAR_SETS.symbols;
  // Generate random password - select chars from allChars pool
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

// Display generated password
function renderPassword(password) {
  const passwordOutput = document.getElementById("passwordOutput");
  // console.log('PW passed in:', password)

  passwordOutput.textContent = password
  passwordOutput.style.opacity = 1;
}


// Handle password form submit 
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("passwordForm");
  const formData = new FormData(form);
  // selected length value
  const length = parseInt(formData.get("length"));
  // build options object from form data
  const options = {
    uppercase: formData.has("uppercase"),
    lowercase: formData.has("lowercase"),
    numbers: formData.has("numbers"),
    symbols: formData.has("symbols")
  };

  // if all options are false (none selected), return
  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    alert('select at least one option')
    return;
  }

  console.log('selected length: ', length)
  console.log(options);

  // generate password
  const password = generatePassword(length, options);
  console.log(password)
  // render password
  renderPassword(password);
}



// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  const passwordForm = document.getElementById("passwordForm");
  // Handle and update length value selection
  const lengthInput = document.getElementById('lengthInput');
  const lengthValueOutput = document.getElementById('lengthOutput');
  // Update selected password length display
  lengthInput.addEventListener("input", (event) => {
    lengthValueOutput.textContent = event.target.value;
  });

  passwordForm.addEventListener("submit", handleFormSubmit);

});
