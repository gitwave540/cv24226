const CORRECT_PIN = "123456";
const overlay = document.getElementById("pin-overlay");
const error = document.getElementById("pin-error");
const inputField = document.getElementById("pin-input");
const content = document.getElementById("content"); // your main content div

// Function to unlock
function unlock() {
    overlay.style.display = "none";
    content.style.display = "block";
    localStorage.setItem("pinUnlockedTime", Date.now());
}

// Check PIN
function checkPin() {
    if (inputField.value === CORRECT_PIN) {
        unlock();
    } else {
        error.style.display = "block";
        inputField.value = ""; // clear wrong PIN
        inputField.focus();
    }
}

// On page load: check if unlocked already
document.addEventListener("DOMContentLoaded", () => {
    const unlockedTime = localStorage.getItem("pinUnlockedTime");
    if (unlockedTime && (Date.now() - parseInt(unlockedTime) < 10 * 60 * 1000)) {
        // Already unlocked in the last 10 minutes
        unlock();
    }

    // Auto-check when 6 digits entered
    inputField.addEventListener("input", () => {
        if (inputField.value.length === 6) {
            checkPin();
        } else {
            error.style.display = "none";
        }
    });

    // Optional: button click also unlocks
    const unlockBtn = document.getElementById("unlock-btn");
    if (unlockBtn) {
        unlockBtn.addEventListener("click", checkPin);
    }
});
