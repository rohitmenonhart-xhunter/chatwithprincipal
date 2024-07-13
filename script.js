const API_URL = 'https://yourusername.pythonanywhere.com'; // Replace with your PythonAnywhere URL
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessageToChat('You', message);
        fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: message}),
        })
        .then(response => response.json())
        .then(data => {
            addMessageToChat('Principal Dr. S. Ramesh', data.response);
            playAudio(data.response);
        });
        userInput.value = '';
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function playAudio(text) {
    fetch(`${API_URL}/tts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: text}),
    })
    .then(response => response.json())
    .then(data => {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audio.play();
    });
}