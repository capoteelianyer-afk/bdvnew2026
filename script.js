// Get elements
const openModalBtn = document.getElementById("btn-submit");
const modalOverlay = document.getElementById("modalOverlay");
const cancelBtn = document.getElementById("cancelBtn");
const continueBtn = document.getElementById("continueBtn");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

// Open modal
openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  passwordInput.value = "";
  errorMessage.classList.remove("show");
});

// Close modal
function closeModal() {
  modalOverlay.classList.remove("active");
}

cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Toggle password visibility
togglePasswordBtn.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});

// Continue button - validate password
continueBtn.addEventListener("click", () => {
  if (passwordInput.value.trim() === "") {
    errorMessage.classList.add("show");
  } else {
    errorMessage.classList.remove("show");

    closeModal();
  }
});

// Hide error message when typing
passwordInput.addEventListener("input", () => {
  if (passwordInput.value.trim() !== "") {
    errorMessage.classList.remove("show");
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
    closeModal();
  }
});
