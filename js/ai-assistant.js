// AI Assistant
const aiButton = document.getElementById('ai-button');
const aiChat = document.getElementById('ai-chat');
const closeAi = document.getElementById('close-ai');
const aiInput = document.getElementById('ai-input');
const aiSend = document.getElementById('ai-send');
const aiMessages = document.getElementById('ai-messages');

aiButton.addEventListener('click', () => {
    aiChat.classList.toggle('hidden');
});

closeAi.addEventListener('click', () => {
    aiChat.classList.add('hidden');
});

function addAiMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-3 p-3 rounded-lg ${isUser ? 'bg-neon-blue/20 text-right ml-8' : 'bg-cyber-700 mr-8'}`;
    messageDiv.textContent = message;
    aiMessages.appendChild(messageDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

aiSend.addEventListener('click', sendAiMessage);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAiMessage();
});

function sendAiMessage() {
    const message = aiInput.value.trim();
    if (message) {
        addAiMessage(message, true);
        aiInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I'm an AI assistant here to help you learn more about Suraj's work.",
                "Suraj specializes in creating immersive web experiences with cutting-edge technologies.",
                "Would you like to know more about any specific project or skill?",
                "Suraj is currently available for freelance work and collaborations.",
                "You can find more details about projects in the work section."
            ];
            addAiMessage(responses[Math.floor(Math.random() * responses.length)]);
        }, 1000);
    }
}