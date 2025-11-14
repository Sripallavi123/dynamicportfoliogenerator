// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            // Password confirmation check for register form
            if (this.id === 'registerForm') {
                const password = document.getElementById('password');
                const confirmPassword = document.getElementById('confirmPassword');
                
                if (password.value !== confirmPassword.value) {
                    isValid = false;
                    confirmPassword.style.borderColor = 'red';
                    alert('Passwords do not match!');
                }
            }

            if (isValid) {
                // In a real app, you would send the form data to the server here
                alert('Form submitted successfully!');
                this.reset();
            }
        });
    });

    // File upload preview
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewId = this.getAttribute('data-preview') || 'previewProfilePic';
                    const previewElement = document.getElementById(previewId);
                    if (previewElement) {
                        previewElement.src = e.target.result;
                    }
                }.bind(this);
                reader.readAsDataURL(file);
            }
        });
    });
});

// Login/Register toggle
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}