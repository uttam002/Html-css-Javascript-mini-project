// ---- Data ----
const skillData = [
    { name: "Angular", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
    { name: "Node.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Supabase", level: 80, icon: "https://www.svgrepo.com/show/374118/supabase.svg" },
    { name: "TypeScript", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "CSS/Sass", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "PostgreSQL", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "AWS", level: 67, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  ];
  
  const projects = [
    {
      title: "Portfolify SaaS",
      desc: "A modern, multi-section portfolio builder platform powered by Angular & Supabase.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      tech: ["Angular", "Supabase", "Node.js"],
      link: "#", repo: "#"
    },
    {
      title: "Realtime Chat App",
      desc: "End-to-end encrypted chat app with group support and live notifications.",
      img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
      tech: ["React", "Firebase"],
      link: "#", repo: "#"
    },
    {
      title: "OpenSource Blog",
      desc: "A developer-friendly markdown blog platform with GitHub login.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      tech: ["Next.js", "Supabase"],
      link: "#", repo: "#"
    }
  ];
  
  const experience = [
    {
      title: "Senior Developer",
      org: "Tech Solutions AG",
      duration: "2022 - Present",
      desc: "Lead developer for SaaS products. Tech stack: Angular, Node.js, Supabase."
    },
    {
      title: "Web Developer",
      org: "Webify",
      duration: "2019 - 2022",
      desc: "Built scalable web apps for clients. Mentored junior devs."
    }
  ];
  
  const education = [
    {
      title: "MSc Computer Science",
      org: "TU Berlin",
      duration: "2017 - 2019",
      desc: "Thesis on distributed systems and cloud security."
    },
    {
      title: "BSc Information Tech",
      org: "University of Munich",
      duration: "2013 - 2017",
      desc: ""
    }
  ];
  
  const achievements = [
    { title: "Top Performer 2022", desc: "Awarded by Tech Solutions AG for outstanding contributions." },
    { title: "Google Code-In Mentor", desc: "Mentored open source contributors in 2021." },
    { title: "100+ GitHub Stars", desc: "My open source projects have 100+ GitHub stars." }
  ];
  
  // ---- UI Render ----
  window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    renderSkills();
    renderProjects();
    renderTimeline("expTimeline", experience);
    renderTimeline("eduTimeline", education);
    renderAchievements();
  
    typingEffect(["Full-stack Developer", "Open Source Enthusiast", "Mentor"], 120, 1100);
  
    // Scroll animations
    window.addEventListener("scroll", revealSections);
    revealSections();
  
    // Nav active link highlight
    document.querySelectorAll("nav ul li a").forEach(link => {
      link.addEventListener("click", e => {
        document.querySelectorAll("nav ul li").forEach(li => li.classList.remove("active"));
        link.parentElement.classList.add("active");
      });
    });
  
    // Contact form
    document.getElementById("contactForm").onsubmit = function(e) {
      e.preventDefault();
      document.getElementById("formMessage").textContent = "Thanks! This demo form does not send messages.";
      setTimeout(() => document.getElementById("formMessage").textContent = "", 4000);
      this.reset();
    };
  
    // Dark mode
    document.getElementById("darkToggle").onclick = () => {
      document.body.classList.toggle("dark");
      if(document.body.classList.contains("dark")) {
        document.documentElement.style.setProperty('--bg', '#18191a');
        document.documentElement.style.setProperty('--card', '#252526');
        document.documentElement.style.setProperty('--text', '#edf2fb');
        document.documentElement.style.setProperty('--text2', '#b1b8c9');
        document.documentElement.style.setProperty('--border', '#34373e');
        document.documentElement.style.setProperty('--shadow', '0 2px 14px #0003');
      } else {
        document.documentElement.style.setProperty('--bg', '#f9fafc');
        document.documentElement.style.setProperty('--card', '#fff');
        document.documentElement.style.setProperty('--text', '#222');
        document.documentElement.style.setProperty('--text2', '#52616b');
        document.documentElement.style.setProperty('--border', '#e2e8f0');
        document.documentElement.style.setProperty('--shadow', '0 2px 14px #abc2ee22');
      }
    };
  });
  
  // Typing effect
  function typingEffect(words, speed, delay) {
    let el = document.getElementById("typing");
    let i = 0, j = 0, isDel = false;
    function type() {
      let word = words[i];
      el.textContent = word.slice(0, j) + (j && !isDel ? "|" : "");
      if(!isDel && j < word.length) {
        j++; setTimeout(type, speed);
      } else if(!isDel) {
        isDel = true; setTimeout(type, delay);
      } else if(isDel && j > 0) {
        j--; setTimeout(type, 45);
      } else {
        isDel = false; i = (i+1)%words.length; setTimeout(type, 450);
      }
    }
    type();
  }
  
  // Skills
  function renderSkills() {
    let html = skillData.map(s => `
      <div class="skill-card scroll-fade">
        <div class="skill-header">
          <img src="${s.icon}" alt="${s.name}">
          <span class="skill-name">${s.name}</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar" style="width:0" data-level="${s.level}"></div>
        </div>
        <span class="skill-level">${s.level}%</span>
      </div>
    `).join('');
    document.querySelector(".skills-list").innerHTML = html;
    // Animate bars when in view
    setTimeout(() => {
      document.querySelectorAll(".skill-bar").forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.dataset.level + "%";
        }, 300);
      });
    }, 500);
  }
  
  // Projects
  function renderProjects() {
    let html = projects.map(p => `
      <div class="project-card scroll-fade">
        <img class="project-image" src="${p.img}" alt="${p.title}">
        <div class="project-content">
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.desc}</div>
          <div class="project-tech">${p.tech.join(', ')}</div>
          <div class="project-links">
            <a href="${p.link}" title="Live" target="_blank">🔗</a>
            <a href="${p.repo}" title="Repo" target="_blank">📦</a>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById("projectsGrid").innerHTML = html;
  }
  
  // Timeline (experience, education)
  function renderTimeline(id, list) {
    let html = list.map(ev => `
      <div class="timeline-event scroll-fade">
        <div class="timeline-dot"></div>
        <div class="timeline-title">${ev.title} <span class="timeline-duration">| ${ev.org} | ${ev.duration}</span></div>
        <div class="timeline-content">${ev.desc || ""}</div>
      </div>
    `).join('');
    document.getElementById(id).innerHTML = html;
  }
  
  // Achievements
  function renderAchievements() {
    let html = achievements.map(a => `<li><b>${a.title}</b>: ${a.desc}</li>`).join('');
    document.getElementById("achList").innerHTML = html;
  }
  
  // Section reveal on scroll
  function revealSections() {
    document.querySelectorAll(".scroll-fade").forEach(el => {
      let rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80) {
        el.style.opacity = 1;
        el.style.transform = "none";
      }
    });
  }