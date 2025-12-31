// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillsSection();
    initTypingEffect();
    initContactForm();
    initFloatingElements();
    initProgressBars();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill progress bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll('section, .skill-card, .project-card, .timeline-item, .highlight-item');
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skills section functionality
function initSkillsSection() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillCards = document.querySelectorAll('.skill-card');

    // Category filtering
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');

            const selectedCategory = category.getAttribute('data-category');
            
            // Filter skill cards
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill card interactions
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add hover effect
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate progress bar on hover
            const progressBar = card.querySelector('.progress-bar');
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = progress + '%';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        // Click to expand functionality
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
            
            // Create expanded content if it doesn't exist
            let expandedContent = card.querySelector('.expanded-content');
            if (!expandedContent) {
                expandedContent = createExpandedContent(card);
                card.appendChild(expandedContent);
            }
            
            // Toggle expanded content visibility
            if (card.classList.contains('expanded')) {
                expandedContent.style.maxHeight = expandedContent.scrollHeight + 'px';
                expandedContent.style.opacity = '1';
            } else {
                expandedContent.style.maxHeight = '0';
                expandedContent.style.opacity = '0';
            }
        });
    });
}

// Create expanded content for skill cards
function createExpandedContent(card) {
    const skillName = card.getAttribute('data-skill');
    const expandedContent = document.createElement('div');
    expandedContent.className = 'expanded-content';
    
    // Sample expanded content based on skill
    const skillDetails = getSkillDetails(skillName);
    
    expandedContent.innerHTML = `
        <div class="expanded-details">
            <h4>Key Features:</h4>
            <ul>
                ${skillDetails.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <h4>Experience Level:</h4>
            <p>${skillDetails.experience}</p>
            <h4>Recent Projects:</h4>
            <p>${skillDetails.projects}</p>
        </div>
    `;
    
    expandedContent.style.maxHeight = '0';
    expandedContent.style.opacity = '0';
    expandedContent.style.overflow = 'hidden';
    expandedContent.style.transition = 'all 0.3s ease-out';
    expandedContent.style.marginTop = '1rem';
    expandedContent.style.padding = '0 1rem';
    
    return expandedContent;
}

// Get skill details for expanded content
function getSkillDetails(skillName) {
    const skillsData = {
        'Advanced CSS': {
            features: ['Responsive Design', 'CSS Grid & Flexbox', 'Animations & Transitions', 'Modern CSS Features'],
            experience: '3+ years of creating modern, responsive interfaces',
            projects: 'Portfolio websites, web applications, and interactive components'
        },
        'JavaScript': {
            features: ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'API Integration'],
            experience: '3+ years of frontend and backend JavaScript development',
            projects: 'Interactive web apps, game development, and automation scripts'
        },
        'Node.js': {
            features: ['Express.js', 'RESTful APIs', 'Database Integration', 'Authentication'],
            experience: '2+ years of server-side development',
            projects: 'Web APIs, real-time applications, and backend services'
        },
        'Python': {
            features: ['Automation Scripts', 'Data Processing', 'Web Development', 'System Integration'],
            experience: '3+ years across multiple domains',
            projects: 'ERP automation, data analysis, and web applications'
        },
        'Django': {
            features: ['MVC Architecture', 'ORM', 'Admin Interface', 'Security Features'],
            experience: '2+ years of full-stack web development',
            projects: 'Business applications, content management systems'
        },
        'Unity': {
            features: ['2D & 3D Development', 'Physics Systems', 'Animation', 'Optimization'],
            experience: '2+ years of game development',
            projects: 'MOBA games, interactive experiences, and prototypes'
        },
        'CAD Development': {
            features: ['AutoCAD Customization', 'Fusion 360 Scripts', 'Automation Tools', 'Plugin Development'],
            experience: '1+ years of CAD programming',
            projects: 'Industrial automation tools and custom CAD solutions'
        },
        'ERP Automation': {
            features: ['Workflow Automation', 'Data Integration', 'Process Optimization', 'Reporting Systems'],
            experience: '2+ years in industrial settings',
            projects: 'Manufacturing process automation and business intelligence'
        },
        'Animation': {
            features: ['2D Animation', '3D Modeling', 'Motion Graphics', 'Storytelling'],
            experience: '2+ years of creative content production',
            projects: 'Short films, game assets, and promotional content'
        },
        'IT Fundamentals': {
            features: ['Network Administration', 'System Management', 'Hardware Troubleshooting', 'Security'],
            experience: '3+ years of IT support and administration',
            projects: 'System optimization, network setup, and technical support'
        }
    };
    
    return skillsData[skillName] || {
        features: ['Professional expertise', 'Industry best practices', 'Continuous learning'],
        experience: 'Experienced professional with proven track record',
        projects: 'Multiple successful projects and implementations'
    };
}

// Typing effect for hero section
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = "Hi, I'm Sahil Gevariya";
    const speed = 100;
    let i = 0;

    typingText.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Add blinking cursor effect
            typingText.style.borderRight = '2px solid #00FFAB';
            typingText.style.animation = 'blink 1s infinite';
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Progress bars animation
function initProgressBars() {
    // This will be called when skills section comes into view
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, index * 100); // Stagger the animations
    });
}

// Floating elements animation
function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);

        // Add hover effects
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.boxShadow = '0 10px 30px rgba(0, 255, 171, 0.3)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.boxShadow = 'none';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formInputs = contactForm.querySelectorAll('.form-input');
        const submitBtn = contactForm.querySelector('.btn-primary');
        
        // Disable form during submission
        formInputs.forEach(input => input.disabled = true);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Re-enable form
            formInputs.forEach(input => input.disabled = false);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, 2000);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#00FFAB'};
        color: #1A1A2E;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Particle background effect (subtle)
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00FFAB';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Initialize particle background
// initParticleBackground();

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #00FFAB, #10B981);
        color: #1A1A2E;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 255, 171, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', scrollToTop);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
initScrollToTop();

// Add CSS for blinking cursor animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #00FFAB; }
        51%, 100% { border-color: transparent; }
    }
    
    .expanded-content {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 1rem;
        margin-top: 1rem;
    }
    
    .expanded-content h4 {
        color: #10B981;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .expanded-content ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 1rem;
    }
    
    .expanded-content li {
        padding: 0.2rem 0;
        padding-left: 1rem;
        position: relative;
        font-size: 0.85rem;
        opacity: 0.8;
    }
    
    .expanded-content li::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: #00FFAB;
    }
    
    .expanded-content p {
        font-size: 0.85rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
    }
`;

document.head.appendChild(style);

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1A1A2E;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease-out;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
            color: #EEEEEE;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 171, 0.3);
            border-top: 3px solid #00FFAB;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
                document.head.removeChild(loaderStyle);
            }, 500);
        }, 1000);
    });
}

// Show loading animation
showLoadingAnimation();
