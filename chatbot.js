/**
 * Kalp AI Assistant - Interactive Chatbot Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const chatMinimize = document.getElementById('chat-minimize');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const quickChips = document.getElementById('quick-chips');

  if (!chatToggle || !chatWidget) return;

  // Toggle Chat open/closed
  chatToggle.addEventListener('click', () => {
    const isOpen = chatWidget.classList.toggle('active');
    chatWidget.setAttribute('aria-hidden', !isOpen);
    chatToggle.classList.toggle('active', isOpen);
    if (isOpen && chatInput) {
      setTimeout(() => chatInput.focus(), 250);
    }
  });

  if (chatMinimize) {
    chatMinimize.addEventListener('click', () => {
      chatWidget.classList.remove('active');
      chatWidget.setAttribute('aria-hidden', 'true');
      chatToggle.classList.remove('active');
    });
  }

  // Quick chips handler
  if (quickChips) {
    quickChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (chip) {
        const query = chip.getAttribute('data-query');
        if (query) {
          handleUserQuery(query);
        }
      }
    });
  }

  // Form submit handler
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (!query) return;
      chatInput.value = '';
      handleUserQuery(query);
    });
  }

  // Append Message to Log
  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}-msg`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;

    const time = document.createElement('span');
    time.className = 'msg-time';
    const now = new Date();
    time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    chatMessages.appendChild(msgDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle Query & Generate AI Response
  function handleUserQuery(query) {
    appendMessage('user', escapeHtml(query));

    // Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot-msg typing-msg';
    typingIndicator.innerHTML = '<div class="msg-bubble"><i class="fa-solid fa-ellipsis fa-fade"></i> Kalp AI is thinking...</div>';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const botResponse = getBotResponse(query);
      appendMessage('bot', botResponse);
    }, 450);
  }

  function escapeHtml(string) {
    return string
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Knowledge Engine for Kalp Shah
  function getBotResponse(input) {
    const text = input.toLowerCase();

    // 1. Greetings
    if (/^(hi|hello|hey|greetings|hola|namaste)/i.test(text)) {
      return `Hello! How can I assist you today? You can ask me about Kalp's machine learning projects, skills, education at BVM, or how to contact him!`;
    }

    // 2. About / Who is Kalp
    if (/who (is|are)|about (kalp|you)|tell me about/i.test(text)) {
      return `<strong>Kalp Shah</strong> is an <strong>Aspiring AI & Machine Learning Developer / Data Scientist</strong> currently pursuing a B.Tech in Information Technology along with an <strong>Honours in Data Science & Analytics</strong> at <strong>BVM Engineering College</strong> (graduating May 2028). He is passionate about NLP text classification, clinical risk prediction, and data science!`;
    }

    // 3. Projects
    if (/project|spamshield|heart|studymate|work|portfolio/i.test(text)) {
      return `Here are Kalp's top featured projects:<br><br>
        🛡️ <strong>SpamShield AI:</strong> Real-time NLP spam & phishing detector achieving <strong>96.0% accuracy</strong> with sublinear TF-IDF scaling (<a href="https://email-spam-eight.vercel.app/" target="_blank" style="color:#ff2a2a;text-decoration:underline;">Live Demo</a> | <a href="https://github.com/K1905-cpu/Email-spam" target="_blank" style="color:#ff2a2a;text-decoration:underline;">GitHub</a>).<br><br>
        ❤️ <strong>Heart Disease Risk Predictor:</strong> Ensemble clinical risk assessment tool with <strong>88.5% accuracy</strong> (<a href="https://heart-disease-prediction-5mwy.vercel.app/" target="_blank" style="color:#ff2a2a;text-decoration:underline;">Live Demo</a>).<br><br>
        📚 <strong>StudyMate AI:</strong> Smart academic companion for syllabus summarization and auto-generated quizzes (<a href="https://studymate-ai-flame.vercel.app/" target="_blank" style="color:#ff2a2a;text-decoration:underline;">Live Demo</a>).`;
    }

    // 4. Skills & Tech Stack
    if (/skill|tech|python|stack|language|framework|tools/i.test(text)) {
      return `Kalp's technical arsenal includes:<br>
        • <strong>Machine Learning & NLP:</strong> Scikit-Learn, TF-IDF Vectorization, LinearSVC, Logistic Regression, Random Forest.<br>
        • <strong>Data Science & Analytics:</strong> Pandas, NumPy, Matplotlib, Seaborn, Exploratory Data Analysis (EDA).<br>
        • <strong>Languages & Tools:</strong> Python 3, SQL, C++, Flask, Git, GitHub.`;
    }

    // 5. Education & College
    if (/education|bvm|college|degree|university|study|cgpa/i.test(text)) {
      return `Kalp is pursuing his <strong>B.Tech in Information Technology</strong> with an <strong>Honours in Data Science & Analytics</strong> at <strong>Birla Vishvakarma Mahavidyalaya (BVM Engineering College)</strong>, Anand, Gujarat (Expected Graduation: May 2028).`;
    }

    // 6. Certifications
    if (/certif|award|credential|google|ibm|simplilearn/i.test(text)) {
      return `Kalp holds multiple verified credentials:<br>
        🏆 Google AI Essentials<br>
        🏆 Google Prompting Essentials<br>
        🏆 IBM Artificial Intelligence Foundations<br>
        🏆 Simplilearn Machine Learning with Python<br>
        🏆 Simplilearn Python for Beginners<br>
        🏆 Machine Learning Club BVM`;
    }

    // 7. Contact / Email / Socials
    if (/contact|email|reach|hire|linkedin|github|social/i.test(text)) {
      return `You can connect with Kalp directly via:<br>
        📧 <strong>Email:</strong> <a href="mailto:shahkalp0303@gmail.com" style="color:#ff2a2a;">shahkalp0303@gmail.com</a><br>
        💻 <strong>GitHub:</strong> <a href="https://github.com/K1905-cpu" target="_blank" style="color:#ff2a2a;">github.com/K1905-cpu</a><br>
        💼 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/kalp-shah-3024ab333/" target="_blank" style="color:#ff2a2a;">linkedin.com/in/kalp-shah-3024ab333</a>`;
    }

    // 8. Resume / CV
    if (/resume|cv|download/i.test(text)) {
      return `You can download Kalp's official resume here: <a href="assets/resume.pdf" target="_blank" download="Kalp_Shah_Resume.pdf" style="color:#ff2a2a;font-weight:bold;text-decoration:underline;">📄 Download Kalp Shah Resume (PDF)</a>`;
    }

    // Fallback response
    return `That's an interesting question! Kalp is focused on Machine Learning, NLP threat classification, and Data Science. Feel free to reach him at <a href="mailto:shahkalp0303@gmail.com" style="color:#ff2a2a;text-decoration:underline;">shahkalp0303@gmail.com</a> or use the quick buttons below!`;
  }
});
