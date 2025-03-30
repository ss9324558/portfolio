// Terminal System
document.addEventListener('DOMContentLoaded', function() {
    // Terminal Elements
    const terminal = document.getElementById('terminal');
    const closeTerminal = document.getElementById('close-terminal');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Create floating terminal button if not exists
    if (!document.getElementById('terminal-button')) {
        const terminalButton = document.createElement('button');
        terminalButton.id = 'terminal-button';
        terminalButton.className = 'fixed bottom-6 left-6 w-16 h-16 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center text-neon-green hover:bg-neon-green/30 transition-all duration-300 glow-effect z-50';
        terminalButton.innerHTML = '<i class="fas fa-terminal text-2xl"></i>';
        terminalButton.title = 'Open Terminal';
        document.body.appendChild(terminalButton);
        
        terminalButton.addEventListener('click', () => {
            terminal.classList.toggle('hidden');
            if (!terminal.classList.contains('hidden')) {
                terminalInput.focus();
            }
        });
    }

    // Terminal Operations
    closeTerminal.addEventListener('click', () => {
        terminal.classList.add('hidden');
    });

    function addTerminalMessage(message, isCommand = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-1 ${isCommand ? 'text-neon-green font-mono' : 'text-gray-300 font-mono'}`;
        messageDiv.textContent = isCommand ? `> ${message}` : message;
        terminalOutput.appendChild(messageDiv);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command) {
                addTerminalMessage(command, true);
                terminalInput.value = '';
                processCommand(command);
            }
        } else if (e.key === 'ArrowUp') {
            // Implement command history navigation here if needed
        }
    });

    // Enhanced Command Processor
    function processCommand(command) {
        const cmd = command.toLowerCase().trim();
        let response = "";
        
        // Command Map for better organization
        const commands = {
            help: () => [
                "Available commands:",
                "about       - Learn about Suraj",
                "projects    - List recent projects",
                "skills      - View technical skills",
                "contact     - Get contact information",
                "clear       - Clear terminal",
                "scan        - Toggle scan line effect",
                "auth        - Biometric authentication",
                "sysinfo     - Show system information"
            ].join('\n'),
            
            about: () => "Suraj Singh is a front-end developer specializing in creating immersive digital experiences with cutting-edge web technologies.",
            
            projects: () => [
                "Recent projects:",
                "1. E-commerce Platform (React, Three.js)",
                "2. Portfolio Website (HTML/CSS, GSAP)",
                "3. Mobile App Design (Figma)",
                "4. Analytics Dashboard (Vue.js, D3.js)",
                "5. Collaboration Tool (React, Firebase)",
                "6. Tech Startup Branding (Illustrator)"
            ].join('\n'),
            
            skills: () => [
                "Technical skills:",
                "• HTML5/CSS3/SCSS/Tailwind - Intermediate",
                "• JavaScript/TypeScript - Intermediate",
                "• React/React Native - Intermediate",
                "• Node.js/Express - Intermediate",
                "• MongoDb/SQl - Intermediate",
                "• Three.js - Intermediate",
                "• MongoDB/PostgreSQL - Intermediate"
            ].join('\n'),
            
            contact: () => [
                "Contact information:",
                "Email: bhadoria.suraj.singh.07@gmail.com",
                "Phone: +91 (820) 849-8488",
                "GitHub: github.com/ss9324558",
                "LinkedIn: linkedin.com/in/suraj-singh-bhadoria-687b73261",
                "Location: Maharashtra, IN"
            ].join('\n'),
            
            clear: () => {
                terminalOutput.innerHTML = '';
                return "";
            },
            
            scan: () => {
                const scanLine = document.getElementById('scan-line');
                if (scanLine) {
                    scanLine.style.display = scanLine.style.display === 'none' ? 'block' : 'none';
                    return `Scan line effect ${scanLine.style.display === 'none' ? 'disabled' : 'enabled'}`;
                }
                return "Scan line element not found";
            },
            
            auth: () => {
                if (typeof window.bioAuth?.showAuthModal === 'function') {
                    window.bioAuth.showAuthModal();
                    return "Initializing biometric authentication...";
                } else {
                    return "Error: Authentication system not available. Please ensure:\n1. The bio-auth.js is loaded\n2. Your browser supports camera access\n3. You've granted camera permissions";
                }
            },
            
            sysinfo: () => [
                `System: ${navigator.platform}`,
                `Browser: ${navigator.userAgent}`,
                `Screen: ${window.screen.width}x${window.screen.height}`,
                `Viewport: ${window.innerWidth}x${window.innerHeight}`,
                `Cookies: ${navigator.cookieEnabled ? 'Enabled' : 'Disabled'}`,
                `Online: ${navigator.onLine ? 'Yes' : 'No'}`
            ].join('\n'),
            
            default: () => `Command not recognized: "${command}". Type 'help' for available commands.`
        };

        // Process command with error handling
        try {
            response = commands[cmd] ? commands[cmd]() : commands.default();
        } catch (error) {
            console.error("Command processing error:", error);
            response = `System error while processing command: ${error.message}`;
        }

        // Display response if not empty
        if (response) {
            setTimeout(() => {
                addTerminalMessage(response);
            }, 100);
        }
    }

    // Initialize terminal
    addTerminalMessage("NEO System Terminal v2.4.0");
    addTerminalMessage("Type 'help' for available commands.");
    addTerminalMessage("----------------------------------");
});