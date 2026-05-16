import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ChatbotWidget from "../components/Chatbot/ChatbotWidget";
import { Outlet } from "react-router-dom";

function MainLayouts() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatbotWidget />
    </>
  );
}

export default MainLayouts;

