document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (username === 'user' && password === 'password') {
        // Successful login
        // alert('Login successful!');
        // Redirect or perform other actions
        window.location.href = 'Content_Selection.html'; // Example redirect
    } else {
        // Display error message
        alert('Invalid username or password');
    }
});