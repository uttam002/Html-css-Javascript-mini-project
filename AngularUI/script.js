// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add scroll event listener for navbar
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialize component filtering
    initializeComponentFiltering();
    
    // Add ripple effect to buttons
    addRippleEffects();
});

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Ripple effect creation
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effects to demo elements
function demoRipple(event, element) {
    createRipple(event, element);
    
    // Add a subtle scale animation
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Button animation
function buttonAnimation(button) {
    button.style.transform = 'scale(0.95) rotateZ(5deg)';
    button.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1) rotateZ(0deg)';
        button.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    }, 200);
}

// Component category filtering
function showCategory(category) {
    const items = document.querySelectorAll('.component-item');
    const tabs = document.querySelectorAll('.tab-btn');
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter components
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            item.style.display = 'none';
        }
    });
}

// Smooth scrolling functions
function scrollToDemo() {
    document.getElementById('components').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToComponents() {
    document.getElementById('components').scrollIntoView({
        behavior: 'smooth'
    });
}

// Modal functions
function showInstallModal() {
    const modal = document.getElementById('installModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show success feedback
        showToast('Copied to clipboard!');
    });
}

function copyCode() {
    const code = 'npm install @uttam002/angular-ui-pro';
    copyToClipboard(code);
}

// Show demo functions
function showCode(component) {
    const codeExamples = {
        button: `<ui-button 
  variant="primary" 
  ripple="true" 
  (click)="handleClick()">
  Click Me
</ui-button>`,
        progress: `<ui-progress-bar 
  [value]="progressValue" 
  [animated]="true"
  variant="gradient">
</ui-progress-bar>`,
        forms: `<ui-input 
  placeholder="Enter text..."
  [floating-label]="true"
  validation="required">
</ui-input>`,
        navigation: `<ui-tabs>
  <ui-tab label="Tab 1">Content 1</ui-tab>
  <ui-tab label="Tab 2">Content 2</ui-tab>
</ui-tabs>`
    };
    
    showCodeModal(codeExamples[component] || 'Component code example');
}

function showDemo(component) {
    // This would typically open a live demo
    showToast(`Opening ${component} demo...`);
}

// Code modal
function showCodeModal(code) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Component Code</h3>
                <button class="close-btn" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="code-block">
                    <div class="code-header">
                        <span>HTML</span>
                        <button class="copy-btn" onclick="copyToClipboard(\`${code.replace(/`/g, '\\`')}\`)">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <pre><code>${code}</code></pre>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize animations
function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize component filtering
function initializeComponentFiltering() {
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all component items
    document.querySelectorAll('.component-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

// Add ripple effects to buttons
function addRippleEffects() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.demo-progress-fill');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Initialize mobile menu
document.querySelector('.mobile-menu-toggle')?.addEventListener('click', toggleMobileMenu);

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Auto-update progress bars
setInterval(() => {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        const newWidth = currentWidth >= 100 ? 0 : currentWidth + 10;
        bar.style.width = newWidth + '%';
    });
}, 500);