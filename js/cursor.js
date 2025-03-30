// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
    
    // Scale up when hovering interactive elements
    const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', '.project-card', '.social-icon'];
    if (interactiveElements.some(selector => e.target.closest(selector))) {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.3)';
        cursorOutline.style.borderColor = 'rgba(0, 249, 255, 0.8)';
    } else {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(0, 249, 255, 0.5)';
    }
});