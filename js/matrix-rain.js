function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    // Position the canvas behind all content
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    canvas.style.pointerEvents = 'none';
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Initial resize
    resizeCanvas();
    
    const ctx = canvas.getContext('2d');
    // const katakanaS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const katakana = 'abcdefghijklmnopqrstuvwxyz';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const extras = `;:'",<.>/?-_=+[{]}\|~]`;
    const alphabet = katakana + latin + nums + extras;
    
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize rain drops
    const rainDrops = Array(columns).fill(0);
    
    const draw = () => {
        // Semi-transparent black background to create trail effect
        ctx.fillStyle = 'rgba(10, 10, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text style
        ctx.fillStyle = '#00ff99';
        ctx.font = `bold ${fontSize}px monospace`;
        
        // Draw each column
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            // Reset drop if it reaches bottom with random chance
            if (y > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    // Start animation
    const interval = setInterval(draw, 30);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        // Recalculate columns
        rainDrops.length = Math.floor(canvas.width / fontSize);
        rainDrops.fill(0);
    });
    
    // Cleanup function
    return () => {
        clearInterval(interval);
        document.body.removeChild(canvas);
    };
}

// Initialize matrix rain
const cleanupMatrixRain = initMatrixRain();

// To stop the effect later if needed:
// cleanupMatrixRain();