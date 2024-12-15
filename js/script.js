// Character sets for password generation
const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!\"#$%& '()*+,-./:;<=>?@[\]^_`{|}~"
};

const strengthBars = document.querySelectorAll('.bar');
const strengthRating = document.getElementById('strengthRating');

// symbols list from OWASP (https://owasp.org/www-community/password-special-characters)

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
// - update strength strengthBars to render corresponding color coding

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

  console.log('AllChars: ', allChars)

  return password;
}

// Display generated password
function renderPassword(password) {
  const passwordOutput = document.getElementById("passwordOutput");
  // console.log('PW passed in:', password)
  passwordOutput.textContent = password
  passwordOutput.style.opacity = 1;
}

// Evaluate password strength
function evaluatePasswordStrength(password, options) {
  let score = 0;
  // Scoring based on length and character types
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (options.uppercase && /[A-Z]/.test(password)) score += 1; // Uppercase check
  if (options.lowercase && /[a-z]/.test(password)) score += 1; // Lowercase check
  if (options.numbers && /[0-9]/.test(password)) score += 1;   // Number check
  if (options.symbols && /[!#$%& '()*+,-./:;<=>?@[\]^_`{|}~]/.test(password)) score += 1; // Symbol check
  // debug
  console.log('Score: ', score)

  // renderPassword(password);
  renderStrengthOutput(score)

}

// Render password strength label and indicator
// ToDo: rename to renderStrengthOutput
function renderStrengthOutput(ratingScore) {
  // 0 - 2 = too weak - 1 bar, red
  // 3 = weak - 2 strengthBars, orange
  // 4 = medium - 3 strengthBars, yellow
  // >= 5 = strong - 4 strengthBars, neon-green

  /*
    Requirements:
    - render strength label (too weak, weak, etc.)
    - match label with num of strengthBars to fill
    - fill bar(s) with proper color

    Use object to hold strength props?
  */
  resetStrengthOutput(); // clear any previous styles/content
  
  // Initialize an object to serve as a styles legend
  const legend = {};
  // use a switch statement to populate legend based on pw stength score
  switch (ratingScore) {
    case 0:
    case 1:
    case 2:
      legend.ratingLabel = 'Too Weak!';
      legend.barCount = 1;
      legend.barColor = 'hsl(0, 91%, 63%)';
      break;
    case 3:
      legend.ratingLabel = 'Weak';
      legend.barCount = 2;
      legend.barColor = 'hsl(13, 95%, 66%)';
      break;
    case 4:
      legend.ratingLabel = 'Medium';
      legend.barCount = 3;
      legend.barColor = 'hsl(42, 91%, 68%)';
      break;
    default:
      legend.ratingLabel = 'Strong';
      legend.barCount = 4;
      legend.barColor = 'hsl(127, 100%, 82%)';
  }

  console.log(legend);
  // create a proper array from the stengthBars node list
  const styledBars = Array.from(strengthBars).slice(0, legend.barCount);
  strengthRating.textContent = legend.ratingLabel; // apply strength rating label
  styledBars.forEach(bar => { // style corresponding strength bars
    bar.style.backgroundColor = legend.barColor;
    bar.style.borderColor = legend.barColor;
  })

}

// Reset strength label and indicator bars
function resetStrengthOutput() {
  strengthRating.textContent = '';
  strengthBars.forEach(bar => { 
    bar.style.backgroundColor = 'transparent';
    bar.style.borderColor = 'hsl(252, 11%, 91%)';
  })
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

  // if all options are false (none selected), exit function
  if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
    alert('select at least one option')
    return;
  }
  // debug
  console.log('selected length: ', length)
  console.log(options);

  // generate password
  const password = generatePassword(length, options);
  console.log(password) // debug
  // console.log(evaluatePasswordStrength(password, options))
  evaluatePasswordStrength(password, options);
  renderPassword(password); // moved to evaluatePasswordStrength


}

// copy to clipboard when output button clicked
output.addEventListener("click", () => {
  const password = output.textContent;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      copyMessage.textContent = "Password copied to clipboard!";
      copyMessage.style.visibility = "visible";

      // Hide the message after 2 seconds
      setTimeout(() => {
        copyMessage.style.visibility = "hidden";
      }, 2000);
    }).catch(() => {
      copyMessage.textContent = "Failed to copy password.";
      copyMessage.style.visibility = "visible";
    });
  }
});


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
