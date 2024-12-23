const chatList = document.getElementById('chat-area');
const typingForm = document.querySelector('.chat-input');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');
const clearButton = document.querySelector('.clear-chat'); // Clear button

// Handle form submission to send user message and get bot response
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    
    if (userMessage === '') return; // Avoid sending empty messages

    // Display user message
    chatList.innerHTML += `<div class="message user"><span>User: ${userMessage}</span></div>`;

    // Send request to server to generate content
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: `This is for the application of a chatbot, so my users only need short and precise answers. Can you generate a short and precise content for the question below: ${userMessage}` })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Display bot response
        chatList.innerHTML += `<div class="message bot"><span>Bot: ${data.text}</span></div>`;

    } catch (error) {
        console.error('Error:', error);
        chatList.innerHTML += `<div class="message bot"><span>Bot: An error occurred. Please try again later.</span></div>`;
    }

    // Scroll to the bottom of the chat area after a message is added
    chatList.scrollTop = chatList.scrollHeight;

    // Clear input field
    userInput.value = '';
});

// Clear chat functionality
clearButton.addEventListener('click', () => {
    chatList.innerHTML = ''; // Clear all messages in the chat area
});
