document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Dropdown hover effect for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth > 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseover', function() {
                this.querySelector('.dropdown-toggle').click();
            });
            
            dropdown.addEventListener('mouseout', function() {
                this.querySelector('.dropdown-toggle').click();
            });
        });
    }

    // News Carousel
    const newsSlider = document.querySelector('.news-slider');
    const newsCards = document.querySelectorAll('.news-card');
    const newsPrev = document.getElementById('newsPrev');
    const newsNext = document.getElementById('newsNext');
    
    if (newsSlider && newsPrev && newsNext) {
        let currentSlide = 0;
        const totalSlides = Math.ceil(newsCards.length / 4);
        
        // Hide prev button initially
        newsPrev.style.opacity = '0.5';
        newsPrev.style.pointerEvents = 'none';
        
        newsPrev.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateNewsSlider();
            }
        });
        
        newsNext.addEventListener('click', function() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateNewsSlider();
            }
        });
        
        function updateNewsSlider() {
            const translateValue = -currentSlide * 100 + '%';
            newsSlider.style.transform = 'translateX(' + translateValue + ')';
            
            // Update button states
            if (currentSlide === 0) {
                newsPrev.style.opacity = '0.5';
                newsPrev.style.pointerEvents = 'none';
            } else {
                newsPrev.style.opacity = '1';
                newsPrev.style.pointerEvents = 'auto';
            }
            
            if (currentSlide === totalSlides - 1) {
                newsNext.style.opacity = '0.5';
                newsNext.style.pointerEvents = 'none';
            } else {
                newsNext.style.opacity = '1';
                newsNext.style.pointerEvents = 'auto';
            }
        }
    }

    // Event Tabs
    const eventTabs = document.querySelectorAll('.event-tab');
    
    eventTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            eventTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically show/hide content based on the tab
            const tabType = this.getAttribute('data-tab');
            console.log('Switched to tab:', tabType);
            
            // For a real implementation, you would toggle visibility of different event lists
        });
    });

    // Video Gallery Thumbnails
    const videoThumbs = document.querySelectorAll('.video-thumb');
    
    videoThumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            videoThumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Here you would typically change the video source
            console.log('Switched to video:', index + 1);
            
            // For a real implementation, you would update the iframe src
        });
    });

    // Animated Numbers on Scroll
    const numberElements = document.querySelectorAll('.number');
    
    function animateNumbers() {
        numberElements.forEach(numberElement => {
            const targetNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
            const suffix = numberElement.textContent.replace(/[0-9]/g, '');
            
            let startNumber = 0;
            const duration = 2000; // 2 seconds
            const interval = 50; // Update every 50ms
            const steps = duration / interval;
            const increment = targetNumber / steps;
            
            const timer = setInterval(() => {
                startNumber += increment;
                
                if (startNumber >= targetNumber) {
                    clearInterval(timer);
                    startNumber = targetNumber;
                }
                
                numberElement.textContent = Math.floor(startNumber) + suffix;
            }, interval);
        });
    }
    
    // Intersection Observer for triggering animations when elements come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('numbers-section')) {
                    animateNumbers();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const numbersSection = document.querySelector('.numbers-section');
    if (numbersSection) {
        observer.observe(numbersSection);
    }

    // Sticky Header
    const navbar = document.querySelector('.navbar');
    const navbarOffset = navbar.offsetTop;
    
    function handleScroll() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky-top');
        } else {
            navbar.classList.remove('sticky-top');
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // Mobile Menu Improvements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }

    // Hero Text Animation
    const animatedText = document.querySelector('.animated-text');
    
    if (animatedText) {
        setTimeout(() => {
            animatedText.style.animation = 'pulse 2s infinite';
        }, 1000);
    }
});