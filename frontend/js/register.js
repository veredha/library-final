document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Client-side validation
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = document.getElementById('email-error');
        if (!emailPattern.test(emailValue)) {
            emailError.innerText = 'Please enter a valid email address.';
            return;
        } else {
            emailError.innerText = '';
        }

        // If all validation passes, proceed with form submission
        const formData = new FormData(registerForm);
        const requestBody = {};

        for (const [key, value] of formData.entries()) {
            requestBody[key] = value;
        }

        fetch('http://localhost:5055/backend/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            // Registration successful, redirect or display success message
            console.log('User registered successfully');
        })
        .catch(error => {
            console.error('Registration failed:', error.message);
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Registration failed: ' + error.message;
        });
    });
});
