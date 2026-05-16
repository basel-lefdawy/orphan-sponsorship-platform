const CHATBOT_ENDPOINT = "/api/chatbot";
const CHATBOT_FALLBACK_REPLY =
  "تعذر الحصول على رد من المساعد حالياً. يرجى المحاولة لاحقاً.";

export async function sendChatbotMessage(message) {
  try {
    const response = await fetch(CHATBOT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      return CHATBOT_FALLBACK_REPLY;
    }

    const result = await response.json();

    return result?.data?.reply || CHATBOT_FALLBACK_REPLY;
  } catch {
    return CHATBOT_FALLBACK_REPLY;
  }
}
