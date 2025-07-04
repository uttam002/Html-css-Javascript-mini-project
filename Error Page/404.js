// Fancy text animation on load (mimic landing page)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.fancyTextAnimation').forEach((el, idx) => {
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }, 400 + idx * 200);
    });

    // Animate 404 digits and icon, add pulse/fade on focus
    const digits = document.querySelectorAll('.animated404 .digit, .animated404 .icon');
    digits.forEach((el, i) => {
        el.classList.add("animate__fadeInDown");
        el.style.setProperty('--animate-duration', '1.2s');
        el.style.animationDelay = `${0.15 + i * 0.23}s`;
    });

    // Ripple effect for main button
    const rippleBtn = document.querySelector('.ripple');
    rippleBtn?.addEventListener('click', function(e) {
        this.classList.remove('active');
        void this.offsetWidth; // force reflow
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 600);
    });

    // Logo parallax on mouse move (desktop only)
    const logo = document.querySelector('.logo404');
    if(logo) {
        let lastX = 0, lastY = 0;
        document.addEventListener('mousemove', e => {
            if(window.innerWidth < 700) return; // skip on mobile
            const x = (e.clientX / window.innerWidth - 0.5) * 36;
            const y = (e.clientY / window.innerHeight - 0.5) * 36;
            logo.style.transform = `translate(${x}px,${y}px) scale(1.04)`;
            lastX = x; lastY = y;
        });
        document.addEventListener('mouseout', () => {
            logo.style.transform = `translate(0,0) scale(1)`;
        });
    }

    // Support button interaction (demo)
    const supportBtn = document.getElementById('supportBtn');
    supportBtn?.addEventListener('click', () => {
        alert("Contact support at support@cashcanvas.com or use live chat on our site.");
    });

    // Accessibility: focus animation for 404 headline
    const animated404 = document.querySelector('.animated404');
    if(animated404){
        animated404.addEventListener('focus', () => {
            animated404.style.filter = "drop-shadow(0 0 24px #8e71fb99)";
        });
        animated404.addEventListener('blur', () => {
            animated404.style.filter = "";
        });
    }
});