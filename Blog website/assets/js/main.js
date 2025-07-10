$(document).ready(function () {
    // --- Auth Modal Logic ---
    // Open modal for Login/Signup buttons (from #authArea)
    $(document).on('click', '#authArea .btn-outline-primary', function(e) {
        e.preventDefault();
        $('#authModal').modal('show');
        $('#login-tab').tab('show');
    });
    $(document).on('click', '#authArea .btn-primary:not(.btn-lg)', function(e) {
        // Exclude large buttons (like "Explore Articles")
        e.preventDefault();
        $('#authModal').modal('show');
        $('#signup-tab').tab('show');
    });

    // Switch tabs via footer text
    $(document).on('click', '#switchToSignup', function(e) {
        e.preventDefault();
        $('#signup-tab').tab('show');
    });
    $(document).on('click', '#switchToLogin', function(e) {
        e.preventDefault();
        $('#login-tab').tab('show');
    });

    // Dynamically update footer text when switching tabs
    $('#authTab button').on('shown.bs.tab', function(event) {
        if (event.target.id === 'login-tab') {
            $('#toggleAuthText').html(`Don't have an account? <a href="#" id="switchToSignup">Sign Up</a>`);
        } else {
            $('#toggleAuthText').html(`Already have an account? <a href="#" id="switchToLogin">Login</a>`);
        }
    });

    // Toggle password visibility
    $(document).on('click keydown', '.toggle-password', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            const target = $(this).attr('data-target');
            const input = $('#' + target);
            const icon = $(this).find('i');
            if (input.attr('type') === 'password') {
                input.attr('type', 'text');
                icon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                input.attr('type', 'password');
                icon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        }
    });

    // Basic interactive feedback for Login form
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $('#loginMessage').removeClass('text-danger text-success').text('');
        const email = $('#loginEmail').val().trim();
        const password = $('#loginPassword').val().trim();
        if (!email || !password) {
            $('#loginMessage').addClass('text-danger').text('Please fill in all fields.');
            return;
        }
        $('#loginMessage').removeClass('text-danger').addClass('text-success').text('Logging in...');
        setTimeout(function () {
            $('#loginMessage').removeClass('text-success').addClass('text-danger').text('Demo: Invalid credentials!');
        }, 1100);
    });

    // Interactive feedback for Signup form
    $('#signupForm').submit(function (e) {
        e.preventDefault();
        $('#signupMessage').removeClass('text-danger text-success').text('');
        const username = $('#signupUsername').val().trim();
        const email = $('#signupEmail').val().trim();
        const pw = $('#signupPassword').val();
        const cpw = $('#signupConfirm').val();
        if (!username || !email || !pw || !cpw) {
            $('#signupMessage').addClass('text-danger').text('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('#signupMessage').addClass('text-danger').text('Please enter a valid email address.');
            return;
        }
        if (pw !== cpw) {
            $('#signupMessage').addClass('text-danger').text('Passwords do not match.');
            return;
        }
        if (pw.length < 6) {
            $('#signupMessage').addClass('text-danger').text('Password must be at least 6 characters.');
            return;
        }
        if (!$('#signupTerms').is(':checked')) {
            $('#signupMessage').addClass('text-danger').text('You must agree to the Terms & Privacy.');
            return;
        }
        $('#signupMessage').removeClass('text-danger').addClass('text-success').text('Signing up...');
        setTimeout(function () {
            $('#signupMessage').removeClass('text-success').addClass('text-danger').text('Demo: Sign up unavailable!');
        }, 1200);
    });

    // Demo: Simulate login state (set to true to demo "logged in" UI)
    const isLoggedIn = false;
    const username = "uttam002"; // Replace with dynamic username in real app

    function renderAuthArea() {
        if (isLoggedIn) {
            $('#authArea').html(`
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://i.pravatar.cc/32?u=${username}" alt="avatar" class="rounded-circle me-2" width="32" height="32">
                        <span>${username}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">My Account</a></li>
                        <li><a class="dropdown-item" href="#">My Blogs</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="#">Logout</a></li>
                    </ul>
                </div>
            `);
            $('#addBlogBtn').prop('disabled', false).attr('title', 'Write your article!');
            $('#loginPrompt').hide();
        } else {
            $('#authArea').html(`
                <a href="#" class="btn btn-outline-primary me-2">Login</a>
                <a href="#" class="btn btn-primary">Sign Up</a>
            `);
            $('#addBlogBtn').prop('disabled', true).attr('title', 'Please log in to add a blog');
            $('#loginPrompt').show();
        }
    }
    renderAuthArea();

    // Animate featured cards on scroll (on view)
    function animateOnScroll() {
        $('.blog-card').each(function (i) {
            var card = $(this);
            if (card.offset().top < $(window).scrollTop() + $(window).height() - 100) {
                card.addClass('animate__fadeInUp');
            }
        });
    }
    $(window).on('scroll', animateOnScroll);
    animateOnScroll();

    // Newsletter Subscribe
    $('#subscribeForm').submit(function (e) {
        e.preventDefault();
        const email = $('#subscriberEmail').val();
        if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            $('#subscribeMessage').html('<span class="text-success">Thank you for subscribing!</span>');
            $('#subscriberEmail').val('');
        } else {
            $('#subscribeMessage').html('<span class="text-danger">Please enter a valid email address.</span>');
        }
    });

    // Add Blog button demo: Show alert if not logged in
    $('#addBlogBtn').click(function () {
        if (!isLoggedIn) {
            alert('Please log in to add a blog post.');
        }
    });

    // Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});