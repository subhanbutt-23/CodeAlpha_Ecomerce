const AUTH_API = "http://localhost:5000/api/auth";

// Handle user registration
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const message = document.getElementById("register-message");

        try {
            const response = await fetch(`${AUTH_API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            message.textContent = "Account created successfully! You can now log in.";
            message.style.color = "green";

            registerForm.reset();

        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        }
    });
}
// Handle user login
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const message = document.getElementById("login-message");

        try {
            const response = await fetch(`${AUTH_API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            // Save authentication token
            localStorage.setItem("token", result.token);

            // Save logged-in user information
            localStorage.setItem("user", JSON.stringify(result.user));

            message.textContent = "Login successful! Redirecting...";
            message.style.color = "green";

            window.location.href = "index.html";

        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        }
    });
}