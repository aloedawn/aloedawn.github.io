// Typing Animation
const typingText = document.getElementById('typing-text');
const texts = [
    { full: '알로에새벽입니다.', gradientEnd: 5 }, // "알로에새벽" = 5 characters
    { full: '개발자입니다.', gradientEnd: 3 }      // "개발자" = 3 characters
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const currentTextObj = texts[textIndex];
    const currentText = currentTextObj.full;
    const gradientEnd = currentTextObj.gradientEnd;

    if (!isDeleting) {
        // Typing
        const typedText = currentText.substring(0, charIndex + 1);

        // Split text into gradient part and normal part
        const gradientPart = typedText.substring(0, Math.min(typedText.length, gradientEnd));
        const normalPart = typedText.substring(gradientEnd);

        typingText.innerHTML = `<span class="gradient-text">${gradientPart}</span>${normalPart}`;
        charIndex++;

        if (charIndex === currentText.length) {
            // Finished typing, wait 2.5 seconds then start deleting
            setTimeout(() => {
                isDeleting = true;
                typeAnimation();
            }, 2500);
            return;
        }

        // Type next character after 100ms
        setTimeout(typeAnimation, 100);
    } else {
        // Deleting
        const typedText = currentText.substring(0, charIndex - 1);

        // Split text into gradient part and normal part
        const gradientPart = typedText.substring(0, Math.min(typedText.length, gradientEnd));
        const normalPart = typedText.substring(gradientEnd);

        typingText.innerHTML = `<span class="gradient-text">${gradientPart}</span>${normalPart}`;
        charIndex--;

        if (charIndex === 0) {
            // Finished deleting, move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeAnimation, 200);
            return;
        }

        // Delete next character after 50ms (faster than typing)
        setTimeout(typeAnimation, 50);
    }
}

// Start typing animation
typeAnimation();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener for header liquid glass effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});