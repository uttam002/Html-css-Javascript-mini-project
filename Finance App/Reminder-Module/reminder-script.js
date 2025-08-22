// Reminder Management System with Full Module Sync
class ReminderManager {
    constructor() {
        this.reminders = this.loadReminders();
        this.notifications = this.loadNotifications();
        this.selectedReminderId = null;
        this.currentUser = 'uttam002';
        this.currentDateTime = '2025-08-18 09:54:24';
        this.billsData = this.loadBillsData();
        this.budgetData = this.loadBudgetData();
        this.transactionData = this.loadTransactionData();
        this.currentSnoozeReminderId = null;
        this.init();
    }

    init() {
        this.syncWithModules();
        this.renderReminders();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.setupEventListeners();
        this.showWelcomeScreen();
        this.updateNotificationBadge();
        this.loadQuickNotifications();
        this.checkDueReminders();
        this.setCurrentDateTime();
        this.startReminderChecker();
    }

    loadReminders() {
        const defaultReminders = [
            {
                id: 1,
                title: 'Pay Electric Bill',
                type: 'bill',
                linkedItemId: 1,
                linkedItemName: 'Electric Bill',
                date: '2025-08-25',
                time: '09:00',
                priority: 'high',
                frequency: 'monthly',
                status: 'active',
                description: 'Monthly electricity bill payment reminder',
                emailNotification: true,
                pushNotification: true,
                smsNotification: false,
                snoozeMinutes: 60,
                createdAt: Date.now() - 604800000,
                lastTriggered: null,
                nextTrigger: '2025-08-25 09:00:00',
                completedDates: [],
                snoozeHistory: []
            },
            {
                id: 2,
                title: 'Budget Review - Food Category',
                type: 'budget',
                linkedItemId: 1,
                linkedItemName: 'Food & Dining',
                date: '2025-08-20',
                time: '18:00',
                priority: 'medium',
                frequency: 'weekly',
                status: 'active',
                description: 'Weekly review of food budget spending',
                emailNotification: true,
                pushNotification: true,
                smsNotification: false,
                snoozeMinutes: 30,
                createdAt: Date.now() - 1209600000,
                lastTriggered: null,
                nextTrigger: '2025-08-20 18:00:00',
                completedDates: [],
                snoozeHistory: []
            },
            {
                id: 3,
                title: 'Car Insurance Payment Due',
                type: 'bill',
                linkedItemId: 2,
                linkedItemName: 'Car Insurance',
                date: '2025-08-18',
                time: '10:00',
                priority: 'high',
                frequency: 'monthly',
                status: 'overdue',
                description: 'Overdue car insurance payment',
                emailNotification: true,
                pushNotification: true,
                smsNotification: true,
                snoozeMinutes: 15,
                createdAt: Date.now() - 2592000000,
                lastTriggered: Date.now() - 14400000,
                nextTrigger: '2025-08-18 10:00:00',
                completedDates: [],
                snoozeHistory: [
                    {
                        snoozeTime: Date.now() - 3600000,
                        snoozeDuration: 60,
                        reason: 'user_snooze'
                    }
                ]
            },
            {
                id: 4,
                title: 'Review Large Transaction',
                type: 'transaction',
                linkedItemId: 4,
                linkedItemName: 'Groceries and household items',
                date: '2025-08-19',
                time: '14:00',
                priority: 'low',
                frequency: 'once',
                status: 'active',
                description: 'Review and categorize large grocery transaction',
                emailNotification: false,
                pushNotification: true,
                smsNotification: false,
                snoozeMinutes: 120,
                createdAt: Date.now() - 172800000,
                lastTriggered: null,
                nextTrigger: '2025-08-19 14:00:00',
                completedDates: [],
                snoozeHistory: []
            },
            {
                id: 5,
                title: 'Set September Budget',
                type: 'budget',
                linkedItemId: null,
                linkedItemName: null,
                date: '2025-08-30',
                time: '15:00',
                priority: 'medium',
                frequency: 'monthly',
                status: 'active',
                description: 'Set budget allocations for September',
                emailNotification: true,
                pushNotification: true,
                smsNotification: false,
                snoozeMinutes: 240,
                createdAt: Date.now() - 345600000,
                lastTriggered: null,
                nextTrigger: '2025-08-30 15:00:00',
                completedDates: [],
                snoozeHistory: []
            },
            {
                id: 6,
                title: 'Water Bill Payment',
                type: 'bill',
                linkedItemId: 6,
                linkedItemName: 'Water & Sewer',
                date: '2025-08-28',
                time: '11:00',
                priority: 'medium',
                frequency: 'monthly',
                status: 'active',
                description: 'Monthly water and sewer bill payment',
                emailNotification: true,
                pushNotification: true,
                smsNotification: false,
                snoozeMinutes: 60,
                createdAt: Date.now() - 1814400000,
                lastTriggered: null,
                nextTrigger: '2025-08-28 11:00:00',
                completedDates: [],
                snoozeHistory: []
            },
            {
                id: 7,
                title: 'Investment Portfolio Review',
                type: 'custom',
                linkedItemId: null,
                linkedItemName: null,
                date: '2025-08-22',
                time: '16:00',
                priority: 'low',
                frequency: 'weekly',
                status: 'snoozed',
                description: 'Weekly review of investment portfolio performance',
                emailNotification: true,
                pushNotification: false,
                smsNotification: false,
                snoozeMinutes: 1440,
                createdAt: Date.now() - 2419200000,
                lastTriggered: Date.now() - 7200000,
                nextTrigger: '2025-08-22 16:00:00',
                completedDates: ['2025-08-15', '2025-08-08'],
                snoozeHistory: [
                    {
                        snoozeTime: Date.now() - 1800000,
                        snoozeDuration: 1440,
                        reason: 'user_snooze'
                    }
                ]
            }
        ];

        const saved = localStorage.getItem('reminders');
        return saved ? JSON.parse(saved) : defaultReminders;
    }

    loadNotifications() {
        const defaultNotifications = [
            {
                id: 1,
                type: 'danger',
                title: 'Overdue Reminder',
                message: 'Car Insurance Payment Due reminder is overdue',
                time: '2 hours ago',
                isRead: false,
                timestamp: Date.now() - 7200000
            },
            {
                id: 2,
                type: 'warning',
                title: 'Upcoming Reminder',
                message: 'Budget Review - Food Category due tomorrow at 6:00 PM',
                time: '4 hours ago',
                isRead: false,
                timestamp: Date.now() - 14400000
            },
            {
                id: 3,
                type: 'info',
                title: 'Reminder Snoozed',
                message: 'Investment Portfolio Review has been snoozed for 1 day',
                time: '6 hours ago',
                isRead: false,
                timestamp: Date.now() - 21600000
            },
            {
                id: 4,
                type: 'success',
                title: 'Reminder Created',
                message: 'New reminder "Water Bill Payment" created successfully',
                time: '8 hours ago',
                isRead: false,
                timestamp: Date.now() - 28800000
            },
            {
                id: 5,
                type: 'info',
                title: 'Module Sync Complete',
                message: 'Successfully synced 3 new bill reminders from Bills module',
                time: '1 day ago',
                isRead: false,
                timestamp: Date.now() - 86400000
            }
        ];

        const saved = localStorage.getItem('reminderNotifications');
        return saved ? JSON.parse(saved) : defaultNotifications;
    }

    loadBillsData() {
        // Simulate loading bills data from localStorage or API
        const saved = localStorage.getItem('bills');
        return saved ? JSON.parse(saved) : [];
    }

    loadBudgetData() {
        // Simulate loading budget data from localStorage or API
        const saved = localStorage.getItem('budgetCategories');
        return saved ? JSON.parse(saved) : [];
    }

    loadTransactionData() {
        // Simulate loading transaction data from localStorage or API
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    }

    saveReminders() {
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    saveNotifications() {
        localStorage.setItem('reminderNotifications', JSON.stringify(this.notifications));
    }

    syncWithModules() {
        // Sync with Bills Module
        this.syncBillReminders();
        
        // Sync with Budget Module
        this.syncBudgetReminders();
        
        // Sync with Transaction Module
        this.syncTransactionReminders();
        
        this.addNotification('success', 'Sync Complete', 
            'Successfully synced reminders with all modules');
    }

    syncBillReminders() {
        if (!this.billsData || this.billsData.length === 0) return;

        this.billsData.forEach(bill => {
            if (bill.autoReminder && bill.status !== 'paid') {
                const existingReminder = this.reminders.find(r => 
                    r.type === 'bill' && r.linkedItemId === bill.id);

                if (!existingReminder) {
                    // Create new reminder for this bill
                    const reminderDate = new Date(bill.dueDate);
                    reminderDate.setDate(reminderDate.getDate() - bill.reminder);

                    const newReminder = {
                        id: this.getNextId(),
                        title: `Pay ${bill.name}`,
                        type: 'bill',
                        linkedItemId: bill.id,
                        linkedItemName: bill.name,
                        date: reminderDate.toISOString().split('T')[0],
                        time: '09:00',
                        priority: bill.amount > 500 ? 'high' : 'medium',
                        frequency: bill.frequency,
                        status: 'active',
                        description: `Payment reminder for ${bill.name} - $${bill.amount}`,
                        emailNotification: true,
                        pushNotification: true,
                        smsNotification: bill.amount > 1000,
                        snoozeMinutes: 60,
                        createdAt: Date.now(),
                        lastTriggered: null,
                        nextTrigger: `${reminderDate.toISOString().split('T')[0]} 09:00:00`,
                        completedDates: [],
                        snoozeHistory: []
                    };

                    this.reminders.push(newReminder);
                } else {
                    // Update existing reminder if bill details changed
                    const reminderDate = new Date(bill.dueDate);
                    reminderDate.setDate(reminderDate.getDate() - bill.reminder);
                    
                    existingReminder.date = reminderDate.toISOString().split('T')[0];
                    existingReminder.nextTrigger = `${reminderDate.toISOString().split('T')[0]} ${existingReminder.time}:00`;
                    existingReminder.description = `Payment reminder for ${bill.name} - $${bill.amount}`;
                    existingReminder.priority = bill.amount > 500 ? 'high' : 'medium';
                }
            }
        });
    }

    syncBudgetReminders() {
        if (!this.budgetData || this.budgetData.length === 0) return;

        this.budgetData.forEach(category => {
            if (category.hasBudget) {
                const spendingPercentage = (category.spent / category.budget) * 100;
                
                // Create reminder if spending is above 80%
                if (spendingPercentage > 80) {
                    const existingReminder = this.reminders.find(r => 
                        r.type === 'budget' && r.linkedItemId === category.id && 
                        r.title.includes('Budget Alert'));

                    if (!existingReminder) {
                        const newReminder = {
                            id: this.getNextId(),
                            title: `Budget Alert - ${category.name}`,
                            type: 'budget',
                            linkedItemId: category.id,
                            linkedItemName: category.name,
                            date: new Date().toISOString().split('T')[0],
                            time: '18:00',
                            priority: spendingPercentage > 95 ? 'high' : 'medium',
                            frequency: 'once',
                            status: 'active',
                            description: `${category.name} budget is at ${spendingPercentage.toFixed(1)}% usage`,
                            emailNotification: true,
                            pushNotification: true,
                            smsNotification: false,
                            snoozeMinutes: 120,
                            createdAt: Date.now(),
                            lastTriggered: null,
                            nextTrigger: `${new Date().toISOString().split('T')[0]} 18:00:00`,
                            completedDates: [],
                            snoozeHistory: []
                        };

                        this.reminders.push(newReminder);
                    }
                }
            }
        });
    }

    syncTransactionReminders() {
        if (!this.transactionData || this.transactionData.length === 0) return;

        // Create reminders for large transactions (>$100) that need review
        this.transactionData.forEach(transaction => {
            if (transaction.amount > 100 && !transaction.tags?.includes('reviewed')) {
                const existingReminder = this.reminders.find(r => 
                    r.type === 'transaction' && r.linkedItemId === transaction.id);

                if (!existingReminder) {
                    const reminderDate = new Date(transaction.timestamp + 24 * 60 * 60 * 1000); // Next day
                    
                    const newReminder = {
                        id: this.getNextId(),
                        title: `Review Transaction - ${transaction.description}`,
                        type: 'transaction',
                        linkedItemId: transaction.id,
                        linkedItemName: transaction.description,
                        date: reminderDate.toISOString().split('T')[0],
                        time: '14:00',
                        priority: transaction.amount > 500 ? 'medium' : 'low',
                        frequency: 'once',
                        status: 'active',
                        description: `Review and categorize transaction: ${transaction.description} ($${transaction.amount})`,
                        emailNotification: false,
                        pushNotification: true,
                        smsNotification: false,
                        snoozeMinutes: 240,
                        createdAt: Date.now(),
                        lastTriggered: null,
                        nextTrigger: `${reminderDate.toISOString().split('T')[0]} 14:00:00`,
                        completedDates: [],
                        snoozeHistory: []
                    };

                    this.reminders.push(newReminder);
                }
            }
        });
    }

    getNextId() {
        return Math.max(...this.reminders.map(r => r.id), 0) + 1;
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
                 onclick="reminderManager.markAsRead(${notification.id})">
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

    checkDueReminders() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        const overdueReminders = this.reminders.filter(reminder => {
            if (reminder.status !== 'active') return false;
            
            const reminderDateTime = new Date(`${reminder.date} ${reminder.time}`);
            return reminderDateTime < now;
        });

        if (overdueReminders.length > 0) {
            const reminder = overdueReminders[0];
            this.showAlert(`Reminder "${reminder.title}" is overdue`);
            
            // Update status to overdue
            reminder.status = 'overdue';
            this.saveReminders();
        }

        // Update all overdue reminders
        this.reminders.forEach(reminder => {
            if (reminder.status === 'active') {
                const reminderDateTime = new Date(`${reminder.date} ${reminder.time}`);
                if (reminderDateTime < now) {
                    reminder.status = 'overdue';
                }
            }
        });
        this.saveReminders();
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

    startReminderChecker() {
        // Check for due reminders every minute
        setInterval(() => {
            this.checkDueReminders();
            this.updateHeaderStats();
        }, 60000);
    }

    renderReminders() {
        const list = document.getElementById('remindersList');
        list.innerHTML = '';

        // Sort reminders by date/time and status
        const sortedReminders = this.reminders.sort((a, b) => {
            if (a.status === 'overdue' && b.status !== 'overdue') return -1;
            if (b.status === 'overdue' && a.status !== 'overdue') return 1;
            
            const aDateTime = new Date(`${a.date} ${a.time}`);
            const bDateTime = new Date(`${b.date} ${b.time}`);
            return aDateTime - bDateTime;
        });

        sortedReminders.forEach(reminder => {
            const item = this.createReminderItem(reminder);
            list.appendChild(item);
        });

        setTimeout(() => {
            document.querySelectorAll('.reminder-item').forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 50);
            });
        }, 50);
    }

    createReminderItem(reminder) {
        const item = document.createElement('div');
        item.className = `reminder-item ${reminder.status}`;
        item.onclick = () => this.selectReminder(reminder.id);

        const typeIcons = {
            bill: 'fas fa-file-invoice-dollar',
            budget: 'fas fa-chart-pie',
            transaction: 'fas fa-exchange-alt',
            custom: 'fas fa-bell'
        };

        const timeUntil = this.getTimeUntilReminder(reminder);

        item.innerHTML = `
            <div class="reminder-header">
                <div class="reminder-icon ${reminder.type}">
                    <i class="${typeIcons[reminder.type]}"></i>
                </div>
                <div class="reminder-info">
                    <h4>${reminder.title}</h4>
                    <span class="reminder-priority priority-${reminder.priority}">${reminder.priority} priority</span>
                </div>
            </div>
            <div class="reminder-details">
                <span class="reminder-time">${this.formatDateTime(reminder.date, reminder.time)}</span>
                <span class="reminder-status">${timeUntil}</span>
            </div>
            <div class="reminder-actions">
                ${reminder.status === 'active' || reminder.status === 'overdue' ? `
                    <button class="reminder-action-btn" onclick="event.stopPropagation(); reminderManager.triggerReminder(${reminder.id})" title="Trigger Now">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="reminder-action-btn" onclick="event.stopPropagation(); reminderManager.openSnoozeModal(${reminder.id})" title="Snooze">
                        <i class="fas fa-clock"></i>
                    </button>
                ` : ''}
                <button class="reminder-action-btn" onclick="event.stopPropagation(); reminderManager.editReminder(${reminder.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="reminder-action-btn" onclick="event.stopPropagation(); reminderManager.deleteReminder(${reminder.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        return item;
    }

    getTimeUntilReminder(reminder) {
        const now = new Date();
        const reminderDateTime = new Date(`${reminder.date} ${reminder.time}`);
        
        if (reminder.status === 'completed') return 'Completed';
        if (reminder.status === 'snoozed') return 'Snoozed';
        
        const diffTime = reminderDateTime - now;
        
        if (diffTime < 0) {
            const overdue = Math.abs(diffTime);
            const hours = Math.floor(overdue / (1000 * 60 * 60));
            const days = Math.floor(hours / 24);
            
            if (days > 0) return `${days} day${days > 1 ? 's' : ''} overdue`;
            if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} overdue`;
            return 'Overdue';
        }
        
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays <= 7) return `In ${diffDays} days`;
        if (diffHours <= 24) return `In ${diffHours} hours`;
        
        return `In ${diffDays} days`;
    }

    selectReminder(reminderId) {
        document.querySelectorAll('.reminder-item').forEach(item => {
            item.classList.remove('active');
        });

        event.currentTarget.classList.add('active');
        this.selectedReminderId = reminderId;
        this.showReminderDetails(reminderId);
    }

    showReminderDetails(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (!reminder) return;

        const detailsContent = document.getElementById('detailsContent');
        
        const typeIcons = {
            bill: 'fas fa-file-invoice-dollar',
            budget: 'fas fa-chart-pie',
            transaction: 'fas fa-exchange-alt',
            custom: 'fas fa-bell'
        };

        const timeUntil = this.getTimeUntilReminder(reminder);
        const nextOccurrence = this.calculateNextOccurrence(reminder);

        detailsContent.innerHTML = `
            <div class="reminder-details-view slide-in">
                <div class="details-header">
                    <div class="reminder-icon ${reminder.type}">
                        <i class="${typeIcons[reminder.type]}"></i>
                    </div>
                    <div>
                        <h2>${reminder.title}</h2>
                        <span class="reminder-priority priority-${reminder.priority}">${reminder.priority} Priority</span>
                    </div>
                </div>

                <div class="reminder-overview">
                    <h3>Reminder Details</h3>
                    <div class="reminder-stats">
                        <div class="reminder-stat stat-time">
                            <span class="reminder-stat-value">${this.formatTime(reminder.time)}</span>
                            <span class="reminder-stat-label">Time</span>
                        </div>
                        <div class="reminder-stat stat-type">
                            <span class="reminder-stat-value">${reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}</span>
                            <span class="reminder-stat-label">Type</span>
                        </div>
                        <div class="reminder-stat stat-frequency">
                            <span class="reminder-stat-value">${reminder.frequency.charAt(0).toUpperCase() + reminder.frequency.slice(1)}</span>
                            <span class="reminder-stat-label">Frequency</span>
                        </div>
                    </div>
                </div>

                <div class="reminder-overview">
                    <h3>Schedule Information</h3>
                    <div style="padding: 20px; background: white; border-radius: 10px;">
                        <div style="margin-bottom: 15px;">
                            <strong>Date & Time:</strong> ${this.formatDateTime(reminder.date, reminder.time)}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Status:</strong> 
                            <span style="color: ${this.getStatusColor(reminder.status)}; font-weight: 600; text-transform: capitalize;">
                                ${reminder.status}
                            </span>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Time Until:</strong> ${timeUntil}
                        </div>
                        ${reminder.linkedItemName ? `
                            <div style="margin-bottom: 15px;">
                                <strong>Linked to:</strong> ${reminder.linkedItemName}
                            </div>
                        ` : ''}
                        <div style="margin-bottom: 15px;">
                            <strong>Next Occurrence:</strong> ${nextOccurrence}
                        </div>
                        <div style="margin-bottom: 15px;">
                            <strong>Notifications:</strong> 
                            ${[
                                reminder.emailNotification ? 'Email' : null,
                                reminder.pushNotification ? 'Push' : null,
                                reminder.smsNotification ? 'SMS' : null
                            ].filter(Boolean).join(', ') || 'None'}
                        </div>
                        <div>
                            <strong>Description:</strong> ${reminder.description || 'No description'}
                        </div>
                    </div>
                </div>

                ${reminder.completedDates && reminder.completedDates.length > 0 ? `
                    <div class="reminder-overview">
                        <h3>Completion History</h3>
                        <div style="padding: 20px; background: white; border-radius: 10px;">
                            ${reminder.completedDates.slice(0, 5).map(date => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f3f4;">
                                    <span>${this.formatDate(date)}</span>
                                    <span style="color: #27ae60;">
                                        <i class="fas fa-check"></i> Completed
                                    </span>
                                </div>
                            `).join('')}
                            ${reminder.completedDates.length > 5 ? `
                                <div style="text-align: center; margin-top: 10px;">
                                    <small style="color: #7f8c8d;">And ${reminder.completedDates.length - 5} more completions...</small>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                ` : ''}

                ${reminder.snoozeHistory && reminder.snoozeHistory.length > 0 ? `
                    <div class="reminder-overview">
                        <h3>Snooze History</h3>
                        <div style="padding: 20px; background: white; border-radius: 10px;">
                            ${reminder.snoozeHistory.slice(0, 3).map(snooze => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f3f4;">
                                    <span>${this.formatDateTime(new Date(snooze.snoozeTime).toISOString().split('T')[0], new Date(snooze.snoozeTime).toTimeString().slice(0, 5))}</span>
                                    <span style="color: #f39c12;">
                                        <i class="fas fa-clock"></i> ${snooze.snoozeDuration} min
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div style="display: flex; gap: 12px; margin-top: 25px; flex-wrap: wrap;">
                    ${reminder.status === 'active' || reminder.status === 'overdue' ? `
                        <button class="btn btn-primary" onclick="reminderManager.triggerReminder(${reminder.id})">
                            <i class="fas fa-play"></i> Trigger Now
                        </button>
                        <button class="btn btn-secondary" onclick="reminderManager.openSnoozeModal(${reminder.id})">
                            <i class="fas fa-clock"></i> Snooze
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="reminderManager.editReminder(${reminder.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary" onclick="reminderManager.deleteReminder(${reminder.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    getStatusColor(status) {
        const colors = {
            active: '#3498db',
            completed: '#27ae60',
            overdue: '#e74c3c',
            snoozed: '#f39c12'
        };
        return colors[status] || '#7f8c8d';
    }

    calculateNextOccurrence(reminder) {
        if (reminder.frequency === 'once') return 'One-time reminder';
        
        const currentDate = new Date(`${reminder.date} ${reminder.time}`);
        let nextDate = new Date(currentDate);
        
        switch (reminder.frequency) {
            case 'daily':
                nextDate.setDate(currentDate.getDate() + 1);
                break;
            case 'weekly':
                nextDate.setDate(currentDate.getDate() + 7);
                break;
            case 'monthly':
                nextDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'yearly':
                nextDate.setFullYear(currentDate.getFullYear() + 1);
                break;
        }
        
        return this.formatDateTime(nextDate.toISOString().split('T')[0], nextDate.toTimeString().slice(0, 5));
    }

    formatDateTime(date, time) {
        const dateObj = new Date(`${date} ${time}`);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return dateObj.toLocaleDateString('en-US', options);
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

    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    showWelcomeScreen() {
        const detailsContent = document.getElementById('detailsContent');
        detailsContent.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h3>Welcome to Reminders</h3>
                <p>Stay organized with smart reminders for bills, budget reviews, and financial goals. Never miss important deadlines again.</p>
                <div class="welcome-stats">
                    <div class="welcome-stat">
                        <i class="fas fa-list"></i>
                        <span id="totalReminders">${this.reminders.length}</span>
                        <label>Total Reminders</label>
                    </div>
                    <div class="welcome-stat">
                        <i class="fas fa-clock"></i>
                        <span id="pendingReminders">${this.getActiveRemindersCount()}</span>
                        <label>Pending</label>
                    </div>
                </div>
                <div class="welcome-actions">
                    <button class="btn btn-primary" onclick="addReminder()">
                        <i class="fas fa-plus"></i>
                        Create Your First Reminder
                    </button>
                    <button class="btn btn-secondary" onclick="syncReminders()">
                        <i class="fas fa-sync-alt"></i>
                        Sync with Modules
                    </button>
                </div>
            </div>
        `;
    }

    getActiveRemindersCount() {
        return this.reminders.filter(r => r.status === 'active' || r.status === 'overdue').length;
    }

    getDueToday() {
        const today = new Date().toISOString().split('T')[0];
        return this.reminders.filter(r => r.date === today && (r.status === 'active' || r.status === 'overdue')).length;
    }

    updateHeaderStats() {
        const activeReminders = this.getActiveRemindersCount();
        const upcomingToday = this.getDueToday();
        const overdueReminders = this.reminders.filter(r => r.status === 'overdue').length;

        document.getElementById('activeReminders').textContent = activeReminders;
        document.getElementById('upcomingToday').textContent = upcomingToday;
        document.getElementById('overdueReminders').textContent = overdueReminders;
    }

    updateWelcomeStats() {
        const totalRemindersEl = document.getElementById('totalReminders');
        const pendingRemindersEl = document.getElementById('pendingReminders');
        
        if (totalRemindersEl) {
            totalRemindersEl.textContent = this.reminders.length;
        }
        if (pendingRemindersEl) {
            pendingRemindersEl.textContent = this.getActiveRemindersCount();
        }
    }

    addReminder() {
        document.getElementById('reminderModal').style.display = 'block';
        document.getElementById('modalTitle').textContent = 'Add Reminder';
        this.updateLinkedOptions();
    }

    updateLinkedOptions() {
        const typeSelect = document.getElementById('reminderType');
        const linkedItemGroup = document.getElementById('linkedItemGroup');
        const linkedItemSelect = document.getElementById('linkedItem');
        
        const selectedType = typeSelect.value;
        
        if (selectedType === 'custom') {
            linkedItemGroup.style.display = 'none';
            return;
        }
        
        linkedItemGroup.style.display = 'block';
        linkedItemSelect.innerHTML = '<option value="">Select item to link...</option>';
        
        switch (selectedType) {
            case 'bill':
                if (this.billsData && this.billsData.length > 0) {
                    this.billsData.forEach(bill => {
                        const option = document.createElement('option');
                        option.value = bill.id;
                        option.textContent = `${bill.name} - $${bill.amount} (Due: ${this.formatDate(bill.dueDate)})`;
                        linkedItemSelect.appendChild(option);
                    });
                }
                break;
            case 'budget':
                if (this.budgetData && this.budgetData.length > 0) {
                    this.budgetData.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.id;
                        option.textContent = `${category.name} - Budget: $${category.budget || 0}`;
                        linkedItemSelect.appendChild(option);
                    });
                }
                break;
            case 'transaction':
                if (this.transactionData && this.transactionData.length > 0) {
                    this.transactionData.slice(0, 10).forEach(transaction => {
                        const option = document.createElement('option');
                        option.value = transaction.id;
                        option.textContent = `${transaction.description} - $${transaction.amount}`;
                        linkedItemSelect.appendChild(option);
                    });
                }
                break;
        }
    }

    handleReminderSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const linkedItemId = formData.get('linkedItem');
        let linkedItemName = null;
        
        // Get linked item name
        if (linkedItemId) {
            const type = formData.get('reminderType');
            switch (type) {
                case 'bill':
                    const bill = this.billsData.find(b => b.id == linkedItemId);
                    linkedItemName = bill ? bill.name : null;
                    break;
                case 'budget':
                    const category = this.budgetData.find(c => c.id == linkedItemId);
                    linkedItemName = category ? category.name : null;
                    break;
                case 'transaction':
                    const transaction = this.transactionData.find(t => t.id == linkedItemId);
                    linkedItemName = transaction ? transaction.description : null;
                    break;
            }
        }
        
        const reminder = {
            id: this.getNextId(),
            title: formData.get('reminderTitle'),
            type: formData.get('reminderType'),
            linkedItemId: linkedItemId ? parseInt(linkedItemId) : null,
            linkedItemName: linkedItemName,
            date: formData.get('reminderDate'),
            time: formData.get('reminderTime'),
            priority: formData.get('reminderPriority'),
            frequency: formData.get('reminderFrequency'),
            status: 'active',
            description: formData.get('reminderDescription'),
            emailNotification: document.getElementById('emailNotification').checked,
            pushNotification: document.getElementById('pushNotification').checked,
            smsNotification: document.getElementById('smsNotification').checked,
            snoozeMinutes: parseInt(formData.get('snoozeOptions')),
            createdAt: Date.now(),
            lastTriggered: null,
            nextTrigger: `${formData.get('reminderDate')} ${formData.get('reminderTime')}:00`,
            completedDates: [],
            snoozeHistory: []
        };

        this.reminders.push(reminder);
        this.saveReminders();
        this.renderReminders();
        this.updateHeaderStats();
        this.updateWelcomeStats();
        this.closeReminderModal();

        this.addNotification('success', 'Reminder Created', 
            `${reminder.title} has been created successfully`);
    }

    editReminder(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (!reminder) return;

        // Populate form with existing data
        document.getElementById('reminderTitle').value = reminder.title;
        document.getElementById('reminderType').value = reminder.type;
        document.getElementById('reminderDate').value = reminder.date;
        document.getElementById('reminderTime').value = reminder.time;
        document.getElementById('reminderPriority').value = reminder.priority;
        document.getElementById('reminderFrequency').value = reminder.frequency;
        document.getElementById('reminderDescription').value = reminder.description || '';
        document.getElementById('emailNotification').checked = reminder.emailNotification;
        document.getElementById('pushNotification').checked = reminder.pushNotification;
        document.getElementById('smsNotification').checked = reminder.smsNotification;
        document.getElementById('snoozeOptions').value = reminder.snoozeMinutes;

        this.updateLinkedOptions();
        
        if (reminder.linkedItemId) {
            document.getElementById('linkedItem').value = reminder.linkedItemId;
        }

        document.getElementById('modalTitle').textContent = 'Edit Reminder';
        document.getElementById('reminderModal').style.display = 'block';

        // Change form submission to update instead of create
        const form = document.getElementById('reminderForm');
        form.onsubmit = (e) => this.handleReminderUpdate(e, reminderId);
    }

    handleReminderUpdate(event, reminderId) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
        
        if (reminderIndex !== -1) {
            const linkedItemId = formData.get('linkedItem');
            let linkedItemName = null;
            
            // Get linked item name
            if (linkedItemId) {
                const type = formData.get('reminderType');
                switch (type) {
                    case 'bill':
                        const bill = this.billsData.find(b => b.id == linkedItemId);
                        linkedItemName = bill ? bill.name : null;
                        break;
                    case 'budget':
                        const category = this.budgetData.find(c => c.id == linkedItemId);
                        linkedItemName = category ? category.name : null;
                        break;
                    case 'transaction':
                        const transaction = this.transactionData.find(t => t.id == linkedItemId);
                        linkedItemName = transaction ? transaction.description : null;
                        break;
                }
            }
            
            this.reminders[reminderIndex] = {
                ...this.reminders[reminderIndex],
                title: formData.get('reminderTitle'),
                type: formData.get('reminderType'),
                linkedItemId: linkedItemId ? parseInt(linkedItemId) : null,
                linkedItemName: linkedItemName,
                date: formData.get('reminderDate'),
                time: formData.get('reminderTime'),
                priority: formData.get('reminderPriority'),
                frequency: formData.get('reminderFrequency'),
                description: formData.get('reminderDescription'),
                emailNotification: document.getElementById('emailNotification').checked,
                pushNotification: document.getElementById('pushNotification').checked,
                smsNotification: document.getElementById('smsNotification').checked,
                snoozeMinutes: parseInt(formData.get('snoozeOptions')),
                nextTrigger: `${formData.get('reminderDate')} ${formData.get('reminderTime')}:00`
            };

            this.saveReminders();
            this.renderReminders();
            this.updateHeaderStats();
            this.showReminderDetails(reminderId);
            this.closeReminderModal();

            this.addNotification('success', 'Reminder Updated', 
                `${this.reminders[reminderIndex].title} has been updated successfully`);
        }
    }

    deleteReminder(reminderId) {
        if (confirm('Are you sure you want to delete this reminder?')) {
            const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
            
            if (reminderIndex !== -1) {
                const deletedReminder = this.reminders[reminderIndex];
                this.reminders.splice(reminderIndex, 1);
                
                this.saveReminders();
                this.renderReminders();
                this.updateHeaderStats();
                this.updateWelcomeStats();
                this.showWelcomeScreen();

                this.addNotification('info', 'Reminder Deleted', 
                    `${deletedReminder.title} has been deleted`);
            }
        }
    }

    triggerReminder(reminderId) {
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (!reminder) return;

        // Mark as triggered
        reminder.lastTriggered = Date.now();
        
        // Handle frequency for next occurrence
        if (reminder.frequency !== 'once') {
            const nextDate = new Date(`${reminder.date} ${reminder.time}`);
            
            switch (reminder.frequency) {
                case 'daily':
                    nextDate.setDate(nextDate.getDate() + 1);
                    break;
                case 'weekly':
                    nextDate.setDate(nextDate.getDate() + 7);
                    break;
                case 'monthly':
                    nextDate.setMonth(nextDate.getMonth() + 1);
                    break;
                case 'yearly':
                    nextDate.setFullYear(nextDate.getFullYear() + 1);
                    break;
            }
            
            reminder.date = nextDate.toISOString().split('T')[0];
            reminder.nextTrigger = `${reminder.date} ${reminder.time}:00`;
            reminder.status = 'active';
        } else {
            reminder.status = 'completed';
        }
        
        // Add to completed dates
        if (!reminder.completedDates) reminder.completedDates = [];
        reminder.completedDates.unshift(new Date().toISOString().split('T')[0]);

        this.saveReminders();
        this.renderReminders();
        this.updateHeaderStats();
        this.showReminderDetails(reminderId);

        this.addNotification('success', 'Reminder Triggered', 
            `${reminder.title} has been marked as complete`);
    }

    openSnoozeModal(reminderId) {
        this.currentSnoozeReminderId = reminderId;
        const reminder = this.reminders.find(r => r.id === reminderId);
        if (!reminder) return;

        const snoozeSummary = document.getElementById('snoozeSummary');
        snoozeSummary.innerHTML = `
            <h4>Snooze Reminder</h4>
            <div style="margin-bottom: 15px;">
                <strong>Title:</strong> ${reminder.title}
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Current Time:</strong> ${this.formatDateTime(reminder.date, reminder.time)}
            </div>
            <div>
                <strong>Priority:</strong> 
                <span style="text-transform: capitalize; color: ${this.getPriorityColor(reminder.priority)};">
                    ${reminder.priority}
                </span>
            </div>
        `;

        // Set default custom snooze time (1 hour from now)
        const defaultSnooze = new Date(Date.now() + 60 * 60 * 1000);
        document.getElementById('customSnoozeTime').value = defaultSnooze.toISOString().slice(0, 16);

        document.getElementById('snoozeModal').style.display = 'block';
    }

    getPriorityColor(priority) {
        const colors = {
            high: '#e74c3c',
            medium: '#f39c12',
            low: '#27ae60'
        };
        return colors[priority] || '#7f8c8d';
    }

    snoozeReminder(minutes) {
        if (!this.currentSnoozeReminderId) return;

        const reminder = this.reminders.find(r => r.id === this.currentSnoozeReminderId);
        if (!reminder) return;

        const snoozeUntil = new Date(Date.now() + minutes * 60 * 1000);
        
        reminder.date = snoozeUntil.toISOString().split('T')[0];
        reminder.time = snoozeUntil.toTimeString().slice(0, 5);
        reminder.nextTrigger = `${reminder.date} ${reminder.time}:00`;
        reminder.status = 'snoozed';
        
        // Add to snooze history
        if (!reminder.snoozeHistory) reminder.snoozeHistory = [];
        reminder.snoozeHistory.unshift({
            snoozeTime: Date.now(),
            snoozeDuration: minutes,
            reason: 'user_snooze'
        });

        this.saveReminders();
        this.renderReminders();
        this.updateHeaderStats();
        this.showReminderDetails(this.currentSnoozeReminderId);
        this.closeSnoozeModal();

        const timeText = minutes >= 1440 ? `${Math.floor(minutes/1440)} day${Math.floor(minutes/1440) > 1 ? 's' : ''}` :
                        minutes >= 60 ? `${Math.floor(minutes/60)} hour${Math.floor(minutes/60) > 1 ? 's' : ''}` :
                        `${minutes} minute${minutes > 1 ? 's' : ''}`;

        this.addNotification('info', 'Reminder Snoozed', 
            `${reminder.title} has been snoozed for ${timeText}`);
    }

    customSnoozeReminder() {
        if (!this.currentSnoozeReminderId) return;

        const customTime = document.getElementById('customSnoozeTime').value;
        if (!customTime) return;

        const reminder = this.reminders.find(r => r.id === this.currentSnoozeReminderId);
        if (!reminder) return;

        const snoozeDate = new Date(customTime);
        
        reminder.date = snoozeDate.toISOString().split('T')[0];
        reminder.time = snoozeDate.toTimeString().slice(0, 5);
        reminder.nextTrigger = `${reminder.date} ${reminder.time}:00`;
        reminder.status = 'snoozed';
        
        // Calculate minutes difference for snooze history
        const minutesDiff = Math.floor((snoozeDate - new Date()) / (1000 * 60));
        
        // Add to snooze history
        if (!reminder.snoozeHistory) reminder.snoozeHistory = [];
        reminder.snoozeHistory.unshift({
            snoozeTime: Date.now(),
            snoozeDuration: minutesDiff,
            reason: 'custom_snooze'
        });

        this.saveReminders();
        this.renderReminders();
        this.updateHeaderStats();
        this.showReminderDetails(this.currentSnoozeReminderId);
        this.closeSnoozeModal();

        this.addNotification('info', 'Reminder Snoozed', 
            `${reminder.title} has been snoozed until ${this.formatDateTime(reminder.date, reminder.time)}`);
    }

    markReminderComplete() {
        if (!this.currentSnoozeReminderId) return;
        
        this.triggerReminder(this.currentSnoozeReminderId);
        this.closeSnoozeModal();
    }

    filterReminders() {
        const statusFilter = document.getElementById('filterStatus').value;
        const typeFilter = document.getElementById('filterType').value;
        const priorityFilter = document.getElementById('filterPriority').value;
        const timeframeFilter = document.getElementById('filterTimeframe').value;

        const items = document.querySelectorAll('.reminder-item');
        
        items.forEach((item, index) => {
            const reminder = this.reminders[index];
            let show = true;

            // Status filter
            if (statusFilter !== 'all' && reminder.status !== statusFilter) {
                show = false;
            }

            // Type filter
            if (typeFilter !== 'all' && reminder.type !== typeFilter) {
                show = false;
            }

            // Priority filter
            if (priorityFilter !== 'all' && reminder.priority !== priorityFilter) {
                show = false;
            }

            // Timeframe filter
            if (timeframeFilter !== 'all') {
                const reminderDate = new Date(reminder.date);
                const today = new Date();
                const diffTime = reminderDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                switch (timeframeFilter) {
                    case 'today':
                        show = show && diffDays === 0;
                        break;
                    case 'week':
                        show = show && diffDays >= 0 && diffDays <= 7;
                        break;
                    case 'month':
                        show = show && diffDays >= 0 && diffDays <= 30;
                        break;
                }
            }

            item.style.display = show ? 'block' : 'none';
        });
    }

    searchReminders() {
        const searchTerm = document.getElementById('searchReminders').value.toLowerCase();
        const items = document.querySelectorAll('.reminder-item');

        items.forEach((item, index) => {
            const reminder = this.reminders[index];
            const searchableText = `${reminder.title} ${reminder.description} ${reminder.linkedItemName || ''}`.toLowerCase();
            
            if (searchableText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    showTodaysReminders() {
        const detailsContent = document.getElementById('detailsContent');
        const today = new Date().toISOString().split('T')[0];
        
        const todaysReminders = this.reminders
            .filter(reminder => reminder.date === today)
            .sort((a, b) => a.time.localeCompare(b.time));

        detailsContent.innerHTML = `
            <div class="todays-reminders slide-in" style="padding: 30px;">
                <div style="margin-bottom: 30px; text-align: center;">
                    <h2>Today's Reminders</h2>
                    <p>${this.formatDate(today)} - ${todaysReminders.length} reminder${todaysReminders.length !== 1 ? 's' : ''}</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${todaysReminders.length > 0 ? todaysReminders.map(reminder => {
                        const typeIcons = {
                            bill: 'fas fa-file-invoice-dollar',
                            budget: 'fas fa-chart-pie',
                            transaction: 'fas fa-exchange-alt',
                            custom: 'fas fa-bell'
                        };
                        
                        const statusColors = {
                            active: '#3498db',
                            overdue: '#e74c3c',
                            completed: '#27ae60',
                            snoozed: '#f39c12'
                        };
                        
                        return `
                            <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; 
                                        border-left: 4px solid ${statusColors[reminder.status]}; 
                                        cursor: pointer;"
                                 onclick="reminderManager.selectReminder(${reminder.id})">
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="width: 50px; height: 50px; border-radius: 10px; 
                                               background: linear-gradient(135deg, ${statusColors[reminder.status]}, ${statusColors[reminder.status]}dd); 
                                               display: flex; align-items: center; justify-content: center; color: white;">
                                        <i class="${typeIcons[reminder.type]}"></i>
                                    </div>
                                    <div style="flex: 1;">
                                        <h4 style="color: #2c3e50; margin-bottom: 5px;">${reminder.title}</h4>
                                        <p style="color: #7f8c8d; font-size: 0.9rem; margin-bottom: 5px;">
                                            ${this.formatTime(reminder.time)} • ${reminder.priority} priority
                                        </p>
                                        <p style="color: #7f8c8d; font-size: 0.85rem;">
                                            ${reminder.description || 'No description'}
                                        </p>
                                    </div>
                                    // Continuation from where the file broke...

                                    <div style="text-align: right;">
                                        <span style="background: ${this.getStatusBadgeColor(reminder.status)}; 
                                                     color: ${this.getStatusTextColor(reminder.status)}; 
                                                     padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; 
                                                     text-transform: uppercase; font-weight: 600;">
                                            ${reminder.status}
                                        </span>
                                    </div>
                                </div>
                                <div style="margin-top: 15px; display: flex; gap: 10px;">
                                    ${reminder.status === 'active' || reminder.status === 'overdue' ? `
                                        <button class="btn btn-primary" style="flex: 1;" onclick="event.stopPropagation(); reminderManager.triggerReminder(${reminder.id})">
                                            Complete
                                        </button>
                                        <button class="btn btn-secondary" style="flex: 1;" onclick="event.stopPropagation(); reminderManager.openSnoozeModal(${reminder.id})">
                                            Snooze
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        `;
                    }).join('') : `
                        <div style="text-align: center; padding: 60px 20px;">
                            <i class="fas fa-calendar-check" style="font-size: 3rem; color: #95a5a6; margin-bottom: 20px;"></i>
                            <h3 style="color: #2c3e50; margin-bottom: 10px;">No Reminders Today</h3>
                            <p style="color: #7f8c8d;">You have no reminders scheduled for today. Great job staying organized!</p>
                            <button class="btn btn-primary" style="margin-top: 20px;" onclick="addReminder()">
                                <i class="fas fa-plus"></i> Add New Reminder
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    getStatusBadgeColor(status) {
        const colors = {
            active: '#dbeafe',
            overdue: '#fab1a0',
            completed: '#d5f4e6',
            snoozed: '#ffeaa7'
        };
        return colors[status] || '#f8f9fa';
    }

    getStatusTextColor(status) {
        const colors = {
            active: '#3498db',
            overdue: '#e74c3c',
            completed: '#27ae60',
            snoozed: '#f39c12'
        };
        return colors[status] || '#7f8c8d';
    }

    showReminderCalendar() {
        const detailsContent = document.getElementById('detailsContent');
        
        // Group reminders by date
        const remindersByDate = {};
        this.reminders.forEach(reminder => {
            if (!remindersByDate[reminder.date]) {
                remindersByDate[reminder.date] = [];
            }
            remindersByDate[reminder.date].push(reminder);
        });

        // Sort dates
        const sortedDates = Object.keys(remindersByDate).sort();
        const today = new Date().toISOString().split('T')[0];

        detailsContent.innerHTML = `
            <div class="reminder-calendar slide-in" style="padding: 30px;">
                <div style="margin-bottom: 30px; text-align: center;">
                    <h2>Reminder Calendar</h2>
                    <p>All your reminders organized by date</p>
                </div>

                <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${sortedDates.map(date => {
                        const isToday = date === today;
                        const isPast = new Date(date) < new Date(today);
                        const reminders = remindersByDate[date];
                        
                        return `
                            <div style="background: ${isToday ? 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)' : '#f8f9fa'}; 
                                        border-radius: 12px; padding: 20px; 
                                        border-left: 4px solid ${isToday ? '#3498db' : isPast ? '#95a5a6' : '#27ae60'};">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                                    <h4 style="color: #2c3e50; margin: 0;">
                                        ${this.formatDate(date)}
                                        ${isToday ? ' (Today)' : ''}
                                        ${isPast ? ' (Past)' : ''}
                                    </h4>
                                    <span style="background: ${isToday ? '#3498db' : isPast ? '#95a5a6' : '#27ae60'}; 
                                                 color: white; padding: 3px 8px; border-radius: 12px; 
                                                 font-size: 0.75rem; font-weight: 600;">
                                        ${reminders.length} reminder${reminders.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 10px;">
                                    ${reminders.map(reminder => `
                                        <div style="background: white; border-radius: 8px; padding: 15px; 
                                                    display: flex; align-items: center; gap: 12px; cursor: pointer;"
                                             onclick="reminderManager.selectReminder(${reminder.id})">
                                            <div style="width: 8px; height: 8px; border-radius: 50%; 
                                                       background: ${this.getStatusColor(reminder.status)};"></div>
                                            <div style="flex: 1;">
                                                <strong style="color: #2c3e50;">${reminder.title}</strong>
                                                <span style="color: #7f8c8d; margin-left: 10px;">
                                                    ${this.formatTime(reminder.time)}
                                                </span>
                                            </div>
                                            <span style="color: ${this.getStatusColor(reminder.status)}; 
                                                         font-size: 0.8rem; text-transform: capitalize;">
                                                ${reminder.status}
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                    
                    ${sortedDates.length === 0 ? `
                        <div style="text-align: center; padding: 60px 20px;">
                            <i class="fas fa-calendar-alt" style="font-size: 3rem; color: #95a5a6; margin-bottom: 20px;"></i>
                            <h3 style="color: #2c3e50; margin-bottom: 10px;">No Reminders Scheduled</h3>
                            <p style="color: #7f8c8d;">Start by creating your first reminder to see it on the calendar.</p>
                            <button class="btn btn-primary" style="margin-top: 20px;" onclick="addReminder()">
                                <i class="fas fa-plus"></i> Create First Reminder
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    showNotificationCenter() {
        const detailsContent = document.getElementById('detailsContent');
        
        const allNotifications = this.notifications.sort((a, b) => b.timestamp - a.timestamp);
        
        detailsContent.innerHTML = `
            <div class="notification-center slide-in" style="padding: 30px;">
                <div style="margin-bottom: 25px; text-align: center;">
                    <h2>Notification Center</h2>
                    <p>Stay updated with all your reminder activities and alerts</p>
                </div>

                <div style="display: flex; gap: 10px; margin-bottom: 25px; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="reminderManager.markAllAsRead()">
                        Mark All as Read
                    </button>
                    <button class="btn btn-secondary" onclick="reminderManager.clearOldNotifications()">
                        Clear Old Notifications
                    </button>
                </div>

                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${allNotifications.map(notification => `
                        <div style="background: ${notification.isRead ? '#f8f9fa' : 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)'}; 
                                    border-radius: 12px; padding: 20px; 
                                    border-left: 4px solid ${notification.isRead ? '#e1e8ed' : '#3498db'}; 
                                    cursor: pointer;"
                             onclick="reminderManager.markAsRead(${notification.id})">
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

    setCurrentDateTime() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().slice(0, 5);
        
        document.getElementById('reminderDate').value = today;
        document.getElementById('reminderTime').value = currentTime;
    }

    setupEventListeners() {
        window.onclick = (event) => {
            if (event.target.classList.contains('reminder-modal') || 
                event.target.classList.contains('snooze-modal')) {
                if (event.target.id === 'reminderModal') {
                    this.closeReminderModal();
                } else if (event.target.id === 'snoozeModal') {
                    this.closeSnoozeModal();
                }
            }
        };

        document.getElementById('reminderForm').onsubmit = (e) => this.handleReminderSubmit(e);
    }

    closeReminderModal() {
        document.getElementById('reminderModal').style.display = 'none';
        document.getElementById('reminderForm').reset();
        this.setCurrentDateTime();
        
        // Reset form submission to default
        document.getElementById('reminderForm').onsubmit = (e) => this.handleReminderSubmit(e);
    }

    closeSnoozeModal() {
        document.getElementById('snoozeModal').style.display = 'none';
        this.currentSnoozeReminderId = null;
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
let reminderManager;

function addReminder() {
    reminderManager.addReminder();
}

function showTodaysReminders() {
    reminderManager.showTodaysReminders();
}

function showReminderCalendar() {
    reminderManager.showReminderCalendar();
}

function syncReminders() {
    reminderManager.syncWithModules();
    reminderManager.renderReminders();
    reminderManager.updateHeaderStats();
    reminderManager.addNotification('success', 'Sync Complete', 
        'Successfully synced reminders with all modules');
}

function showNotificationCenter() {
    reminderManager.showNotificationCenter();
}

function filterReminders() {
    reminderManager.filterReminders();
}

function searchReminders() {
    reminderManager.searchReminders();
}

function updateLinkedOptions() {
    reminderManager.updateLinkedOptions();
}

function closeReminderModal() {
    reminderManager.closeReminderModal();
}

function closeSnoozeModal() {
    reminderManager.closeSnoozeModal();
}

function snoozeReminder(minutes) {
    reminderManager.snoozeReminder(minutes);
}

function customSnoozeReminder() {
    reminderManager.customSnoozeReminder();
}

function markReminderComplete() {
    reminderManager.markReminderComplete();
}

function closeFloatingNotifications() {
    reminderManager.closeFloatingNotifications();
}

function closeAlert() {
    reminderManager.closeAlert();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    reminderManager = new ReminderManager();
});