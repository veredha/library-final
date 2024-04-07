// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        // login.js
        document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(loginForm);
        const requestBody = {
            email: encodeURIComponent(formData.get('email')), // Encode email
            password: encodeURIComponent(formData.get('password')) // Encode password
        };
        
        fetch('http://localhost:5055/backend/api/v1/users/login', {
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
            // Login successful, redirect or display success message
            console.log('User logged in successfully');
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            // Display error message to the user
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Login failed: ' + error.message;
        });
    });
});

        
        fetch('http://localhost:5055/backend/api/v1/users/login', {
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
            // Login successful, redirect or display success message
            console.log('User logged in successfully');
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            // Display error message to the user
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Login failed: ' + error.message;
        });
    });
});
