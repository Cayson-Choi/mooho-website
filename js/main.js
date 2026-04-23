document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Translations
    const i18n = {
        ko: {
            'nav-story': 'Story',
            'nav-collection': 'Collection',
            'nav-contact': 'Contact',
            'hero-subtitle': 'POLYTECHNIC ARTISAN',
            'hero-title': '공학의 정밀함,<br>예술로 승화되다',
            'hero-desc': '낮에는 폴리텍에서 기술을 가르치고, 밤에는 수제 팔찌를 빚습니다.<br>한 치의 오차도 허용하지 않는 공학자의 시선으로 완성한 마스터피스.',
            'hero-btn': '컬렉션 보기',
            'story-title': "The Artisan's <br>Dual Life",
            'story-desc1': '강의실에서 기계와 시스템의 정확성을 가르치는 일상은, 제 작업실에서 미학적인 정밀함으로 다시 태어납니다. 단순한 취미를 넘어선 상업적 완성도, 모든 팔찌는 견고한 내구성과 우아한 디자인을 동시에 충족하도록 설계되었습니다.',
            'story-desc2': '최고급 소재만을 엄선하여 100% 수작업으로 제작되는 Lumina Craft의 팔찌는 당신의 일상에 은은한 럭셔리를 선사합니다.',
            'collection-title': 'Signature Collection',
            'collection-subtitle': '상업적 퀄리티로 완성된 프리미엄 라인업',
            'btn-cart': '장바구니 담기',
            'prod1-name': '루미너스 실버 뱅글',
            'prod2-name': '아티산 위브드 레더',
            'prod3-name': '에센셜 골드 체인',
            'cta-title': '당신만의 특별한 디자인이 필요하신가요?',
            'cta-desc': '소재, 길이, 이니셜 각인 등 맞춤형 주문 제작도 가능합니다.<br>폴리텍 교수의 정교한 손길로 당신만의 팔찌를 만들어 드립니다.',
            'cta-btn': '주문 제작 문의',
            'footer-desc': '공학자의 정밀함과 예술가의 감성이 만난 프리미엄 수제 팔찌.',
            'footer-cs': 'Customer Service',
            'footer-link1': '배송 및 교환',
            'footer-link2': '자주 묻는 질문',
            'footer-link3': '이용약관',
            'footer-contact': 'Contact',
            'footer-addr': 'Studio: 서울특별시 용산구 (방문 예약제)',
            'cart-added': '담겼습니다!'
        },
        en: {
            'nav-story': 'Story',
            'nav-collection': 'Collection',
            'nav-contact': 'Contact',
            'hero-subtitle': 'POLYTECHNIC ARTISAN',
            'hero-title': 'Engineering Precision,<br>Elevated to Art',
            'hero-desc': 'Teaching technology at Polytechnic by day, crafting handmade bracelets by night.<br>Masterpieces perfected through the meticulous eyes of an engineer.',
            'hero-btn': 'View Collection',
            'story-title': "The Artisan's <br>Dual Life",
            'story-desc1': 'The precision of machines taught in the classroom is reborn as aesthetic exactness in my studio. Beyond a simple hobby, every bracelet is designed to meet commercial standards of durability and elegant design.',
            'story-desc2': 'Handcrafted with only the finest materials, Lumina Craft bracelets bring a touch of subtle luxury to your everyday life.',
            'collection-title': 'Signature Collection',
            'collection-subtitle': 'Premium lineup crafted to commercial perfection',
            'btn-cart': 'Add to Cart',
            'prod1-name': 'Luminous Silver Bangle',
            'prod2-name': 'Artisan Woven Leather',
            'prod3-name': 'Essential Gold Chain',
            'cta-title': 'Need a special custom design?',
            'cta-desc': 'Custom orders including materials, length, and initial engraving are available.<br>Let a Polytechnic professor craft a unique bracelet just for you.',
            'cta-btn': 'Inquire Custom Order',
            'footer-desc': 'Premium handmade bracelets where engineering precision meets artistic sensibility.',
            'footer-cs': 'Customer Service',
            'footer-link1': 'Shipping & Returns',
            'footer-link2': 'FAQ',
            'footer-link3': 'Terms of Service',
            'footer-contact': 'Contact',
            'footer-addr': 'Studio: Yongsan-gu, Seoul (By appointment)',
            'cart-added': 'Added!'
        }
    };

    let currentLang = 'ko';

    const langSwitch = document.getElementById('lang-switch');
    const langLabels = document.querySelectorAll('.lang-label');

    if (langSwitch) {
        langSwitch.addEventListener('change', (e) => {
            currentLang = e.target.checked ? 'en' : 'ko';
            
            // Update labels
            langLabels.forEach(label => {
                if (label.dataset.lang === currentLang) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });

            // Update texts
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (i18n[currentLang][key]) {
                    el.innerHTML = i18n[currentLang][key];
                }
            });
        });
    }

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
            btn.textContent = i18n[currentLang]['cart-added'];
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
