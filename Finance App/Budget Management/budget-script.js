// Budget Management System with Enhanced Notifications
class BudgetManager {
    constructor() {
        this.categories = this.loadCategories();
        this.notifications = this.loadNotifications();
        this.selectedCategoryId = null;
        this.init();
    }

    init() {
        this.renderCategories();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.setupEventListeners();
        this.showWelcomeScreen();
        this.updateNotificationBadge();
        this.checkBudgetAlerts();
        this.loadQuickNotifications();
    }

    loadCategories() {
        const defaultCategories = [
            {
                id: 1,
                name: 'Food & Dining',
                icon: 'fas fa-utensils',
                budget: 800,
                spent: 450,
                period: 'monthly',
                hasBudget: true
            },
            {
                id: 2,
                name: 'Transportation',
                icon: 'fas fa-car',
                budget: 300,
                spent: 380,
                period: 'monthly',
                hasBudget: true
            },
            {
                id: 3,
                name: 'Entertainment',
                icon: 'fas fa-gamepad',
                budget: 200,
                spent: 120,
                period: 'monthly',
                hasBudget: true
            },
            {
                id: 4,
                name: 'Healthcare',
                icon: 'fas fa-heart',
                budget: 0,
                spent: 0,
                period: 'monthly',
                hasBudget: false
            },
            {
                id: 5,
                name: 'Shopping',
                icon: 'fas fa-shopping-cart',
                budget: 500,
                spent: 650,
                period: 'monthly',
                hasBudget: true
            },
            {
                id: 6,
                name: 'Housing',
                icon: 'fas fa-home',
                budget: 1500,
                spent: 1500,
                period: 'monthly',
                hasBudget: true
            },
            {
                id: 7,
                name: 'Education',
                icon: 'fas fa-graduation-cap',
                budget: 0,
                spent: 0,
                period: 'monthly',
                hasBudget: false
            },
            {
                id: 8,
                name: 'Savings',
                icon: 'fas fa-piggy-bank',
                budget: 1000,
                spent: 800,
                period: 'monthly',
                hasBudget: true
            }
        ];

        const saved = localStorage.getItem('budgetCategories');
        return saved ? JSON.parse(saved) : defaultCategories;
    }

    loadNotifications() {
        const defaultNotifications = [
            {
                id: 1,
                type: 'danger',
                title: 'Budget Exceeded',
                message: 'Shopping category has exceeded budget by $150',
                time: '2 minutes ago',
                isRead: false,
                timestamp: Date.now() - 120000
            },
            {
                id: 2,
                type: 'warning',
                title: 'Budget Alert',
                message: 'Transportation is at 95% of monthly budget',
                time: '1 hour ago',
                isRead: false,
                timestamp: Date.now() - 3600000
            },
            {
                id: 3,
                type: 'success',
                title: 'Budget Updated',
                message: 'Successfully set budget for Entertainment category',
                time: '3 hours ago',
                isRead: true,
                timestamp: Date.now() - 10800000
            },
            {
                id: 4,
                type: 'info',
                title: 'Monthly Report',
                message: 'Your monthly budget report is ready for review',
                time: '1 day ago',
                isRead: false,
                timestamp: Date.now() - 86400000
            },
            {
                id: 5,
                type: 'warning',
                title: 'Categories Without Budget',
                message: '2 categories still need budget allocation',
                time: '2 days ago',
                isRead: true,
                timestamp: Date.now() - 172800000
            }
        ];

        const saved = localStorage.getItem('budgetNotifications');
        return saved ? JSON.parse(saved) : defaultNotifications;
    }

    saveCategories() {
        localStorage.setItem('budgetCategories', JSON.stringify(this.categories));
    }

    saveNotifications() {
        localStorage.setItem('budgetNotifications', JSON.stringify(this.notifications));
    }

    addNotification(type, title, message) {
        const notification = {
            id: Date.now(),
            type: type,
            title: title,
            message: message,
            time: 'Just now',
            isRead: false,
            timestamp: Date.now()
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        
        // Show floating notification
        this.showFloatingNotification(notification);
    }

    showFloatingNotification(notification) {
        const floatingPanel = document.getElementById('floatingNotificationPanel');
        const content = document.getElementById('floatingNotificationContent');
        
        const notificationEl = document.createElement('div');
        notificationEl.className = `notification-item ${notification.type}`;
        notificationEl.innerHTML = `
            <div class="notification-icon ${notification.type}">
                <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-text">${notification.message}</div>
            </div>
            <div class="notification-time">${notification.time}</div>
        `;

        content.insertBefore(notificationEl, content.firstChild);
        
        // Show panel briefly
        floatingPanel.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            floatingPanel.classList.remove('show');
        }, 5000);

        // Remove old notifications (keep max 10)
        const items = content.querySelectorAll('.notification-item');
        if (items.length > 10) {
            for (let i = 10; i < items.length; i++) {
                items[i].remove();
            }
        }
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check',
            warning: 'fa-exclamation-triangle',
            danger: 'fa-exclamation',
            info: 'fa-info-circle'
        };
        return icons[type] || 'fa-bell';
    }

    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.isRead).length;
        const badge = document.getElementById('notificationBadge');
        
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }

    loadQuickNotifications() {
        const quickList = document.getElementById('quickNotificationList');
        if (!quickList) return;

        const recentNotifications = this.notifications.slice(0, 5);
        
        quickList.innerHTML = recentNotifications.map(notification => `
            <div class="notification-item ${notification.isRead ? '' : 'unread'}" 
                 onclick="budgetManager.markAsRead(${notification.id})">
                <div class="notification-icon ${notification.type}">
                    <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-text">${notification.message}</div>
                </div>
                <div class="notification-time">${notification.time}</div>
            </div>
        `).join('');
    }

    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.isRead = true;
            this.saveNotifications();
            this.updateNotificationBadge();
            this.loadQuickNotifications();
            
            // Refresh notification center if open
            if (document.querySelector('.notification-center')) {
                this.showNotificationCenter();
            }
        }
    }

    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.isRead = true;
        });
        this.saveNotifications();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        this.showNotificationCenter();
        this.showSuccessNotification('All notifications marked as read');
    }

    clearOldNotifications() {
        const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
        this.notifications = this.notifications.filter(n => 
            !n.isRead || n.timestamp > oneDayAgo);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        this.showNotificationCenter();
        this.showSuccessNotification('Old notifications cleared');
    }

    checkBudgetAlerts() {
        const overBudgetCategories = this.categories.filter(c => 
            c.hasBudget && c.spent > c.budget);
        
        const nearBudgetCategories = this.categories.filter(c => 
            c.hasBudget && c.spent > c.budget * 0.9 && c.spent <= c.budget);

        const categoriesWithoutBudget = this.categories.filter(c => !c.hasBudget);

        // Show critical alert for over budget
        if (overBudgetCategories.length > 0) {
            const category = overBudgetCategories[0];
            const overage = category.spent - category.budget;
            this.showAlert(`${category.name} has exceeded budget by $${overage.toLocaleString()}`);
        }

        // Add notifications for budget issues
        overBudgetCategories.forEach(category => {
            const overage = category.spent - category.budget;
            const existingNotification = this.notifications.find(n => 
                n.message.includes(category.name) && n.type === 'danger' && !n.isRead);
            
            if (!existingNotification) {
                this.addNotification('danger', 'Budget Exceeded', 
                    `${category.name} has exceeded budget by $${overage.toLocaleString()}`);
            }
        });
    }

    showAlert(message) {
        const alertBar = document.getElementById('alertBar');
        const alertText = document.getElementById('alertText');
        
        alertText.textContent = message;
        alertBar.style.display = 'block';
    }

    closeAlert() {
        const alertBar = document.getElementById('alertBar');
        alertBar.style.display = 'none';
    }

    showNotificationCenter() {
        const detailsContent = document.getElementById('detailsContent');
        
        const allNotifications = this.notifications.sort((a, b) => b.timestamp - a.timestamp);
        
        detailsContent.innerHTML = `
            <div class="notification-center slide-in">
                <div class="notification-center-header">
                    <h2>Notification Center</h2>
                    <p>Stay updated with your budget alerts and activities</p>
                </div>

                <div class="notification-filters">
                    <button class="filter-btn active" onclick="budgetManager.filterNotifications('all')">All</button>
                    <button class="filter-btn" onclick="budgetManager.filterNotifications('unread')">Unread</button>
                    <button class="filter-btn" onclick="budgetManager.filterNotifications('danger')">Critical</button>
                    <button class="filter-btn" onclick="budgetManager.filterNotifications('warning')">Warnings</button>
                    <button class="filter-btn" onclick="budgetManager.filterNotifications('success')">Success</button>
                </div>

                <div class="notification-center-list" id="notificationCenterList">
                    ${allNotifications.map(notification => `
                        <div class="notification-center-item ${notification.isRead ? '' : 'unread'} ${notification.type}" 
                             data-type="${notification.type}" data-read="${notification.isRead}"
                             onclick="budgetManager.markAsRead(${notification.id})">
                            <div class="notification-icon ${notification.type}">
                                <i class="fas ${this.getNotificationIcon(notification.type)}"></i>
                            </div>
                            <div class="notification-content">
                                <div class="notification-title">${notification.title}</div>
                                <div class="notification-text">${notification.message}</div>
                                <div class="notification-time">${notification.time}</div>
                            </div>
                            ${!notification.isRead ? '<div class="unread-indicator"></div>' : ''}
                        </div>
                    `).join('')}
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn btn-primary" onclick="budgetManager.markAllAsRead()">
                        Mark All as Read
                    </button>
                    <button class="btn btn-secondary" onclick="budgetManager.clearOldNotifications()">
                        Clear Old Notifications
                    </button>
                </div>
            </div>
        `;
    }

    filterNotifications(filter) {
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // Filter notifications
        const items = document.querySelectorAll('.notification-center-item');
        items.forEach(item => {
            const type = item.dataset.type;
            const isRead = item.dataset.read === 'true';
            
            let show = true;
            
            switch(filter) {
                case 'unread':
                    show = !isRead;
                    break;
                case 'danger':
                case 'warning':
                case 'success':
                case 'info':
                    show = type === filter;
                    break;
                default:
                    show = true;
            }
            
            item.style.display = show ? 'block' : 'none';
        });
    }

    renderCategories() {
        const list = document.getElementById('categoriesList');
        list.innerHTML = '';

        this.categories.forEach(category => {
            const item = this.createCategoryItem(category);
            list.appendChild(item);
        });

        // Add animation
        setTimeout(() => {
            document.querySelectorAll('.category-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 50);
            });
        }, 50);
    }

    createCategoryItem(category) {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.onclick = () => this.selectCategory(category.id);
        
        if (category.hasBudget) {
            item.classList.add('budget-set');
            if (category.spent > category.budget) {
                item.classList.add('over-budget');
            }
        }

        const statusClass = category.hasBudget ? 
            (category.spent > category.budget ? 'status-exceeded' : 'status-set') : 
            'status-unset';

        const statusText = category.hasBudget ? 
            (category.spent > category.budget ? 'Over Budget' : 'Budget Set') : 
            'No Budget';

        item.innerHTML = `
            <div class="category-header">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <div class="category-info">
                    <h4>${category.name}</h4>
                    <span class="category-status ${statusClass}">${statusText}</span>
                </div>
            </div>
            <div class="category-preview">
                <span class="preview-budget">
                    ${category.hasBudget ? `$${category.budget.toLocaleString()}` : 'No budget'}
                </span>
                <span class="preview-spent">$${category.spent.toLocaleString()}</span>
            </div>
        `;

        return item;
    }

    selectCategory(categoryId) {
        // Remove active class from all items
        document.querySelectorAll('.category-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected item
        event.currentTarget.classList.add('active');

        this.selectedCategoryId = categoryId;
        this.showCategoryDetails(categoryId);
    }

    showCategoryDetails(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return;

        const detailsContent = document.getElementById('detailsContent');
        
        const progressPercentage = category.hasBudget ? 
            Math.min((category.spent / category.budget) * 100, 100) : 0;

        const remaining = category.hasBudget ? category.budget - category.spent : 0;

        detailsContent.innerHTML = `
            <div class="category-details slide-in">
                <div class="details-header">
                    <div class="category-icon">
                        <i class="${category.icon}"></i>
                    </div>
                    <div>
                        <h2>${category.name}</h2>
                        <span class="category-status ${category.hasBudget ? 
                            (category.spent > category.budget ? 'status-exceeded' : 'status-set') : 
                            'status-unset'}">
                            ${category.hasBudget ? 
                                (category.spent > category.budget ? 'Over Budget' : 'Budget Set') : 
                                'No Budget'}
                        </span>
                    </div>
                </div>

                ${category.hasBudget ? `
                    <div class="budget-overview">
                        <h3>Budget Overview</h3>
                        <div class="budget-stats">
                            <div class="budget-stat stat-budget">
                                <span class="budget-stat-value">$${category.budget.toLocaleString()}</span>
                                <span class="budget-stat-label">Budget</span>
                            </div>
                            <div class="budget-stat stat-spent">
                                <span class="budget-stat-value">$${category.spent.toLocaleString()}</span>
                                <span class="budget-stat-label">Spent</span>
                            </div>
                            <div class="budget-stat stat-remaining">
                                <span class="budget-stat-value">$${remaining.toLocaleString()}</span>
                                <span class="budget-stat-label">Remaining</span>
                            </div>
                        </div>
                        
                        <div class="progress-section">
                            <div class="progress-bar">
                                <div class="progress-fill ${category.spent > category.budget ? 'over-budget' : ''}" 
                                     style="width: ${progressPercentage}%"></div>
                            </div>
                            <div class="progress-info">
                                <span>${progressPercentage.toFixed(1)}% used</span>
                                <span>${category.period.charAt(0).toUpperCase() + category.period.slice(1)} period</span>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="budget-overview">
                        <h3>No Budget Set</h3>
                        <p style="color: #7f8c8d; text-align: center; padding: 40px 0;">
                            This category doesn't have a budget yet. Set a budget to start tracking your spending.
                        </p>
                    </div>
                `}

                <div class="budget-form">
                    <h3>${category.hasBudget ? 'Update Budget' : 'Set Budget'}</h3>
                    <form onsubmit="budgetManager.handleBudgetUpdate(event, ${category.id})">
                        <div class="form-group">
                            <label for="budgetAmount">Budget Amount ($)</label>
                            <input type="number" id="budgetAmount" name="budgetAmount" 
                                   min="0" step="0.01" value="${category.budget || ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="budgetPeriod">Budget Period</label>
                            <select id="budgetPeriod" name="budgetPeriod">
                                <option value="weekly" ${category.period === 'weekly' ? 'selected' : ''}>Weekly</option>
                                <option value="monthly" ${category.period === 'monthly' ? 'selected' : ''}>Monthly</option>
                                <option value="yearly" ${category.period === 'yearly' ? 'selected' : ''}>Yearly</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">
                                ${category.hasBudget ? 'Update Budget' : 'Set Budget'}
                            </button>
                            <button type="button" class="btn btn-secondary" 
                                    onclick="budgetManager.addSpending(${category.id})">
                                Add Spending
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    handleBudgetUpdate(event, categoryId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const amount = parseFloat(formData.get('budgetAmount'));
        const period = formData.get('budgetPeriod');

        const category = this.categories.find(c => c.id === categoryId);
        if (category) {
            const wasSet = category.hasBudget;
            category.budget = amount;
            category.period = period;
            category.hasBudget = true;

            this.saveCategories();
            this.renderCategories();
            this.updateHeaderStats();
            this.updateWelcomeStats();
            this.showCategoryDetails(categoryId);

            // Add notification
            this.addNotification('success', 'Budget Updated', 
                `${category.name} budget ${wasSet ? 'updated' : 'set'} to $${amount.toLocaleString()}`);
        }
    }

    addSpending(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return;

        const amount = prompt(`Add spending amount for ${category.name}:`, '0');
        if (amount !== null && !isNaN(amount) && parseFloat(amount) > 0) {
            const spendingAmount = parseFloat(amount);
            category.spent += spendingAmount;
            
            this.saveCategories();
            this.renderCategories();
            this.updateHeaderStats();
            this.showCategoryDetails(categoryId);

            // Add notification
            this.addNotification('info', 'Spending Added', 
                `Added $${spendingAmount.toLocaleString()} spending to ${category.name}`);

            // Check if over budget
            if (category.hasBudget && category.spent > category.budget) {
                const overage = category.spent - category.budget;
                this.addNotification('danger', 'Budget Exceeded', 
                    `${category.name} has exceeded budget by $${overage.toLocaleString()}`);
            }
        }
    }

    showFinancialAnalysis() {
        const detailsContent = document.getElementById('detailsContent');
        
        const totalBudget = this.categories.reduce((sum, cat) => 
            sum + (cat.hasBudget ? cat.budget : 0), 0);
        const totalSpent = this.categories.reduce((sum, cat) => sum + cat.spent, 0);
        const categoriesWithBudget = this.categories.filter(c => c.hasBudget);
        const overBudgetCategories = this.categories.filter(c => 
            c.hasBudget && c.spent > c.budget);

        detailsContent.innerHTML = `
            <div class="financial-analysis slide-in">
                <div class="analysis-header">
                    <h2>Financial Analysis</h2>
                    <p>Comprehensive overview of your budget performance</p>
                </div>

                <div class="budget-overview">
                    <h3>Overall Statistics</h3>
                    <div class="budget-stats">
                        <div class="budget-stat stat-budget">
                            <span class="budget-stat-value">$${totalBudget.toLocaleString()}</span>
                            <span class="budget-stat-label">Total Budget</span>
                        </div>
                        <div class="budget-stat stat-spent">
                            <span class="budget-stat-value">$${totalSpent.toLocaleString()}</span>
                            <span class="budget-stat-label">Total Spent</span>
                        </div>
                        <div class="budget-stat stat-remaining">
                            <span class="budget-stat-value">$${(totalBudget - totalSpent).toLocaleString()}</span>
                            <span class="budget-stat-label">Remaining</span>
                        </div>
                    </div>
                </div>

                <div class="analysis-charts">
                    <div class="chart-container">
                        <canvas id="analysisChart" width="350" height="350"></canvas>
                    </div>
                </div>

                <div class="analysis-insights">
                    <h3>Insights & Recommendations</h3>
                    
                    ${totalSpent <= totalBudget ? `
                        <div class="insight-item">
                            <div class="insight-icon success">
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="insight-text">
                                Great job! You're within your overall budget. You have $${(totalBudget - totalSpent).toLocaleString()} remaining.
                            </div>
                        </div>
                    ` : `
                        <div class="insight-item">
                            <div class="insight-icon danger">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="insight-text">
                                You've exceeded your total budget by $${(totalSpent - totalBudget).toLocaleString()}. Consider reviewing your spending habits.
                            </div>
                        </div>
                    `}

                    ${overBudgetCategories.length > 0 ? `
                        <div class="insight-item">
                            <div class="insight-icon warning">
                                <i class="fas fa-exclamation"></i>
                            </div>
                            <div class="insight-text">
                                ${overBudgetCategories.length} categories are over budget: ${overBudgetCategories.map(c => c.name).join(', ')}.
                            </div>
                        </div>
                    ` : ''}

                    ${categoriesWithBudget.length < this.categories.length ? `
                        <div class="insight-item">
                            <div class="insight-icon warning">
                                <i class="fas fa-info"></i>
                            </div>
                            <div class="insight-text">
                                ${this.categories.length - categoriesWithBudget.length} categories don't have budgets set. Consider setting budgets for better financial tracking.
                            </div>
                        </div>
                    ` : ''}

                    <div class="insight-item">
                        <div class="insight-icon success">
                            <i class="fas fa-lightbulb"></i>
                        </div>
                        <div class="insight-text">
                            Your highest spending category is ${this.getHighestSpendingCategory().name} with $${this.getHighestSpendingCategory().spent.toLocaleString()}.
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Render chart after content is loaded
        setTimeout(() => this.renderAnalysisChart(), 100);
    }

    getHighestSpendingCategory() {
        return this.categories.reduce((max, cat) => 
            cat.spent > max.spent ? cat : max, this.categories[0]);
    }

    renderAnalysisChart() {
        const canvas = document.getElementById('analysisChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const categoriesWithSpending = this.categories.filter(c => c.spent > 0);
        if (categoriesWithSpending.length === 0) {
            ctx.fillStyle = '#95a5a6';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('No spending data available', canvas.width / 2, canvas.height / 2);
            return;
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;
        
        const total = categoriesWithSpending.reduce((sum, cat) => sum + cat.spent, 0);
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'];
        
        let startAngle = 0;
        
        // Draw pie slices
        categoriesWithSpending.forEach((category, index) => {
            const sliceAngle = (category.spent / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            
            // Add labels
            const labelAngle = startAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
            
            ctx.fillStyle = '#2c3e50';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(category.name, labelX, labelY);
            
            startAngle += sliceAngle;
        });
    }

    showWelcomeScreen() {
        const detailsContent = document.getElementById('detailsContent');
        detailsContent.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-icon">
                    <i class="fas fa-chart-pie"></i>
                </div>
                <h3>Welcome to Budget Management</h3>
                <p>Select a category from the left to view details and manage budgets, or click on Analysis to see your financial overview.</p>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <i class="fas fa-list"></i>
                        <span id="totalCategories">${this.categories.length}</span>
                        <label>Total Categories</label>
                    </div>
                    <div class="welcome-stat">
                        <i class="fas fa-check-circle"></i>
                        <span id="categoriesWithBudget">${this.categories.filter(c => c.hasBudget).length}</span>
                        <label>With Budget</label>
                    </div>
                </div>
            </div>
        `;
    }

    updateHeaderStats() {
        const totalBudget = this.categories.reduce((sum, cat) => 
            sum + (cat.hasBudget ? cat.budget : 0), 0);
        const totalSpent = this.categories.reduce((sum, cat) => sum + cat.spent, 0);
        const remaining = totalBudget - totalSpent;

        document.getElementById('totalBudget').textContent = `$${totalBudget.toLocaleString()}`;
        document.getElementById('totalSpent').textContent = `$${totalSpent.toLocaleString()}`;
        document.getElementById('remaining').textContent = `$${remaining.toLocaleString()}`;
    }

    updateWelcomeStats() {
        const totalCategoriesEl = document.getElementById('totalCategories');
        const categoriesWithBudgetEl = document.getElementById('categoriesWithBudget');
        
        if (totalCategoriesEl) {
            totalCategoriesEl.textContent = this.categories.length;
        }
        if (categoriesWithBudgetEl) {
            categoriesWithBudgetEl.textContent = this.categories.filter(c => c.hasBudget).length;
        }
    }

    filterCategories() {
        const filter = document.getElementById('filterStatus').value;
        const items = document.querySelectorAll('.category-item');

        items.forEach((item, index) => {
            const category = this.categories[index];
            let show = true;
            
            switch(filter) {
                case 'set':
                    show = category.hasBudget;
                    break;
                case 'unset':
                    show = !category.hasBudget;
                    break;
                case 'exceeded':
                    show = category.hasBudget && category.spent > category.budget;
                    break;
                default:
                    show = true;
            }

            item.style.display = show ? 'block' : 'none';
        });
    }

    addNewCategory() {
        document.getElementById('newCategoryModal').style.display = 'block';
    }

    handleNewCategorySubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('newCategoryName').value.trim();
        const icon = document.getElementById('categoryIcon').value;

        if (!name) return;

        const newCategory = {
            id: Math.max(...this.categories.map(c => c.id)) + 1,
            name: name,
            icon: icon,
            budget: 0,
            spent: 0,
            period: 'monthly',
            hasBudget: false
        };

        this.categories.push(newCategory);
        this.saveCategories();
        this.renderCategories();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.closeNewCategoryModal();

        // Add notification
        this.addNotification('success', 'Category Added', 
            `New category "${name}" has been added successfully`);
    }

    exportData() {
        const data = {
            categories: this.categories,
            notifications: this.notifications,
            exportDate: new Date().toISOString(),
            totalBudget: this.categories.reduce((sum, cat) => sum + (cat.hasBudget ? cat.budget : 0), 0),
            totalSpent: this.categories.reduce((sum, cat) => sum + cat.spent, 0),
            user: 'uttam002',
            exportTime: '2025-08-18 08:34:47'
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `budget-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        // Add notification
        this.addNotification('success', 'Data Exported', 
            'Budget data has been exported successfully');
    }

    setupEventListeners() {
        // Modal close events
        window.onclick = (event) => {
            if (event.target.classList.contains('mini-modal')) {
                event.target.style.display = 'none';
            }
        };

        // New category form
        document.getElementById('newCategoryForm').onsubmit = (e) => this.handleNewCategorySubmit(e);

        // Auto-hide floating notifications on scroll
        document.addEventListener('scroll', () => {
            const floatingPanel = document.getElementById('floatingNotificationPanel');
            if (floatingPanel.classList.contains('show')) {
                setTimeout(() => {
                    floatingPanel.classList.remove('show');
                }, 2000);
            }
        });
    }

    closeNewCategoryModal() {
        document.getElementById('newCategoryModal').style.display = 'none';
        document.getElementById('newCategoryForm').reset();
    }

    closeFloatingNotifications() {
        const floatingPanel = document.getElementById('floatingNotificationPanel');
        floatingPanel.classList.remove('show');
    }

    showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInNotification 0.3s ease;
        `;
        notification.textContent = message;
        
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideInNotification {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInNotification 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global functions for HTML onclick handlers
let budgetManager;

function addNewCategory() {
    budgetManager.addNewCategory();
}

function showFinancialAnalysis() {
    budgetManager.showFinancialAnalysis();
}

function showNotificationCenter() {
    budgetManager.showNotificationCenter();
}

function exportData() {
    budgetManager.exportData();
}

function filterCategories() {
    budgetManager.filterCategories();
}

function closeNewCategoryModal() {
    budgetManager.closeNewCategoryModal();
}

function closeAlert() {
    budgetManager.closeAlert();
}

function closeFloatingNotifications() {
    budgetManager.closeFloatingNotifications();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    budgetManager = new BudgetManager();
});