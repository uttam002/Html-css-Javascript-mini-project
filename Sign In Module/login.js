// CashCanvas Login - Form validation, smooth color transitions, dynamic animated circles, password eye, unique remember me

document.addEventListener("DOMContentLoaded", function () {
    // #region Flip Card (only for < 767px)
    const flipContainer = document.getElementById("flipContainer");
    let isFlippable = window.innerWidth < 767;
  
    function setFlipMode() {
      isFlippable = window.innerWidth < 767;
      if (!isFlippable) {
        flipContainer.classList.remove("flipped");
      }
    }
  
    setFlipMode();
    window.addEventListener("resize", setFlipMode);
  
    flipContainer.addEventListener("click", function (e) {
      if (isFlippable && e.target.classList.contains("flipCorner")) {
        this.classList.toggle("flipped");
      }
    });
    // #endregion
  
    // #region Form Validation
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
  
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
  
      if (!emailInput.value || !/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailInput.classList.add("is-invalid");
        valid = false;
      } else {
        emailInput.classList.remove("is-invalid");
      }
      if (!passwordInput.value) {
        passwordInput.classList.add("is-invalid");
        valid = false;
      } else {
        passwordInput.classList.remove("is-invalid");
      }
  
      if (valid) {
        form.classList.add("animate__animated", "animate__pulse");
        setTimeout(() => {
          form.classList.remove("animate__animated", "animate__pulse");
          alert("Login successful! (Demo)");
        }, 800);
      }
    });
    // #endregion
  
    // #region Animated Circles
    const circlesConfig = [
      // [size, left, top, bg1, bg2, animDur, animDelay]
      [75, 10, 10, "#ffb86c88", "#ff6e7f77", 7, 0],
      [55, 220, 110, "#8e71fb99", "#01c8ee77", 8, 2.2],
      [40, 10, 200, "#ffb86c99", "#8e71fb44", 8.8, 3],
      [30, 250, 220, "#ffb86c33", "#8e71fb66", 9.1, 1.1],
      [55, 125, 10, "#8e71fb44", "#ff6e7f66", 10, 0.7],
      [24, 10, 10, "#ff6e7f44", "#ffb86c66", 9.5, 5.4],
      [32, 50, 110, "#ffb86c55", "#8e71fb55", 8.5, 3.7],
      [40, 120, 240, "#ffb86c44", "#ff6e7f99", 8.1, 4.2],
      [23, 65, 65, "#ff6e7f44", "#8e71fb66", 7.8, 6.8],
      [40, 200, 60, "#8e71fb99", "#ffb86c44", 10.2, 7.5],
      [33, 70, 180, "#ffb86c77", "#01c8ee88", 11, 5.9],
      [45, 230, 180, "#8e71fb77", "#ffb86c33", 9.7, 3.2],
      [60, 120, 130, "#01c8ee77", "#ff6e7f66", 12, 1.8],
      [28, 200, 160, "#ff6e7f55", "#8e71fb33", 8.7, 2.8],
      [19, 60, 140, "#ffb86c33", "#ff6e7f99", 10.8, 6.3],
      [85, 125, 70, "#ffb86c88", "#ff6e7f77", 7.8, 0.5],
      [32, 250, 10, "#ffb86c55", "#8e71fb55", 8.5, 3.7],
      [20, 125, 40, "#ffb86c44", "#ff6e7f99", 8.1, 4.2],
      [23, 60, 65, "#ff6e7f44", "#8e71fb66", 7.8, 6.8],
      [40, 20, 60, "#8e71fb99", "#ffb86c44", 10.2, 7.5],
    ];
  
    const circlesContainer = document.getElementById("loginAnimCircles");
    circlesConfig.forEach(([size, left, top, bg1, bg2, dur, delay], idx) => {
      const div = document.createElement("div");
      div.className = "circle";
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.left = `${left}px`;
      div.style.top = `${top}px`;
      div.style.background = `linear-gradient(135deg, ${bg1}, ${bg2})`;
      div.style.animation = `floatCircle${idx} ${dur}s ease-in-out ${delay}s infinite alternate`;
      circlesContainer.appendChild(div);
  
      const angle1 = Math.floor(20 + Math.random() * 50);
      const angle2 = Math.floor(10 + Math.random() * 30);
      const ampX = Math.floor(6 + Math.random() * 19);
      const ampY = Math.floor(5 + Math.random() * 17);
  
      const keyframes = `
        @keyframes floatCircle${idx} {
          0% { transform: translate(0, 0) scale(1);}
          50% { transform: translate(${ampX}px, -${ampY}px) scale(1.08);}
          100% { transform: translate(-${angle1}px, ${angle2}px) scale(0.96);}
        }`;
      const styleTag = document.createElement("style");
      styleTag.innerHTML = keyframes;
      document.head.appendChild(styleTag);
    });
    // #endregion
  
    // #region Mousemove Color Picker Background
    const colorStops = [
      { x: 0.0, color1: "#fdfbfb", color2: "#ebedee" },
      { x: 0.15, color1: "#f7e7e2", color2: "#ffe2ec" },
      { x: 0.31, color1: "#e6f3ff", color2: "#f7f8ff" },
      { x: 0.47, color1: "#eafbf7", color2: "#f3e6fa" },
      { x: 0.62, color1: "#fffbe6", color2: "#e6f7ff" },
      { x: 0.78, color1: "#f5e6ff", color2: "#e6faff" },
      { x: 0.93, color1: "#e8ffe6", color2: "#fff9e6" },
      { x: 1.0, color1: "#fdfbfb", color2: "#ebedee" },
    ];
  
    function interpolateColor(hex1, hex2, t) {
      const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
      const b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
      const c1 = [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
      const c2 = [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
      const rgb = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }
  
    window.addEventListener("mousemove", function (e) {
      const xFrac = e.clientX / window.innerWidth;
      let idx = 0;
      for (let i = 0; i < colorStops.length - 1; i++) {
        if (xFrac >= colorStops[i].x && xFrac <= colorStops[i + 1].x) {
          idx = i;
          break;
        }
      }
      const t =
        (xFrac - colorStops[idx].x) / (colorStops[idx + 1].x - colorStops[idx].x);
      const color1 = interpolateColor(
        colorStops[idx].color1,
        colorStops[idx + 1].color1,
        t
      );
      const color2 = interpolateColor(
        colorStops[idx].color2,
        colorStops[idx + 1].color2,
        t
      );
      document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
    });
    // #endregion
  
    // #region Password Eye Toggle
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("togglePassword");
    togglePasswordBtn.addEventListener("click", function () {
      const isText = passwordInput.type === "text";
      passwordInput.type = isText ? "password" : "text";
      this.querySelector("i").className = isText
        ? "bi bi-eye"
        : "bi bi-eye-slash";
      this.setAttribute("aria-label", isText ? "Show password" : "Hide password");
    });
    // #endregion
  });