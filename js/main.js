document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Observe all elements with fade-up or fade-in classes
    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Simple Cart interaction
    const cartBtns = document.querySelectorAll('.add-to-cart');
    const cartCountEl = document.querySelector('.cart-count');
    let cartCount = 0;

    cartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = '담겼습니다!';
            btn.style.backgroundColor = 'var(--color-text)';
            btn.style.color = 'var(--color-bg)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--color-text)';
            }, 1500);
        });
    });

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
