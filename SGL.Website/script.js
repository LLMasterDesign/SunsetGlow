// ===================================
// SUNSET GLOW LIGHTING - SCRIPTS
// Event delegation, form validation, navigation
// ===================================

(function() {
    'use strict';

    // ===== NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

    // Active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // ===== FORM VALIDATION =====
    const quoteForm = document.getElementById('quoteForm');
    const modalQuoteForm = document.getElementById('modalQuoteForm');
    const estimateModal = document.getElementById('estimate-modal');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetForm');

    if (quoteForm || modalQuoteForm) {
        // Phone masking (delegated for both forms)
        function attachPhoneMask(input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else {
                        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                    }
                }
                e.target.value = value;
            });
        }
        const phoneInput = document.getElementById('phone');
        if (phoneInput) attachPhoneMask(phoneInput);
        const mPhoneInput = document.getElementById('m-phone');
        if (mPhoneInput) attachPhoneMask(mPhoneInput);
        }

        // Form submission helpers
        function clearErrors(form) {
            const errorFields = form.querySelectorAll('.form-input.error');
            errorFields.forEach(field => {
                field.classList.remove('error');
                field.removeAttribute('aria-invalid');
            });

            const errorSpans = form.querySelectorAll('.form-error');
            errorSpans.forEach(span => {
                span.textContent = '';
            });
        }

        function showFieldErrorFor(inputEl, message) {
            if (!inputEl) return;
            inputEl.classList.add('error');
            inputEl.setAttribute('aria-invalid', 'true');
            const group = inputEl.closest('.form-group');
            if (group) {
                const err = group.querySelector('.form-error');
                if (err) err.textContent = message;
            }
        }

        function validateFormIn(form) {
            let isValid = true;

            const nameEl = form.querySelector('[name="name"]');
            if (nameEl && !nameEl.value.trim()) {
                showFieldErrorFor(nameEl, 'Please enter your full name');
                isValid = false;
            }

            const emailEl = form.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailEl) {
                if (!emailEl.value.trim()) {
                    showFieldErrorFor(emailEl, 'Please enter your email');
                    isValid = false;
                } else if (!emailRegex.test(emailEl.value)) {
                    showFieldErrorFor(emailEl, 'Please enter a valid email address');
                    isValid = false;
                }
            }

            const phoneEl = form.querySelector('[name="phone"]');
            if (phoneEl) {
                const phoneDigits = phoneEl.value.replace(/\D/g, '');
                if (!phoneEl.value.trim()) {
                    showFieldErrorFor(phoneEl, 'Please enter your phone number');
                    isValid = false;
                } else if (phoneDigits.length !== 10) {
                    showFieldErrorFor(phoneEl, 'Please enter a 10-digit phone number');
                    isValid = false;
                }
            }

            const addressEl = form.querySelector('[name="address"]');
            if (addressEl && !addressEl.value.trim()) {
                showFieldErrorFor(addressEl, 'Please enter your property address');
                isValid = false;
            }

            const packageEl = form.querySelector('[name="package"]');
            if (packageEl && !packageEl.value) {
                showFieldErrorFor(packageEl, 'Please select a package');
                isValid = false;
            }

            return isValid;
        }

        function wireFormSubmit(form) {
            form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors(form);

            // Validate
            const isValid = validateFormIn(form);

            if (!isValid) {
                return;
            }

            // Prepare data
            const formData = new FormData(form);

            try {
                // If Netlify form is enabled, post to current path
                const isNetlify = form.hasAttribute('data-netlify');
                if (isNetlify) {
                    const fileInput = form.querySelector('input[type="file"]');
                    const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;
                    if (hasFile) {
                        if (!formData.get('form-name')) {
                            formData.set('form-name', form.getAttribute('name') || 'Quote');
                        }
                        const response = await fetch('/', { method: 'POST', body: formData });
                        if (response.ok) { showSuccess(); } else { showError('Submission failed. Please try again or call us at (555) 555-0199.'); }
                    } else {
                        const encoded = new URLSearchParams();
                        encoded.set('form-name', form.getAttribute('name') || 'Quote');
                        for (const [k, v] of formData.entries()) {
                            if (v instanceof File) continue;
                            encoded.append(k, v);
                        }
                        const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encoded.toString() });
                        if (response.ok) { showSuccess(); } else { showError('Submission failed. Please try again or call us at (555) 555-0199.'); }
                    }
                } else {
                    // Fallback: log and show success
                    console.log('Form data:', Object.fromEntries(formData.entries()));
                    showSuccess();
                }
            } catch (error) {
                console.error(error);
                showError('Network error. Please try again or call us at (555) 555-0199.');
            }
        });
        }

        if (quoteForm) wireFormSubmit(quoteForm);
        if (modalQuoteForm) wireFormSubmit(modalQuoteForm);

        // Reset form handler
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', function() {
                hideSuccess();
                quoteForm.reset();
                clearErrors();
            });
        }
    }

    // ===== MODAL OPEN/CLOSE =====
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        const firstInput = modal.querySelector('input, select, textarea, button');
        if (firstInput) firstInput.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-open-modal]');
        if (trigger) {
            e.preventDefault();
            // Close any open package modal first
            document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
            if (estimateModal) openModal(estimateModal);
        }
        const pkgTrigger = e.target.closest('[data-open-package]');
        if (pkgTrigger) {
            e.preventDefault();
            const pkgName = pkgTrigger.getAttribute('data-open-package');
            const modal = document.getElementById('package-' + pkgName);
            if (modal) openModal(modal);
        }
        const closer = e.target.closest('[data-close-modal]');
        if (closer) {
            e.preventDefault();
            const modal = closer.closest('.modal');
            if (modal) closeModal(modal);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.open').forEach(m => closeModal(m));
        }
    });

    function validateForm() {
        let isValid = true;

        // Name
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showFieldError('name', 'Please enter your full name');
            isValid = false;
        }

        // Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showFieldError('email', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Phone
        const phone = document.getElementById('phone');
        const phoneDigits = phone.value.replace(/\D/g, '');
        if (!phone.value.trim()) {
            showFieldError('phone', 'Please enter your phone number');
            isValid = false;
        } else if (phoneDigits.length !== 10) {
            showFieldError('phone', 'Please enter a 10-digit phone number');
            isValid = false;
        }

        // Address
        const address = document.getElementById('address');
        if (!address.value.trim()) {
            showFieldError('address', 'Please enter your property address');
            isValid = false;
        }

        // Package
        const packageSelect = document.getElementById('package');
        if (!packageSelect.value) {
            showFieldError('package', 'Please select a package');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`${fieldId}-error`);
        
        if (field) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');
        }
        
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearErrors() {
        const errorFields = document.querySelectorAll('.form-input.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');
        });

        const errorSpans = document.querySelectorAll('.form-error');
        errorSpans.forEach(span => {
            span.textContent = '';
        });
    }

    function showSuccess() {
        if (quoteForm && formSuccess) {
            quoteForm.style.display = 'none';
            formSuccess.removeAttribute('hidden');
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function hideSuccess() {
        if (quoteForm && formSuccess) {
            formSuccess.setAttribute('hidden', '');
            quoteForm.style.display = 'block';
        }
    }

    function showError(message) {
        // Simple error display - in production, enhance this
        alert(message);
    }

    // ===== ADDRESS AUTOCOMPLETE STUB =====
    // TODO: Integrate Google Places API or similar for address autocomplete
    const addressInput = document.getElementById('address');
    if (addressInput) {
        // Placeholder for future autocomplete integration
        // Example: initAutocomplete(addressInput);
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim()) {
                // TODO: Wire to actual newsletter service
                alert('Thank you for subscribing! You\'ll receive our first newsletter soon.');
                emailInput.value = '';
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
            const href = target.getAttribute('href');
            if (href !== '#' && href !== '') {
                const element = document.querySelector(href);
                if (element) {
                    e.preventDefault();
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });

    // ===== GALLERY LIGHTBOX (SIMPLE) =====
    // TODO: Add full lightbox functionality when real images are available
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            // Placeholder for lightbox
            console.log('Gallery item clicked - implement lightbox here');
        });
    });

    // ===== FAQ ACCORDION (OPTIONAL ENHANCEMENT) =====
    // Currently FAQs are always visible, but you can add accordion behavior:
    /*
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        }
    });
    */

    // ===== ACCESSIBILITY: CLOSE MOBILE NAV ON ESC =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
    });

    // ===== CLOSE MOBILE NAV WHEN CLICKING OUTSIDE =====
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active')) {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });

    // ===== FORM FIELD FOCUS EFFECTS =====
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ===== LAZY LOADING IMAGES (WHEN REAL IMAGES ADDED) =====
    // TODO: Add intersection observer for lazy loading when real images are added
    /*
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    */

    // ===== PERFORMANCE: DEBOUNCE UTILITY =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== SCROLL TO TOP BUTTON (OPTIONAL) =====
    // Uncomment to add a scroll-to-top button
    /*
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--sunset-3);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    const toggleScrollTopBtn = debounce(() => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }, 100);
    
    window.addEventListener('scroll', toggleScrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    */

    // ===== LOG INITIALIZATION =====
    console.log('Sunset Glow Lighting - Site initialized');
    console.log('Environment: Production');
    console.log('Form validation: Active');

})();