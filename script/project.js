// FAQ Data
const faqData = [
    {
        question: "How does the platform work?",
        answer: "Yonkett is like a custom hub made just for your specific car model. It’s not just about storing your car info—it connects you with other owners who have the exact same ride. Share tips, get advice, and find parts that actually fit your model from people who get it."
    },
    {
        question: "Why there is not a marketplace?",
        answer: "We’re still putting the final touches on our marketplace to make sure it’s reliable and truly useful. Right now, we're counting on our community to help us shape it into something everyone will love. Your input really makes a difference!"
    },
    {
        question: "Can I have two or more car's profile?",
        answer: "Yes! Managing more than one car is a premium feature. Upgrade your account, and you’ll be able to keep track of all your vehicles in one spot—each with its own maintenance history and model-specific community. Check out the app to see all the cool perks that come with premium."
    },
    {
        question: "When can I have the complete app?",
        answer: "We’re working hard to roll out the full experience soon. We don’t have an exact date just yet, but follow us on social media—we post updates, sneak peeks, and news there all the time. We’re building this thing together!"
    }
];

// Create FAQ items
function createFAQ() {
    const faqContainer = document.querySelector('.faq-container');
    
    if (faqContainer) {
        faqData.forEach((item, index) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            faqItem.innerHTML = `
                <button class="faq-question">
                    ${item.question}
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
        });
    }
}

// Toggle FAQ answers
function setupFAQToggle() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('faq-question') || 
            e.target.parentElement.classList.contains('faq-question')) {
            
            const questionBtn = e.target.classList.contains('faq-question') ? 
                              e.target : e.target.parentElement;
            const faqItem = questionBtn.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = questionBtn.querySelector('.faq-icon');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer) {
                    otherAnswer.classList.remove('open');
                    otherAnswer.parentElement.querySelector('.faq-icon').textContent = '+';
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('open');
            icon.textContent = answer.classList.contains('open') ? '−' : '+';
        }
    });
}

// Update date automatically
function updateDates() {
    const updateDateElements = document.querySelectorAll('#update-date');
    const currentDate = new Date().toLocaleDateString('es-ES');
    
    updateDateElements.forEach(element => {
        element.textContent = currentDate;
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    createFAQ();
    setupFAQToggle();
    updateDates();
});