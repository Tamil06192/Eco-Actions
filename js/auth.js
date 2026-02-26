document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const roleSwitchers = document.querySelectorAll('.role-switcher');
    const loginTitle = document.getElementById('login-title');
    const loginImage = document.getElementById('login-image');
    let currentRole = 'citizen';

    // Role Switching Logic
    roleSwitchers.forEach(switcher => {
        switcher.addEventListener('click', (e) => {
            e.preventDefault();
            currentRole = switcher.dataset.role;

            // Update UI based on role
            loginTitle.textContent = `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Sign In`;

            // Update colors and images
            if (currentRole === 'volunteer') {
                loginImage.src = 'assets/images/volunteer-login.jpg';
            } else if (currentRole === 'admin') {
                loginImage.src = 'assets/images/admin-login.jpg';
            } else {
                loginImage.src = 'assets/images/citizen-login.jpg';
            }
        });
    });

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('error-message');

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('environet-token', data.token);
                    localStorage.setItem('environet-user', JSON.stringify(data.user));

                    // Redirect based on role
                    if (data.user.role === 'admin') {
                        window.location.href = 'admin/overview.html';
                    } else if (data.user.role === 'volunteer') {
                        window.location.href = 'volunteer-dashboard.html';
                    } else {
                        window.location.href = 'user-dashboard.html';
                    }
                } else {
                    errorDiv.textContent = data.msg || 'Login failed';
                    errorDiv.classList.remove('hidden');
                }
            } catch (err) {
                console.error(err);
                errorDiv.textContent = 'Server connection failed. Is the backend running?';
                errorDiv.classList.remove('hidden');
            }
        });
    }
});
