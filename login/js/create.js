document.addEventListener('DOMContentLoaded', function() {
    const createAccountForm = document.getElementById('createAccountForm');
    const registerMessage = document.getElementById('registerMessage');

    createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = createAccountForm.registerName.value;
        const email = createAccountForm.registerEmail.value;
        const password = createAccountForm.registerPassword.value;
        const confirm = createAccountForm.confirmPassword.value;
        console.log('Create account attempt:', name, email, password, confirm);
        if (password !== confirm) {
            registerMessage.textContent = 'Passwords do not match.';
            registerMessage.className = 'form-message error';
            return;
        }
        // In a real application, you would send this data to a server.
        registerMessage.textContent = 'Account creation functionality not implemented yet.';
        registerMessage.className = 'form-message success';
        createAccountForm.reset();
        // In a real app, you might redirect to the login page after successful registration
        // window.location.href = 'login.html';
    });
});