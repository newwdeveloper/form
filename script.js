const btn = document.querySelector(".btn");
const inputs = document.querySelectorAll(".input-container input");
const img = document.querySelectorAll(".error-icon");

// Regular expressions for validation
const nameRegex = /^[A-Za-z]+$/; // For first and last name
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // For email validation

// Function to show error message
function showError(index, message) {
  img[index].style.display = "block"; // Show error icon
  const existingMsg = img[index].parentNode.querySelector(".info");
  if (existingMsg) {
    existingMsg.remove(); // Remove previous message
  }
  const msg = document.createElement("p");
  msg.classList.add("info");
  msg.innerText = message;
  img[index].parentNode.appendChild(msg); // Append the new message
}

// Function to hide error message
function hideError(index) {
  img[index].style.display = "none"; // Hide error icon
  const existingMsg = img[index].parentNode.querySelector(".info");
  if (existingMsg) {
    existingMsg.remove(); // Remove existing message
  }
}

// Validate input fields
function validateInput(value, index) {
  if (index === 0 || index === 1) {
    // For first and last name
    if (!nameRegex.test(value)) {
      showError(index, "Enter Valid Name");
    } else {
      hideError(index);
    }
  } else if (index === 2) {
    // For email
    if (!emailRegex.test(value)) {
      showError(index, "Enter Valid Email");
    } else {
      hideError(index);
    }
  } else {
    // For password
    if (value === "") {
      showError(index, "Password is Required");
    } else {
      hideError(index);
    }
  }
}

// Form validation on submit
btn.addEventListener("click", function (event) {
  event.preventDefault();
  inputs.forEach(function (input, index) {
    const value = input.value.trim();
    validateInput(value, index); // Call the validation function
  });
});

// Input event listeners to hide error icons on input
inputs.forEach(function (input, index) {
  input.addEventListener("input", function () {
    const value = input.value.trim();
    if (value !== "") {
      hideError(index); // Hide error icon if input is not empty
    } else {
      showError(index, "This field is required"); // Show error icon if input is empty
    }
  });
});

// Create the reset button dynamically
const resetBtn = document.createElement("button");
resetBtn.classList.add("reset-btn");
resetBtn.type = "button"; // Set the type to button to avoid form submission
resetBtn.textContent = "X"; // Set the button text

// Append the reset button to the form
const form = document.querySelector(".input");
form.appendChild(resetBtn);

// Reset button functionality
resetBtn.addEventListener("click", function () {
  inputs.forEach(function (input, index) {
    input.value = ""; // Clear input fields
    hideError(index); // Hide error icons
  });
});
