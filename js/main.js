// Initialize AOS animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Project Modal
const projectCards = document.querySelectorAll('.project-card');
const hologramModal = document.getElementById('hologram-modal');
const closeHologram = document.getElementById('close-hologram');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.getAttribute('data-project');
        openHologramViewer(projectId);
    });
});

if (closeHologram) {
    closeHologram.addEventListener('click', () => {
        hologramModal.classList.add('hidden');
    });
}

function openHologramViewer(projectId) {
    hologramModal.classList.remove('hidden');
    
    // In a real implementation, you would load different 3D models based on projectId
    initThreeJS();
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');
        
        setTimeout(() => {
            formSuccess.classList.remove('hidden');
            contactForm.reset();
        }, 1000);
    });
}

// Fetch cryptocurrency prices (simulated)
function updateCryptoPrices() {
    const btcPrice = document.getElementById('btc-price');
    const ethPrice = document.getElementById('eth-price');
    
    if (btcPrice && ethPrice) {
        // Simulate API call with random prices
        const randomBtc = (Math.random() * 5000 + 25000).toFixed(2);
        const randomEth = (Math.random() * 300 + 1500).toFixed(2);
        
        btcPrice.textContent = `$${randomBtc}`;
        ethPrice.textContent = `$${randomEth}`;
        
        // Animate price change
        btcPrice.classList.add('text-green-500');
        ethPrice.classList.add('text-purple-500');
        
        setTimeout(() => {
            btcPrice.classList.remove('text-green-500');
            ethPrice.classList.remove('text-purple-500');
        }, 1000);
    }
}

// Update prices every 30 seconds
updateCryptoPrices();
setInterval(updateCryptoPrices, 30000);

// Biometric Authentication
// const authSuccess = document.getElementById('auth-success');
// const authCancel = document.getElementById('auth-cancel');
// const bioAuth = document.getElementById('bio-auth');

// if (authSuccess && authCancel && bioAuth) {
//     authSuccess.addEventListener('click', () => {
//         bioAuth.classList.add('hidden');
//         addTerminalMessage("Biometric authentication successful. Access granted.");
//     });
    
//     authCancel.addEventListener('click', () => {
//         bioAuth.classList.add('hidden');
//         addTerminalMessage("Biometric authentication canceled.");
//     });
// }