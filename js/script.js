// ========================================
// Typing Animation
// ========================================
const typingText = document.getElementById('typing-text');
const texts = [
    { full: 'AloeDawn입니다.', gradientEnd: 8 },
    { full: '개발자입니다.', gradientEnd: 3 },
    { full: 'AI 애호가입니다.', gradientEnd: 6 }
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function renderTypedText(text, gradientEnd) {
    const gradientPart = text.substring(0, Math.min(text.length, gradientEnd));
    const normalPart = text.substring(gradientEnd);
    typingText.innerHTML = `<span class="gradient-text">${gradientPart}</span>${normalPart}`;
}

function typeAnimation() {
    const { full: currentText, gradientEnd } = texts[textIndex];

    if (!isDeleting) {
        charIndex++;
        renderTypedText(currentText.substring(0, charIndex), gradientEnd);

        if (charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; typeAnimation(); }, 2500);
            return;
        }
        setTimeout(typeAnimation, 100);
    } else {
        charIndex--;
        renderTypedText(currentText.substring(0, charIndex), gradientEnd);

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeAnimation, 300);
            return;
        }
        setTimeout(typeAnimation, 50);
    }
}

typeAnimation();

// ========================================
// Scroll-Triggered Reveal Animations
// (Apple Keynote-style stagger reveal)
// ========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Header — Translucent on Scroll
// ========================================
const header = document.querySelector('header');
let lastScrolled = false;

function onScroll() {
    const isScrolled = window.scrollY > 20;
    if (isScrolled !== lastScrolled) {
        header.classList.toggle('scrolled', isScrolled);
        lastScrolled = isScrolled;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// Trigger on load in case page is already scrolled
onScroll();