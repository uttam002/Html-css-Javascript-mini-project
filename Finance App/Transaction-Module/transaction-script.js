// Transaction Management System
class TransactionManager {
    constructor() {
        this.transactions = this.loadTransactions();
        this.notifications = this.loadNotifications();
        this.selectedTransactionId = null;
        this.categories = this.getCategories();
        this.init();
    }

    init() {
        this.renderTransactions();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.setupEventListeners();
        this.showWelcomeScreen();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        this.setTodaysDate();
    }

    loadTransactions() {
        const defaultTransactions = [
            {
                id: 1,
                type: 'expense',
                amount: 45.50,
                category: 'food',
                description: 'Lunch at Italian Restaurant',
                date: '2025-08-18',
                account: 'credit',
                tags: 'dining, work',
                timestamp: Date.now() - 3600000
            },
            {
                id: 2,
                type: 'income',
                amount: 3500.00,
                category: 'salary',
                description: 'Monthly Salary Payment',
                date: '2025-08-17',
                account: 'checking',
                tags: 'salary, work',
                timestamp: Date.now() - 86400000
            },
            {
                id: 3,
                type: 'expense',
                amount: 25.00,
                category: 'transport',
                description: 'Uber ride to office',
                date: '2025-08-17',
                account: 'checking',
                tags: 'transport, work',
                timestamp: Date.now() - 90000000
            },
            {
                id: 4,
                type: 'expense',
                amount: 120.75,
                category: 'shopping',
                description: 'Groceries and household items',
                date: '2025-08-16',
                account: 'checking',
                tags: 'groceries, household',
                timestamp: Date.now() - 172800000
            },
            {
                id: 5,
                type: 'income',
                amount: 800.00,
                category: 'freelance',
                description: 'Web development project payment',
                date: '2025-08-15',
                account: 'checking',
                tags: 'freelance, development',
                timestamp: Date.now() - 259200000
            },
            {
                id: 6,
                type: 'expense',
                amount: 15.99,
                category: 'entertainment',
                description: 'Netflix subscription',
                date: '2025-08-15',
                account: 'credit',
                tags: 'subscription, entertainment',
                timestamp: Date.now() - 259200000
            },
            {
                id: 7,
                type: 'expense',
                amount: 85.00,
                category: 'healthcare',
                description: 'Doctor consultation',
                date: '2025-08-14',
                account: 'checking',
                tags: 'health, medical',
                timestamp: Date.now() - 345600000
            },
            {
                id: 8,
                type: 'expense',
                amount: 32.50,
                category: 'transport',
                description: 'Gas station fill-up',
                date: '2025-08-13',
                account: 'credit',
                tags: 'fuel, transport',
                timestamp: Date.now() - 432000000
            }
        ];

        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : defaultTransactions;
    }

    loadNotifications() {
        const defaultNotifications = [
            {
                id: 1,
                type: 'success',
                title: 'Transaction Added',
                message: 'Lunch payment of $45.50 recorded successfully',
                time: '5 minutes ago',
                isRead: false,
                timestamp: Date.now() - 300000
            },
            {
                id: 2,
                type: 'info',
                title: 'Weekly Summary',
                message: 'You spent $289.24 this week across 6 transactions',
                time: '2 hours ago',
                isRead: false,
                timestamp: Date.now() - 7200000
            }
        ];

        const saved = localStorage.getItem('transactionNotifications');
        return saved ? JSON.parse(saved) : defaultNotifications;
    }

    getCategories() {
        return {
            expense: [
                { value: 'food', label: 'Food & Dining', icon: 'fas fa-utensils' },
                { value: 'transport', label: 'Transportation', icon: 'fas fa-car' },
                { value: 'entertainment', label: 'Entertainment', icon: 'fas fa-gamepad' },
                { value: 'healthcare', label: 'Healthcare', icon: 'fas fa-heart' },
                { value: 'shopping', label: 'Shopping', icon: 'fas fa-shopping-cart' },
                { value: 'utilities', label: 'Utilities', icon: 'fas fa-home' },
                { value: 'education', label: 'Education', icon: 'fas fa-graduation-cap' }
            ],
            income: [
                { value: 'salary', label: 'Salary', icon: 'fas fa-briefcase' },
                { value: 'freelance', label: 'Freelance', icon: 'fas fa-laptop' },
                { value: 'investment', label: 'Investment', icon: 'fas fa-chart-line' },
                { value: 'gift', label: 'Gift', icon: 'fas fa-gift' },
                { value: 'other', label: 'Other Income', icon: 'fas fa-coins' }
            ]
        };
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    saveNotifications() {
        localStorage.setItem('transactionNotifications', JSON.stringify(this.notifications));
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
        
        floatingPanel.classList.add('show');
        
        setTimeout(() => {
            floatingPanel.classList.remove('show');
        }, 4000);

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
                 onclick="transactionManager.markAsRead(${notification.id})">
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
        }
    }

    renderTransactions() {
        const list = document.getElementById('transactionsList');
        list.innerHTML = '';

        const sortedTransactions = this.transactions.sort((a, b) => b.timestamp - a.timestamp);

        sortedTransactions.forEach(transaction => {
            const item = this.createTransactionItem(transaction);
            list.appendChild(item);
        });

        setTimeout(() => {
            document.querySelectorAll('.transaction-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 50);
            });
        }, 50);
    }

    createTransactionItem(transaction) {
        const item = document.createElement('div');
        item.className = `transaction-item ${transaction.type}`;
        item.onclick = () => this.selectTransaction(transaction.id);

        const category = this.categories[transaction.type].find(c => c.value === transaction.category);
        const categoryLabel = category ? category.label : transaction.category;
        const categoryIcon = category ? category.icon : 'fas fa-circle';

        const sign = transaction.type === 'income' ? '+' : '-';
        const formattedAmount = `${sign}$${transaction.amount.toLocaleString()}`;

        item.innerHTML = `
            <div class="transaction-header">
                <div class="transaction-icon ${transaction.type}">
                    <i class="${categoryIcon}"></i>
                </div>
                <div class="transaction-info">
                    <h4>${transaction.description}</h4>
                    <span class="transaction-category">${categoryLabel}</span>
                </div>
            </div>
            <div class="transaction-details">
                <span class="transaction-amount ${transaction.type}">${formattedAmount}</span>
                <span class="transaction-date">${this.formatDate(transaction.date)}</span>
            </div>
        `;

        return item;
    }

    selectTransaction(transactionId) {
        document.querySelectorAll('.transaction-item').forEach(item => {
            item.classList.remove('active');
        });

        event.currentTarget.classList.add('active');
        this.selectedTransactionId = transactionId;
        this.showTransactionDetails(transactionId);
    }

    showTransactionDetails(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        const detailsContent = document.getElementById('detailsContent');
        const category = this.categories[transaction.type].find(c => c.value === transaction.category);
        const categoryLabel = category ? category.label : transaction.category;
        const categoryIcon = category ? category.icon : 'fas fa-circle';

        const sign = transaction.type === 'income' ? '+' : '-';
        const formattedAmount = `${sign}$${transaction.amount.toLocaleString()}`;

        detailsContent.innerHTML = `
            <div class="transaction-details-view slide-in">
                <div class="details-header">
                    <div class="transaction-icon ${transaction.type}">
                        <i class="${categoryIcon}"></i>
                    </div>
                    <div>
                        <h2>${transaction.description}</h2>
                        <span class="transaction-category">${categoryLabel}</span>
                    </div>
                </div>

                <div class="transaction-overview">
                    <h3>Transaction Details</h3>
                    <div class="transaction-stats">
                        <div class="transaction-stat stat-amount">
                            <span class="transaction-stat-value ${transaction.type}">${formattedAmount}</span>
                            <span class="transaction-stat-label">Amount</span>
                        </div>
                        <div class="transaction-stat stat-date">
                            <span class="transaction-stat-value">${this.formatDate(transaction.date)}</span>
                            <span class="transaction-stat-label">Date</span>
                        </div>
                        <div class="transaction-stat stat-account">
                            <span class="transaction-stat-value">${this.formatAccount(transaction.account)}</span>
                            <span class="transaction-stat-label">Account</span>
                        </div>
                    </div>
                </div>

                <div class="transaction-overview">
                    <h3>Additional Information</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Category:</strong> ${categoryLabel}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Account:</strong> ${this.formatAccount(transaction.account)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Tags:</strong> ${transaction.tags || 'No tags'}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Transaction ID:</strong> #${transaction.id.toString().padStart(6, '0')}
                        </div>
                        <div>
                            <strong>Added:</strong> ${this.formatDateTime(transaction.timestamp)}
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 12px; margin-top: 25px;">
                    <button class="btn btn-primary" onclick="transactionManager.editTransaction(${transaction.id})">
                        <i class="fas fa-edit"></i> Edit Transaction
                    </button>
                    <button class="btn btn-secondary" onclick="transactionManager.deleteTransaction(${transaction.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    formatAccount(account) {
        const accounts = {
            checking: 'Checking Account',
            savings: 'Savings Account',
            credit: 'Credit Card',
            cash: 'Cash'
        };
        return accounts[account] || account;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    formatDateTime(timestamp) {
        const date = new Date(timestamp);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    showWelcomeScreen() {
        const detailsContent = document.getElementById('detailsContent');
        detailsContent.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-icon">
                    <i class="fas fa-exchange-alt"></i>
                </div>
                <h3>Welcome to Transactions</h3>
                <p>Add new transactions, view detailed analysis, or select a transaction from the left to view details and manage records.</p>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <i class="fas fa-list"></i>
                        <span id="totalTransactions">${this.transactions.length}</span>
                        <label>Total Transactions</label>
                    </div>
                    <div class="welcome-stat">
                        <i class="fas fa-calendar-week"></i>
                        <span id="thisWeekTransactions">${this.getThisWeekTransactions()}</span>
                        <label>This Week</label>
                    </div>
                </div>
                <div class="welcome-actions">
                    <button class="btn btn-primary" onclick="addTransaction('expense')">
                        <i class="fas fa-plus"></i>
                        Add Transaction
                    </button>
                </div>
            </div>
        `;
    }

    getThisWeekTransactions() {
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return this.transactions.filter(t => t.timestamp > oneWeekAgo).length;
    }

    updateHeaderStats() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const netBalance = totalIncome - totalExpense;

        document.getElementById('totalIncome').textContent = `$${totalIncome.toLocaleString()}`;
        document.getElementById('totalExpense').textContent = `$${totalExpense.toLocaleString()}`;
        document.getElementById('netBalance').textContent = `$${netBalance.toLocaleString()}`;

        // Update balance color
        const balanceElement = document.getElementById('netBalance');
        const balanceCard = balanceElement.closest('.stat-card');
        if (netBalance >= 0) {
            balanceCard.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        } else {
            balanceCard.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        }
    }

    updateWelcomeStats() {
        const totalTransactionsEl = document.getElementById('totalTransactions');
        const thisWeekTransactionsEl = document.getElementById('thisWeekTransactions');
        
        if (totalTransactionsEl) {
            totalTransactionsEl.textContent = this.transactions.length;
        }
        if (thisWeekTransactionsEl) {
            thisWeekTransactionsEl.textContent = this.getThisWeekTransactions();
        }
    }

    addTransaction(type = 'expense') {
        document.getElementById('transactionType').value = type;
        this.updateCategoryOptions();
        document.getElementById('transactionModal').style.display = 'block';
        document.getElementById('modalTitle').textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }

    updateCategoryOptions() {
        const typeSelect = document.getElementById('transactionType');
        const categorySelect = document.getElementById('transactionCategory');
        const selectedType = typeSelect.value;

        categorySelect.innerHTML = '';
        this.categories[selectedType].forEach(category => {
            const option = document.createElement('option');
            option.value = category.value;
            option.textContent = category.label;
            categorySelect.appendChild(option);
        });
    }

    handleTransactionSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const transaction = {
            id: Math.max(...this.transactions.map(t => t.id)) + 1,
            type: formData.get('transactionType'),
            amount: parseFloat(formData.get('transactionAmount')),
            category: formData.get('transactionCategory'),
            description: formData.get('transactionDescription'),
            date: formData.get('transactionDate'),
            account: formData.get('transactionAccount'),
            tags: formData.get('transactionTags'),
            timestamp: Date.now()
        };

        this.transactions.unshift(transaction);
        this.saveTransactions();
        this.renderTransactions();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.closeTransactionModal();

        const sign = transaction.type === 'income' ? '+' : '-';
        this.addNotification('success', 'Transaction Added', 
            `${transaction.description} (${sign}$${transaction.amount.toLocaleString()}) added successfully`);
    }

    editTransaction(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        // Populate form with existing data
        document.getElementById('transactionType').value = transaction.type;
        document.getElementById('transactionAmount').value = transaction.amount;
        document.getElementById('transactionDescription').value = transaction.description;
        document.getElementById('transactionDate').value = transaction.date;
        document.getElementById('transactionAccount').value = transaction.account;
        document.getElementById('transactionTags').value = transaction.tags;

        this.updateCategoryOptions();
        document.getElementById('transactionCategory').value = transaction.category;

        document.getElementById('modalTitle').textContent = 'Edit Transaction';
        document.getElementById('transactionModal').style.display = 'block';

        // Change form submission to update instead of create
        const form = document.getElementById('transactionForm');
        form.onsubmit = (e) => this.handleTransactionUpdate(e, transactionId);
    }

    handleTransactionUpdate(event, transactionId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const transactionIndex = this.transactions.findIndex(t => t.id === transactionId);
        
        if (transactionIndex !== -1) {
            this.transactions[transactionIndex] = {
                ...this.transactions[transactionIndex],
                type: formData.get('transactionType'),
                amount: parseFloat(formData.get('transactionAmount')),
                category: formData.get('transactionCategory'),
                description: formData.get('transactionDescription'),
                date: formData.get('transactionDate'),
                account: formData.get('transactionAccount'),
                tags: formData.get('transactionTags')
            };

            this.saveTransactions();
            this.renderTransactions();
            this.updateHeaderStats();
            this.showTransactionDetails(transactionId);
            this.closeTransactionModal();

            this.addNotification('success', 'Transaction Updated', 
                `${this.transactions[transactionIndex].description} updated successfully`);
        }
    }

    deleteTransaction(transactionId) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            const transactionIndex = this.transactions.findIndex(t => t.id === transactionId);
            
            if (transactionIndex !== -1) {
                const deletedTransaction = this.transactions[transactionIndex];
                this.transactions.splice(transactionIndex, 1);
                
                this.saveTransactions();
                this.renderTransactions();
                this.updateHeaderStats();
                this.updateWelcomeStats();
                this.showWelcomeScreen();

                this.addNotification('info', 'Transaction Deleted', 
                    `${deletedTransaction.description} has been deleted`);
            }
        }
    }

    filterTransactions() {
        const typeFilter = document.getElementById('filterType').value;
        const categoryFilter = document.getElementById('filterCategory').value;

        const items = document.querySelectorAll('.transaction-item');
        
        items.forEach((item, index) => {
            const transaction = this.transactions[index];
            let show = true;

            if (typeFilter !== 'all' && transaction.type !== typeFilter) {
                show = false;
            }

            if (categoryFilter !== 'all' && transaction.category !== categoryFilter) {
                show = false;
            }

            item.style.display = show ? 'block' : 'none';
        });
    }

    searchTransactions() {
        const searchTerm = document.getElementById('searchTransactions').value.toLowerCase();
        const items = document.querySelectorAll('.transaction-item');

        items.forEach((item, index) => {
            const transaction = this.transactions[index];
            const searchableText = `${transaction.description} ${transaction.tags}`.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    showTransactionAnalysis() {
        const detailsContent = document.getElementById('detailsContent');
        
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const topExpenseCategory = this.getTopCategory('expense');
        const topIncomeCategory = this.getTopCategory('income');

        detailsContent.innerHTML = `
            <div class="transaction-analysis slide-in">
                <div class="analysis-header" style="margin-bottom: 30px; text-align: center;">
                    <h2>Transaction Analysis</h2>
                    <p>Detailed insights into your spending and income patterns</p>
                </div>

                <div class="transaction-overview">
                    <h3>Overall Summary</h3>
                    <div class="transaction-stats">
                        <div class="transaction-stat stat-amount">
                            <span class="transaction-stat-value income">+$${totalIncome.toLocaleString()}</span>
                            <span class="transaction-stat-label">Total Income</span>
                        </div>
                        <div class="transaction-stat stat-amount">
                            <span class="transaction-stat-value expense">-$${totalExpense.toLocaleString()}</span>
                            <span class="transaction-stat-label">Total Expense</span>
                        </div>
                        <div class="transaction-stat stat-amount">
                            <span class="transaction-stat-value">${totalIncome - totalExpense >= 0 ? '+' : ''}$${(totalIncome - totalExpense).toLocaleString()}</span>
                            <span class="transaction-stat-label">Net Balance</span>
                        </div>
                    </div>
                </div>

                <div class="transaction-overview">
                    <h3>Category Breakdown</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Top Expense Category:</strong> ${topExpenseCategory.name} ($${topExpenseCategory.amount.toLocaleString()})
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Top Income Category:</strong> ${topIncomeCategory.name} ($${topIncomeCategory.amount.toLocaleString()})
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Total Transactions:</strong> ${this.transactions.length}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Average Transaction:</strong> $${(this.transactions.reduce((sum, t) => sum + t.amount, 0) / this.transactions.length).toFixed(2)}
                        </div>
                        <div>
                            <strong>This Month:</strong> ${this.getThisMonthTransactions()} transactions
                        </div>
                    </div>
                </div>

                <div class="transaction-overview">
                    <h3>Recent Activity</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        ${this.transactions.slice(0, 5).map(t => {
                            const sign = t.type === 'income' ? '+' : '-';
                            return `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f3f4;">
                                    <div>
                                        <strong>${t.description}</strong><br>
                                        <small style="color: #7f8c8d;">${this.formatDate(t.date)}</small>
                                    </div>
                                    <span style="color: ${t.type === 'income' ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                                        ${sign}$${t.amount.toLocaleString()}
                                    </span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getTopCategory(type) {
        const categoryTotals = {};
        
        this.transactions
            .filter(t => t.type === type)
            .forEach(t => {
                const category = this.categories[type].find(c => c.value === t.category);
                const categoryName = category ? category.label : t.category;
                
                if (!categoryTotals[categoryName]) {
                    categoryTotals[categoryName] = 0;
                }
                categoryTotals[categoryName] += t.amount;
            });

        const topCategory = Object.entries(categoryTotals)
            .reduce((max, [name, amount]) => amount > max.amount ? { name, amount } : max, 
                { name: 'None', amount: 0 });

        return topCategory;
    }

    getThisMonthTransactions() {
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        
        return this.transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getMonth() === thisMonth && 
                   transactionDate.getFullYear() === thisYear;
        }).length;
    }

    exportTransactions() {
        const data = {
            transactions: this.transactions,
            summary: {
                totalIncome: this.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
                totalExpense: this.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
                totalTransactions: this.transactions.length
            },
            exportDate: new Date().toISOString(),
            user: 'uttam002',
            exportTime: '2025-08-18 09:05:11'
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `transactions-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.addNotification('success', 'Data Exported', 
            'Transaction data has been exported successfully');
    }

    showNotificationCenter() {
        const detailsContent = document.getElementById('detailsContent');
        
        const allNotifications = this.notifications.sort((a, b) => b.timestamp - a.timestamp);
        
        detailsContent.innerHTML = `
            <div class="notification-center slide-in" style="padding: 30px;">
                <div style="margin-bottom: 25px; text-align: center;">
                    <h2>Notification Center</h2>
                    <p>Stay updated with your transaction activities</p>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="transactionManager.markAllAsRead()">
                        Mark All as Read
                    </button>
                    <button class="btn btn-secondary" onclick="transactionManager.clearOldNotifications()">
                        Clear Old Notifications
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${allNotifications.map(notification => `
                        <div style="background: ${notification.isRead ? '#f8f9fa' : 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)'}; 
                                    border-radius: 12px; padding: 20px; 
                                    border-left: 4px solid ${notification.isRead ? '#e1e8ed' : '#3498db'}; 
                                    cursor: pointer;"
                             onclick="transactionManager.markAsRead(${notification.id})">
                            <div style="display: flex; align-items: center; gap: 12px;">
                                <div style="width: 35px; height: 35px; border-radius: 50%; 
                                           background: ${this.getNotificationColor(notification.type)}; 
                                           display: flex; align-items: center; justify-content: center;">
                                    <i class="fas ${this.getNotificationIcon(notification.type)}" 
                                       style="color: ${this.getNotificationIconColor(notification.type)};"></i>
                                </div>
                                <div style="flex: 1;">
                                    <div style="font-weight: 600; color: #2c3e50; margin-bottom: 3px;">
                                        ${notification.title}
                                    </div>
                                    <div style="color: #7f8c8d; font-size: 0.9rem;">
                                        ${notification.message}
                                    </div>
                                    <div style="color: #bdc3c7; font-size: 0.8rem; margin-top: 5px;">
                                        ${notification.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#d5f4e6',
            warning: '#ffeaa7',
            danger: '#fab1a0',
            info: '#dbeafe'
        };
        return colors[type] || '#f8f9fa';
    }

    getNotificationIconColor(type) {
        const colors = {
            success: '#27ae60',
            warning: '#f39c12',
            danger: '#e74c3c',
            info: '#3498db'
        };
        return colors[type] || '#7f8c8d';
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

    setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('transactionDate').value = today;
    }

    setupEventListeners() {
        window.onclick = (event) => {
            if (event.target.classList.contains('transaction-modal')) {
                this.closeTransactionModal();
            }
        };

        document.getElementById('transactionForm').onsubmit = (e) => this.handleTransactionSubmit(e);
    }

    closeTransactionModal() {
        document.getElementById('transactionModal').style.display = 'none';
        document.getElementById('transactionForm').reset();
        this.setTodaysDate();
        
        // Reset form submission to default
        document.getElementById('transactionForm').onsubmit = (e) => this.handleTransactionSubmit(e);
    }

    closeFloatingNotifications() {
        const floatingPanel = document.getElementById('floatingNotificationPanel');
        floatingPanel.classList.remove('show');
    }

    closeAlert() {
        const alertBar = document.getElementById('alertBar');
        alertBar.style.display = 'none';
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
let transactionManager;

function addTransaction(type) {
    transactionManager.addTransaction(type);
}

function showTransactionAnalysis() {
    transactionManager.showTransactionAnalysis();
}

function showNotificationCenter() {
    transactionManager.showNotificationCenter();
}

function exportTransactions() {
    transactionManager.exportTransactions();
}

function filterTransactions() {
    transactionManager.filterTransactions();
}

function searchTransactions() {
    transactionManager.searchTransactions();
}

function updateCategoryOptions() {
    transactionManager.updateCategoryOptions();
}

function closeTransactionModal() {
    transactionManager.closeTransactionModal();
}

function closeFloatingNotifications() {
    transactionManager.closeFloatingNotifications();
}

function closeAlert() {
    transactionManager.closeAlert();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    transactionManager = new TransactionManager();
});