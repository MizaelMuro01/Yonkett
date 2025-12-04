// project.js - ES Module for shared functionality across all pages

// ===== FAQ FUNCTIONALITY =====
const faqData = [
    {
        question: "How does the platform work?",
        answer: "Yonkett is like a custom hub made just for your specific car model. It's not just about storing your car info—it connects you with other owners who have the exact same ride. Share tips, get advice, and find parts that actually fit your model from people who get it."
    },
    {
        question: "Why there is not a marketplace?",
        answer: "We're still putting the final touches on our marketplace to make sure it's reliable and truly useful. Right now, we're counting on our community to help us shape it into something everyone will love. Your input really makes a difference!"
    },
    {
        question: "Can I have two or more car's profile?",
        answer: "Yes! Managing more than one car is a premium feature. Upgrade your account, and you'll be able to keep track of all your vehicles in one spot—each with its own maintenance history and model-specific community. Check out the app to see all the cool perks that come with premium."
    },
    {
        question: "When can I have the complete app?",
        answer: "We're working hard to roll out the full experience soon. We don't have an exact date just yet, but follow us on social media—we post updates, sneak peeks, and news there all the time. We're building this thing together!"
    }
];

// Create FAQ items
export function createFAQ() {
    const faqContainer = document.querySelector('.faq-container');
    
    if (faqContainer) {
        // Clear existing content
        faqContainer.innerHTML = '';
        
        faqData.forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            faqItem.innerHTML = `
                <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                    ${item.question}
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer" id="faq-answer-${index}" role="region" aria-hidden="true">
                    <p>${item.answer}</p>
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
        });
    }
}

// Toggle FAQ answers
export function setupFAQToggle() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('faq-question') || 
            e.target.parentElement.classList.contains('faq-question')) {
            
            const questionBtn = e.target.classList.contains('faq-question') ? 
                              e.target : e.target.parentElement;
            const faqItem = questionBtn.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = questionBtn.querySelector('.faq-icon');
            
            // Check if answer is already open
            const isOpen = answer.classList.contains('open');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherAnswer.parentElement.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    otherAnswer.parentElement.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle current FAQ
            if (!isOpen) {
                answer.classList.add('open');
                answer.setAttribute('aria-hidden', 'false');
                questionBtn.setAttribute('aria-expanded', 'true');
                icon.textContent = '−';
            } else {
                answer.classList.remove('open');
                answer.setAttribute('aria-hidden', 'true');
                questionBtn.setAttribute('aria-expanded', 'false');
                icon.textContent = '+';
            }
        }
    });
}

// ===== DATE FUNCTIONS =====
export function updateDates() {
    // Update update-date elements
    const updateDateElements = document.querySelectorAll('#update-date');
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    updateDateElements.forEach(element => {
        element.textContent = currentDate;
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Update page load time if element exists
    const pageLoadTimeElement = document.getElementById('page-load-time');
    if (pageLoadTimeElement) {
        const now = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        pageLoadTimeElement.textContent = now;
    }
}

// ===== HAMBURGER MENU FUNCTIONALITY =====
export function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (!hamburger || !nav) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Update aria-expanded attribute
        const isExpanded = nav.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        
        // Toggle body scroll
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

// ===== WAYFINDING (ACTIVE NAV LINK) =====
export function setupWayfinding() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Update navigation links
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
    
    // Update footer links
    footerLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== PREFERENCES MODAL =====
export function setupPreferencesModal() {
    const preferencesBtn = document.querySelector('.preferences-btn');
    const preferencesModal = document.getElementById('preferences-modal');
    
    if (!preferencesBtn || !preferencesModal) return;
    
    // Load saved preferences
    loadPreferences();
    
    // Open modal
    preferencesBtn.addEventListener('click', () => {
        preferencesModal.showModal();
    });
    
    // Close modal
    preferencesModal.addEventListener('click', (e) => {
        if (e.target === preferencesModal) {
            preferencesModal.close();
        }
    });
    
    // Handle form submission
    const preferencesForm = document.getElementById('preferences-form');
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            savePreferences();
            preferencesModal.close();
            showNotification('Preferences saved successfully');
        });
    }
    
    // Cancel button
    const cancelBtn = document.querySelector('.cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            preferencesModal.close();
        });
    }
}

// Load preferences from localStorage
function loadPreferences() {
    const theme = localStorage.getItem('theme') || 'dark';
    const language = localStorage.getItem('language') || 'en';
    const notifications = localStorage.getItem('notifications') === 'true';
    
    const themeSelect = document.getElementById('theme-select');
    const languageSelect = document.getElementById('language-select');
    const notificationsCheckbox = document.getElementById('notifications');
    
    if (themeSelect) themeSelect.value = theme;
    if (languageSelect) languageSelect.value = language;
    if (notificationsCheckbox) notificationsCheckbox.checked = notifications;
    
    // Apply theme
    applyTheme(theme);
}

// Save preferences to localStorage
function savePreferences() {
    const themeSelect = document.getElementById('theme-select');
    const languageSelect = document.getElementById('language-select');
    const notificationsCheckbox = document.getElementById('notifications');
    
    if (themeSelect) {
        localStorage.setItem('theme', themeSelect.value);
        applyTheme(themeSelect.value);
    }
    
    if (languageSelect) {
        localStorage.setItem('language', languageSelect.value);
    }
    
    if (notificationsCheckbox) {
        localStorage.setItem('notifications', notificationsCheckbox.checked);
    }
}

// Apply theme to page
function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.style.setProperty('--dark-bg', '#f5f5f5');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--text-white', '#2b2b2b');
        document.documentElement.style.setProperty('--text-light', '#4C4C4C');
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#2b2b2b');
        document.documentElement.style.setProperty('--card-bg', '#282828');
        document.documentElement.style.setProperty('--text-white', '#ffffff');
        document.documentElement.style.setProperty('--text-light', '#f8f8f8');
    }
}

// ===== NOTIFICATION SYSTEM =====
export function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'global-notification';
    notification.textContent = message;
    
    // Set styles based on type
    const backgroundColor = type === 'error' ? '#ff6b6b' : 
                          type === 'warning' ? '#ffa726' : '#4CAF50';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        animation: notificationSlideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== CAR STATISTICS (for index.html) =====
export async function loadCarStatistics() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const stats = [
            { model: 'Toyota Corolla', count: 245, change: '+12%' },
            { model: 'Honda Civic', count: 312, change: '+8%' },
            { model: 'Tesla Model 3', count: 421, change: '+25%' },
            { model: 'Ford F-150', count: 189, change: '+5%' },
            { model: 'BMW 3 Series', count: 156, change: '+3%' }
        ];
        
        let html = '';
        stats.forEach(stat => {
            html += `
                <div class="stat-card">
                    <div class="stat-model">${stat.model}</div>
                    <div class="stat-count">${stat.count} owners</div>
                    <div class="stat-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}">
                        ${stat.change}
                    </div>
                </div>
            `;
        });
        
        statsContainer.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading car statistics:', error);
        statsContainer.innerHTML = `
            <div class="error-message">
                Unable to load statistics. Please try again later.
            </div>
        `;
    }
}

// ===== INITIALIZE PAGE =====
export function initializePage() {
    // Update dates and year
    updateDates();
    
    // Setup hamburger menu
    setupHamburgerMenu();
    
    // Setup wayfinding
    setupWayfinding();
    
    // Setup FAQ if on FAQ page
    if (document.querySelector('.faq-container')) {
        createFAQ();
        setupFAQToggle();
    }
    
    // Setup preferences modal
    setupPreferencesModal();
    
    // Load car statistics if on index page
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname === '/') {
        loadCarStatistics();
    }
    
    // Add notification styles
    addNotificationStyles();
    
    // Add CSS for hamburger menu
    addHamburgerStyles();
    
    // Add CSS for statistics
    addStatisticsStyles();
}

// ===== ADD STYLES DYNAMICALLY =====
function addNotificationStyles() {
    const styleId = 'notification-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        @keyframes notificationSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes notificationSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .global-notification {
            font-family: inherit;
            font-size: 0.95rem;
        }
    `;
    document.head.appendChild(style);
}

function addHamburgerStyles() {
    const styleId = 'hamburger-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* Hamburger menu styles */
        .hamburger {
            display: none;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 24px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1000;
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .hamburger-line {
            width: 100%;
            height: 3px;
            background-color: white;
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        .hamburger.active .hamburger-line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active .hamburger-line:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .hamburger-line:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Navigation styles for mobile */
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            
            .nav {
                position: fixed;
                top: 0;
                left: -100%;
                width: 250px;
                height: 100vh;
                background-color: #131313;
                flex-direction: column;
                justify-content: flex-start;
                padding-top: 4rem;
                transition: left 0.3s ease;
                z-index: 999;
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
            }
            
            .nav.active {
                left: 0;
            }
            
            .nav-link {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #2b2b2b;
                text-align: left;
            }
            
            .nav-link.active {
                background-color: #FA0001;
                color: white;
            }
            
            .nav-link:hover {
                background-color: #2b2b2b;
            }
            
            /* Overlay when menu is open */
            .nav.active::before {
                content: '';
                position: fixed;
                top: 0;
                left: 250px;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: -1;
            }
        }
    `;
    document.head.appendChild(style);
}

function addStatisticsStyles() {
    const styleId = 'statistics-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        /* Statistics styles for index.html */
        .stats-section {
            padding: 3rem 1rem;
            background-color: #282828;
            margin: 2rem 0;
        }
        
        .stats-title {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
            font-size: 2rem;
        }
        
        .stats-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .stat-card {
            background-color: #2b2b2b;
            padding: 1.5rem;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #4C4C4C;
            transition: transform 0.2s ease;
        }
        
        .stat-card:hover {
            transform: translateY(-5px);
            border-color: #FA0001;
        }
        
        .stat-model {
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .stat-count {
            color: #ccc;
            font-size: 1rem;
            margin-bottom: 0.5rem;
        }
        
        .stat-change {
            font-size: 0.9rem;
            font-weight: 600;
            padding: 0.2rem 0.5rem;
            border-radius: 3px;
            display: inline-block;
        }
        
        .stat-change.positive {
            background-color: rgba(76, 175, 80, 0.2);
            color: #4CAF50;
        }
        
        .stat-change.negative {
            background-color: rgba(244, 67, 54, 0.2);
            color: #f44336;
        }
        
        .view-more {
            text-align: center;
            margin-top: 2rem;
        }
        
        .view-more-btn {
            display: inline-block;
            background-color: #FA0001;
            color: white;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 600;
            transition: background-color 0.2s ease;
        }
        
        .view-more-btn:hover {
            background-color: #d90000;
        }
        
        @media (max-width: 768px) {
            .stats-container {
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            }
            
            .stat-card {
                padding: 1rem;
            }
            
            .stat-model {
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== GLOBAL FUNCTIONS FOR MODALS =====
export function openPreferencesModal() {
    const modal = document.getElementById('preferences-modal');
    if (modal) {
        modal.showModal();
    }
}

export function closePreferencesModal() {
    const modal = document.getElementById('preferences-modal');
    if (modal) {
        modal.close();
    }
}

// ===== INITIALIZE WHEN DOM IS LOADED =====
document.addEventListener('DOMContentLoaded', initializePage);

// Export all functions for use in other modules
export default {
    createFAQ,
    setupFAQToggle,
    updateDates,
    setupHamburgerMenu,
    setupWayfinding,
    setupPreferencesModal,
    showNotification,
    loadCarStatistics,
    initializePage,
    openPreferencesModal,
    closePreferencesModal
};