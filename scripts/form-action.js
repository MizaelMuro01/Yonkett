// form-action.js - ES Module for form action page
import { updateDates, setupFAQToggle } from './project.js';

// Generate unique confirmation ID
function generateConfirmationId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `YONK-${timestamp}-${random}`.toUpperCase();
}

// Get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const formData = {};
    
    // Get all parameters
    for (const [key, value] of params.entries()) {
        formData[key] = decodeURIComponent(value);
    }
    
    return formData;
}

// Format data for display
function formatFormData(formData) {
    const formatted = {};
    
    // Format each field
    if (formData.name) {
        formatted['Full Name'] = formData.name;
    }
    
    if (formData.email) {
        formatted['Email Address'] = formData.email;
    }
    
    if (formData.phone) {
        formatted['Phone Number'] = formData.phone || 'Not provided';
    }
    
    if (formData.subject) {
        formatted['Subject'] = formData.subject;
    }
    
    if (formData.car_model) {
        formatted['Car Model'] = formData.car_model || 'Not specified';
    }
    
    if (formData.message) {
        formatted['Message'] = formData.message;
    }
    
    if (formData.newsletter) {
        formatted['Newsletter Subscription'] = formData.newsletter === 'on' ? 'Yes' : 'No';
    }
    
    formatted['Submission Time'] = new Date().toLocaleString();
    
    return formatted;
}

// Display form data
function displayFormData(formData) {
    const container = document.getElementById('form-data-display');
    
    if (!container || Object.keys(formData).length === 0) {
        container.innerHTML = `
            <div class="no-data">
                <p>No form data found in URL parameters.</p>
                <p>Please return to the <a href="contact.html">contact form</a> to submit your message.</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    for (const [label, value] of Object.entries(formData)) {
        html += `
            <div class="data-item">
                <span class="data-label">${label}:</span>
                <span class="data-value">${value}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Save submission to localStorage
function saveSubmissionToStorage(formData, confirmationId) {
    try {
        // Get existing submissions
        const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        
        // Create submission object
        const submission = {
            id: confirmationId,
            timestamp: new Date().toISOString(),
            data: formData
        };
        
        // Add to beginning of array (most recent first)
        submissions.unshift(submission);
        
        // Keep only last 50 submissions
        if (submissions.length > 50) {
            submissions.length = 50;
        }
        
        // Save back to localStorage
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));
        
        // Update submission count
        updateSubmissionStats();
        
        return true;
    } catch (error) {
        console.error('Error saving submission:', error);
        return false;
    }
}

// Update submission statistics
function updateSubmissionStats() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const count = submissions.length;
    
    // Update footer if element exists
    const statsElement = document.querySelector('.local-storage-info');
    if (statsElement) {
        statsElement.innerHTML = `<small>${count} submission${count !== 1 ? 's' : ''} saved in browser</small>`;
    }
}

// Load submission history
function loadSubmissionHistory() {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const container = document.getElementById('history-content');
    
    if (!container) return;
    
    if (submissions.length === 0) {
        container.innerHTML = '<div class="no-history">No submission history found.</div>';
        return;
    }
    
    let html = '';
    
    submissions.forEach((submission, index) => {
        const date = new Date(submission.timestamp).toLocaleString();
        const preview = submission.data['Full Name'] || submission.data['Email Address'] || 'Anonymous submission';
        
        html += `
            <div class="history-item">
                <div class="history-item-header">
                    <span class="history-date">${date}</span>
                    <span class="history-id">${submission.id}</span>
                </div>
                <div class="history-preview">${preview}</div>
                <div class="history-actions">
                    <button type="button" class="history-action-btn" onclick="viewSubmission('${submission.id}')">
                        View Details
                    </button>
                    <button type="button" class="history-action-btn delete" onclick="deleteSubmission('${submission.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// View specific submission
function viewSubmission(submissionId) {
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const submission = submissions.find(s => s.id === submissionId);
    
    if (!submission) {
        alert('Submission not found.');
        return;
    }
    
    // Create modal for viewing details
    const modalHtml = `
        <dialog class="submission-details-modal" id="submission-details-modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeSubmissionDetails()">×</button>
                <h3>Submission Details</h3>
                <div class="submission-details" id="submission-details">
                    ${Object.entries(submission.data).map(([key, value]) => `
                        <div class="detail-item">
                            <strong>${key}:</strong> ${value}
                        </div>
                    `).join('')}
                </div>
                <div class="modal-actions">
                    <button type="button" class="secondary-btn" onclick="closeSubmissionDetails()">
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    `;
    
    // Add modal to DOM
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHtml;
    document.body.appendChild(modalContainer);
    
    // Show modal
    const modal = document.getElementById('submission-details-modal');
    modal.showModal();
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSubmissionDetails();
        }
    });
}

// Close submission details modal
function closeSubmissionDetails() {
    const modal = document.getElementById('submission-details-modal');
    if (modal) {
        modal.close();
        setTimeout(() => modal.remove(), 300);
    }
}

// Delete specific submission
function deleteSubmission(submissionId) {
    if (!confirm('Are you sure you want to delete this submission?')) {
        return;
    }
    
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    const filtered = submissions.filter(s => s.id !== submissionId);
    
    localStorage.setItem('formSubmissions', JSON.stringify(filtered));
    loadSubmissionHistory();
    updateSubmissionStats();
    
    // Show notification
    showNotification('Submission deleted successfully');
}

// Clear all submission history
function clearSubmissionHistory() {
    if (!confirm('Are you sure you want to clear all submission history? This cannot be undone.')) {
        return;
    }
    
    localStorage.removeItem('formSubmissions');
    loadSubmissionHistory();
    updateSubmissionStats();
    
    // Show notification
    showNotification('All submission history cleared');
}

// Save current submission data to browser
function saveCurrentData() {
    const formData = getUrlParams();
    const confirmationId = document.getElementById('confirmation-id').textContent;
    
    if (Object.keys(formData).length === 0) {
        alert('No data to save. Please submit the form first.');
        return;
    }
    
    // Get saved data
    const savedData = JSON.parse(localStorage.getItem('savedFormData')) || [];
    
    // Check if already saved
    const alreadySaved = savedData.some(item => item.id === confirmationId);
    if (alreadySaved) {
        alert('This submission is already saved.');
        return;
    }
    
    // Save new data
    savedData.push({
        id: confirmationId,
        timestamp: new Date().toISOString(),
        data: formData
    });
    
    localStorage.setItem('savedFormData', JSON.stringify(savedData));
    
    // Show notification
    showNotification('Submission saved to browser');
    
    // Update saved data modal if open
    loadSavedData();
}

// Load saved data
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('savedFormData')) || [];
    const container = document.getElementById('saved-data-content');
    
    if (!container) return;
    
    if (savedData.length === 0) {
        container.innerHTML = '<div class="no-saved-data">No saved submissions found.</div>';
        return;
    }
    
    let html = '';
    
    savedData.forEach((item, index) => {
        const date = new Date(item.timestamp).toLocaleString();
        const preview = item.data.name || item.data.email || 'Saved submission';
        
        html += `
            <div class="saved-data-item">
                <div class="saved-data-item-header">
                    <span class="saved-data-date">${date}</span>
                    <span class="saved-data-id">${item.id}</span>
                </div>
                <div class="saved-data-preview">${preview}</div>
                <div class="saved-data-actions">
                    <button type="button" class="saved-data-action-btn" onclick="viewSavedSubmission('${item.id}')">
                        View
                    </button>
                    <button type="button" class="saved-data-action-btn delete" onclick="deleteSavedSubmission('${item.id}')">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// View saved submission
function viewSavedSubmission(submissionId) {
    const savedData = JSON.parse(localStorage.getItem('savedFormData')) || [];
    const submission = savedData.find(s => s.id === submissionId);
    
    if (!submission) {
        alert('Saved submission not found.');
        return;
    }
    
    alert(`Saved Submission Details:\n\n${
        Object.entries(submission.data).map(([key, value]) => `${key}: ${value}`).join('\n')
    }`);
}

// Delete saved submission
function deleteSavedSubmission(submissionId) {
    if (!confirm('Are you sure you want to delete this saved submission?')) {
        return;
    }
    
    const savedData = JSON.parse(localStorage.getItem('savedFormData')) || [];
    const filtered = savedData.filter(s => s.id !== submissionId);
    
    localStorage.setItem('savedFormData', JSON.stringify(filtered));
    loadSavedData();
    
    // Show notification
    showNotification('Saved submission deleted');
}

// Clear all saved data
function clearAllSavedData() {
    if (!confirm('Are you sure you want to clear all saved submissions? This cannot be undone.')) {
        return;
    }
    
    localStorage.removeItem('savedFormData');
    loadSavedData();
    
    // Show notification
    showNotification('All saved submissions cleared');
}

// Print page
function printPage() {
    window.print();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update submission time in footer
function updateSubmissionTime() {
    const timeElement = document.getElementById('submission-time');
    if (timeElement) {
        timeElement.textContent = new Date().toLocaleString();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Print button
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', printPage);
    }
    
    // New message button
    const newMessageBtn = document.getElementById('new-message-btn');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }
    
    // Save data button
    const saveDataBtn = document.getElementById('save-data-btn');
    if (saveDataBtn) {
        saveDataBtn.addEventListener('click', saveCurrentData);
    }
    
    // View history button
    const viewHistoryBtn = document.getElementById('view-history-btn');
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', () => {
            document.getElementById('history-modal').showModal();
        });
    }
    
    // Close history modal
    const closeHistoryBtn = document.getElementById('close-history-btn');
    if (closeHistoryBtn) {
        closeHistoryBtn.addEventListener('click', () => {
            document.getElementById('history-modal').close();
        });
    }
    
    // Clear history button
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearSubmissionHistory);
    }
    
    // View saved data button (if exists)
    const viewSavedDataBtn = document.getElementById('view-saved-data-btn');
    if (viewSavedDataBtn) {
        viewSavedDataBtn.addEventListener('click', () => {
            document.getElementById('saved-data-modal').showModal();
        });
    }
    
    // Close saved data modal
    const closeSavedDataBtn = document.getElementById('close-saved-data-btn');
    if (closeSavedDataBtn) {
        closeSavedDataBtn.addEventListener('click', () => {
            document.getElementById('saved-data-modal').close();
        });
    }
    
    // Clear saved data button
    const clearSavedDataBtn = document.getElementById('clear-saved-data-btn');
    if (clearSavedDataBtn) {
        clearSavedDataBtn.addEventListener('click', clearAllSavedData);
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('dialog').close();
        });
    });
    
    // Close modals on backdrop click
    document.querySelectorAll('dialog').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    });
}

// Initialize the page
export function initFormActionPage() {
    console.log('Initializing form action page...');
    
    // Get form data from URL
    const rawFormData = getUrlParams();
    const formattedData = formatFormData(rawFormData);
    
    // Generate confirmation ID
    const confirmationId = generateConfirmationId();
    
    // Update UI
    document.getElementById('confirmation-id').textContent = confirmationId;
    displayFormData(formattedData);
    
    // Save to localStorage if we have data
    if (Object.keys(rawFormData).length > 0) {
        saveSubmissionToStorage(formattedData, confirmationId);
    }
    
    // Load history and saved data
    loadSubmissionHistory();
    loadSavedData();
    updateSubmissionStats();
    updateSubmissionTime();
    
    // Setup event listeners
    setupEventListeners();
    
    // Add CSS for notifications
    addNotificationStyles();
}

// Add notification styles
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .history-action-btn, .saved-data-action-btn {
            padding: 0.3rem 0.8rem;
            font-size: 0.85rem;
            background-color: #4C4C4C;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 0.5rem;
        }
        
        .history-action-btn:hover, .saved-data-action-btn:hover {
            background-color: #666;
        }
        
        .history-action-btn.delete, .saved-data-action-btn.delete {
            background-color: #2b2b2b;
            color: #ff6b6b;
        }
        
        .history-action-btn.delete:hover, .saved-data-action-btn.delete:hover {
            background-color: #ff6b6b;
            color: white;
        }
        
        .history-actions, .saved-data-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.8rem;
        }
        
        .submission-details-modal {
            border: none;
            border-radius: 8px;
            padding: 0;
            max-width: 600px;
            width: 90%;
            background-color: #2b2b2b;
        }
        
        .submission-details-modal::backdrop {
            background-color: rgba(0, 0, 0, 0.7);
        }
        
        .submission-details {
            background-color: #282828;
            padding: 1.5rem;
            border-radius: 6px;
            margin: 1rem 0;
            border: 1px solid #4C4C4C;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .detail-item {
            margin-bottom: 0.8rem;
            padding-bottom: 0.8rem;
            border-bottom: 1px solid #4C4C4C;
            color: white;
        }
        
        .detail-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-item strong {
            color: #ccc;
            display: inline-block;
            min-width: 150px;
        }
    `;
    document.head.appendChild(style);
}

// Make functions available globally for inline onclick handlers
window.viewSubmission = viewSubmission;
window.deleteSubmission = deleteSubmission;
window.closeSubmissionDetails = closeSubmissionDetails;
window.viewSavedSubmission = viewSavedSubmission;
window.deleteSavedSubmission = deleteSavedSubmission;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initFormActionPage();
    updateDates();
    setupFAQToggle();
});