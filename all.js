const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isLight = document.body.classList.toggle("light");
        themeToggle.textContent = isLight ? "Switch to dark mode" : "Switch to light mode";
    });
}

const chatbotWidget = document.getElementById("chatbot-widget");
const chatbotLauncher = document.getElementById("chatbot-launcher");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotBody = document.getElementById("chatbot-body");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");

function toggleChatbot(forceOpen) {
    if (!chatbotWidget) return;

    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !chatbotWidget.classList.contains("open");
    chatbotWidget.classList.toggle("open", shouldOpen);
    chatbotLauncher.style.display = shouldOpen ? "none" : "block";
}

if (chatbotLauncher) {
    chatbotLauncher.addEventListener("click", () => toggleChatbot(true));
}

if (chatbotClose) {
    chatbotClose.addEventListener("click", () => toggleChatbot(false));
}

function addMessage(text, sender) {
    if (!chatbotBody) return;

    const message = document.createElement("div");
    message.className = sender === "user" ? "message user-message" : "message bot-message";
    message.textContent = text;
    chatbotBody.appendChild(message);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotReply(userMessage) {
    const text = userMessage.toLowerCase();

    if (text.includes("hi") || text.includes("hello")) {
        return "Hello! I’m here to help you learn more about Rohit’s portfolio.";
    }

    if (text.includes("skill") || text.includes("programming") || text.includes("what do you do")) {
        return "Rohit is interested in programming, gaming, cooking, reading, and trading.";
    }

    if (text.includes("project") || text.includes("work")) {
        return "Rohit’s portfolio highlights project work and coding interests, with links available in the page.";
    }

    if (text.includes("hobby") || text.includes("interest") || text.includes("fun")) {
        return "His hobbies include gaming, reading, cooking, and trading.";
    }

    if (text.includes("contact") || text.includes("mail") || text.includes("social")) {
        return "You can explore the project links and profile details on this page to connect with Rohit.";
    }

    return "I can tell you about Rohit’s skills, projects, interests, or profile details. Try asking about programming or hobbies.";
}

if (chatbotForm && chatbotInput) {
    chatbotForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const userText = chatbotInput.value.trim();

        if (!userText) {
            return;
        }

        addMessage(userText, "user");
        chatbotInput.value = "";

        window.setTimeout(() => {
            addMessage(getBotReply(userText), "bot");
        }, 300);
    });
}

if (chatbotLauncher && chatbotWidget) {
    toggleChatbot(false);
}
