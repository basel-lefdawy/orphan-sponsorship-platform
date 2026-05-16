const CHATBOT_ENDPOINT = "/api/chatbot";
const CHATBOT_FALLBACK_REPLY =
  "تعذر الحصول على رد من المساعد حالياً. يرجى المحاولة لاحقاً.";

export async function sendChatbotMessage(message) {
  const trimmedMessage = typeof message === "string" ? message.trim() : "";

  console.log("[chatbot] frontend sendChatbotMessage", {
    timestamp: new Date().toISOString(),
    message: trimmedMessage,
  });

  if (!trimmedMessage) {
    return CHATBOT_FALLBACK_REPLY;
  }

  try {
    const response = await fetch(CHATBOT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: trimmedMessage }),
    });

    const result = await response.json();

    if (!response.ok) {
      return result?.message || CHATBOT_FALLBACK_REPLY;
    }

    return result?.data?.reply || CHATBOT_FALLBACK_REPLY;
  } catch {
    return CHATBOT_FALLBACK_REPLY;
  }
}
