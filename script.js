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
    initializeCarousel();
    initializeMobileMenu();
    loadReviews();
    loadFAQ();
    initializeCopyLink();
    initializeSmoothScroll();
    initializeStickyHeader();
    
    // Set initial theme and language
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
}

// ============================================
// Theme Management - Cycle Button
// ============================================

function initializeTheme() {
    const themeCycleBtn = document.getElementById('theme-cycle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    if (themeCycleBtn) {
        themeCycleBtn.addEventListener('click', function() {
            cycleTheme();
        });
    }
    
    // Set initial icon
    updateThemeIcon();
}

function cycleTheme() {
    const themes = ['light', 'dark', 'grey'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    switchTheme(nextTheme);
}

function switchTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    updateThemeIcon();
    savePreferences();
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        const themes = ['light', 'dark', 'grey'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        
        const icons = {
            'light': '☀️',
            'dark': '🌙',
            'grey': '⚫'
        };
        // Show NEXT mode icon, not current
        themeIcon.textContent = icons[nextTheme] || '⚫';
    }
}

// ============================================
// Language Management - Dropdown
// ============================================

function initializeLanguage() {
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
}

function switchLanguage(lang) {
    currentLanguage = lang;
    applyLanguage(lang);
    savePreferences();
    
    // Update dropdown
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Reload dynamic content
    loadReviews();
    loadFAQ();
    renderCalendar(); // Regenerate calendar with new language
    // Reset carousel position when language changes
    resetCarousel();
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
        } else if (element.tagName === 'OPTION') {
            // Handle option elements
            const optionText = lang === 'ar' ? element.getAttribute('data-ar') : element.getAttribute('data-en');
            if (optionText) {
                element.textContent = optionText;
            }
        } else {
            element.textContent = text;
        }
    });
    
    // Update meal time options
    const mealTimeSelect = document.getElementById('meal-time');
    if (mealTimeSelect) {
        const lunchOption = mealTimeSelect.querySelector('option[value="lunch"]');
        const dinnerOption = mealTimeSelect.querySelector('option[value="dinner"]');
        if (lunchOption) {
            lunchOption.textContent = lang === 'ar' ? lunchOption.getAttribute('data-ar') : lunchOption.getAttribute('data-en');
        }
        if (dinnerOption) {
            dinnerOption.textContent = lang === 'ar' ? dinnerOption.getAttribute('data-ar') : dinnerOption.getAttribute('data-en');
        }
    }
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
    
    // Calendar navigation - Only show January 2026 (one month only)
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Disable navigation buttons since we only show one month
    if (prevMonthBtn) {
        prevMonthBtn.style.display = 'none';
    }
    if (nextMonthBtn) {
        nextMonthBtn.style.display = 'none';
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
    
    // Hide reservation info initially
    const reservationInfo = document.getElementById('reservation-info');
    if (reservationInfo) {
        reservationInfo.classList.add('hidden');
    }
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('calendar-month-year');
    
    if (!calendarGrid) return;
    
    // Only show January 2026 (one month only)
    currentMonth = 0; // January
    currentYear = 2026;
    
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
    
    // Add days of month - show ALL days
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Check if date is valid (Thursday, Friday, or Saturday, starting from Jan 20, 2026)
        const minDate = new Date(2026, 0, 20); // January 20, 2026
        const dayOfWeek = date.getDay(); // 0 = Sunday, 4 = Thursday, 5 = Friday, 6 = Saturday
        
        if (date < minDate || (dayOfWeek !== 4 && dayOfWeek !== 5 && dayOfWeek !== 6)) {
            // Disable but still show the day
            dayCell.classList.add('disabled');
        } else {
            // Available for selection
            dayCell.classList.add('available');
            dayCell.addEventListener('click', function() {
                selectDate(date);
            });
            
            // Check for scarcity badge (first week Thu/Fri only)
            const firstWeekEnd = new Date(2026, 0, 27); // End of first week (Jan 27)
            if (date <= firstWeekEnd && (dayOfWeek === 4 || dayOfWeek === 5)) {
                const badge = document.createElement('div');
                badge.className = 'scarcity-badge';
                if (currentLanguage === 'ar') {
                    badge.innerHTML = 'مقاعد<br>محدودة';
                } else {
                    badge.innerHTML = 'Almost<br>Sold Out';
                }
                dayCell.appendChild(badge);
            }
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
    
    // Show reservation info (cost and capacity)
    const reservationInfo = document.getElementById('reservation-info');
    if (reservationInfo) {
        reservationInfo.classList.remove('hidden');
    }
    
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
    } else if (!validateFullName(fullName)) {
        showError('name-error', currentLanguage === 'ar' ? 'يرجى إدخال الاسم الكامل (ثلاثة أسماء على الأقل)' : 'Please enter full name (at least 3 words)');
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
    
    const mealTime = document.getElementById('meal-time').value;
    if (!mealTime) {
        showError('meal-time-error', currentLanguage === 'ar' ? 'يرجى اختيار وقت الوجبة' : 'Please select meal time');
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
            mealTime: mealTime,
            date: selectedDate
        });
    }
}

function validateFullName(name) {
    // Full name must have at least 3 words (captures)
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 3;
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
// Reviews Carousel
// ============================================

let carouselPosition = 0;

function initializeCarousel() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            scrollCarousel('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            scrollCarousel('next');
        });
    }
    
    // Touch/swipe support for mobile
    const carousel = document.getElementById('reviews-container');
    if (carousel) {
        let startX = 0;
        let scrollLeft = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

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
    
    // Reset carousel position after loading
    resetCarousel();
}

function scrollCarousel(direction) {
    const carousel = document.getElementById('reviews-container');
    if (!carousel) return;
    
    // Get the width of the carousel container
    const containerWidth = carousel.offsetWidth;
    
    if (direction === 'next') {
        carousel.scrollBy({ left: containerWidth, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: -containerWidth, behavior: 'smooth' });
    }
}

function resetCarousel() {
    const carousel = document.getElementById('reviews-container');
    if (carousel) {
        carousel.scrollLeft = 0;
    }
}

// ============================================
// FAQ - Double Toggle
// ============================================

function loadFAQ() {
    const faqContainer = document.getElementById('faq-container');
    const faqToggleBtn = document.getElementById('faq-toggle-btn');
    
    if (!faqContainer || typeof contentData === 'undefined') return;
    
    // Initialize toggle button click (first toggle - reveal/hide list)
    if (faqToggleBtn) {
        // Remove any existing listeners by cloning
        const newBtn = faqToggleBtn.cloneNode(true);
        faqToggleBtn.parentNode.replaceChild(newBtn, faqToggleBtn);
        
        newBtn.addEventListener('click', function() {
            const isHidden = faqContainer.classList.contains('hidden');
            if (isHidden) {
                faqContainer.classList.remove('hidden');
                newBtn.classList.add('active');
            } else {
                faqContainer.classList.add('hidden');
                newBtn.classList.remove('active');
                // Close all FAQ items when hiding
                faqContainer.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }
    
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
    
    // Add click handlers for individual questions (second toggle - accordion)
    faqContainer.querySelectorAll('.faq-question').forEach((question, index) => {
        question.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent
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
// Sticky Header with Scroll Effect
// ============================================

function initializeStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Mobile Menu
// ============================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = mobileMenu?.querySelectorAll('a');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        if (mobileNavLinks) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    }
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
// Initialize Date Cards on Page Load
// ============================================

// Date cards are generated on page load via initializeReservation()
