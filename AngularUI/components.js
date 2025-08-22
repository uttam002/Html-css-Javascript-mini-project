// Initialize the components page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    initializeSidebar();
    initializeProgress();
    initializeCodeHighlighting();
    initializeSearch();
});

// Initialize page functionality
function initializePage() {
    // Set active sidebar items based on current hash
    const hash = window.location.hash;
    if (hash) {
        setActiveSidebarItem(hash);
        scrollToComponent(hash);
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        setActiveSidebarItem(hash);
        scrollToComponent(hash);
    });
    
    // Initialize all demo components
    initializeAllDemos();
    
    // Initialize view mode
    let currentViewMode = 'grid';
    window.currentViewMode = currentViewMode;
}

// Initialize sidebar functionality
function initializeSidebar() {
    // Open default categories
    const defaultCategories = ['buttons', 'feedback'];
    defaultCategories.forEach(category => {
        toggleCategory(category);
    });
    
    // Handle sidebar item clicks
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            setActiveSidebarItem(target);
            scrollToComponent(target);
            window.history.pushState(null, null, target);
        });
    });
}

// Toggle sidebar category
function toggleCategory(categoryId) {
    const categoryItems = document.getElementById(categoryId);
    const categoryHeader = document.querySelector(`[onclick="toggleCategory('${categoryId}')"]`);
    
    if (!categoryItems || !categoryHeader) return;
    
    const isOpen = categoryItems.classList.contains('open');
    
    if (isOpen) {
        categoryItems.classList.remove('open');
        categoryHeader.classList.remove('active');
        categoryItems.style.maxHeight = '0';
    } else {
        categoryItems.classList.add('open');
        categoryHeader.classList.add('active');
        categoryItems.style.maxHeight = categoryItems.scrollHeight + 'px';
    }
}

// Set active sidebar item
function setActiveSidebarItem(target) {
    // Remove active class from all items
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to current item
    const activeItem = document.querySelector(`a[href="${target}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// Scroll to component
function scrollToComponent(target) {
    const element = document.querySelector(target);
    if (element) {
        const offset = 100; // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchComponents(searchTerm);
    });
}

// Search components
function searchComponents(searchTerm) {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const categories = document.querySelectorAll('.component-category');
    
    if (!searchTerm) {
        // Show all items and categories
        sidebarItems.forEach(item => {
            item.style.display = 'block';
        });
        categories.forEach(category => {
            category.style.display = 'block';
        });
        return;
    }
    
    categories.forEach(category => {
        const categoryItems = category.querySelectorAll('.sidebar-item');
        let hasVisibleItems = false;
        
        categoryItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide category based on whether it has visible items
        category.style.display = hasVisibleItems ? 'block' : 'none';
        
        // Auto-expand categories with matches
        if (hasVisibleItems) {
            const categoryId = category.querySelector('.category-items').id;
            const categoryItems = document.getElementById(categoryId);
            const categoryHeader = category.querySelector('.category-header');
            
            if (!categoryItems.classList.contains('open')) {
                categoryItems.classList.add('open');
                categoryHeader.classList.add('active');
                categoryItems.style.maxHeight = categoryItems.scrollHeight + 'px';
            }
        }
    });
}

// Initialize progress components
function initializeProgress() {
    // Set up progress bar animations
    const progressBars = document.querySelectorAll('[data-value]');
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        const progressFill = bar.querySelector('.progress-fill');
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.width = value + '%';
            }, 500);
        }
    });
    
    // Set up SVG gradient for circular progress
    createSVGGradient();
    
    // Initialize circular progress
    initializeCircularProgress();
}

// Create SVG gradient for progress
function createSVGGradient() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'progressGradient';
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#667eea');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#764ba2');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    document.body.appendChild(svg);
}

// Initialize circular progress
function initializeCircularProgress() {
    const circularProgress = document.querySelectorAll('.ui-progress-circular');
    circularProgress.forEach(progress => {
        const svg = progress.querySelector('svg');
        const progressValue = progress.querySelector('.progress-value');
        const progressText = progress.querySelector('.progress-text');
        
        if (progressValue && progressText) {
            const value = parseInt(progressText.textContent);
            const circumference = 2 * Math.PI * 15.9155;
            const strokeDasharray = (value / 100) * circumference;
            
            progressValue.style.strokeDasharray = `${strokeDasharray}, ${circumference}`;
        }
    });
}

// Update progress (for interactive demo)
function updateProgress(value) {
    document.getElementById('progressValue').textContent = value;
    
    // Update linear progress
    const linearProgress = document.querySelector('#demoProgressLinear .progress-fill');
    if (linearProgress) {
        linearProgress.style.width = value + '%';
    }
    
    // Update circular progress
    const circularProgress = document.querySelector('#demoProgressCircular .progress-value');
    const circularText = document.querySelector('#demoProgressCircular .progress-text');
    
    if (circularProgress && circularText) {
        const circumference = 2 * Math.PI * 15.9155;
        const strokeDasharray = (value / 100) * circumference;
        
        circularProgress.style.strokeDasharray = `${strokeDasharray}, ${circumference}`;
        circularText.textContent = value + '%';
    }
}

// Initialize code highlighting
function initializeCodeHighlighting() {
    // Initialize Prism.js if available
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Initialize all demo components
function initializeAllDemos() {
    // Add ripple effect to buttons
    document.querySelectorAll('.ui-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.disabled) {
                demoRipple(e, this);
            }
        });
    });
    
    // Start animations for indeterminate progress
    startIndeterminateAnimations();
}

// Start indeterminate animations
function startIndeterminateAnimations() {
    const indeterminateProgress = document.querySelectorAll('.ui-progress-linear.indeterminate');
    indeterminateProgress.forEach(progress => {
        const fill = progress.querySelector('.progress-fill');
        if (fill) {
            fill.style.animation = 'indeterminateProgress 2s infinite';
        }
    });
}

// Demo ripple effect
function demoRipple(event, element) {
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
    
    // Add button feedback
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Show tab functionality
function showTab(componentId, tabType) {
    // Update tab buttons
    const tabButtons = document.querySelectorAll(`#${componentId} .tab-btn`);
    tabButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tab content
    const tabPanes = document.querySelectorAll(`#${componentId} .tab-pane`);
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    const targetPane = document.getElementById(`${componentId}-${tabType}`);
    if (targetPane) {
        targetPane.classList.add('active');
    }
    
    // Highlight code if switching to code tab
    if (tabType === 'code' && typeof Prism !== 'undefined') {
        setTimeout(() => {
            Prism.highlightAll();
        }, 100);
    }
}

// Show code tab functionality
function showCodeTab(componentId, codeType) {
    // Update code tab buttons
    const codeTabButtons = document.querySelectorAll(`#${componentId}-code .code-tab`);
    codeTabButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update code content
    const codeBlocks = document.querySelectorAll(`#${componentId}-code .code-block`);
    codeBlocks.forEach(block => block.classList.remove('active'));
    
    const targetBlock = document.getElementById(`${componentId}-${codeType}`);
    if (targetBlock) {
        targetBlock.classList.add('active');
    }
    
    // Highlight code
    if (typeof Prism !== 'undefined') {
        setTimeout(() => {
            Prism.highlightAll();
        }, 100);
    }
}

// Copy code functionality
function copyCode(codeElementId) {
    const codeElement = document.getElementById(codeElementId);
    if (!codeElement) return;
    
    const textToCopy = codeElement.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Code copied to clipboard!');
        
        // Visual feedback
        const copyBtn = event.target.closest('.copy-btn');
        if (copyBtn) {
            const originalContent = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.color = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalContent;
                copyBtn.style.color = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy code: ', err);
        showToast('Failed to copy code', 'error');
    });
}

// Copy to clipboard utility
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showToast('Failed to copy', 'error');
    });
}

// Toggle view mode
function toggleViewMode() {
    const currentMode = window.currentViewMode || 'grid';
    const newMode = currentMode === 'grid' ? 'list' : 'grid';
    
    window.currentViewMode = newMode;
    
    // Update button text and icon
    const viewModeIcon = document.getElementById('viewModeIcon');
    const viewModeText = document.getElementById('viewModeText');
    
    if (newMode === 'list') {
        viewModeIcon.className = 'fas fa-th-list';
        viewModeText.textContent = 'List View';
        document.body.classList.add('list-view');
    } else {
        viewModeIcon.className = 'fas fa-th-large';
        viewModeText.textContent = 'Grid View';
        document.body.classList.remove('list-view');
    }
    
    showToast(`Switched to ${newMode} view`);
}

// Show installation guide
function showInstallGuide() {
    const modal = document.getElementById('installModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconClass = type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
    const bgColor = type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #667eea, #764ba2)';
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Handle responsive behavior
function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        // Mobile view
        sidebar.classList.remove('open');
        mainContent.style.marginLeft = '0';
    } else {
        // Desktop view
        sidebar.classList.remove('open');
        mainContent.style.marginLeft = '300px';
    }
}

// Initialize mobile menu if needed
document.querySelector('.mobile-menu-toggle')?.addEventListener('click', toggleMobileMenu);

// Handle window resize
window.addEventListener('resize', handleResize);

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
        
        // Also close mobile menu
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        scrollToComponent(target);
        window.history.pushState(null, null, target);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    /* List view styles */
    .list-view .components-container {
        display: block;
    }
    
    .list-view .component-section {
        margin-bottom: 1rem;
    }
    
    .list-view .component-showcase {
        display: none;
    }
    
    .list-view .component-header {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .list-view .component-title h2 {
        font-size: 1.5rem;
    }
`;
document.head.appendChild(style);

// Initialize intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe component sections
document.querySelectorAll('.component-section').forEach(section => {
    observer.observe(section);
});

// Auto-update progress demo
let progressInterval;

function startProgressDemo() {
    progressInterval = setInterval(() => {
        const progressBars = document.querySelectorAll('.ui-progress-linear:not(.indeterminate) .progress-fill');
        progressBars.forEach(bar => {
            const currentWidth = parseInt(bar.style.width) || 0;
            const newWidth = currentWidth >= 100 ? 0 : currentWidth + 1;
            bar.style.width = newWidth + '%';
        });
    }, 50);
}

function stopProgressDemo() {
    if (progressInterval) {
        clearInterval(progressInterval);
    }
}

// Start demo when page loads
setTimeout(startProgressDemo, 2000);

// Stop demo when page is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopProgressDemo();
    } else {
        setTimeout(startProgressDemo, 1000);
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Navigate between components with arrow keys
    if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        
        const components = document.querySelectorAll('.component-section');
        const activeItem = document.querySelector('.sidebar-item.active');
        
        if (activeItem && components.length > 0) {
            const currentIndex = Array.from(document.querySelectorAll('.sidebar-item')).indexOf(activeItem);
            const direction = e.key === 'ArrowUp' ? -1 : 1;
            const newIndex = Math.max(0, Math.min(components.length - 1, currentIndex + direction));
            
            const newItem = document.querySelectorAll('.sidebar-item')[newIndex];
            if (newItem) {
                newItem.click();
            }
        }
    }
    
    // Quick search with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Performance optimization: Lazy load code examples
function lazyLoadCode() {
    const codeBlocks = document.querySelectorAll('.code-block:not(.loaded)');
    
    codeBlocks.forEach(block => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load and highlight code
                    if (typeof Prism !== 'undefined') {
                        Prism.highlightAllUnder(entry.target);
                    }
                    entry.target.classList.add('loaded');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(block);
    });
}

// Initialize lazy loading
setTimeout(lazyLoadCode, 1000);

console.log('AngularUI Pro Components page initialized successfully!');