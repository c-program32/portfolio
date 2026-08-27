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


const form = document.getElementById('form');
const result = document.getElementById('result');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
    .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
            result.innerHTML = json.message;
        } else {
            console.log(response);
            result.innerHTML = json.message;
        }
    })
    .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
    })
    .then(function() {
        form.reset();
        setTimeout(() => {
            result.innerHTML = "";
        }, 1500);
    });
});