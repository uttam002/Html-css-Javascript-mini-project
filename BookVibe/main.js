// --- Demo Book Data ---
const bookPages = [
    {
      title: "The Classic Mustang",
      type: "classic",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
      text: "A legend on wheels, the Mustang redefined American muscle cars. Its roar and retro charm are timeless.",
      watermark: "🚗"
    },
    {
      title: "Tesla Model S",
      type: "electric",
      img: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
      text: "The future is here. Tesla Model S blends luxury with innovation, and its performance is electrifying!",
      watermark: "⚡"
    },
    {
      title: "Porsche 911",
      type: "sports",
      img: "https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?auto=format&fit=crop&w=400&q=80",
      text: "With decades of racing heritage, the 911 embodies precision, power, and poise. The sports car icon.",
      watermark: "🏁"
    },
    {
      title: "VW Beetle",
      type: "classic",
      img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=400&q=80",
      text: "The Beetle’s shape is instantly recognizable. It charmed millions as a symbol of fun and freedom.",
      watermark: "🐞"
    },
    {
      title: "Lotus Evija",
      type: "electric",
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80",
      text: "A hypercar for a new era: Lotus Evija is a marvel of technology, beauty, and speed.",
      watermark: "🌿"
    }
  ];
  let currentPage = 0;
  let filteredPages = [...bookPages];
  let bookmarked = null;
  
  // --- Render a book page ---
  function renderBookPage(idx, side) {
    const page = filteredPages[idx];
    const $side = $(side === 'left' ? "#pageLeft" : "#pageRight");
    if (!page) return $side.empty().append('');
    $side.html(`
      <div class="storyTitle">${page.title}</div>
      <img class="storyImg" src="${page.img}" alt="${page.title}">
      <div class="storyText">${page.text}</div>
      <div class="watermark">${page.watermark || ""}</div>
    `);
  }
  
  // --- Realistic Page Turn with Animation (with direction) ---
  function turnPage(next = true) {
    if ($(".pageTurnAnim, .pageTurnAnimLeft").length) return;
    if (next && currentPage < filteredPages.length - 1) {
      $("#pageRight").addClass("pageTurnAnim");
      setTimeout(() => {
        currentPage++;
        renderPages();
        $("#pageRight").removeClass("pageTurnAnim");
        renderPageNumber();
      }, 1350);
    }
    if (!next && currentPage > 0) {
      $("#pageLeft").addClass("pageTurnAnimLeft");
      setTimeout(() => {
        currentPage--;
        renderPages();
        $("#pageLeft").removeClass("pageTurnAnimLeft");
        renderPageNumber();
      }, 1350);
    }
  }
  
  // --- Render both pages + number ---
  function renderPages() {
    renderBookPage(currentPage, 'left');
    renderBookPage(currentPage+1, 'right');
    renderPageNumber();
    renderBookmarkIcon();
  }
  
  // --- Page numbers ---
  function renderPageNumber() {
    let leftNum = currentPage + 1;
    let rightNum = currentPage + 2 <= filteredPages.length ? currentPage + 2 : '';
    $("#pageNumber").html(
      `<span style="margin-right:1.8em;">${leftNum}</span>` +
      (rightNum ? `<span>${rightNum}</span>` : '')
    );
  }
  
  // --- Bookmark logic ---
  function renderBookmarkIcon() {
    if (bookmarked === currentPage) {
      $("#bookmark").addClass("active");
    } else {
      $("#bookmark").removeClass("active");
    }
  }
  $("#bookmark").on("click", function(){
    if (bookmarked === currentPage) {
      bookmarked = null;
    } else {
      bookmarked = currentPage;
    }
    renderBookmarkIcon();
  });
  
  // --- Filters ---
  function filterPages(){
    const search = $("#searchInput").val().toLowerCase();
    const type = $("#typeFilter").val();
    filteredPages = bookPages.filter(
      pg => (!type || pg.type===type) && (!search || pg.title.toLowerCase().includes(search))
    );
    currentPage = 0;
    renderPages();
  }
  $("#searchInput,#typeFilter").on("input change", filterPages);
  $("#resetFilterBtn").on("click", function() {
    $("#searchInput").val('');
    $("#typeFilter").val('');
    filterPages();
  });
  
  // --- Panel open/close ---
  $("#filterToggleBtn").on("click", function(){
    $("#filterPanel").toggleClass("active");
    $("#searchInput").focus();
  });
  $(document).on("mousedown", function(e){
    if (!$(e.target).closest("#filterPanel, #filterToggleBtn").length) {
      $("#filterPanel").removeClass("active");
    }
  });
  
  // --- Keyboard navigation ---
  $(document).on("keydown", function(e){
    if (e.key === "ArrowRight") turnPage(true);
    if (e.key === "ArrowLeft") turnPage(false);
    if (e.key === "b" || e.key === "B") {
      $("#bookmark").click();
    }
  });
  
  // --- Page turn buttons ---
  $("#nextPageBtn").on("click", ()=>turnPage(true));
  $("#prevPageBtn").on("click", ()=>turnPage(false));
  
  // --- Initial Render ---
  $(function(){
    renderPages();
    if (bookmarked !== null) renderBookmarkIcon();
    startParticles();
  });
  
  // --- Dust Particles Animation (for magic/fantasy effect) ---
  function startParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width = $(".bookRoot").width();
    const H = canvas.height = $(".bookRoot").height();
    let particles = [];
    for (let i = 0; i < 58; i++) {
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*1.7+0.4,
        dx: (Math.random()-0.5)*0.18,
        dy: (Math.random()-0.5)*0.07,
        o: Math.random()*0.5+0.3,
        hue: Math.floor(Math.random()*30 + 15)
      });
    }
    function animate() {
      ctx.clearRect(0,0,W,H);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 1.4*Math.PI);
        ctx.fillStyle = `hsla(${p.hue},90%,80%,${p.o})`;
        ctx.shadowColor = `hsla(${p.hue},90%,80%,${p.o*0.5})`;
        ctx.shadowBlur = 5;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x<0) p.x+=W; if (p.x>W) p.x-=W;
        if (p.y<0) p.y+=H; if (p.y>H) p.y-=H;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }