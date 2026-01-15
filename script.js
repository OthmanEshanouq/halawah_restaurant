// Main JavaScript file for Halawah Restaurant
// Handles theme switching, language toggle, reservations, and more

// ============================================
// Global Variables
// ============================================

let currentLanguage = 'en';
let currentTheme = 'grey';
let selectedDate = null;
let currentMonth = 0; // 0 = January 2026
let currentYear = 2026;

// ============================================
// Initialize Application
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load saved preferences
    loadPreferences();
    
    // Initialize components
    initializeTheme();
    initializeLanguage();
    initializeReservation();
    loadReviews();
    loadFAQ();
    initializeCopyLink();
    initializeSmoothScroll();
    
    // Set initial theme and language
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
}

// ============================================
// Theme Management
// ============================================

function initializeTheme() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            switchTheme(theme);
        });
    });
}

function switchTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    savePreferences();
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.theme-btn[data-theme="${theme}"]`).classList.add('active');
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// ============================================
// Language Management
// ============================================

function initializeLanguage() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    applyLanguage(lang);
    savePreferences();
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
    
    // Reload dynamic content
    loadReviews();
    loadFAQ();
}

function applyLanguage(lang) {
    // Set direction
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
    
    // Update all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        const text = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
}

// ============================================
// Reservation System
// ============================================

function initializeReservation() {
    // Book Now button
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
            showReservationStep(1);
        });
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Calendar navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            // Don't allow going before January 2026
            if (currentYear === 2026 && currentMonth === 0) {
                return;
            }
            
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            
            // Ensure we don't go below January 2026
            if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 0)) {
                currentMonth = 0;
                currentYear = 2026;
            }
            
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Form submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }
    
    // Back to calendar button
    const backBtn = document.getElementById('back-to-calendar');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showReservationStep(1);
        });
    }
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('calendar-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    if (!calendarGrid) return;
    
    // Disable prev button if we're at January 2026
    if (prevMonthBtn) {
        if (currentYear === 2026 && currentMonth === 0) {
            prevMonthBtn.style.opacity = '0.5';
            prevMonthBtn.style.cursor = 'not-allowed';
            prevMonthBtn.disabled = true;
        } else {
            prevMonthBtn.style.opacity = '1';
            prevMonthBtn.style.cursor = 'pointer';
            prevMonthBtn.disabled = false;
        }
    }
    
    // Get month name
    const monthNames = currentLanguage === 'ar' 
        ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (monthYearDisplay) {
        monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Day names
    const dayNames = currentLanguage === 'ar'
        ? ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Check if date is valid (Thursday, Friday, or Saturday, starting from Jan 20, 2026)
        const minDate = new Date(2026, 0, 20); // January 20, 2026
        const dayOfWeek = date.getDay(); // 0 = Sunday, 4 = Thursday, 5 = Friday, 6 = Saturday
        
        if (date < minDate || (dayOfWeek !== 4 && dayOfWeek !== 5 && dayOfWeek !== 6)) {
            dayCell.classList.add('disabled');
        } else {
            dayCell.addEventListener('click', function() {
                selectDate(date);
            });
        }
        
        // Highlight selected date
        if (selectedDate && 
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear()) {
            dayCell.classList.add('selected');
        }
        
        calendarGrid.appendChild(dayCell);
    }
}

function selectDate(date) {
    selectedDate = date;
    renderCalendar();
    showReservationStep(2);
    
    // Display selected date
    const dateDisplay = document.getElementById('selected-date-display');
    if (dateDisplay) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const locale = currentLanguage === 'ar' ? 'ar-JO' : 'en-US';
        dateDisplay.textContent = date.toLocaleDateString(locale, options);
    }
}

function showReservationStep(step) {
    // Hide all steps
    document.querySelectorAll('.reservation-step').forEach(stepEl => {
        stepEl.classList.add('hidden');
    });
    
    // Show selected step
    const stepElement = document.getElementById(`reservation-step-${step}`);
    if (stepElement) {
        stepElement.classList.remove('hidden');
    }
}

function handleReservationSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const people = document.getElementById('people').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    let isValid = true;
    
    if (!fullName) {
        showError('name-error', currentLanguage === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone-error', currentLanguage === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required');
        isValid = false;
    } else if (!validateJordanianPhone(phone)) {
        showError('phone-error', currentLanguage === 'ar' ? 'يرجى إدخال رقم هاتف أردني صحيح (07XXXXXXXX)' : 'Please enter a valid Jordanian phone number (07XXXXXXXX)');
        isValid = false;
    }
    
    if (!people) {
        showError('people-error', currentLanguage === 'ar' ? 'يرجى اختيار عدد الأشخاص' : 'Please select number of people');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        showReservationStep(3);
        
        // Reset form
        document.getElementById('reservation-form').reset();
        selectedDate = null;
        
        // Log reservation (in real app, send to server)
        console.log('Reservation submitted:', {
            name: fullName,
            phone: phone,
            people: people,
            date: selectedDate
        });
    }
}

function validateJordanianPhone(phone) {
    // Jordanian phone format: 07XXXXXXXX (10 digits starting with 07)
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// ============================================
// Reviews
// ============================================

function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer || typeof contentData === 'undefined') return;
    
    const reviews = currentLanguage === 'ar' ? contentData.reviewsAr : contentData.reviews;
    
    reviewsContainer.innerHTML = reviews.map(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        return `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-name">${review.name}</span>
                    <span class="review-stars">${stars}</span>
                </div>
                <p class="review-text">"${review.text}"</p>
            </div>
        `;
    }).join('');
}

// ============================================
// FAQ
// ============================================

function loadFAQ() {
    const faqContainer = document.getElementById('faq-container');
    if (!faqContainer || typeof contentData === 'undefined') return;
    
    const faqItems = currentLanguage === 'ar' ? contentData.faqAr : contentData.faq;
    
    faqContainer.innerHTML = faqItems.map((item, index) => {
        return `
            <div class="faq-item">
                <button class="faq-question">
                    <span>${item.question}</span>
                    <span class="faq-icon">▼</span>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    faqContainer.querySelectorAll('.faq-question').forEach((question, index) => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            faqContainer.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ============================================
// Copy Link Functionality
// ============================================

function initializeCopyLink() {
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const url = window.location.href;
            
            // Copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                // Show feedback
                const originalText = this.textContent;
                this.textContent = currentLanguage === 'ar' ? 'تم النسخ!' : 'Copied!';
                this.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert(currentLanguage === 'ar' ? 'فشل النسخ' : 'Failed to copy');
            });
        });
    }
}

// ============================================
// Smooth Scroll
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ============================================
// Preferences (Local Storage)
// ============================================

function savePreferences() {
    localStorage.setItem('halawah-theme', currentTheme);
    localStorage.setItem('halawah-language', currentLanguage);
}

function loadPreferences() {
    const savedTheme = localStorage.getItem('halawah-theme');
    const savedLanguage = localStorage.getItem('halawah-language');
    
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
}

// ============================================
// Initialize Calendar on Page Load
// ============================================

// Set initial date to January 2026
currentMonth = 0; // January
currentYear = 2026;
