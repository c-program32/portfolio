const nav_button = document.getElementById("nav-button");
const right_nav_items = document.getElementById("nav-mobile-right-items");

// Listen for a click event
nav_button.addEventListener("click", function() {
    if (nav_button.textContent.trim() === "≡ Menu"){
        nav_button.textContent = "X Menu";
    } else {
        nav_button.textContent = "≡ Menu";
    }

    right_nav_items.classList.toggle("nav-mobile-right-items-off");
});