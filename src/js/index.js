const nav_button = document.getElementById("nav-button");
const right_nav_items = document.getElementById("nav-mobile-right-items");
const close_button = document.getElementById("form_close_btn");
const terminal = document.getElementById("terminal_background_id");
const email_button = document.getElementById("email_form_btn");
const email_copy = document.getElementById("email_copy");

// Listen for a click event
nav_button.addEventListener("click", function() {
    if (nav_button.textContent.trim() === "≡ Menu"){
        nav_button.textContent = "X Menu";
    } else {
        nav_button.textContent = "≡ Menu";
    }

    right_nav_items.classList.toggle("nav-mobile-right-items-off");
});

close_button.addEventListener("click", function() {
    terminal.classList.remove("terminal_background_on");
});

email_button.addEventListener("click", function() {
    terminal.classList.add("terminal_background_on");
});

email_copy.addEventListener("click", () => {
    navigator.clipboard.writeText("christiangraham8@gmail.com");

    const email_msg = document.getElementById("copied_msg");

    email_msg.classList.toggle("copied_off");
    setTimeout(() => {
        email_msg.classList.toggle("copied_off");
    }, 1000);
});