// Wait for OrbitControls to actually be defined before running setup!
function runWhenOrbitControlsReady(fn) {
    if (typeof OrbitControls !== "undefined") {
      fn();
    } else {
      // The OrbitControls script may not be loaded yet!
      var script = document.getElementById('orbit-js');
      script.addEventListener('load', () => fn());
    }
  }
  
  runWhenOrbitControlsReady(function() {
  // ------------------
  // Demo Data
  // ------------------
  const certifications = [
      {
        img: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "May 2024",
        desc: "Credentialed cloud developer with hands-on AWS experience.",
        proof: "https://aws.amazon.com/certification/"
      },
      {
        img: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
        title: "Google Associate Cloud Engineer",
        issuer: "Google",
        date: "Dec 2023",
        desc: "Deployed and managed apps on Google Cloud Platform.",
        proof: "https://cloud.google.com/certification/"
      },
      {
        img: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
        title: "Supabase Certified",
        issuer: "Supabase",
        date: "Jan 2025",
        desc: "Demonstrated advanced skills in Supabase development.",
        proof: "https://supabase.com/"
      }
    ];
    
    const badges = [
      { icon: "trophy-fill", color: 0xf6ad55, tip: "Top Performer" },
      { icon: "github", color: 0x4fd1c5, tip: "Open Source Star" },
      { icon: "lightning-fill", color: 0x5a67d8, tip: "100+ Deploys" },
      { icon: "patch-check-fill", color: 0x38bdf8, tip: "Verified Pro" }
    ];
    
    const hobbies = [
      { icon: "palette", color: 0xc471f5, label: "Digital Art" },
      { icon: "music-note-beamed", color: 0xf6ad55, label: "Music" },
      { icon: "camera", color: 0x4fd1c5, label: "Photography" },
      { icon: "bicycle", color: 0xfa71cd, label: "Cycling" },
      { icon: "book", color: 0x5a67d8, label: "Reading" },
      { icon: "globe-americas", color: 0xfa71cd, label: "Travel" }
    ];
    
    // ------------------
    // Three.js 3D Scene
    // ------------------
    let scene, camera, renderer, controls;
    let centerCard, badgeMeshes = [], hobbyMeshes = [];
    let orbitRadius = 5, hobbyRadius = 7;
    let currentCert = 0, isAnimating = false;
    const canvas = document.getElementById('cbh3dScene');
    const width = canvas.clientWidth || 900;
    const height = 430;
    
    // Helper for color
    function hexToThreeColor(hex) {
      return typeof hex === "number" ? hex : parseInt(hex.replace(/^#/, ''), 16);
    }
    
    function createRoundedRectTexture(imgUrl, w=256, h=180, radius=40) {
      const canvas = document.getElementById('cbh3dScene');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(w-radius, 0);
      ctx.quadraticCurveTo(w, 0, w, radius);
      ctx.lineTo(w, h-radius);
      ctx.quadraticCurveTo(w, h, w-radius, h);
      ctx.lineTo(radius, h);
      ctx.quadraticCurveTo(0, h, 0, h-radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.clip();
      // Fill background
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
    
      // Draw image
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      return new Promise(resolve => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, w, h);
          ctx.restore();
          const texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          resolve(texture);
        };
        img.src = imgUrl;
      });
    }
    
    // 3D Bootstrap icon: render as a colored circle with icon as texture
    function createIconTexture(iconName, color="#5a67d8", bg="#fff", w=70, h=70) {
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.save();
      // Shadow
      ctx.shadowColor = color;
      ctx.shadowBlur = 11;
      // Draw circle
      ctx.beginPath(); ctx.arc(w/2, h/2, w/2-5, 0, Math.PI*2); ctx.closePath();
      ctx.fillStyle = bg; ctx.fill();
      // Draw Bootstrap icon (as text fallback)
      ctx.shadowBlur = 0;
      ctx.font = "36px Arial";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Unicode fallback for demo
      let unicodeMap = {
        "trophy-fill": "🏆", "github": "🐱", "lightning-fill": "⚡", "patch-check-fill": "✔️",
        "palette": "🎨", "music-note-beamed": "🎵", "camera": "📷", "bicycle": "🚴", "book": "📖", "globe-americas": "🌎"
      };
      ctx.fillText(unicodeMap[iconName] || "❓", w/2, h/2);
      ctx.restore();
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    }
    
async function setupScene() {
  console.log("setupScene started");
  scene = new THREE.Scene();
  const isDark = document.body.classList.contains("cbh3d-dark");
  scene.background = new THREE.Color(isDark ? 0x181c2b : 0xf8fafc);

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.z = 14;
  camera.position.y = 2;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setClearAlpha(0);
  renderer.setSize(width, height, false);

  // Lighting
  const amb = new THREE.AmbientLight(isDark ? 0xffffff : 0x333366, 0.88);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(isDark ? 0x4fd1c5 : 0xf6ad55, 1.2);
  dir.position.set(1, 6, 6);
  scene.add(dir);

  // Parallax "stars"
  for (let i = 0; i < 70; ++i) {
    const geo = new THREE.SphereGeometry(Math.random()*0.12+0.03, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: isDark ? 0x4fd1c5 : 0xf6ad55, opacity: 0.11+Math.random()*0.16, transparent: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random()-0.5)*22,
      (Math.random()-0.5)*12,
      -Math.random()*30
    );
    scene.add(mesh);
  }

  // Central Certification Card
  centerCard = null;
  await loadCertCard(currentCert);

  // Badges (orbit)
  badgeMeshes = [];
  for (let i = 0; i < badges.length; ++i) {
    const angle = (i / badges.length) * Math.PI * 2;
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 32),
      new THREE.MeshBasicMaterial({ map: createIconTexture(badges[i].icon, "#5a67d8", "#fff"), transparent: true })
    );
    mesh.position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius + 0.8, 0);
    mesh.userData = { idx: i, type: "badge" };
    scene.add(mesh);
    badgeMeshes.push(mesh);
  }

  // Hobbies (outer orbit)
  hobbyMeshes = [];
  for (let i = 0; i < hobbies.length; ++i) {
    const angle = (i / hobbies.length) * Math.PI * 2;
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.47, 32),
      new THREE.MeshBasicMaterial({ map: createIconTexture(hobbies[i].icon, "#f6ad55", "#fff"), transparent: true })
    );
    mesh.position.set(Math.cos(angle) * hobbyRadius, Math.sin(angle) * hobbyRadius-1.5, -0.2);
    mesh.userData = { idx: i, type: "hobby" };
    scene.add(mesh);
    hobbyMeshes.push(mesh);
  }

  // Controls (guaranteed to exist)
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.minDistance = 8;
  controls.maxDistance = 26;
  controls.autoRotate = false;
  controls.rotateSpeed = 0.7;

  // Raycaster for card click
  renderer.domElement.addEventListener('pointerdown', onPointerDown, false);

  animate();
  updateCertOverlay();
  console.log("setupScene completed");
}
    
    // Loads the main cert card
async function loadCertCard(idx) {
  console.log("loadCertCard started for index:", idx);
  if (centerCard) scene.remove(centerCard);
  const cert = certifications[idx];
  const texture = await createRoundedRectTexture(cert.img, 256, 180, 32);
  console.log("Texture created for cert:", cert.title);
  const geo = new THREE.PlaneGeometry(4.4, 3.2, 12, 12);
  const mat = new THREE.MeshPhongMaterial({ map: texture, shininess: 64, specular: 0xf6ad55 });
  centerCard = new THREE.Mesh(geo, mat);
  centerCard.position.set(0, 0.6, 0);
  centerCard.castShadow = true;
  centerCard.userData = { idx, type: "cert" };
  scene.add(centerCard);
  console.log("loadCertCard completed for index:", idx);
}
    
    // Update Info Overlay
    function updateCertOverlay() {
      const info = certifications[currentCert];
      document.getElementById("cbh3d-cert-info").innerHTML = `
        <div class="cbh3d-cert-title">${info.title}</div>
        <div class="cbh3d-cert-issuer">${info.issuer}</div>
        <div class="cbh3d-cert-date">${info.date}</div>
        <div class="cbh3d-cert-desc">${info.desc}</div>
        <a href="${info.proof}" target="_blank" class="cbh3d-cert-link">View Certification</a>
      `;
    }
    
    // Animate
function animate() {
  console.log("animate called");
  requestAnimationFrame(animate);
  // Orbit badges and hobbies
  const t = Date.now() * 0.001;
  for (let i = 0; i < badgeMeshes.length; ++i) {
    const angle = (i / badgeMeshes.length) * Math.PI * 2 + t * 0.44;
    badgeMeshes[i].position.set(Math.cos(angle) * orbitRadius, Math.sin(angle) * orbitRadius + 0.8, Math.sin(t + i)*.8);
    badgeMeshes[i].rotation.z = t * 0.7 + i;
  }
  for (let i = 0; i < hobbyMeshes.length; ++i) {
    const angle = (i / hobbyMeshes.length) * Math.PI * 2 - t * 0.23;
    hobbyMeshes[i].position.set(Math.cos(angle) * hobbyRadius, Math.sin(angle) * hobbyRadius-1.5, Math.cos(t + i)*.5);
    hobbyMeshes[i].rotation.z = -t * 0.8 + i;
  }
  controls.update();
  renderer.render(scene, camera);
}
    
    function onPointerDown(event) {
      // Detect click on central card
      const mouse = new THREE.Vector2(
        (event.offsetX / renderer.domElement.clientWidth) * 2 - 1,
        -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(centerCard);
      if (intersects.length > 0 && !isAnimating) {
        isAnimating = true;
        // Animate card rotation
        const start = { rot: centerCard.rotation.y };
        const end = { rot: centerCard.rotation.y + Math.PI * 2 };
        let t = 0;
        (function spinCard(){
          t += 0.04;
          centerCard.rotation.y = start.rot + (end.rot - start.rot) * t;
          if (t < 1) requestAnimationFrame(spinCard);
          else {
            centerCard.rotation.y = 0;
            nextCert();
          }
        })();
        setTimeout(()=>{ isAnimating=false; }, 650);
      }
    }
    function nextCert() {
      currentCert = (currentCert + 1) % certifications.length;
      loadCertCard(currentCert).then(updateCertOverlay);
    }
    
    // Light/Dark mode
    const modeBtn = document.getElementById('cbh3d-mode-toggle');
    const modeIcon = document.getElementById('cbh3d-mode-icon');
    modeBtn.onclick = function() {
      document.body.classList.toggle('cbh3d-dark');
      document.body.classList.toggle('cbh3d-light');
      modeIcon.classList.toggle('bi-moon-stars-fill');
      modeIcon.classList.toggle('bi-sun-fill');
      setTimeout(()=>{ // hack: reload scene for lighting/colors
        if(renderer) { renderer.dispose(); }
        setupScene();
      }, 100);
    };
    
    // Responsive
    window.addEventListener("resize", () => {
      if (!camera || !renderer) return;
      const width = canvas.clientWidth || 900;
      const height = 430;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    
    setupScene();
  });