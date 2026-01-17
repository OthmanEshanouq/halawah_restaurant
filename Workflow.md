# Halawah Restaurant Landing Page - Development Workflow

## Project Overview
High-end, responsive landing page for "Halawah (حلاوة)" restaurant in Khalda, Amman with bilingual support (English/Arabic), theme switching, and reservation system.

---

## File Structure Created

### 1. index.html
- Main HTML structure with semantic markup
- Sections: Header, Hero, About, Reservation, Reviews, FAQ, Menu, Location, Footer
- Bilingual support with `data-en` and `data-ar` attributes
- RTL/LTR support via `dir` attribute

### 2. style.css
- CSS Variables for 3 themes (Light, Dark, Grey)
- Glassmorphism header with 70% transparency
- RTL/LTR responsive styles
- Mobile-first responsive design
- Animations and transitions

### 3. content.js
- Bilingual content dictionary (English/Arabic)
- 11 reviews (9 five-star, 2 four-star) with Arabic names
- 8 FAQ items in both languages
- Restaurant information
- Payment method translations

### 4. script.js
- Theme cycling logic (Light → Dark → Grey)
- Language toggle with RTL support
- Reservation system with calendar/date cards
- Form validation
- Review carousel with circular navigation
- FAQ double-toggle functionality
- Mobile menu handling

### 5. assets/
- hero video.mp4 (Hero section background)
- halawah's logo.png (Header logo)
- halawah's menu 1.png (Menu section)
- espresso&barista.png

---

## Development Steps

### Phase 1: Initial Setup & Structure

#### Step 1.1: Create Base HTML Structure
- Created `index.html` with semantic HTML5 structure
- Added meta tags for responsive design
- Linked Google Fonts (Cairo for Arabic, Montserrat for English)
- Set up basic sections: Header, Hero, About, Reservation, Reviews, FAQ, Menu, Location, Footer

#### Step 1.2: Create CSS Foundation
- Created `style.css` with CSS variables for theming
- Defined Light, Dark, and Grey theme color schemes
- Set up base styles and typography
- Added responsive breakpoints

#### Step 1.3: Create Content Data File
- Created `content.js` with bilingual content structure
- Added reviews data (11 reviews with Arabic names)
- Added FAQ items in both languages
- Added restaurant information structure

#### Step 1.4: Create JavaScript Logic File
- Created `script.js` with initialization functions
- Set up theme and language management
- Added basic event listeners

---

### Phase 2: Header & Navigation

#### Step 2.1: Header Layout Structure
- **Left Group**: Clickable Logo + "Home" + "About Us" links
- **Right Group**: "Menu" + "Contact" + Language Dropdown + Theme Toggle
- Used flexbox with `justify-content: space-between`

#### Step 2.2: Glassmorphism Effect
- Set header background to `rgba(255, 255, 255, 0.3)` (70% transparency)
- Added `backdrop-filter: blur(10px)` for glassmorphism
- Added border-bottom for definition

#### Step 2.3: High Contrast Text (Dark/Grey Modes)
- Enhanced text-shadow for navigation links in Dark/Grey themes
- Set text color to white with strong shadows for visibility
- Increased font-weight to 700 for better readability

#### Step 2.4: Logo Implementation
- Replaced text logo with image: `assets/halawah's logo.png`
- Styled as circular (50px × 50px, border-radius: 50%)
- Added hover scale effect
- Used `object-fit: cover` to center logo within circle

#### Step 2.5: Language Dropdown
- Created dropdown select for English/Arabic
- Positioned in header controls section
- Styled to match theme

#### Step 2.6: Theme Cycle Button
- Single button that cycles: Light → Dark → Grey
- Icon shows NEXT mode (not current)
- Smooth transitions between themes

#### Step 2.7: Mobile Menu
- Created hamburger menu toggle
- Menu/Contact links move to mobile menu
- Language/Theme controls remain visible on mobile
- Smooth slide-out animation

#### Step 2.8: RTL Support
- Added RTL styles for Arabic layout
- Mirrored navigation groups
- Adjusted border separators for RTL
- Fixed text alignment and spacing

---

### Phase 3: Hero Section

#### Step 3.1: Video Background
- Added full-screen video background
- Set to autoplay, muted, loop, no controls
- Used `assets/hero video.mp4`
- Added overlay for text readability

#### Step 3.2: Hero Content
- Centered overlay text with premium typography
- "Book Now" CTA button
- Smooth fade-in animations

---

### Phase 4: About Section

#### Step 4.1: Restaurant Information Cards
- Created info cards for: Cuisine, Drinks, Opening Hours
- Removed Location card (moved to Location section)
- Updated Opening Hours to "12:00 PM - 1:00 AM"
- Removed "100% Halal" from Cuisine (moved to FAQ)

#### Step 4.2: Card Styling
- Grid layout with hover effects
- Consistent spacing and shadows
- Responsive grid (auto-fit, minmax 250px)

---

### Phase 5: Reservation System

#### Step 5.1: Calendar Implementation
- Created calendar grid showing all days of month
- Only January 2026 displayed (one month only)
- Disabled navigation buttons (prev/next hidden)
- Only Thursdays, Fridays, Saturdays selectable (from Jan 20, 2026)
- Invalid days shown but disabled (grayed out)

#### Step 5.2: "Almost Sold Out" Badges
- Added scarcity badges for first week (Jan 20-27)
- Only on Thursdays and Fridays
- Badge covers entire date square
- 50% transparency (`rgba(231, 76, 60, 0.5)`)
- Two-line text: "Almost<br>Sold Out" / "مقاعد<br>محدودة"
- Pulse animation

#### Step 5.3: Reservation Form
- Full Name input (validated: minimum 2 words)
- Phone Number (Jordanian format: 07XXXXXXXX)
- Number of People (manual number input, 1-10)
- Meal Time dropdown (Lunch/Dinner)
- Selected Date display

#### Step 5.4: Payment Method Selection
- Added radio buttons: "Cash at Restaurant" and "Credit Card"
- Credit Card form container (hidden by default)
- Card fields: Cardholder Name, Card Number (16 digits), Expiry Date (MM/YY), CVV (3 digits)
- Visa/Mastercard brand icons displayed
- Real-time validation with visual feedback (green/red borders)

#### Step 5.5: Dynamic Price Display
- Price shown after entering number of people
- Calculation: people × 20 JOD
- Hidden initially, appears when people count entered
- Removed capacity display from form

#### Step 5.6: Form Validation
- Full Name: Minimum 2 words required
- Phone: Jordanian format validation (07XXXXXXXX)
- Credit Card: Validated only if "Credit Card" selected
  - Card Number: 16 digits
  - Expiry Date: MM/YY format, valid month (1-12)
  - CVV: 3 digits
  - Cardholder Name: Minimum 3 characters

#### Step 5.7: Thank You Message
- Success message after form submission
- Payment method-specific message:
  - Cash: "Your reservation is confirmed. Payment will be handled at the restaurant."
  - Credit Card: "Your reservation is confirmed. Please have your card ready."
- Bilingual support

---

### Phase 6: Reviews Carousel

#### Step 6.1: Carousel Structure
- Flexbox container showing one review at a time
- Left/Right navigation arrows outside carousel box
- Reviews displayed in full (no truncation)
- Long reviews wrap to 2 lines with ellipsis

#### Step 6.2: Circular Navigation
- When at last review, clicking next loops to first
- When at first review, clicking prev loops to last
- Smooth scroll animation

#### Step 6.3: Review Data
- 11 reviews total
- 9 reviews with 5 stars
- 2 reviews with 4 stars
- All reviewers have Arabic names (Omar, Fatimah, Zaid, Layla, Ahmad, Mariam, Yusuf, Sara, Khalid, Nour, Hassan)

#### Step 6.4: Touch/Swipe Support
- Added touch event handlers for mobile
- Swipe left/right to navigate reviews

---

### Phase 7: FAQ Section

#### Step 7.1: Double-Toggle System
- FAQ list hidden by default
- Click "Frequently Asked Questions" title to reveal list
- Title is clickable (cursor pointer, underline on hover)
- Small toggle button next to title
- Standard accordion for individual questions

#### Step 7.2: FAQ Content Updates
- **Question 1**: Updated opening hours to "12:00 PM - 1:00 AM"
- **Question 2**: Added "On Thursdays, Fridays, and Saturdays we only accept reservations"
- **Question 6** (Parking): Added "and we have a free valet"
- **Question 8** (Takeout): Added "but we are ready to any event"

#### Step 7.3: Styling
- Removed arrow icon from title
- Added underline effect on hover/active
- Smooth expand/collapse animations

---

### Phase 8: Menu Section

#### Step 8.1: Menu Image
- Added menu image: `assets/halawah's menu 1.png`
- Full-width responsive display
- Card-style container with shadow
- Centered layout

---

### Phase 9: Location Section

#### Step 9.1: Google Maps Integration
- Replaced "Contact Us" section with "Location" section
- Embedded Google Maps for Khalda, Amman
- "Get Directions" button opens Google Maps in new tab
- Phone number displayed: 0787426310

---

### Phase 10: Footer

#### Step 10.1: Footer Structure
- Restaurant information
- Contact: 0787426310
- Social media links (Facebook, Instagram, WhatsApp, X)
- SVG icons instead of emojis
- Copy Link button
- Copyright: 2026 (updated from 2024)
- Privacy Policy and Terms of Service (unlinked, plain text)

#### Step 10.2: Social Icons
- Replaced emoji icons with SVG icons
- Proper sizing (24px × 24px)
- Hover effects
- Consistent styling

---

### Phase 11: Theme System

#### Step 11.1: Three Theme Modes
- **Light Theme**: White background, dark text
- **Dark Theme**: Dark background, white text
- **Grey Theme**: Slate-grey background (#475569), soft white text (#f1f5f9)

#### Step 11.2: Theme Variables
- CSS variables defined in `:root`
- Theme switching via `data-theme` attribute
- Smooth transitions between themes
- Theme preference saved in localStorage

#### Step 11.3: Theme Button Logic
- Single button cycles through themes
- Icon represents NEXT mode (not current)
- Visual feedback on active theme

---

### Phase 12: Language System

#### Step 12.1: Bilingual Support
- All text content in `content.js`
- `data-en` and `data-ar` attributes in HTML
- Dynamic text replacement on language change
- RTL layout for Arabic (`dir="rtl"`)

#### Step 12.2: Language Toggle
- Dropdown select for language switching
- Updates all text elements dynamically
- Reloads reviews and FAQ with new language
- Maintains layout and functionality

---

### Phase 13: Responsive Design

#### Step 13.1: Mobile Menu
- Hamburger menu for mobile screens
- Menu and Contact links in mobile menu
- Language and Theme controls remain visible
- Logo remains visible

#### Step 13.2: Responsive Breakpoints
- Desktop: Full layout
- Tablet (≤768px): Adjusted spacing, stacked elements
- Mobile (≤480px): Mobile menu, single column layouts

#### Step 13.3: Touch Optimizations
- Larger touch targets for mobile
- Swipe gestures for carousel
- Optimized form inputs for mobile keyboards

---

### Phase 14: Form Enhancements

#### Step 14.1: Input Formatting
- Card Number: Auto-format with spaces (1234 5678 9012 3456)
- Expiry Date: Auto-format MM/YY
- CVV: Numbers only, max 3 digits
- Phone: Jordanian format validation

#### Step 14.2: Real-time Validation
- Visual feedback (green/red borders)
- Error messages in selected language
- Validation only when credit card selected

---

### Phase 15: Polish & Refinements

#### Step 15.1: Animations
- Smooth transitions for all interactions
- Fade-in animations for hero content
- Slide-down for credit card form
- Pulse animation for scarcity badges

#### Step 15.2: Accessibility
- Proper ARIA labels
- Semantic HTML
- Keyboard navigation support
- Screen reader friendly

#### Step 15.3: Performance
- Optimized image loading
- Efficient event listeners
- LocalStorage for preferences
- Smooth scroll behavior

---

## Key Features Implemented

### ✅ Header & Navigation
- Glassmorphism effect (70% transparency, blur)
- Space-between flex layout
- Logo image (circular)
- Language dropdown
- Theme cycle button
- Mobile menu
- RTL support

### ✅ Hero Section
- Full-screen video background
- Premium typography overlay
- Book Now CTA

### ✅ Reservation System
- Calendar with date restrictions
- Scarcity badges (Almost Sold Out)
- Payment method selection (Cash/Credit Card)
- Credit card form with validation
- Dynamic price calculation
- Form validation (name: 2 words minimum)

### ✅ Reviews
- Horizontal carousel
- Circular navigation (loops)
- One review at a time
- 2-line text wrapping

### ✅ FAQ
- Double-toggle (title click + accordion)
- Underline indicator
- Updated content

### ✅ Menu
- Menu image display

### ✅ Location
- Google Maps embed
- Get Directions button

### ✅ Footer
- Social media SVG icons
- Copy Link functionality
- Updated copyright (2026)
- Unlinked policies

---

## Technical Implementation Details

### CSS Architecture
- CSS Variables for theming
- Mobile-first responsive design
- RTL/LTR support
- Glassmorphism effects
- Smooth animations

### JavaScript Architecture
- Modular function organization
- Event delegation
- LocalStorage for preferences
- Form validation
- Dynamic content loading

### Content Management
- Centralized content in `content.js`
- Bilingual dictionary structure
- Easy to update and maintain

---

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL support for Arabic
- Responsive across all screen sizes

---

## Future Enhancements (Potential)
- Backend integration for reservations
- Payment gateway integration
- Online ordering system
- Customer account system
- Newsletter subscription
- Live chat support

---

## Notes
- All images stored in `assets/` folder
- Video background should be optimized for web
- Google Maps embed URL may need updating with actual location coordinates
- Form submissions currently logged to console (backend integration needed)

---

**Project Status**: ✅ Complete and Functional
