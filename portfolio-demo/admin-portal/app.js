// Mock section data
const sections = [
    { key: "about", name: "About Me", show: true, data: { summary: "Hi! I'm Jane, a full-stack developer...", location: "Berlin, Germany" } },
    { key: "projects", name: "Projects", show: true, data: { count: 3 } },
    { key: "skills", name: "Skills", show: true, data: { list: ["Angular", "Node.js", "Supabase"] } },
    { key: "experience", name: "Experience", show: false, data: { count: 2 } },
    { key: "education", name: "Education", show: true, data: { degree: "MSc Computer Science" } },
    { key: "achievements", name: "Achievements", show: false, data: { count: 1 } },
    { key: "blogs", name: "Blogs", show: false, data: { count: 0 } },
  ];
  
  function renderSections() {
    const container = document.getElementById('section-list');
    container.innerHTML = '';
    sections.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'section-card' + (s.show ? '' : ' inactive');
      card.innerHTML = `
        <div class="section-header">
          <span class="section-title">${s.name}</span>
          <div class="section-toggle">
            <label>
              <input type="checkbox" ${s.show ? 'checked' : ''} onchange="toggleSection(${idx})">
              ${s.show ? 'Shown' : 'Hidden'}
            </label>
          </div>
        </div>
        <div class="section-actions">
          <button onclick="editSection(${idx})">✏️ Edit</button>
          <button class="delete" onclick="deleteSection(${idx})">🗑️ Delete</button>
        </div>
        <div class="section-info">
          ${sectionPreview(s)}
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  function sectionPreview(s) {
    switch (s.key) {
      case "about":
        return `<p><b>Summary:</b> ${s.data.summary || ""}<br><b>Location:</b> ${s.data.location || ""}</p>`;
      case "projects":
        return `<p>${s.data.count} project(s) added.</p>`;
      case "skills":
        return `<p>${(s.data.list || []).join(', ')}</p>`;
      case "experience":
        return `<p>${s.data.count} experience(s) added.</p>`;
      case "education":
        return `<p>${s.data.degree || ""}</p>`;
      case "achievements":
        return `<p>${s.data.count} achievement(s).</p>`;
      case "blogs":
        return `<p>${s.data.count} blog(s).</p>`;
      default:
        return '';
    }
  }
  
  function toggleSection(idx) {
    sections[idx].show = !sections[idx].show;
    renderSections();
  }
  
  function editSection(idx) {
    const s = sections[idx];
    document.getElementById('editor').style.display = 'block';
    document.getElementById('editor-title').textContent = `Edit: ${s.name}`;
    const form = document.getElementById('editor-form');
    form.innerHTML = '';
    // Only About Me and Skills as an advanced demo
    if (s.key === 'about') {
      form.innerHTML += `
        <label>Summary:<br><textarea name="summary" rows="3">${s.data.summary || ""}</textarea></label>
        <label>Location:<br><input name="location" type="text" value="${s.data.location || ""}"></label>
      `;
    } else if (s.key === 'skills') {
      form.innerHTML += `
        <label>Skills (comma separated):<br>
          <input name="skills" type="text" value="${(s.data.list || []).join(', ')}">
        </label>
      `;
    } else {
      form.innerHTML = `<em>Quick edit not available for this section in the demo.</em>`;
    }
    form.onsubmit = (e) => {
      e.preventDefault();
      if (s.key === 'about') {
        s.data.summary = form.summary.value;
        s.data.location = form.location.value;
      } else if (s.key === 'skills') {
        s.data.list = form.skills.value.split(',').map(x => x.trim()).filter(Boolean);
      }
      document.getElementById('editor').style.display = 'none';
      renderSections();
    };
    // Add Save button
    if (s.key === 'about' || s.key === 'skills') {
      form.innerHTML += `<button class="primary-btn" type="submit">Save</button>`;
    }
  }
  
  function closeEditor() {
    document.getElementById('editor').style.display = 'none';
  }
  
  function deleteSection(idx) {
    if (confirm(`Delete the "${sections[idx].name}" section? This cannot be undone.`)) {
      sections.splice(idx, 1);
      renderSections();
    }
  }
  
  function previewPortfolio() {
    // Generate a mock portfolio preview based on active sections
    let html = `
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; background: #f8fafc; color: #18191a;}
        .portfolio { max-width: 800px; margin: 30px auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 14px #abc2ee33; padding: 40px 30px;}
        .portfolio h1 { color: #5a67d8; }
        section { margin-bottom: 25px; }
        .skills span { background: #e2e8f0; border-radius: 5px; padding: 4px 10px; margin: 0 5px 5px 0; display: inline-block;}
      </style>
      <div class="portfolio">
        <h1>Jane Doe</h1>
        ${sections.filter(s => s.show).map(s => {
          switch (s.key) {
            case "about":
              return `<section><h2>About Me</h2><p>${s.data.summary || ""}</p><p><small>${s.data.location || ""}</small></p></section>`;
            case "projects":
              return `<section><h2>Projects</h2><ul><li>Project 1</li><li>Project 2</li></ul></section>`;
            case "skills":
              return `<section class="skills"><h2>Skills</h2>${(s.data.list || []).map(skill => `<span>${skill}</span>`).join('')}</section>`;
            case "experience":
              return `<section><h2>Experience</h2><ul><li>Company A - Developer</li></ul></section>`;
            case "education":
              return `<section><h2>Education</h2><p>${s.data.degree || ""}</p></section>`;
            case "achievements":
              return `<section><h2>Achievements</h2><ul><li>Top Performer 2022</li></ul></section>`;
            case "blogs":
              return `<section><h2>Blogs</h2><ul><li>No blogs yet.</li></ul></section>`;
            default:
              return '';
          }
        }).join('')}
      </div>
    `;
    document.getElementById('preview-modal').style.display = "flex";
    document.getElementById('preview-iframe').srcdoc = html;
  }
  
  function closeModal() {
    document.getElementById('preview-modal').style.display = "none";
  }
  
  // Dark mode toggle
  function toggleDarkMode() {
    document.body.classList.toggle('dark');
  }
  
  // Initial render
  renderSections();