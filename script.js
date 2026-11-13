/* ===== Data (used by the featured course section) ===== */
const courses = [
    { name: "Java Programming", image: "images/java.jpg", color: "#e76f51",
      text: "Learn the basics of Java and object-oriented programming." },
    { name: "Python Programming", image: "images/python.jpg", color: "#2a9d8f",
      text: "Learn Python and develop your problem-solving skills." },
    { name: "Database Management", image: "images/database.jpg", color: "#264653",
      text: "Understand how to create, manage, and organize databases." },
    { name: "Software Engineering", image: "images/software.jpg", color: "#8e44ad",
      text: "Learn the basic concepts of software development and design." }
];

let currentCourse = 0;

/* ===== Home page: greeting based on time (if / else) ===== */
function showGreeting() {
    const greeting = document.getElementById("greeting");
    if (!greeting) return;

    const hour = new Date().getHours();
    let message;

    if (hour < 12) {
        message = "Good morning! Choose a course and start learning.";
    } else if (hour < 18) {
        message = "Good afternoon! Choose a course and start learning.";
    } else {
        message = "Good evening! Choose a course and start learning.";
    }
    greeting.textContent = message;
}

/* ===== Home page: dynamic picture and text ===== */
function showCourse(index) {
    const image = document.getElementById("featuredImage");
    if (!image) return;

    const course = courses[index];
    image.src = course.image;
    image.alt = course.name;
    document.getElementById("featuredTitle").textContent = course.name;
    document.getElementById("featuredText").textContent = course.text;
    document.getElementById("featuredLabel").textContent =
        (index + 1) + " / " + courses.length;

    // Change a CSS style using script
    document.getElementById("featuredBox").style.borderColor = course.color;
}

function nextCourse() {
    currentCourse = (currentCourse + 1) % courses.length;
    showCourse(currentCourse);
}

/* ===== Home page: show / hide details ===== */
function toggleDetails() {
    const details = document.getElementById("courseDetails");
    const button = document.getElementById("detailsButton");

    if (details.style.display === "none") {
        details.style.display = "block";
        button.textContent = "Hide Course Details";
    } else {
        details.style.display = "none";
        button.textContent = "Show Course Details";
    }
}

/* ===== Form helpers ===== */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shows (or clears) the error message of a field. Returns true when there is no error.
function setError(fieldId, message) {
    const error = document.getElementById(fieldId + "Error");
    const field = document.getElementById(fieldId);

    error.textContent = message;
    if (field) {
        field.style.borderColor = message === "" ? "#ccd6e0" : "#c0392b";
    }
    return message === "";
}

// Removes an old success message (if any)
function clearSuccess(form) {
    const old = form.querySelector(".success");
    if (old) old.remove();
}

// Dynamic element: creates a success message and adds it to the form
function showSuccess(form, text) {
    clearSuccess(form);

    const box = document.createElement("div");
    box.className = "success";
    box.textContent = text;
    form.appendChild(box);
}

/* ===== Login validation ===== */
function validateLogin() {
    const form = document.getElementById("loginForm");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    clearSuccess(form);

    const emailOk = setError("email",
        isValidEmail(email) ? "" : "Enter a valid email address, e.g. name@example.com.");
    const passwordOk = setError("password",
        password.length >= 6 ? "" : "Password must be at least 6 characters.");

    if (emailOk && passwordOk) {
        showSuccess(form, "Login successful. Welcome back!");
    }
    return false; // static website: no server to send the form to
}

/* ===== Sign-up validation ===== */
function validateSignup() {
    const form = document.getElementById("signupForm");
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;
    const course = document.getElementById("course").value;
    const genderChosen = document.querySelector('input[name="gender"]:checked');
    const termsChecked = document.getElementById("terms").checked;

    clearSuccess(form);

    // Loop: clear all old error messages first
    const fieldIds = ["fullname", "email", "password", "confirmPassword",
                      "course", "gender", "terms"];
    for (let i = 0; i < fieldIds.length; i++) {
        setError(fieldIds[i], "");
    }

    let valid = true;

    if (!/^[A-Za-z\u0600-\u06FF ]{3,}$/.test(fullname)) {
        valid = setError("fullname", "Enter your full name (letters only, at least 3).") && valid;
    }
    if (!isValidEmail(email)) {
        valid = setError("email", "Enter a valid email address, e.g. name@example.com.") && valid;
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
        valid = setError("password", "Password must be 8+ characters with letters and numbers.") && valid;
    }
    if (confirm !== password || confirm === "") {
        valid = setError("confirmPassword", "Passwords do not match.") && valid;
    }
    if (course === "") {
        valid = setError("course", "Please choose a course.") && valid;
    }
    if (!genderChosen) {
        valid = setError("gender", "Please select your gender.") && valid;
    }
    if (!termsChecked) {
        valid = setError("terms", "You must accept the Terms and Conditions.") && valid;
    }

    if (valid) {
        showSuccess(form, "Account created for " + fullname + ". You can now log in.");
    }
    return false; // static website: no server to send the form to
}

/* ===== Run when the page loads ===== */
window.onload = function () {
    showGreeting();
    showCourse(currentCourse);
    if (document.getElementById("featuredBox")) {
        setInterval(nextCourse, 5000); // change the course every 5 seconds
    }
};