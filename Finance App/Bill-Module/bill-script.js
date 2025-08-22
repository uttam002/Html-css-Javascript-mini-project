// Bill Management System
class BillManager {
    constructor() {
        this.bills = this.loadBills();
        this.notifications = this.loadNotifications();
        this.selectedBillId = null;
        this.categories = this.getCategories();
        this.init();
    }

    init() {
        this.renderBills();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.setupEventListeners();
        this.showWelcomeScreen();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        this.checkOverdueBills();
        this.setTodaysDate();
    }

    loadBills() {
        const defaultBills = [
            {
                id: 1,
                name: 'Electric Bill',
                amount: 125.50,
                category: 'utilities',
                dueDate: '2025-08-25',
                frequency: 'monthly',
                account: 'checking',
                description: 'Monthly electricity bill from PowerCorp',
                reminder: 3,
                autoReminder: true,
                status: 'pending',
                lastPaid: null,
                nextDue: '2025-08-25',
                createdAt: Date.now() - 604800000,
                payments: []
            },
            {
                id: 2,
                name: 'Car Insurance',
                amount: 89.99,
                category: 'insurance',
                dueDate: '2025-08-20',
                frequency: 'monthly',
                account: 'checking',
                description: 'Monthly auto insurance premium',
                reminder: 7,
                autoReminder: true,
                status: 'overdue',
                lastPaid: '2025-07-20',
                nextDue: '2025-08-20',
                createdAt: Date.now() - 1209600000,
                payments: [
                    {
                        id: 1,
                        amount: 89.99,
                        paidDate: '2025-07-20',
                        method: 'auto_pay',
                        reference: 'AUTO123456',
                        notes: 'Automatic payment'
                    }
                ]
            },
            {
                id: 3,
                name: 'Netflix Subscription',
                amount: 15.99,
                category: 'subscription',
                dueDate: '2025-08-30',
                frequency: 'monthly',
                account: 'credit',
                description: 'Monthly Netflix streaming subscription',
                reminder: 1,
                autoReminder: true,
                status: 'pending',
                lastPaid: '2025-07-30',
                nextDue: '2025-08-30',
                createdAt: Date.now() - 2592000000,
                payments: [
                    {
                        id: 1,
                        amount: 15.99,
                        paidDate: '2025-07-30',
                        method: 'credit_card',
                        reference: 'CC789012',
                        notes: 'Auto-charged to credit card'
                    }
                ]
            },
            {
                id: 4,
                name: 'Mortgage Payment',
                amount: 1850.00,
                category: 'rent',
                dueDate: '2025-09-01',
                frequency: 'monthly',
                account: 'checking',
                description: 'Monthly mortgage payment to FirstBank',
                reminder: 7,
                autoReminder: true,
                status: 'pending',
                lastPaid: '2025-08-01',
                nextDue: '2025-09-01',
                createdAt: Date.now() - 7776000000,
                payments: [
                    {
                        id: 1,
                        amount: 1850.00,
                        paidDate: '2025-08-01',
                        method: 'bank_transfer',
                        reference: 'MORT345678',
                        notes: 'Monthly mortgage payment'
                    }
                ]
            },
            {
                id: 5,
                name: 'Internet Bill',
                amount: 79.99,
                category: 'utilities',
                dueDate: '2025-08-22',
                frequency: 'monthly',
                account: 'checking',
                description: 'High-speed internet service',
                reminder: 3,
                autoReminder: true,
                status: 'paid',
                lastPaid: '2025-08-18',
                nextDue: '2025-09-22',
                createdAt: Date.now() - 1814400000,
                payments: [
                    {
                        id: 1,
                        amount: 79.99,
                        paidDate: '2025-08-18',
                        method: 'bank_transfer',
                        reference: 'INT456789',
                        notes: 'Paid online via bank transfer'
                    }
                ]
            },
            {
                id: 6,
                name: 'Water & Sewer',
                amount: 45.75,
                category: 'utilities',
                dueDate: '2025-08-28',
                frequency: 'monthly',
                account: 'checking',
                description: 'Municipal water and sewer services',
                reminder: 5,
                autoReminder: true,
                status: 'pending',
                lastPaid: '2025-07-28',
                nextDue: '2025-08-28',
                createdAt: Date.now() - 2419200000,
                payments: []
            }
        ];

        const saved = localStorage.getItem('bills');
        return saved ? JSON.parse(saved) : defaultBills;
    }

    loadNotifications() {
        const defaultNotifications = [
            {
                id: 1,
                type: 'danger',
                title: 'Bill Overdue',
                message: 'Car Insurance bill is overdue by 2 days',
                time: '1 hour ago',
                isRead: false,
                timestamp: Date.now() - 3600000
            },
            {
                id: 2,
                type: 'warning',
                title: 'Upcoming Bill',
                message: 'Electric Bill due in 3 days ($125.50)',
                time: '3 hours ago',
                isRead: false,
                timestamp: Date.now() - 10800000
            },
            {
                id: 3,
                type: 'success',
                title: 'Payment Recorded',
                message: 'Internet Bill payment of $79.99 recorded successfully',
                time: '5 hours ago',
                isRead: false,
                timestamp: Date.now() - 18000000
            },
            {
                id: 4,
                type: 'info',
                title: 'Monthly Summary',
                message: 'You have 4 bills due this month totaling $2,106.23',
                time: '1 day ago',
                isRead: false,
                timestamp: Date.now() - 86400000
            }
        ];

        const saved = localStorage.getItem('billNotifications');
        return saved ? JSON.parse(saved) : defaultNotifications;
    }

    getCategories() {
        return {
            utilities: { label: 'Utilities', icon: 'fas fa-lightbulb' },
            insurance: { label: 'Insurance', icon: 'fas fa-shield-alt' },
            subscription: { label: 'Subscriptions', icon: 'fas fa-tv' },
            loan: { label: 'Loans', icon: 'fas fa-university' },
            rent: { label: 'Rent/Mortgage', icon: 'fas fa-home' },
            other: { label: 'Other', icon: 'fas fa-file-invoice' }
        };
    }

    saveBills() {
        localStorage.setItem('bills', JSON.stringify(this.bills));
    }

    saveNotifications() {
        localStorage.setItem('billNotifications', JSON.stringify(this.notifications));
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
                 onclick="billManager.markAsRead(${notification.id})">
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

    checkOverdueBills() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const overdueBills = this.bills.filter(bill => {
            const dueDate = new Date(bill.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today && bill.status !== 'paid';
        });

        if (overdueBills.length > 0) {
            const bill = overdueBills[0];
            const daysOverdue = Math.floor((today - new Date(bill.dueDate)) / (1000 * 60 * 60 * 24));
            this.showAlert(`${bill.name} is overdue by ${daysOverdue} day${daysOverdue > 1 ? 's' : ''}`);
        }

        // Update status for overdue bills
        this.bills.forEach(bill => {
            const dueDate = new Date(bill.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            if (dueDate < today && bill.status === 'pending') {
                bill.status = 'overdue';
            }
        });
        this.saveBills();
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

    renderBills() {
        const list = document.getElementById('billsList');
        list.innerHTML = '';

        // Sort bills by due date
        const sortedBills = this.bills.sort((a, b) => {
            if (a.status === 'overdue' && b.status !== 'overdue') return -1;
            if (b.status === 'overdue' && a.status !== 'overdue') return 1;
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        sortedBills.forEach(bill => {
            const item = this.createBillItem(bill);
            list.appendChild(item);
        });

        setTimeout(() => {
            document.querySelectorAll('.bill-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 50);
            });
        }, 50);
    }

    createBillItem(bill) {
        const item = document.createElement('div');
        item.className = `bill-item ${bill.status}`;
        item.onclick = () => this.selectBill(bill.id);

        const category = this.categories[bill.category];
        const categoryLabel = category ? category.label : bill.category;
        const categoryIcon = category ? category.icon : 'fas fa-file-invoice';

        item.innerHTML = `
            <div class="bill-header">
                <div class="bill-icon">
                    <i class="${categoryIcon}"></i>
                </div>
                <div class="bill-info">
                    <h4>${bill.name}</h4>
                    <span class="bill-status status-${bill.status}">${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}</span>
                </div>
            </div>
            <div class="bill-details">
                <span class="bill-amount">$${bill.amount.toLocaleString()}</span>
                <span class="bill-due-date">Due: ${this.formatDate(bill.dueDate)}</span>
            </div>
            <div class="bill-actions">
                ${bill.status !== 'paid' ? `
                    <button class="bill-action-btn" onclick="event.stopPropagation(); billManager.markAsPaid(${bill.id})" title="Mark as Paid">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
                <button class="bill-action-btn" onclick="event.stopPropagation(); billManager.editBill(${bill.id})" title="Edit Bill">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        `;

        return item;
    }

    selectBill(billId) {
        document.querySelectorAll('.bill-item').forEach(item => {
            item.classList.remove('active');
        });

        event.currentTarget.classList.add('active');
        this.selectedBillId = billId;
        this.showBillDetails(billId);
    }

    showBillDetails(billId) {
        const bill = this.bills.find(b => b.id === billId);
        if (!bill) return;

        const detailsContent = document.getElementById('detailsContent');
        const category = this.categories[bill.category];
        const categoryLabel = category ? category.label : bill.category;
        const categoryIcon = category ? category.icon : 'fas fa-file-invoice';

        const daysUntilDue = this.getDaysUntilDue(bill.dueDate);
        const nextPayment = this.calculateNextPayment(bill);

        detailsContent.innerHTML = `
            <div class="bill-details-view slide-in">
                <div class="details-header">
                    <div class="bill-icon">
                        <i class="${categoryIcon}"></i>
                    </div>
                    <div>
                        <h2>${bill.name}</h2>
                        <span class="bill-status status-${bill.status}">${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}</span>
                    </div>
                </div>

                <div class="bill-overview">
                    <h3>Bill Details</h3>
                    <div class="bill-stats">
                        <div class="bill-stat stat-amount">
                            <span class="bill-stat-value">$${bill.amount.toLocaleString()}</span>
                            <span class="bill-stat-label">Amount</span>
                        </div>
                        <div class="bill-stat stat-due">
                            <span class="bill-stat-value">${daysUntilDue}</span>
                            <span class="bill-stat-label">${daysUntilDue.includes('ago') ? 'Overdue' : 'Days Until Due'}</span>
                        </div>
                        <div class="bill-stat stat-frequency">
                            <span class="bill-stat-value">${bill.frequency.charAt(0).toUpperCase() + bill.frequency.slice(1)}</span>
                            <span class="bill-stat-label">Frequency</span>
                        </div>
                    </div>
                </div>

                <div class="bill-overview">
                    <h3>Payment Information</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Category:</strong> ${categoryLabel}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Payment Account:</strong> ${this.formatAccount(bill.account)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Due Date:</strong> ${this.formatDate(bill.dueDate)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Next Due:</strong> ${this.formatDate(bill.nextDue)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Reminder:</strong> ${bill.reminder > 0 ? `${bill.reminder} days before` : 'No reminder'}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Auto Reminders:</strong> ${bill.autoReminder ? 'Enabled' : 'Disabled'}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Last Paid:</strong> ${bill.lastPaid ? this.formatDate(bill.lastPaid) : 'Never'}
                        </div>
                        <div>
                            <strong>Description:</strong> ${bill.description || 'No description'}
                        </div>
                    </div>
                </div>

                ${bill.payments && bill.payments.length > 0 ? `
                    <div class="bill-overview">
                        <h3>Payment History</h3>
                        <div style="padding: 20px; background: white; border-radius: 10px;">
                            ${bill.payments.slice(0, 5).map(payment => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f3f4;">
                                    <div>
                                        <strong>$${payment.amount.toLocaleString()}</strong><br>
                                        <small style="color: #7f8c8d;">${this.formatDate(payment.paidDate)} • ${this.formatPaymentMethod(payment.method)}</small>
                                    </div>
                                    <span style="color: #27ae60; font-weight: bold;">
                                        <i class="fas fa-check"></i> Paid
                                    </span>
                                </div>
                            `).join('')}
                            ${bill.payments.length > 5 ? `
                                <div style="text-align: center; margin-top: 15px;">
                                    <small style="color: #7f8c8d;">And ${bill.payments.length - 5} more payments...</small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                <div style="display: flex; gap: 12px; margin-top: 25px;">
                    ${bill.status !== 'paid' ? `
                        <button class="btn btn-primary" onclick="billManager.markAsPaid(${bill.id})">
                            <i class="fas fa-check"></i> Mark as Paid
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="billManager.editBill(${bill.id})">
                        <i class="fas fa-edit"></i> Edit Bill
                    </button>
                    <button class="btn btn-secondary" onclick="billManager.deleteBill(${bill.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    getDaysUntilDue(dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(dueDate);
        due.setHours(0, 0, 0, 0);
        
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return `${Math.abs(diffDays)} days ago`;
        } else if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Tomorrow';
        } else {
            return `${diffDays} days`;
        }
    }

    calculateNextPayment(bill) {
        const currentDue = new Date(bill.dueDate);
        const nextDue = new Date(currentDue);
        
        switch (bill.frequency) {
            case 'weekly':
                nextDue.setDate(currentDue.getDate() + 7);
                break;
            case 'monthly':
                nextDue.setMonth(currentDue.getMonth() + 1);
                break;
            case 'quarterly':
                nextDue.setMonth(currentDue.getMonth() + 3);
                break;
            case 'yearly':
                nextDue.setFullYear(currentDue.getFullYear() + 1);
                break;
            default:
                return bill.dueDate;
        }
        
        return nextDue.toISOString().split('T')[0];
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

    formatPaymentMethod(method) {
        const methods = {
            bank_transfer: 'Bank Transfer',
            credit_card: 'Credit Card',
            debit_card: 'Debit Card',
            cash: 'Cash',
            check: 'Check',
            auto_pay: 'Auto Pay'
        };
        return methods[method] || method;
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

    showWelcomeScreen() {
        const detailsContent = document.getElementById('detailsContent');
        detailsContent.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-icon">
                    <i class="fas fa-file-invoice"></i>
                </div>
                <h3>Welcome to Bill Management</h3>
                <p>Add recurring bills, track due dates, and never miss a payment. Select a bill from the left to view details or manage payments.</p>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <i class="fas fa-list"></i>
                        <span id="totalBills">${this.bills.length}</span>
                        <label>Total Bills</label>
                    </div>
                    <div class="welcome-stat">
                        <i class="fas fa-clock"></i>
                        <span id="dueThisWeek">${this.getDueThisWeek()}</span>
                        <label>Due This Week</label>
                    </div>
                </div>
                <div class="welcome-actions">
                    <button class="btn btn-primary" onclick="addBill()">
                        <i class="fas fa-plus"></i>
                        Add Your First Bill
                    </button>
                </div>
            </div>
        `;
    }

    getDueThisWeek() {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        return this.bills.filter(bill => {
            const dueDate = new Date(bill.dueDate);
            return dueDate >= today && dueDate <= nextWeek && bill.status !== 'paid';
        }).length;
    }

    updateHeaderStats() {
        const pendingBills = this.bills.filter(b => b.status === 'pending').length;
        const overdueBills = this.bills.filter(b => b.status === 'overdue').length;
        const monthlyTotal = this.bills.reduce((sum, b) => {
            if (b.frequency === 'monthly') return sum + b.amount;
            if (b.frequency === 'weekly') return sum + (b.amount * 4.33);
            if (b.frequency === 'quarterly') return sum + (b.amount / 3);
            if (b.frequency === 'yearly') return sum + (b.amount / 12);
            return sum + b.amount;
        }, 0);

        document.getElementById('pendingBills').textContent = pendingBills;
        document.getElementById('overdueBills').textContent = overdueBills;
        document.getElementById('monthlyTotal').textContent = `$${monthlyTotal.toLocaleString()}`;
    }

    updateWelcomeStats() {
        const totalBillsEl = document.getElementById('totalBills');
        const dueThisWeekEl = document.getElementById('dueThisWeek');
        
        if (totalBillsEl) {
            totalBillsEl.textContent = this.bills.length;
        }
        if (dueThisWeekEl) {
            dueThisWeekEl.textContent = this.getDueThisWeek();
        }
    }

    addBill() {
        document.getElementById('billModal').style.display = 'block';
        document.getElementById('modalTitle').textContent = 'Add Bill';
    }

    handleBillSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const bill = {
            id: Math.max(...this.bills.map(b => b.id)) + 1,
            name: formData.get('billName'),
            amount: parseFloat(formData.get('billAmount')),
            category: formData.get('billCategory'),
            dueDate: formData.get('billDueDate'),
            frequency: formData.get('billFrequency'),
            account: formData.get('billAccount'),
            description: formData.get('billDescription'),
            reminder: parseInt(formData.get('billReminder')),
            autoReminder: document.getElementById('billAutoReminder').checked,
            status: 'pending',
            lastPaid: null,
            nextDue: formData.get('billDueDate'),
            createdAt: Date.now(),
            payments: []
        };

        this.bills.push(bill);
        this.saveBills();
        this.renderBills();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.closeBillModal();

        this.addNotification('success', 'Bill Added', 
            `${bill.name} ($${bill.amount.toLocaleString()}) added successfully`);
    }

    editBill(billId) {
        const bill = this.bills.find(b => b.id === billId);
        if (!bill) return;

        // Populate form with existing data
        document.getElementById('billName').value = bill.name;
        document.getElementById('billAmount').value = bill.amount;
        document.getElementById('billCategory').value = bill.category;
        document.getElementById('billDueDate').value = bill.dueDate;
        document.getElementById('billFrequency').value = bill.frequency;
        document.getElementById('billAccount').value = bill.account;
        document.getElementById('billDescription').value = bill.description || '';
        document.getElementById('billReminder').value = bill.reminder;
        document.getElementById('billAutoReminder').checked = bill.autoReminder;

        document.getElementById('modalTitle').textContent = 'Edit Bill';
        document.getElementById('billModal').style.display = 'block';

        // Change form submission to update instead of create
        const form = document.getElementById('billForm');
        form.onsubmit = (e) => this.handleBillUpdate(e, billId);
    }

    handleBillUpdate(event, billId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const billIndex = this.bills.findIndex(b => b.id === billId);
        
        if (billIndex !== -1) {
            this.bills[billIndex] = {
                ...this.bills[billIndex],
                name: formData.get('billName'),
                amount: parseFloat(formData.get('billAmount')),
                category: formData.get('billCategory'),
                dueDate: formData.get('billDueDate'),
                frequency: formData.get('billFrequency'),
                account: formData.get('billAccount'),
                description: formData.get('billDescription'),
                reminder: parseInt(formData.get('billReminder')),
                autoReminder: document.getElementById('billAutoReminder').checked
            };

            this.saveBills();
            this.renderBills();
            this.updateHeaderStats();
            this.showBillDetails(billId);
            this.closeBillModal();

            this.addNotification('success', 'Bill Updated', 
                `${this.bills[billIndex].name} updated successfully`);
        }
    }

    markAsPaid(billId) {
        const bill = this.bills.find(b => b.id === billId);
        if (!bill) return;

        // Populate payment modal
        document.getElementById('paymentAmount').value = bill.amount;
        document.getElementById('paymentDate').value = new Date().toISOString().split('T')[0];

        const paymentSummary = document.getElementById('paymentSummary');
        paymentSummary.innerHTML = `
            <h4>Payment Summary</h4>
            <div class="summary-row">
                <span class="summary-label">Bill Name:</span>
                <span class="summary-value">${bill.name}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Due Date:</span>
                <span class="summary-value">${this.formatDate(bill.dueDate)}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Amount Due:</span>
                <span class="summary-value">$${bill.amount.toLocaleString()}</span>
            </div>
        `;

        document.getElementById('paymentModal').style.display = 'block';

        // Set up form submission
        const form = document.getElementById('paymentForm');
        form.onsubmit = (e) => this.handlePaymentSubmit(e, billId);
    }

    handlePaymentSubmit(event, billId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const billIndex = this.bills.findIndex(b => b.id === billId);
        
        if (billIndex !== -1) {
            const bill = this.bills[billIndex];
            const payment = {
                id: Date.now(),
                amount: parseFloat(formData.get('paymentAmount')),
                paidDate: formData.get('paymentDate'),
                method: formData.get('paymentMethod'),
                reference: formData.get('paymentReference'),
                notes: formData.get('paymentNotes')
            };

            // Add payment to history
            if (!bill.payments) bill.payments = [];
            bill.payments.unshift(payment);

            // Update bill status and dates
            bill.status = 'paid';
            bill.lastPaid = payment.paidDate;
            bill.nextDue = this.calculateNextPayment(bill);

            this.saveBills();
            this.renderBills();
            this.updateHeaderStats();
            this.showBillDetails(billId);
            this.closePaymentModal();

            this.addNotification('success', 'Payment Recorded', 
                `Payment of $${payment.amount.toLocaleString()} recorded for ${bill.name}`);
        }
    }

    deleteBill(billId) {
        if (confirm('Are you sure you want to delete this bill?')) {
            const billIndex = this.bills.findIndex(b => b.id === billId);
            
            if (billIndex !== -1) {
                const deletedBill = this.bills[billIndex];
                this.bills.splice(billIndex, 1);
                
                this.saveBills();
                this.renderBills();
                this.updateHeaderStats();
                this.updateWelcomeStats();
                this.showWelcomeScreen();

                this.addNotification('info', 'Bill Deleted', 
                    `${deletedBill.name} has been deleted`);
            }
        }
    }

    filterBills() {
        const statusFilter = document.getElementById('filterStatus').value;
        const categoryFilter = document.getElementById('filterCategory').value;

        const items = document.querySelectorAll('.bill-item');
        
        items.forEach((item, index) => {
            const bill = this.bills[index];
            let show = true;

            if (statusFilter !== 'all' && bill.status !== statusFilter) {
                show = false;
            }

            if (categoryFilter !== 'all' && bill.category !== categoryFilter) {
                show = false;
            }

            item.style.display = show ? 'block' : 'none';
        });
    }

    searchBills() {
        const searchTerm = document.getElementById('searchBills').value.toLowerCase();
        const items = document.querySelectorAll('.bill-item');

        items.forEach((item, index) => {
            const bill = this.bills[index];
            const searchableText = `${bill.name} ${bill.description}`.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    showUpcomingBills() {
        const detailsContent = document.getElementById('detailsContent');
        const today = new Date();
        const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        const upcomingBills = this.bills
            .filter(bill => {
                const dueDate = new Date(bill.dueDate);
                return dueDate >= today && dueDate <= nextMonth;
            })
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

        detailsContent.innerHTML = `
            <div class="upcoming-bills slide-in" style="padding: 30px;">
                <div style="margin-bottom: 30px; text-align: center;">
                    <h2>Upcoming Bills</h2>
                    <p>Bills due in the next 30 days</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${upcomingBills.length > 0 ? upcomingBills.map(bill => {
                        const category = this.categories[bill.category];
                        const daysUntilDue = this.getDaysUntilDue(bill.dueDate);
                        const urgencyClass = bill.status === 'overdue' ? 'danger' : 
                                           daysUntilDue === 'Today' || daysUntilDue === 'Tomorrow' ? 'warning' : 'info';
                        
                        return `
                            <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; 
                                        border-left: 4px solid ${urgencyClass === 'danger' ? '#e74c3c' : 
                                                                   urgencyClass === 'warning' ? '#f39c12' : '#3498db'}; 
                                        cursor: pointer;"
                                 onclick="billManager.selectBill(${bill.id})">
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 50px; height: 50px; border-radius: 10px; 
                                               background: linear-gradient(135deg, #3498db, #2980b9); 
                                               display: flex; align-items: center; justify-content: center; color: white;">
                                        <i class="${category ? category.icon : 'fas fa-file-invoice'}"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <h4 style="color: #2c3e50; margin-bottom: 5px;">${bill.name}</h4>
                                        <p style="color: #7f8c8d; font-size: 0.9rem;">
                                            Due: ${this.formatDate(bill.dueDate)} • ${daysUntilDue}
                                        </p>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 1.3rem; font-weight: bold; color: #2c3e50;">
                                            $${bill.amount.toLocaleString()}
                                        </div>
                                        <span style="background: ${urgencyClass === 'danger' ? '#fab1a0' : 
                                                                    urgencyClass === 'warning' ? '#ffeaa7' : '#dbeafe'}; 
                                                     color: ${urgencyClass === 'danger' ? '#e74c3c' : 
                                                              urgencyClass === 'warning' ? '#f39c12' : '#3498db'}; 
                                                     padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; 
                                                     text-transform: uppercase; font-weight: 600;">
                                            ${bill.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('') : `
                        <div style="text-align: center; padding: 60px 20px;">
                            <i class="fas fa-calendar-check" style="font-size: 3rem; color: #95a5a6; margin-bottom: 20px;"></i>
                            <h3 style="color: #2c3e50; margin-bottom: 10px;">No Upcoming Bills</h3>
                            <p style="color: #7f8c8d;">You're all caught up! No bills due in the next 30 days.</p>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    showBillAnalysis() {
        const detailsContent = document.getElementById('detailsContent');
        
        const monthlyTotal = this.bills.reduce((sum, b) => {
            if (b.frequency === 'monthly') return sum + b.amount;
            if (b.frequency === 'weekly') return sum + (b.amount * 4.33);
            if (b.frequency === 'quarterly') return sum + (b.amount / 3);
            if (b.frequency === 'yearly') return sum + (b.amount / 12);
            return sum + b.amount;
        }, 0);

        const categoryBreakdown = {};
        this.bills.forEach(bill => {
            const category = this.categories[bill.category];
            const categoryName = category ? category.label : bill.category;
            if (!categoryBreakdown[categoryName]) {
                categoryBreakdown[categoryName] = 0;
            }
            categoryBreakdown[categoryName] += bill.amount;
        });

        const topCategory = Object.entries(categoryBreakdown)
            .reduce((max, [name, amount]) => amount > max.amount ? { name, amount } : max, 
                { name: 'None', amount: 0 });

        detailsContent.innerHTML = `
            <div class="bill-analysis slide-in" style="padding: 30px;">
                <div style="margin-bottom: 30px; text-align: center;">
                    <h2>Bill Analysis</h2>
                    <p>Insights into your recurring expenses and payment patterns</p>
                </div>

                <div class="bill-overview">
                    <h3>Overall Summary</h3>
                    <div class="bill-stats">
                        <div class="bill-stat stat-amount">
                            <span class="bill-stat-value">$${monthlyTotal.toLocaleString()}</span>
                            <span class="bill-stat-label">Monthly Total</span>
                        </div>
                        <div class="bill-stat stat-due">
                            <span class="bill-stat-value">${this.bills.filter(b => b.status === 'pending').length}</span>
                            <span class="bill-stat-label">Pending Bills</span>
                        </div>
                        <div class="bill-stat stat-frequency">
                            <span class="bill-stat-value">${this.bills.filter(b => b.status === 'overdue').length}</span>
                            <span class="bill-stat-label">Overdue Bills</span>
                        </div>
                    </div>
                </div>

                <div class="bill-overview">
                    <h3>Category Breakdown</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Highest Category:</strong> ${topCategory.name} ($${topCategory.amount.toLocaleString()})
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Total Bills:</strong> ${this.bills.length}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Average Bill Amount:</strong> $${(this.bills.reduce((sum, b) => sum + b.amount, 0) / this.bills.length).toFixed(2)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Bills with Auto-Reminder:</strong> ${this.bills.filter(b => b.autoReminder).length}
                        </div>
                        <div>
                            <strong>Yearly Total:</strong> $${(monthlyTotal * 12).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div class="bill-overview">
                    <h3>Payment Schedule</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        ${Object.entries(categoryBreakdown).map(([category, amount]) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f3f4;">
                                <div>
                                    <strong>${category}</strong><br>
                                    <small style="color: #7f8c8d;">${this.bills.filter(b => {
                                        const cat = this.categories[b.category];
                                        return (cat ? cat.label : b.category) === category;
                                    }).length} bills</small>
                                </div>
                                <span style="color: #e74c3c; font-weight: bold;">
                                    $${amount.toLocaleString()}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    exportBills() {
        const data = {
            bills: this.bills,
            summary: {
                totalBills: this.bills.length,
                pendingBills: this.bills.filter(b => b.status === 'pending').length,
                overdueBills: this.bills.filter(b => b.status === 'overdue').length,
                monthlyTotal: this.bills.reduce((sum, b) => {
                    if (b.frequency === 'monthly') return sum + b.amount;
                    if (b.frequency === 'weekly') return sum + (b.amount * 4.33);
                    if (b.frequency === 'quarterly') return sum + (b.amount / 3);
                    if (b.frequency === 'yearly') return sum + (b.amount / 12);
                    return sum + b.amount;
                }, 0)
            },
            exportDate: new Date().toISOString(),
            user: 'uttam002',
            exportTime: '2025-08-18 09:34:50'
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `bills-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.addNotification('success', 'Data Exported', 
            'Bill data has been exported successfully');
    }

    showNotificationCenter() {
        const detailsContent = document.getElementById('detailsContent');
        
        const allNotifications = this.notifications.sort((a, b) => b.timestamp - a.timestamp);
        
        detailsContent.innerHTML = `
            <div class="notification-center slide-in" style="padding: 30px;">
                <div style="margin-bottom: 25px; text-align: center;">
                    <h2>Notification Center</h2>
                    <p>Stay updated with your bill reminders and payment activities</p>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="billManager.markAllAsRead()">
                        Mark All as Read
                    </button>
                    <button class="btn btn-secondary" onclick="billManager.clearOldNotifications()">
                        Clear Old Notifications
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${allNotifications.map(notification => `
                        <div style="background: ${notification.isRead ? '#f8f9fa' : 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)'}; 
                                    border-radius: 12px; padding: 20px; 
                                    border-left: 4px solid ${notification.isRead ? '#e1e8ed' : '#3498db'}; 
                                    cursor: pointer;"
                             onclick="billManager.markAsRead(${notification.id})">
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
        document.getElementById('billDueDate').value = today;
        document.getElementById('paymentDate').value = today;
    }

    setupEventListeners() {
        window.onclick = (event) => {
            if (event.target.classList.contains('bill-modal') || 
                event.target.classList.contains('payment-modal')) {
                if (event.target.id === 'billModal') {
                    this.closeBillModal();
                } else if (event.target.id === 'paymentModal') {
                    this.closePaymentModal();
                }
            }
        };

        document.getElementById('billForm').onsubmit = (e) => this.handleBillSubmit(e);
    }

    closeBillModal() {
        document.getElementById('billModal').style.display = 'none';
        document.getElementById('billForm').reset();
        this.setTodaysDate();
        
        // Reset form submission to default
        document.getElementById('billForm').onsubmit = (e) => this.handleBillSubmit(e);
    }

    closePaymentModal() {
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('paymentForm').reset();
        this.setTodaysDate();
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
let billManager;

function addBill() {
    billManager.addBill();
}

function showUpcomingBills() {
    billManager.showUpcomingBills();
}

function showBillAnalysis() {
    billManager.showBillAnalysis();
}

function showNotificationCenter() {
    billManager.showNotificationCenter();
}

function exportBills() {
    billManager.exportBills();
}

function filterBills() {
    billManager.filterBills();
}

function searchBills() {
    billManager.searchBills();
}

function closeBillModal() {
    billManager.closeBillModal();
}

function closePaymentModal() {
    billManager.closePaymentModal();
}

function closeFloatingNotifications() {
    billManager.closeFloatingNotifications();
}

function closeAlert() {
    billManager.closeAlert();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    billManager = new BillManager();
});