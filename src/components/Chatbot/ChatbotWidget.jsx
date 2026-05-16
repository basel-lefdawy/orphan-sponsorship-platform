import { useEffect, useRef, useState } from "react";
import styles from "./ChatbotWidget.module.css";

const welcomeMessage = {
  id: 1,
  sender: "bot",
  text: "مرحباً بك في مساعد مركز رعاية الأيتام. يمكنني مساعدتك في أسئلة عامة عن طلب المساعدة، التبرع، الكفالة، أو التواصل مع المركز.",
};

const getStaticReply = (message) => {
  const normalizedMessage = message.trim().toLowerCase();

  if (
    normalizedMessage.includes("مساعدة") ||
    normalizedMessage.includes("طلب") ||
    normalizedMessage.includes("احتياج")
  ) {
    return "يمكنك تقديم طلب مساعدة من خلال نموذج طلب المساعدة الموجود في الموقع. سيقوم الفريق بمراجعة الطلب والتواصل معك حسب الإجراءات المتاحة.";
  }

  if (
    normalizedMessage.includes("تبرع") ||
    normalizedMessage.includes("تبرعات") ||
    normalizedMessage.includes("donation")
  ) {
    return "معلومات التبرع متاحة في قسم التبرعات داخل الموقع. يمكنك مراجعة القسم لمعرفة الطرق العامة لدعم المركز.";
  }

  if (
    normalizedMessage.includes("كفالة") ||
    normalizedMessage.includes("كافل") ||
    normalizedMessage.includes("sponsor")
  ) {
    return "معلومات الكفالة متاحة في قسم الكفالة داخل الموقع. يمكنك الاطلاع على التفاصيل العامة من هناك.";
  }

  if (
    normalizedMessage.includes("تواصل") ||
    normalizedMessage.includes("اتصال") ||
    normalizedMessage.includes("رقم") ||
    normalizedMessage.includes("contact")
  ) {
    return "يمكنك التواصل مع المركز من خلال قسم التواصل في الموقع، حيث تتوفر معلومات الاتصال أو نموذج التواصل العام.";
  }

  return "عذراً، يمكنني المساعدة فقط في الأسئلة العامة المتعلقة بمركز رعاية الأيتام مثل طلب المساعدة، التبرع، الكفالة، أو التواصل.";
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const canSend = inputValue.trim().length > 0;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSendMessage = () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: getStaticReply(trimmedMessage),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      botMessage,
    ]);
    setInputValue("");
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
