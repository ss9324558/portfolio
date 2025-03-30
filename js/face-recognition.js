
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const authSuccess = document.getElementById('auth-success');
    const authCancel = document.getElementById('auth-cancel');
    const bioAuth = document.getElementById('bio-auth');
    const video = document.getElementById('camera-feed');
    const scanIcon = document.getElementById('scan-icon');
    const statusText = document.getElementById('auth-status') || document.createElement('div');
    const terminalOutput = document.getElementById('terminal-output') || console;
    
    // State variables
    let stream = null;
    let detectionInterval;
    let isFaceDetected = false;
    let verificationAttempts = 0;
    let verificationTimeout;

    // Terminal integration
    function addTerminalMessage(message) {
        if (terminalOutput instanceof HTMLElement) {
            const messageElement = document.createElement('div');
            messageElement.textContent = `> ${message}`;
            terminalOutput.appendChild(messageElement);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        } else {
            console.log(`TERMINAL: ${message}`);
        }
    }

    // Enhanced camera control
    async function startCamera() {
        try {
            stopCamera(); // Clean up any existing stream
            
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                },
                audio: false
            });
            
            video.srcObject = stream;
            statusText.textContent = "Align your face in the frame";
            addTerminalMessage("Camera initialized. Waiting for face detection...");
            return true;
        } catch (error) {
            console.error('Camera error:', error);
            statusText.textContent = "Camera access denied";
            addTerminalMessage("Error: Camera access denied. Please enable camera permissions.");
            return false;
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            video.srcObject = null;
            stream = null;
        }
        if (detectionInterval) {
            clearInterval(detectionInterval);
        }
        if (verificationTimeout) {
            clearTimeout(verificationTimeout);
        }
        isFaceDetected = false;
    }

    // Improved face detection with motion and skin tone analysis
    function startDetection() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let previousFrame = null;
        let consecutiveDetections = 0;
        
        detectionInterval = setInterval(() => {
            if (!stream || video.readyState !== video.HAVE_ENOUGH_DATA) return;
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            // Motion detection
            let motionDiffCount = 0;
            let skinTonePixels = 0;
            
            if (previousFrame) {
                for (let i = 0; i < currentFrame.data.length; i += 4) {
                    // Motion detection
                    const diff = Math.abs(previousFrame.data[i] - currentFrame.data[i]) +
                                Math.abs(previousFrame.data[i+1] - currentFrame.data[i+1]) +
                                Math.abs(previousFrame.data[i+2] - currentFrame.data[i+2]);
                    if (diff > 100) motionDiffCount++;
                    
                    // Skin tone detection (basic)
                    const r = currentFrame.data[i];
                    const g = currentFrame.data[i+1];
                    const b = currentFrame.data[i+2];
                    if (r > 100 && g > 50 && b > 50 && r > g && r > b) {
                        skinTonePixels++;
                    }
                }
            }
            
            // Combined detection logic
            const motionThreshold = canvas.width * canvas.height * 0.05;
            const skinToneThreshold = canvas.width * canvas.height * 0.15;
            
            const motionDetected = motionDiffCount > motionThreshold;
            const skinToneDetected = skinTonePixels > skinToneThreshold;
            
            const currentDetection = motionDetected && skinToneDetected;
            
            if (currentDetection) {
                consecutiveDetections = Math.min(consecutiveDetections + 1, 3);
            } else {
                consecutiveDetections = Math.max(consecutiveDetections - 1, 0);
            }
            
            // Require 3 consecutive positive detections to confirm
            const confirmedDetection = consecutiveDetections >= 3;
            
            if (confirmedDetection !== isFaceDetected) {
                isFaceDetected = confirmedDetection;
                
                if (isFaceDetected) {
                    scanIcon.classList.replace('fa-fingerprint', 'fa-check');
                    scanIcon.classList.add('text-green-500');
                    statusText.textContent = "Face detected - Ready to verify";
                    addTerminalMessage("Face detected. Click verify to continue.");
                } else {
                    scanIcon.classList.replace('fa-check', 'fa-fingerprint');
                    scanIcon.classList.remove('text-green-500');
                    statusText.textContent = "Align your face in the frame";
                }
            }
            
            previousFrame = currentFrame;
        }, 500);
    }

    // UI control functions
    function showAuthModal() {
        verificationAttempts = 0;
        bioAuth.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        startCamera().then(success => {
            if (success) startDetection();
        });
    }

    function hideAuthModal() {
        bioAuth.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        stopCamera();
        statusText.textContent = "";
    }

    // Verification handler with timeout
    function handleVerification() {
        if (isFaceDetected) {
            addTerminalMessage("Verification successful! Access granted.");
            statusText.textContent = "Verification successful";
            scanIcon.classList.replace('fa-check', 'fa-lock-open');
            scanIcon.classList.add('text-green-500');
            
            verificationTimeout = setTimeout(() => {
                hideAuthModal();
                // Add your success logic here
                alert("Authentication successful!");
            }, 1500);
        } else {
            verificationAttempts++;
            addTerminalMessage(`Verification failed. Attempt ${verificationAttempts} of 3.`);
            
            if (verificationAttempts >= 3) {
                addTerminalMessage("Too many attempts. Authentication locked.");
                statusText.textContent = "Too many attempts. Please try again later.";
                scanIcon.classList.replace('fa-fingerprint', 'fa-lock');
                scanIcon.classList.add('text-red-500');
                
                verificationTimeout = setTimeout(() => {
                    hideAuthModal();
                }, 3000);
            } else {
                statusText.textContent = `Attempt ${verificationAttempts} of 3 - Please position your face`;
                // Visual feedback
                scanIcon.classList.add('animate-pulse', 'text-yellow-500');
                setTimeout(() => {
                    scanIcon.classList.remove('animate-pulse', 'text-yellow-500');
                }, 1000);
            }
        }
    }

    // Event listeners
    authSuccess.addEventListener('click', handleVerification);
    authCancel.addEventListener('click', () => {
        addTerminalMessage("Verification cancelled by user");
        hideAuthModal();
    });

    // Make functions available globally
    window.bioAuth = {
        showAuthModal: showAuthModal,
        hideAuthModal: hideAuthModal,
        addTerminalMessage: addTerminalMessage
    };

    // Cleanup on page unload
    window.addEventListener('beforeunload', stopCamera);
});








