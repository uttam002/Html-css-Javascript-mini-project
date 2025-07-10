// Chart.js - bar chart for latest transaction
const ctx = document.getElementById('transactionsChart').getContext('2d');
const transactionsChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        datasets: [
            {
                label: 'Active users',
                data: [120, 180, 130, 210, 135, 190, 210, 230, 220, 190, 195, 240],
                backgroundColor: [
                    'rgba(200,75,251,0.8)'
                ],
                borderRadius: 8,
                maxBarThickness: 18
            },
            {
                label: 'Inactive Users',
                data: [80, 110, 100, 150, 110, 140, 150, 170, 160, 140, 120, 190],
                backgroundColor: [
                    'rgba(91,76,255,0.8)'
                ],
                borderRadius: 8,
                maxBarThickness: 18
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                },
                grid: {
                    color: 'rgba(200,200,255,0.04)'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                },
                grid: {
                    color: 'rgba(200,200,255,0.04)'
                }
            }
        }
    }
});

// Theme toggle logic
const themeToggle = document.getElementById('themeToggle');
const htmlTag = document.documentElement;

function setTheme(theme) {
    htmlTag.setAttribute('data-theme', theme);
    themeToggle.innerHTML = theme === "dark"
        ? `<i class="bi bi-brightness-high"></i><span class="ms-1">Light</span>`
        : `<i class="bi bi-moon"></i><span class="ms-1">Dark</span>`;
    updateChartColors(theme);
}

function updateChartColors(theme) {
    const textColor = theme === "dark" ? "#fff" : "#19123a";
    transactionsChart.options.plugins.legend.labels.color = textColor;
    transactionsChart.options.scales.x.ticks.color = textColor;
    transactionsChart.options.scales.y.ticks.color = textColor;
    transactionsChart.update();
}

const savedTheme = localStorage.getItem('dashboard-theme') || "dark";
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
});

// Sidebar collapse/expand logic
const sidebar = document.getElementById('sidebar');
const showSidebarBtn = document.getElementById('showSidebarBtn');
function handleSidebar() {
    if (window.innerWidth < 992) {
        sidebar.classList.remove('show');
        showSidebarBtn.classList.remove('d-none');
    } else {
        sidebar.classList.add('show');
        showSidebarBtn.classList.add('d-none');
    }
}
showSidebarBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    sidebar.classList.add('show');
    showSidebarBtn.classList.add('d-none');
});
sidebar.addEventListener('transitionend', function() {
    if (!sidebar.classList.contains('show')) showSidebarBtn.classList.remove('d-none');
});
window.addEventListener('resize', handleSidebar);
document.addEventListener('DOMContentLoaded', handleSidebar);
document.addEventListener('click', function(e) {
    if (window.innerWidth < 992 && sidebar.classList.contains('show') && !sidebar.contains(e.target) && !showSidebarBtn.contains(e.target)) {
        sidebar.classList.remove('show');
    }
});

// Rightbar collapse/expand logic
const rightbarCol = document.getElementById('rightbarCol');
const showRightbarBtn = document.getElementById('showRightbarBtn');
function handleRightbar() {
    if (window.innerWidth < 992) {
        rightbarCol.classList.remove('show');
        showRightbarBtn.classList.remove('d-none');
    } else {
        rightbarCol.classList.add('show');
        showRightbarBtn.classList.add('d-none');
    }
}
showRightbarBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    rightbarCol.classList.add('show');
    showRightbarBtn.classList.add('d-none');
});
document.addEventListener('click', function(e) {
    if (window.innerWidth < 992 && rightbarCol.classList.contains('show') && !rightbarCol.contains(e.target) && !showRightbarBtn.contains(e.target)) {
        rightbarCol.classList.remove('show');
        showRightbarBtn.classList.remove('d-none');
    }
});
window.addEventListener('resize', handleRightbar);
document.addEventListener('DOMContentLoaded', handleRightbar);

// Mobile search bar toggle
const searchToggleBtn = document.getElementById('searchToggleBtn');
const mobileSearchBox = document.getElementById('mobileSearchBox');
if (searchToggleBtn && mobileSearchBox) {
    searchToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileSearchBox.classList.toggle('show');
        if (mobileSearchBox.classList.contains('show')) {
            mobileSearchBox.querySelector('input').focus();
        }
    });
    // Clicking outside hides mobile search
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && mobileSearchBox.classList.contains('show') && !mobileSearchBox.contains(e.target) && !searchToggleBtn.contains(e.target)) {
            mobileSearchBox.classList.remove('show');
        }
    });
}