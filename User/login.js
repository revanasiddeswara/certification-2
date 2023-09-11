$(document).ready(function() {
    // Handle login form submission
    $('#login-form').submit(function(event) {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();

        // Check if username and password are "qaifi"
        if (username === 'qaifi' && password === 'qaifi') {
            alert('Login Successful');
            localStorage.setItem('isLoggedIn', 'true'); // Set user session
            window.location.href = 'homepage.html'; // Redirect to Home page
        } else {
            alert('Please enter valid credentials!');
        }
    });
});
