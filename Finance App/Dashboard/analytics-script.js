// Analytics Dashboard System
class AnalyticsDashboard {
    constructor() {
        this.currentUser = 'uttam002';
        this.currentDateTime = '2025-08-18 10:12:59';
        this.timeRange = '30d';
        this.charts = {};
        this.data = {
            budget: this.loadBudgetData(),
            transactions: this.loadTransactionData(),
            bills: this.loadBillsData(),
            reminders: this.loadReminderData()
        };
        this.insights = [];
        this.init();
    }

    init() {
        this.updateCurrentTime();
        this.calculateKPIs();
        this.initializeCharts();
        this.loadRecentActivity();
        this.loadBillsTimeline();
        this.loadCategoryBreakdown();
        this.calculateHealthScore();
        this.generateSmartInsights();
        this.setupEventListeners();
        this.startRealTimeUpdates();
    }

    loadBudgetData() {
        const defaultData = [
            { id: 1, name: 'Food & Dining', budget: 800, spent: 650, hasBudget: true },
            { id: 2, name: 'Transportation', budget: 300, spent: 380, hasBudget: true },
            { id: 3, name: 'Entertainment', budget: 200, spent: 120, hasBudget: true },
            { id: 4, name: 'Healthcare', budget: 0, spent: 85, hasBudget: false },
            { id: 5, name: 'Shopping', budget: 500, spent: 650, hasBudget: true },
            { id: 6, name: 'Housing', budget: 1500, spent: 1500, hasBudget: true },
            { id: 7, name: 'Utilities', budget: 250, spent: 205, hasBudget: true },
            { id: 8, name: 'Savings', budget: 1000, spent: 800, hasBudget: true }
        ];
        
        const saved = localStorage.getItem('budgetCategories');
        return saved ? JSON.parse(saved) : defaultData;
    }

    loadTransactionData() {
        const defaultData = [
            { id: 1, type: 'expense', amount: 45.50, category: 'food', description: 'Lunch at Italian Restaurant', date: '2025-08-18', timestamp: Date.now() - 3600000 },
            { id: 2, type: 'income', amount: 3500.00, category: 'salary', description: 'Monthly Salary Payment', date: '2025-08-17', timestamp: Date.now() - 86400000 },
            { id: 3, type: 'expense', amount: 25.00, category: 'transport', description: 'Uber ride to office', date: '2025-08-17', timestamp: Date.now() - 90000000 },
            { id: 4, type: 'expense', amount: 120.75, category: 'shopping', description: 'Groceries and household items', date: '2025-08-16', timestamp: Date.now() - 172800000 },
            { id: 5, type: 'income', amount: 800.00, category: 'freelance', description: 'Web development project payment', date: '2025-08-15', timestamp: Date.now() - 259200000 },
            { id: 6, type: 'expense', amount: 15.99, category: 'entertainment', description: 'Netflix subscription', date: '2025-08-15', timestamp: Date.now() - 259200000 },
            { id: 7, type: 'expense', amount: 85.00, category: 'healthcare', description: 'Doctor consultation', date: '2025-08-14', timestamp: Date.now() - 345600000 },
            { id: 8, type: 'expense', amount: 32.50, category: 'transport', description: 'Gas station fill-up', date: '2025-08-13', timestamp: Date.now() - 432000000 }
        ];
        
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : defaultData;
    }

    loadBillsData() {
        const defaultData = [
            { id: 1, name: 'Electric Bill', amount: 125.50, dueDate: '2025-08-25', status: 'pending' },
            { id: 2, name: 'Car Insurance', amount: 89.99, dueDate: '2025-08-20', status: 'overdue' },
            { id: 3, name: 'Netflix Subscription', amount: 15.99, dueDate: '2025-08-30', status: 'pending' },
            { id: 4, name: 'Mortgage Payment', amount: 1850.00, dueDate: '2025-09-01', status: 'pending' },
            { id: 5, name: 'Internet Bill', amount: 79.99, dueDate: '2025-08-22', status: 'paid' },
            { id: 6, name: 'Water & Sewer', amount: 45.75, dueDate: '2025-08-28', status: 'pending' }
        ];
        
        const saved = localStorage.getItem('bills');
        return saved ? JSON.parse(saved) : defaultData;
    }

    loadReminderData() {
        const defaultData = [
            { id: 1, title: 'Pay Electric Bill', type: 'bill', status: 'active', date: '2025-08-25' },
            { id: 2, title: 'Budget Review - Food Category', type: 'budget', status: 'active', date: '2025-08-20' },
            { id: 3, title: 'Car Insurance Payment Due', type: 'bill', status: 'overdue', date: '2025-08-18' }
        ];
        
        const saved = localStorage.getItem('reminders');
        return saved ? JSON.parse(saved) : defaultData;
    }

    updateCurrentTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        document.getElementById('currentTime').textContent = 
            now.toLocaleDateString('en-US', options);
    }

    calculateKPIs() {
        // Calculate income
        const totalIncome = this.data.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        // Calculate expenses
        const totalExpenses = this.data.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        // Calculate net savings
        const netSavings = totalIncome - totalExpenses;

        // Calculate pending bills
        const pendingBills = this.data.bills
            .filter(b => b.status === 'pending' || b.status === 'overdue')
            .reduce((sum, b) => sum + b.amount, 0);

        // Update KPI displays
        document.getElementById('totalIncome').textContent = `$${totalIncome.toLocaleString()}`;
        document.getElementById('totalExpenses').textContent = `$${totalExpenses.toLocaleString()}`;
        document.getElementById('netSavings').textContent = `$${netSavings.toLocaleString()}`;
        document.getElementById('pendingBills').textContent = `$${pendingBills.toLocaleString()}`;

        return { totalIncome, totalExpenses, netSavings, pendingBills };
    }

    initializeCharts() {
        this.initMainChart();
        this.initBudgetChart();
        this.initHealthGauge();
    }

   // Continuation from where the file broke...

   initMainChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    // Generate sample data for the last 30 days
    const days = this.generateDateRange(30);
    const incomeData = this.generateFinancialData(days, 'income');
    const expenseData = this.generateFinancialData(days, 'expense');
    const savingsData = days.map((day, index) => incomeData[index] - expenseData[index]);

    this.charts.mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days.map(day => this.formatDateLabel(day)),
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    borderColor: 'rgba(39, 174, 96, 1)',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                },
                {
                    label: 'Net Savings',
                    data: savingsData,
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2c3e50',
                    bodyColor: '#7f8c8d',
                    borderColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#95a5a6',
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(102, 126, 234, 0.1)',
                        borderDash: [5, 5]
                    },
                    ticks: {
                        color: '#95a5a6',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

initBudgetChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    
    const budgetData = this.data.budget.filter(b => b.hasBudget);
    const labels = budgetData.map(b => b.name);
    const spentData = budgetData.map(b => b.spent);
    const budgetAmounts = budgetData.map(b => b.budget);
    
    const colors = [
        'rgba(102, 126, 234, 0.8)',
        'rgba(231, 76, 60, 0.8)',
        'rgba(39, 174, 96, 0.8)',
        'rgba(243, 156, 18, 0.8)',
        'rgba(155, 89, 182, 0.8)',
        'rgba(26, 188, 156, 0.8)',
        'rgba(52, 73, 94, 0.8)',
        'rgba(230, 126, 34, 0.8)'
    ];

    this.charts.budgetChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: spentData,
                backgroundColor: colors,
                borderWidth: 0,
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#2c3e50',
                    bodyColor: '#7f8c8d',
                    borderColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label;
                            const value = context.parsed;
                            const budget = budgetAmounts[context.dataIndex];
                            const percentage = ((value / budget) * 100).toFixed(1);
                            return [
                                `${label}: $${value.toLocaleString()}`,
                                `Budget: $${budget.toLocaleString()}`,
                                `Usage: ${percentage}%`
                            ];
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

initHealthGauge() {
    const ctx = document.getElementById('healthGauge').getContext('2d');
    const healthScore = this.calculateHealthScore();
    
    this.charts.healthGauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [healthScore, 100 - healthScore],
                backgroundColor: [
                    this.getHealthColor(healthScore),
                    'rgba(241, 243, 244, 0.3)'
                ],
                borderWidth: 0,
                cutout: '85%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: true,
                duration: 2500
            }
        }
    });

    // Update health score display
    document.getElementById('healthScore').textContent = healthScore;
    document.querySelector('.gauge-label').textContent = this.getHealthLabel(healthScore);
    document.querySelector('.gauge-label').style.color = this.getHealthColor(healthScore);
}

generateDateRange(days) {
    const dates = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(date);
    }
    
    return dates;
}

generateFinancialData(days, type) {
    // Generate realistic financial data based on actual transactions
    const data = [];
    const baseAmount = type === 'income' ? 150 : 100;
    const variance = type === 'income' ? 50 : 30;
    
    days.forEach((day, index) => {
        // Weekend adjustment
        const isWeekend = day.getDay() === 0 || day.getDay() === 6;
        const weekendMultiplier = type === 'income' ? (isWeekend ? 0.3 : 1.2) : (isWeekend ? 1.3 : 1);
        
        // Random variation
        const randomFactor = (Math.random() - 0.5) * variance;
        const amount = (baseAmount + randomFactor) * weekendMultiplier;
        
        data.push(Math.max(0, amount));
    });
    
    return data;
}

formatDateLabel(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

calculateHealthScore() {
    let score = 0;
    let factors = 0;

    // Budget adherence (40% weight)
    const budgetCategories = this.data.budget.filter(b => b.hasBudget);
    if (budgetCategories.length > 0) {
        const withinBudget = budgetCategories.filter(b => b.spent <= b.budget).length;
        const budgetScore = (withinBudget / budgetCategories.length) * 40;
        score += budgetScore;
        factors++;
    }

    // Savings rate (30% weight)
    const kpis = this.calculateKPIs();
    if (kpis.totalIncome > 0) {
        const savingsRate = (kpis.netSavings / kpis.totalIncome) * 100;
        const savingsScore = Math.min(savingsRate, 30); // Cap at 30%
        score += savingsScore;
        factors++;
    }

    // Bill payment timeliness (30% weight)
    const totalBills = this.data.bills.length;
    if (totalBills > 0) {
        const paidBills = this.data.bills.filter(b => b.status === 'paid').length;
        const billScore = (paidBills / totalBills) * 30;
        score += billScore;
        factors++;
    }

    return Math.round(factors > 0 ? score : 75); // Default score if no data
}

getHealthColor(score) {
    if (score >= 80) return 'rgba(39, 174, 96, 1)';
    if (score >= 60) return 'rgba(243, 156, 18, 1)';
    return 'rgba(231, 76, 60, 1)';
}

getHealthLabel(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
}

loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    const activities = [];

    // Add transaction activities
    this.data.transactions.slice(0, 5).forEach(transaction => {
        activities.push({
            type: 'transaction',
            icon: 'transaction',
            title: transaction.description,
            description: `${transaction.type === 'income' ? 'Income' : 'Expense'} • ${this.formatDate(transaction.date)}`,
            time: this.getRelativeTime(transaction.timestamp),
            amount: `${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toLocaleString()}`,
            amountClass: transaction.type === 'income' ? 'positive' : 'negative'
        });
    });

    // Add bill activities
    this.data.bills.filter(b => b.status === 'paid').slice(0, 2).forEach(bill => {
        activities.push({
            type: 'bill',
            icon: 'bill',
            title: `Paid ${bill.name}`,
            description: `Bill Payment • ${this.formatDate(bill.dueDate)}`,
            time: this.getRelativeTime(Date.now() - Math.random() * 172800000), // Random within 2 days
            amount: `-$${bill.amount.toLocaleString()}`,
            amountClass: 'negative'
        });
    });

    // Add reminder activities
    this.data.reminders.filter(r => r.status === 'active').slice(0, 2).forEach(reminder => {
        activities.push({
            type: 'reminder',
            icon: 'reminder',
            title: reminder.title,
            description: `Reminder • Due ${this.formatDate(reminder.date)}`,
            time: this.getRelativeTime(Date.now() - Math.random() * 86400000), // Random within 1 day
            amount: '',
            amountClass: ''
        });
    });

    // Sort by most recent
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    activityList.innerHTML = activities.slice(0, 8).map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.icon}">
                <i class="fas ${this.getActivityIcon(activity.icon)}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-description">${activity.description}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
            ${activity.amount ? `
                <div class="activity-amount ${activity.amountClass}">
                    ${activity.amount}
                </div>
            ` : ''}
        </div>
    `).join('');
}

getActivityIcon(type) {
    const icons = {
        transaction: 'fa-exchange-alt',
        bill: 'fa-file-invoice-dollar',
        budget: 'fa-chart-pie',
        reminder: 'fa-bell'
    };
    return icons[type] || 'fa-circle';
}

loadBillsTimeline() {
    const billsTimeline = document.getElementById('billsTimeline');
    
    // Sort bills by due date
    const sortedBills = this.data.bills
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 6);

    billsTimeline.innerHTML = sortedBills.map(bill => `
        <div class="timeline-item">
            <div class="timeline-date">${this.formatDateShort(bill.dueDate)}</div>
            <div class="timeline-content">
                <div class="timeline-title">${bill.name}</div>
                <div class="timeline-amount">$${bill.amount.toLocaleString()}</div>
            </div>
            <span class="timeline-status ${bill.status}">${bill.status}</span>
        </div>
    `).join('');
}

loadCategoryBreakdown() {
    const categoryList = document.getElementById('categoryList');
    
    // Calculate spending by category
    const categorySpending = {};
    this.data.transactions
        .filter(t => t.type === 'expense')
        .forEach(transaction => {
            if (!categorySpending[transaction.category]) {
                categorySpending[transaction.category] = 0;
            }
            categorySpending[transaction.category] += transaction.amount;
        });

    // Sort by amount and get top 5
    const topCategories = Object.entries(categorySpending)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    const totalSpending = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);

    categoryList.innerHTML = topCategories.map(([category, amount]) => {
        const percentage = ((amount / totalSpending) * 100).toFixed(1);
        return `
            <div class="category-item">
                <div class="category-icon">
                    <i class="fas ${this.getCategoryIcon(category)}"></i>
                </div>
                <div class="category-info">
                    <div class="category-name">${this.formatCategoryName(category)}</div>
                    <div class="category-percentage">${percentage}% of total</div>
                </div>
                <div class="category-amount">$${amount.toLocaleString()}</div>
            </div>
        `;
    }).join('');
}

getCategoryIcon(category) {
    const icons = {
        food: 'fa-utensils',
        transport: 'fa-car',
        entertainment: 'fa-gamepad',
        healthcare: 'fa-heart',
        shopping: 'fa-shopping-cart',
        utilities: 'fa-home',
        education: 'fa-graduation-cap',
        salary: 'fa-briefcase',
        freelance: 'fa-laptop'
    };
    return icons[category] || 'fa-circle';
}

formatCategoryName(category) {
    const names = {
        food: 'Food & Dining',
        transport: 'Transportation',
        entertainment: 'Entertainment',
        healthcare: 'Healthcare',
        shopping: 'Shopping',
        utilities: 'Utilities',
        education: 'Education',
        salary: 'Salary',
        freelance: 'Freelance'
    };
    return names[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

generateSmartInsights() {
    this.insights = [];

    // Budget insights
    const overBudgetCategories = this.data.budget.filter(b => b.hasBudget && b.spent > b.budget);
    if (overBudgetCategories.length > 0) {
        this.insights.push({
            title: 'Budget Alert',
            description: `${overBudgetCategories.length} categories are over budget. Consider reviewing your ${overBudgetCategories[0].name} spending.`,
            type: 'warning',
            action: 'View Budget Details'
        });
    }

    // Savings insight
    const kpis = this.calculateKPIs();
    const savingsRate = (kpis.netSavings / kpis.totalIncome) * 100;
    if (savingsRate > 20) {
        this.insights.push({
            title: 'Great Savings Rate!',
            description: `You're saving ${savingsRate.toFixed(1)}% of your income. This puts you ahead of most people your age.`,
            type: 'success',
            action: 'Set Savings Goals'
        });
    } else if (savingsRate < 10) {
        this.insights.push({
            title: 'Improve Your Savings',
            description: `Your current savings rate is ${savingsRate.toFixed(1)}%. Consider setting up automatic transfers to boost your savings.`,
            type: 'warning',
            action: 'Create Savings Plan'
        });
    }

    // Bill insights
    const overdueBills = this.data.bills.filter(b => b.status === 'overdue');
    if (overdueBills.length > 0) {
        this.insights.push({
            title: 'Overdue Bills',
            description: `You have ${overdueBills.length} overdue bill${overdueBills.length > 1 ? 's' : ''}. Pay them soon to avoid late fees.`,
            type: 'urgent',
            action: 'Pay Bills Now'
        });
    }

    // Spending pattern insight
    const recentExpenses = this.data.transactions
        .filter(t => t.type === 'expense' && new Date(t.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .reduce((sum, t) => sum + t.amount, 0);
    
    const avgWeeklySpending = 350; // Baseline average
    if (recentExpenses > avgWeeklySpending * 1.2) {
        this.insights.push({
            title: 'High Spending Week',
            description: `You've spent $${recentExpenses.toLocaleString()} this week, which is above your usual pattern. Review your recent transactions.`,
            type: 'info',
            action: 'Review Transactions'
        });
    }

    // Show insights if any
    if (this.insights.length > 0) {
        setTimeout(() => this.showFloatingInsights(), 3000);
    }
}

showFloatingInsights() {
    const floatingInsights = document.getElementById('floatingInsights');
    const insightsContent = document.getElementById('insightsContent');
    
    insightsContent.innerHTML = this.insights.map(insight => `
        <div class="insight-card">
            <div class="insight-title">
                <i class="fas ${this.getInsightIcon(insight.type)}"></i>
                ${insight.title}
            </div>
            <div class="insight-description">${insight.description}</div>
            ${insight.action ? `
                <button class="btn btn-primary" style="margin-top: 10px; padding: 8px 16px; font-size: 0.8rem;">
                    ${insight.action}
                </button>
            ` : ''}
        </div>
    `).join('');

    floatingInsights.classList.add('show');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        floatingInsights.classList.remove('show');
    }, 10000);
}

getInsightIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        urgent: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-lightbulb';
}

formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

formatDateShort(dateString) {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

switchChart(type) {
    // Update active button
    document.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Switch chart data based on type
    if (type === 'comparison') {
        this.updateMainChartToComparison();
    } else if (type === 'trend') {
        this.updateMainChartToTrend();
    } else {
        this.updateMainChartToFlow();
    }
}

updateMainChartToComparison() {
    const chart = this.charts.mainChart;
    const currentMonth = this.generateFinancialData(this.generateDateRange(30), 'expense');
    const lastMonth = this.generateFinancialData(this.generateDateRange(30), 'expense').map(v => v * 0.9);

    chart.data.datasets = [
        {
            label: 'This Month',
            data: currentMonth,
            borderColor: 'rgba(52, 152, 219, 1)',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3
        },
        {
            label: 'Last Month',
            data: lastMonth,
            borderColor: 'rgba(155, 89, 182, 1)',
            backgroundColor: 'rgba(155, 89, 182, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3
        }
    ];
    chart.update();
}

updateMainChartToTrend() {
    const chart = this.charts.mainChart;
    const days = this.generateDateRange(30);
    const trendData = days.map((day, index) => {
        const base = 100;
        const trend = index * 2; // Upward trend
        const noise = (Math.random() - 0.5) * 20;
        return base + trend + noise;
    });

    chart.data.datasets = [
        {
            label: 'Financial Trend',
            data: trendData,
            borderColor: 'rgba(39, 174, 96, 1)',
            backgroundColor: 'rgba(39, 174, 96, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3
        }
    ];
    chart.update();
}

updateMainChartToFlow() {
    // Reset to original flow chart
    this.initMainChart();
}

updateTimeRange() {
    this.timeRange = document.getElementById('timeRange').value;
    this.showToast('Updating data for selected time range...');
    
    // Simulate data update
    setTimeout(() => {
        this.calculateKPIs();
        this.initializeCharts();
        this.loadRecentActivity();
        this.showToast('Dashboard updated successfully!');
    }, 1000);
}

refreshDashboard() {
    this.showToast('Refreshing dashboard data...');
    
    // Simulate data refresh
    setTimeout(() => {
        this.updateCurrentTime();
        this.calculateKPIs();
        this.initializeCharts();
        this.loadRecentActivity();
        this.loadBillsTimeline();
        this.loadCategoryBreakdown();
        this.generateSmartInsights();
        this.showToast('Dashboard refreshed successfully!');
    }, 1500);
}

exportAnalytics() {
    const analyticsData = {
        summary: this.calculateKPIs(),
        budget: this.data.budget,
        transactions: this.data.transactions,
        bills: this.data.bills,
        reminders: this.data.reminders,
        healthScore: this.calculateHealthScore(),
        exportDate: new Date().toISOString(),
        user: this.currentUser,
        timeRange: this.timeRange
    };

    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `financial-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    this.showToast('Analytics data exported successfully!');
}

showToast(message) {
    const toast = document.getElementById('notificationToast');
    const messageEl = document.getElementById('toastMessage');
    
    messageEl.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

closeToast() {
    document.getElementById('notificationToast').classList.remove('show');
}

closeInsights() {
    document.getElementById('floatingInsights').classList.remove('show');
}

setupEventListeners() {
    // Real-time clock update
    setInterval(() => this.updateCurrentTime(), 60000);
    
    // Close modals on outside click
    window.onclick = (event) => {
        const insights = document.getElementById('floatingInsights');
        if (event.target === insights) {
            insights.classList.remove('show');
        }
    };
}

startRealTimeUpdates() {
    // Simulate real-time updates every 5 minutes
    setInterval(() => {
        // Update only if user is active (page visible)
        if (!document.hidden) {
            this.updateCurrentTime();
            // Occasionally show new insights
            if (Math.random() < 0.3) {
                this.generateSmartInsights();
            }
        }
    }, 300000); // 5 minutes
}

// Quick action methods
addTransaction() {
    this.showToast('Redirecting to Transaction Management...');
    setTimeout(() => {
        // Simulate navigation
        window.location.href = 'transaction-management.html';
    }, 1000);
}

payBill() {
    this.showToast('Redirecting to Bill Management...');
    setTimeout(() => {
        window.location.href = 'bill-management.html';
    }, 1000);
}

setBudget() {
    this.showToast('Redirecting to Budget Management...');
    setTimeout(() => {
        window.location.href = 'budget-management.html';
    }, 1000);
}

createReminder() {
    this.showToast('Redirecting to Reminder Management...');
    setTimeout(() => {
        window.location.href = 'reminder-management.html';
    }, 1000);
}

generateReport() {
    this.showToast('Generating comprehensive financial report...');
    setTimeout(() => {
        this.exportAnalytics();
    }, 2000);
}

viewGoals() {
    this.showToast('Financial goals feature coming soon!');
}

// View detail methods
viewBudgetDetails() {
    this.showToast('Opening detailed budget analysis...');
    setTimeout(() => {
        window.location.href = 'budget-management.html';
    }, 1000);
}

viewAllActivity() {
    this.showToast('Loading complete activity history...');
}

viewBillDetails() {
    this.showToast('Opening bill management...');
    setTimeout(() => {
        window.location.href = 'bill-management.html';
    }, 1000);
}

viewCategoryDetails() {
    this.showToast('Opening category breakdown analysis...');
}

viewHealthDetails() {
    this.showFloatingInsights();
}
}

// Global functions for HTML onclick handlers
let analyticsDashboard;

function refreshDashboard() {
analyticsDashboard.refreshDashboard();
}

function exportAnalytics() {
analyticsDashboard.exportAnalytics();
}

function updateTimeRange() {
analyticsDashboard.updateTimeRange();
}

function switchChart(type) {
analyticsDashboard.switchChart(type);
}

function viewBudgetDetails() {
analyticsDashboard.viewBudgetDetails();
}

function viewAllActivity() {
analyticsDashboard.viewAllActivity();
}

function viewBillDetails() {
analyticsDashboard.viewBillDetails();
}

function viewCategoryDetails() {
analyticsDashboard.viewCategoryDetails();
}

function viewHealthDetails() {
analyticsDashboard.viewHealthDetails();
}

function addTransaction() {
analyticsDashboard.addTransaction();
}

function payBill() {
analyticsDashboard.payBill();
}

function setBudget() {
analyticsDashboard.setBudget();
}

function createReminder() {
analyticsDashboard.createReminder();
}

function generateReport() {
analyticsDashboard.generateReport();
}

function viewGoals() {
analyticsDashboard.viewGoals();
}

function closeToast() {
analyticsDashboard.closeToast();
}

function closeInsights() {
analyticsDashboard.closeInsights();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
analyticsDashboard = new AnalyticsDashboard();
});
