import { useEffect, useRef, useState } from "react";
import styles from "./ChatbotWidget.module.css";
import { sendChatbotMessage } from "../../services/chatbotService";

const welcomeMessage = {
  id: 1,
  sender: "bot",
  text: "مرحباً بك في مساعد مركز رعاية الأيتام. يمكنني مساعدتك في أسئلة عامة عن طلب المساعدة، التبرع، الكفالة، أو التواصل مع المركز.",
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const canSend = inputValue.trim().length > 0 && !isLoading;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const loadingMessageId = Date.now() + 1;
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };
    const loadingMessage = {
      id: loadingMessageId,
      sender: "bot",
      text: "جاري تجهيز الرد...",
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      loadingMessage,
    ]);
    setInputValue("");
    setIsLoading(true);

    const reply = await sendChatbotMessage(trimmedMessage);

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === loadingMessageId
          ? { ...message, text: reply }
          : message
      )
    );
    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatbot} dir="rtl">
      {isOpen && (
        <section className={styles.panel} aria-label="مساعد الأسئلة الشائعة">
          <header className={styles.header}>
            <div>
              <h2 className={styles.title}>مساعد المركز</h2>
              <p className={styles.subtitle}>إجابات عامة وسريعة</p>
            </div>
            <button
              type="button"
              aria-label="إغلاق المحادثة"
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
              ×
            </button>
          </header>

          <div className={styles.messages} aria-live="polite">
            {messages.map((message) => {
              const isUser = message.sender === "user";

              return (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    isUser ? styles.userRow : styles.botRow
                  }`}
                >
                  <p className={`${styles.messageBubble} ${
                    isUser ? styles.userBubble : styles.botBubble
                  }`}>
                    {message.text}
                  </p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب سؤالك هنا..."
              aria-label="اكتب سؤالك للمساعد"
              disabled={isLoading}
              className={styles.input}
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!canSend}
              className={styles.sendButton}
            >
              إرسال
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "إغلاق مساعد المركز" : "فتح مساعد المركز"}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={styles.floatingButton}
      >
        {isOpen ? "×" : "؟"}
      </button>
    </div>
  );
};

export default ChatbotWidget;
