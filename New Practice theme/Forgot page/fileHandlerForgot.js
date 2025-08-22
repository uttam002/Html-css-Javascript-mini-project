// Video play/pause button logic
document.addEventListener("DOMContentLoaded", function() {
    const bgVideo = document.getElementById("bgVideo");
    const videoControlBtn = document.getElementById("videoControlBtn");
    const videoControlIcon = document.getElementById("videoControlIcon");

    function updateVideoBtn() {
        if (bgVideo.paused) {
            videoControlIcon.className = "play";
        } else {
            videoControlIcon.className = "pause";
        }
    }

    videoControlBtn.addEventListener("click", function() {
        if (bgVideo.paused) {
            bgVideo.play();
        } else {
            bgVideo.pause();
        }
        updateVideoBtn();
    });

    bgVideo.addEventListener("play", updateVideoBtn);
    bgVideo.addEventListener("pause", updateVideoBtn);

    updateVideoBtn();

    // Forgot form validation and feedback
    const form = document.getElementById("forgotPasswordForm");
    const usernameInput = document.getElementById("usernameInput");
    const emailInput = document.getElementById("emailInput");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let valid = true;
        // Username required
        if(!usernameInput.value.trim()) {
            usernameInput.classList.add("is-invalid");
            valid = false;
        } else {
            usernameInput.classList.remove("is-invalid");
        }
        // Email required and valid
        const emailVal = emailInput.value.trim();
        if(!emailVal || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(emailVal)) {
            emailInput.classList.add("is-invalid");
            valid = false;
        } else {
            emailInput.classList.remove("is-invalid");
        }

        if(valid) {
            formMessage.classList.remove("d-none", "text-danger");
            formMessage.classList.add("text-success", "animate__animated", "animate__fadeIn");
            formMessage.textContent = "A reset link has been sent to your email!";
            form.reset();
            setTimeout(() => {
                formMessage.classList.add("d-none");
                formMessage.classList.remove("animate__fadeIn", "text-success");
            }, 3500);
        } else {
            formMessage.classList.remove("d-none", "text-success");
            formMessage.classList.add("text-danger", "animate__animated", "animate__shakeX");
            formMessage.textContent = "Please fix the errors above and try again.";
            setTimeout(() => {
                formMessage.classList.add("d-none");
                formMessage.classList.remove("animate__shakeX", "text-danger");
            }, 3000);
        }
    });

    // Remove error on typing
    [usernameInput, emailInput].forEach(el => {
        el.addEventListener("input", function() {
            if(this.classList.contains("is-invalid")) {
                this.classList.remove("is-invalid");
            }
        });
    });
});