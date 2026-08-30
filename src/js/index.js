const navButton = document.getElementById("menu-button");
const rightNavItems = document.getElementById("nav-mobile-right-items");
const homeArrow = document.getElementById("home-arrow");

const closeButton = document.getElementById("form-close-btn");
const terminal = document.getElementById("terminal-background");
const emailButton = document.getElementById("email-form-btn");
const emailCopy = document.getElementById("email-copy");
const emailMessage = document.getElementById("copied-msg");

const form = document.getElementById("form");
const result = document.getElementById("result");

// Mobile Navigation
navButton.addEventListener("click", () => {
    const isMenuOpen = navButton.textContent.trim() === "≡ Menu";

    navButton.textContent = isMenuOpen ? "X Menu" : "≡ Menu";
    rightNavItems.classList.toggle("nav_mobile_right_items_off", isMenuOpen);
    homeArrow.classList.toggle("home_arrow_container_on", isMenuOpen);
});


// Open Email Form
emailButton.addEventListener("click", () => {
    terminal.classList.add("terminal_background_on");
});


// Close Email Form
closeButton.addEventListener("click", () => {
    terminal.classList.remove("terminal_background_on");
});


// Copy Email Address
emailCopy.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText("christiangraham8@gmail.com");

        emailMessage.classList.add("copied_off");

        setTimeout(() => {
            emailMessage.classList.remove("copied_off");
        }, 1000);
    } catch (error) {
        console.error("Failed to copy email:", error);
    }
});


// Contact Form
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    const json = JSON.stringify(formObject);

    result.classList.add("result_on");
    result.textContent = "Please wait...";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        });

        const data = await response.json();

        if (response.ok) {
            result.textContent = data.message;
        } else {
            console.error("Form submission failed:", response);
            result.textContent = data.message;
        }
    } catch (error) {
        console.error("Form submission error:", error);
        result.textContent = "Something went wrong!";
    } finally {
        form.reset();

        setTimeout(() => {
            result.textContent = "";
            result.classList.remove("result_on");
        }, 1500);
    }
});
