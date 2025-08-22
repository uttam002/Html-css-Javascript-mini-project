// Settings Management System
class SettingsManager {
    constructor() {
        this.currentUser = 'uttam002';
        this.currentDateTime = '2025-08-18 10:41:57';
        this.settings = this.loadSettings();
        this.currentAction = null;
        this.init();
    }

    init() {
        this.updateCurrentTime();
        this.loadUserSettings();
        this.setupEventListeners();
        this.initializeFormValidation();
        this.checkPasswordStrength();
        this.setup2FAToggle();
    }

    loadSettings() {
        const defaultSettings = {
            profile: {
                firstName: 'Uttam',
                lastName: 'Singh',
                email: 'uttam002@example.com',
                phone: '+1 (555) 123-4567',
                dateOfBirth: '1990-05-15',
                occupation: 'Software Developer',
                address: '123 Main Street, Apt 4B',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'US'
            },
            security: {
                twoFactorEnabled: false,
                authMethod: 'app'
            },
            preferences: {
                theme: 'auto',
                accentColor: '#667eea',
                timezone: 'UTC',
                currency: 'USD',
                dateFormat: 'MM/DD/YYYY',
                numberFormat: '1,234.56',
                language: 'en',
                weekStart: 'sunday',
                showWelcome: true,
                autoRefresh: true,
                smartInsights: true,
                soundEffects: false,
                animations: true,
                defaultView: 'analytics'
            },
            notifications: {
                email: {
                    billReminders: true,
                    budgetAlerts: true,
                    weeklySummary: true,
                    securityAlerts: true,
                    productUpdates: false
                },
                push: {
                    enabled: true,
                    billAlerts: true,
                    transactionAlerts: true,
                    goalAlerts: true,
                    quietStart: '22:00',
                    quietEnd: '08:00'
                },
                sms: {
                    enabled: false,
                    criticalBills: false,
                    securityAlerts: false,
                    phone: '+1 (555) 123-4567'
                }
            },
            privacy: {
                analyticsTracking: true,
                personalizedRecommendations: true,
                thirdPartyIntegrations: false,
                automaticBackups: true,
                dataRetention: '5years'
            },
            integrations: {
                banks: [
                    { id: 'chase', name: 'Chase Bank', type: 'Checking Account', number: '1234', connected: true },
                    { id: 'amex', name: 'American Express', type: 'Credit Card', number: '5678', connected: true }
                ],
                services: {
                    googleCalendar: false,
                    dropboxBackup: false,
                    slackNotifications: false,
                    excelExport: true
                },
                apiKeys: [
                    { id: 1, name: 'Personal API Key', created: '2025-08-10', key: 'pk_live_••••••••••••••••••••••••••••••••' }
                ]
            }
        };

        const saved = localStorage.getItem('userSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    saveSettings() {
        localStorage.setItem('userSettings', JSON.stringify(this.settings));
        this.showToast('Settings saved successfully!');
    }

    loadUserSettings() {
        // Load profile settings
        document.getElementById('firstName').value = this.settings.profile.firstName;
        document.getElementById('lastName').value = this.settings.profile.lastName;
        document.getElementById('email').value = this.settings.profile.email;
        document.getElementById('phone').value = this.settings.profile.phone;
        document.getElementById('dateOfBirth').value = this.settings.profile.dateOfBirth;
        document.getElementById('occupation').value = this.settings.profile.occupation;
        document.getElementById('address').value = this.settings.profile.address;
        document.getElementById('city').value = this.settings.profile.city;
        document.getElementById('state').value = this.settings.profile.state;
        document.getElementById('zipCode').value = this.settings.profile.zipCode;
        document.getElementById('country').value = this.settings.profile.country;

        // Load security settings
        document.getElementById('enable2FA').checked = this.settings.security.twoFactorEnabled;
        this.toggle2FAOptions();

        // Load preferences
        document.querySelector(`input[name="theme"][value="${this.settings.preferences.theme}"]`).checked = true;
        document.getElementById('timezone').value = this.settings.preferences.timezone;
        document.getElementById('currency').value = this.settings.preferences.currency;
        document.getElementById('dateFormat').value = this.settings.preferences.dateFormat;
        document.getElementById('numberFormat').value = this.settings.preferences.numberFormat;
        document.getElementById('language').value = this.settings.preferences.language;
        document.getElementById('weekStart').value = this.settings.preferences.weekStart;
        document.getElementById('showWelcome').checked = this.settings.preferences.showWelcome;
        document.getElementById('autoRefresh').checked = this.settings.preferences.autoRefresh;
        document.getElementById('smartInsights').checked = this.settings.preferences.smartInsights;
        document.getElementById('soundEffects').checked = this.settings.preferences.soundEffects;
        document.getElementById('animations').checked = this.settings.preferences.animations;
        document.getElementById('defaultView').value = this.settings.preferences.defaultView;

        // Load notification settings
        document.getElementById('emailBillReminders').checked = this.settings.notifications.email.billReminders;
        document.getElementById('emailBudgetAlerts').checked = this.settings.notifications.email.budgetAlerts;
        document.getElementById('emailWeeklySummary').checked = this.settings.notifications.email.weeklySummary;
        document.getElementById('emailSecurityAlerts').checked = this.settings.notifications.email.securityAlerts;
        document.getElementById('emailProductUpdates').checked = this.settings.notifications.email.productUpdates;

        document.getElementById('enablePushNotifications').checked = this.settings.notifications.push.enabled;
        document.getElementById('pushBillAlerts').checked = this.settings.notifications.push.billAlerts;
        document.getElementById('pushTransactionAlerts').checked = this.settings.notifications.push.transactionAlerts;
        document.getElementById('pushGoalAlerts').checked = this.settings.notifications.push.goalAlerts;
        document.getElementById('quietStart').value = this.settings.notifications.push.quietStart;
        document.getElementById('quietEnd').value = this.settings.notifications.push.quietEnd;

        document.getElementById('enableSMSNotifications').checked = this.settings.notifications.sms.enabled;
        document.getElementById('smsCriticalBills').checked = this.settings.notifications.sms.criticalBills;
        document.getElementById('smsSecurityAlerts').checked = this.settings.notifications.sms.securityAlerts;
        document.getElementById('smsPhone').value = this.settings.notifications.sms.phone;

        // Load privacy settings
        document.getElementById('analyticsTracking').checked = this.settings.privacy.analyticsTracking;
        document.getElementById('personalizedRecommendations').checked = this.settings.privacy.personalizedRecommendations;
        document.getElementById('thirdPartyIntegrations').checked = this.settings.privacy.thirdPartyIntegrations;
        document.getElementById('automaticBackups').checked = this.settings.privacy.automaticBackups;
        document.getElementById('dataRetention').value = this.settings.privacy.dataRetention;

        // Load integration settings
        document.getElementById('googleCalendar').checked = this.settings.integrations.services.googleCalendar;
        document.getElementById('dropboxBackup').checked = this.settings.integrations.services.dropboxBackup;
        document.getElementById('slackNotifications').checked = this.settings.integrations.services.slackNotifications;
        document.getElementById('excelExport').checked = this.settings.integrations.services.excelExport;

        // Set active accent color
        this.setActiveAccentColor(this.settings.preferences.accentColor);
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
            `${now.toLocaleDateString('en-US', options)} UTC`;
    }

    setupEventListeners() {
        // Profile image upload
        document.getElementById('profileImageInput').addEventListener('change', (e) => {
            this.handleProfileImageUpload(e);
        });

        // Password strength checking
        document.getElementById('newPassword').addEventListener('input', () => {
            this.checkPasswordStrength();
        });

        // 2FA toggle
        document.getElementById('enable2FA').addEventListener('change', () => {
            this.toggle2FAOptions();
        });

        // Accent color selection
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectAccentColor(e.target.dataset.color);
            });
        });

        // Auto-save on form changes
        document.addEventListener('change', (e) => {
            if (e.target.closest('.settings-content')) {
                this.autoSaveSettings();
            }
        });

        // Real-time clock update
        setInterval(() => this.updateCurrentTime(), 60000);
    }

    initializeFormValidation() {
        // Email validation
        document.getElementById('email').addEventListener('blur', (e) => {
            this.validateEmail(e.target);
        });

        // Phone validation
        document.getElementById('phone').addEventListener('blur', (e) => {
            this.validatePhone(e.target);
        });

        // Password confirmation
        document.getElementById('confirmPassword').addEventListener('input', () => {
            this.validatePasswordConfirmation();
        });
    }

    handleProfileImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profileImage').src = e.target.result;
                    this.showToast('Profile picture updated successfully!');
                };
                reader.readAsDataURL(file);
            } else {
                this.showToast('Please select a valid image file.', 'error');
            }
        }
    }

    removeProfilePicture() {
        document.getElementById('profileImage').src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect width='120' height='120' fill='%23667eea'/><text x='60' y='70' font-family='Arial, sans-serif' font-size='40' fill='white' text-anchor='middle'>U</text></svg>";
        this.showToast('Profile picture removed.');
    }

    togglePassword(fieldId) {
        const field = document.getElementById(fieldId);
        const button = field.nextElementSibling;
        const icon = button.querySelector('i');
        
        if (field.type === 'password') {
            field.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            field.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    checkPasswordStrength() {
        const password = document.getElementById('newPassword').value;
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        strengthBar.style.width = `${strength}%`;
        
        if (strength < 30) {
            feedback = 'Weak password';
            strengthBar.style.background = '#e74c3c';
        } else if (strength < 60) {
            feedback = 'Fair password';
            strengthBar.style.background = '#f39c12';
        } else if (strength < 80) {
            feedback = 'Good password';
            strengthBar.style.background = '#27ae60';
        } else {
            feedback = 'Strong password';
            strengthBar.style.background = '#27ae60';
        }
        
        strengthText.textContent = feedback;
    }

    validatePasswordConfirmation() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const confirmField = document.getElementById('confirmPassword');
        
        if (confirmPassword && newPassword !== confirmPassword) {
            confirmField.style.borderColor = '#e74c3c';
            this.showToast('Passwords do not match.', 'error');
        } else {
            confirmField.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        }
    }

    validateEmail(field) {
        const email = field.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            field.style.borderColor = '#e74c3c';
            this.showToast('Please enter a valid email address.', 'error');
        } else {
            field.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        }
    }

    validatePhone(field) {
        const phone = field.value;
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        
        if (phone && !phoneRegex.test(phone)) {
            field.style.borderColor = '#e74c3c';
            this.showToast('Please enter a valid phone number.', 'error');
        } else {
            field.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        }
    }

    toggle2FAOptions() {
        const enabled = document.getElementById('enable2FA').checked;
        const optionsDiv = document.getElementById('twoFactorOptions');
        
        if (enabled) {
            optionsDiv.style.display = 'block';
        } else {
            optionsDiv.style.display = 'none';
        }
    }

    setup2FA() {
        const authMethod = document.querySelector('input[name="authMethod"]:checked').value;
        
        if (authMethod === 'app') {
            this.showConfirmation(
                'Setup Authenticator App',
                'This will generate a QR code for you to scan with your authenticator app. Continue?',
                () => {
                    this.showToast('2FA setup initiated. Please scan the QR code with your authenticator app.');
                    // In a real app, this would show a QR code modal
                }
            );
        } else {
            this.showConfirmation(
                'Setup SMS Authentication',
                'A verification code will be sent to your phone number. Continue?',
                () => {
                    this.showToast('Verification code sent to your phone.');
                    // In a real app, this would send an SMS
                }
            );
        }
    }

    changePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            this.showToast('Please fill in all password fields.', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            this.showToast('New passwords do not match.', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            this.showToast('Password must be at least 8 characters long.', 'error');
            return;
        }
        
        this.showConfirmation(
            'Change Password',
            'Are you sure you want to change your password? You will need to log in again.',
            () => {
                // Clear password fields
                document.getElementById('currentPassword').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                this.showToast('Password changed successfully!');
            }
        );
    }

    terminateSession(sessionId) {
        this.showConfirmation(
            'Terminate Session',
            'Are you sure you want to terminate this session?',
            () => {
                this.showToast('Session terminated successfully.');
                // In a real app, this would make an API call
            }
        );
    }

    terminateAllSessions() {
        this.showConfirmation(
            'Terminate All Sessions',
            'This will log you out of all other devices. Continue?',
            () => {
                this.showToast('All other sessions terminated successfully.');
            }
        );
    }

    selectAccentColor(color) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-color="${color}"]`).classList.add('active');
        
        this.settings.preferences.accentColor = color;
        this.applyAccentColor(color);
        this.autoSaveSettings();
    }

    setActiveAccentColor(color) {
        document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
        const colorBtn = document.querySelector(`[data-color="${color}"]`);
        if (colorBtn) {
            colorBtn.classList.add('active');
        }
        this.applyAccentColor(color);
    }

    applyAccentColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        // Update various elements with the new accent color
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --accent-primary: ${color};
                --accent-secondary: ${color}dd;
            }
        `;
        document.head.appendChild(style);
    }

    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to selected tab and content
        const selectedTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedTabContent = document.getElementById(tabName);
        
        if (selectedTabBtn) {
            selectedTabBtn.classList.add('active');
        }
        
        if (selectedTabContent) {
            selectedTabContent.classList.add('active');
        }
        
        // Scroll to top of settings content
        const settingsContent = document.querySelector('.settings-content');
        if (settingsContent) {
            settingsContent.scrollTop = 0;
        }
    }

    autoSaveSettings() {
        // Debounce auto-save to avoid excessive saves
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.collectSettingsData();
            this.saveSettings();
        }, 1000);
    }

    collectSettingsData() {
        // Collect all form data and update settings object
        this.settings.profile = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            occupation: document.getElementById('occupation').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            country: document.getElementById('country').value
        };

        this.settings.security = {
            twoFactorEnabled: document.getElementById('enable2FA').checked,
            authMethod: document.querySelector('input[name="authMethod"]:checked')?.value || 'app'
        };

        this.settings.preferences = {
            theme: document.querySelector('input[name="theme"]:checked')?.value || 'auto',
            accentColor: this.settings.preferences.accentColor,
            timezone: document.getElementById('timezone').value,
            currency: document.getElementById('currency').value,
            dateFormat: document.getElementById('dateFormat').value,
            numberFormat: document.getElementById('numberFormat').value,
            language: document.getElementById('language').value,
            weekStart: document.getElementById('weekStart').value,
            showWelcome: document.getElementById('showWelcome').checked,
            autoRefresh: document.getElementById('autoRefresh').checked,
            smartInsights: document.getElementById('smartInsights').checked,
            soundEffects: document.getElementById('soundEffects').checked,
            animations: document.getElementById('animations').checked,
            defaultView: document.getElementById('defaultView').value
        };

        this.settings.notifications = {
            email: {
                billReminders: document.getElementById('emailBillReminders').checked,
                budgetAlerts: document.getElementById('emailBudgetAlerts').checked,
                weeklySummary: document.getElementById('emailWeeklySummary').checked,
                securityAlerts: document.getElementById('emailSecurityAlerts').checked,
                productUpdates: document.getElementById('emailProductUpdates').checked
            },
            push: {
                enabled: document.getElementById('enablePushNotifications').checked,
                billAlerts: document.getElementById('pushBillAlerts').checked,
                transactionAlerts: document.getElementById('pushTransactionAlerts').checked,
                goalAlerts: document.getElementById('pushGoalAlerts').checked,
                quietStart: document.getElementById('quietStart').value,
                quietEnd: document.getElementById('quietEnd').value
            },
            sms: {
                enabled: document.getElementById('enableSMSNotifications').checked,
                criticalBills: document.getElementById('smsCriticalBills').checked,
                securityAlerts: document.getElementById('smsSecurityAlerts').checked,
                phone: document.getElementById('smsPhone').value
            }
        };

        this.settings.privacy = {
            analyticsTracking: document.getElementById('analyticsTracking').checked,
            personalizedRecommendations: document.getElementById('personalizedRecommendations').checked,
            thirdPartyIntegrations: document.getElementById('thirdPartyIntegrations').checked,
            automaticBackups: document.getElementById('automaticBackups').checked,
            dataRetention: document.getElementById('dataRetention').value
        };

        this.settings.integrations.services = {
            googleCalendar: document.getElementById('googleCalendar').checked,
            dropboxBackup: document.getElementById('dropboxBackup').checked,
            slackNotifications: document.getElementById('slackNotifications').checked,
            excelExport: document.getElementById('excelExport').checked
        };
    }

    saveAllSettings() {
        this.collectSettingsData();
        this.saveSettings();
        this.showToast('All settings saved successfully!');
    }

    resetSettings() {
        this.showConfirmation(
            'Reset Settings',
            'This will reset all settings to their default values. This action cannot be undone. Are you sure?',
            () => {
                // Reset to default settings
                this.settings = this.loadDefaultSettings();
                this.loadUserSettings();
                this.saveSettings();
                this.showToast('Settings reset to default values.');
            }
        );
    }

    loadDefaultSettings() {
        return {
            profile: {
                firstName: 'Uttam',
                lastName: 'Singh',
                email: 'uttam002@example.com',
                phone: '+1 (555) 123-4567',
                dateOfBirth: '1990-05-15',
                occupation: 'Software Developer',
                address: '123 Main Street, Apt 4B',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'US'
            },
            security: {
                twoFactorEnabled: false,
                authMethod: 'app'
            },
            preferences: {
                theme: 'auto',
                accentColor: '#667eea',
                timezone: 'UTC',
                currency: 'USD',
                dateFormat: 'MM/DD/YYYY',
                numberFormat: '1,234.56',
                language: 'en',
                weekStart: 'sunday',
                showWelcome: true,
                autoRefresh: true,
                smartInsights: true,
                soundEffects: false,
                animations: true,
                defaultView: 'analytics'
            },
            notifications: {
                email: {
                    billReminders: true,
                    budgetAlerts: true,
                    weeklySummary: true,
                    securityAlerts: true,
                    productUpdates: false
                },
                push: {
                    enabled: true,
                    billAlerts: true,
                    transactionAlerts: true,
                    goalAlerts: true,
                    quietStart: '22:00',
                    quietEnd: '08:00'
                },
                sms: {
                    enabled: false,
                    criticalBills: false,
                    securityAlerts: false,
                    phone: '+1 (555) 123-4567'
                }
            },
            privacy: {
                analyticsTracking: true,
                personalizedRecommendations: true,
                thirdPartyIntegrations: false,
                automaticBackups: true,
                dataRetention: '5years'
            },
            integrations: {
                banks: [
                    { id: 'chase', name: 'Chase Bank', type: 'Checking Account', number: '1234', connected: true },
                    { id: 'amex', name: 'American Express', type: 'Credit Card', number: '5678', connected: true }
                ],
                services: {
                    googleCalendar: false,
                    dropboxBackup: false,
                    slackNotifications: false,
                    excelExport: true
                },
                apiKeys: [
                    { id: 1, name: 'Personal API Key', created: '2025-08-10', key: 'pk_live_••••••••••••••••••••••••••••••••' }
                ]
            }
        };
    }

    exportSettings() {
        const settingsData = {
            settings: this.settings,
            exportDate: new Date().toISOString(),
            user: this.currentUser,
            version: '1.0.0'
        };

        const dataStr = JSON.stringify(settingsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.showToast('Settings exported successfully!');
    }

    exportAllData() {
        this.showConfirmation(
            'Export All Data',
            'This will export all your financial data including transactions, bills, budgets, and settings. Continue?',
            () => {
                const allData = {
                    settings: this.settings,
                    transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
                    bills: JSON.parse(localStorage.getItem('bills') || '[]'),
                    budgetCategories: JSON.parse(localStorage.getItem('budgetCategories') || '[]'),
                    reminders: JSON.parse(localStorage.getItem('reminders') || '[]'),
                    exportDate: new Date().toISOString(),
                    user: this.currentUser,
                    version: '1.0.0'
                };

                const dataStr = JSON.stringify(allData, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                
                const link = document.createElement('a');
                link.href = URL.createObjectURL(dataBlob);
                link.download = `complete-backup-${new Date().toISOString().split('T')[0]}.json`;
                link.click();

                this.showToast('Complete data export completed!');
            }
        );
    }

    deactivateAccount() {
        this.showConfirmation(
            'Deactivate Account',
            'Your account will be temporarily disabled. You can reactivate it by logging in again. Continue?',
            () => {
                this.showToast('Account deactivated. You will be logged out shortly.');
                setTimeout(() => {
                    // In a real app, this would redirect to login
                    this.showToast('Redirecting to login page...');
                }, 2000);
            }
        );
    }

    deleteAccount() {
        this.showConfirmation(
            'Delete Account',
            'This will permanently delete your account and ALL associated data. This action CANNOT be undone. Are you absolutely sure?',
            () => {
                // Show second confirmation for critical action
                this.showConfirmation(
                    'Final Confirmation',
                    'This is your last chance to cancel. Type "DELETE" to confirm permanent account deletion.',
                    () => {
                        // Clear all local storage
                        localStorage.clear();
                        this.showToast('Account deletion initiated. You will be redirected shortly.');
                        setTimeout(() => {
                            // In a real app, this would redirect to a goodbye page
                            this.showToast('Account deleted successfully.');
                        }, 3000);
                    }
                );
            }
        );
    }

    // Bank and Integration Management
    addBankAccount() {
        this.showToast('Redirecting to secure bank connection portal...');
        setTimeout(() => {
            this.showToast('Bank connection feature will be available soon!');
        }, 1500);
    }

    disconnectBank(bankId) {
        const bankName = bankId === 'chase' ? 'Chase Bank' : 'American Express';
        this.showConfirmation(
            'Disconnect Bank',
            `Are you sure you want to disconnect ${bankName}? This will stop automatic transaction syncing.`,
            () => {
                // Update the integration settings
                const bankIndex = this.settings.integrations.banks.findIndex(b => b.id === bankId);
                if (bankIndex !== -1) {
                    this.settings.integrations.banks[bankIndex].connected = false;
                }
                this.saveSettings();
                this.showToast(`${bankName} disconnected successfully.`);
                
                // In a real app, this would reload the bank connections section
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        );
    }

    // API Key Management
    createApiKey() {
        this.showConfirmation(
            'Create API Key',
            'This will generate a new API key for accessing your data programmatically. Continue?',
            () => {
                const newKey = {
                    id: Date.now(),
                    name: 'Personal API Key',
                    created: new Date().toISOString().split('T')[0],
                    key: 'pk_live_' + Math.random().toString(36).substring(2, 34)
                };
                
                this.settings.integrations.apiKeys.push(newKey);
                this.saveSettings();
                this.showToast('New API key created successfully!');
                
                // In a real app, this would update the API keys display
            }
        );
    }

    regenerateApiKey() {
        this.showConfirmation(
            'Regenerate API Key',
            'This will invalidate the current API key and create a new one. Any applications using the old key will stop working. Continue?',
            () => {
                this.showToast('API key regenerated successfully!');
                // In a real app, this would make an API call to regenerate the key
            }
        );
    }

    revokeApiKey() {
        this.showConfirmation(
            'Revoke API Key',
            'This will permanently revoke the API key. Any applications using this key will stop working. Continue?',
            () => {
                this.settings.integrations.apiKeys = [];
                this.saveSettings();
                this.showToast('API key revoked successfully.');
            }
        );
    }

    viewApiDocs() {
        this.showToast('Opening API documentation...');
        // In a real app, this would open the API documentation
        window.open('https://docs.financeapp.com/api', '_blank');
    }

    // Modal and UI Management
    showConfirmation(title, message, onConfirm) {
        const modal = document.getElementById('confirmationModal');
        const titleEl = document.getElementById('confirmationTitle');
        const messageEl = document.getElementById('confirmationMessage');
        const confirmBtn = document.getElementById('confirmationButton');
        
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        this.currentAction = onConfirm;
        modal.style.display = 'block';
        
        // Set button color based on action type
        if (title.includes('Delete') || title.includes('Revoke')) {
            confirmBtn.className = 'btn btn-danger';
        } else if (title.includes('Reset') || title.includes('Deactivate')) {
            confirmBtn.className = 'btn btn-warning';
        } else {
            confirmBtn.className = 'btn btn-primary';
        }
    }

    confirmAction() {
        if (this.currentAction) {
            this.currentAction();
            this.currentAction = null;
        }
        this.closeConfirmationModal();
    }

    closeConfirmationModal() {
        document.getElementById('confirmationModal').style.display = 'none';
        this.currentAction = null;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toastNotification');
        const messageEl = document.getElementById('toastMessage');
        const iconEl = toast.querySelector('.toast-icon i');
        
        messageEl.textContent = message;
        
        // Update icon and color based on type
        if (type === 'error') {
            iconEl.className = 'fas fa-exclamation-circle';
            toast.querySelector('.toast-icon').style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        } else if (type === 'warning') {
            iconEl.className = 'fas fa-exclamation-triangle';
            toast.querySelector('.toast-icon').style.background = 'linear-gradient(135deg, #f39c12, #e67e22)';
        } else {
            iconEl.className = 'fas fa-check-circle';
            toast.querySelector('.toast-icon').style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    closeToast() {
        document.getElementById('toastNotification').classList.remove('show');
    }
}

// Global functions for HTML onclick handlers
let settingsManager;

function switchTab(tabName) {
    if (settingsManager) {
        settingsManager.switchTab(tabName);
    }
}

function saveAllSettings() {
    settingsManager.saveAllSettings();
}

function resetSettings() {
    settingsManager.resetSettings();
}

function exportSettings() {
    settingsManager.exportSettings();
}

function removeProfilePicture() {
    settingsManager.removeProfilePicture();
}

function togglePassword(fieldId) {
    settingsManager.togglePassword(fieldId);
}

function changePassword() {
    settingsManager.changePassword();
}

function setup2FA() {
    settingsManager.setup2FA();
}

function terminateSession(sessionId) {
    settingsManager.terminateSession(sessionId);
}

function terminateAllSessions() {
    settingsManager.terminateAllSessions();
}

function exportAllData() {
    settingsManager.exportAllData();
}

function deactivateAccount() {
    settingsManager.deactivateAccount();
}

function deleteAccount() {
    settingsManager.deleteAccount();
}

function addBankAccount() {
    settingsManager.addBankAccount();
}

function disconnectBank(bankId) {
    settingsManager.disconnectBank(bankId);
}

function createApiKey() {
    settingsManager.createApiKey();
}

function regenerateApiKey() {
    settingsManager.regenerateApiKey();
}

function revokeApiKey() {
    settingsManager.revokeApiKey();
}

function viewApiDocs() {
    settingsManager.viewApiDocs();
}

function closeConfirmationModal() {
    settingsManager.closeConfirmationModal();
}

function confirmAction() {
    settingsManager.confirmAction();
}

function closeToast() {
    settingsManager.closeToast();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    settingsManager = new SettingsManager();
});