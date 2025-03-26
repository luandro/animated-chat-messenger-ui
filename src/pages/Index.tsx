import fundingMessages from "@/data/grant_messages.json";
import courseMessages from "@/data/course_messages.json"; 
import supportMessages from "@/data/support_messages.json";
import fundingMessagesPt from "@/data/grant_messages_pt.json";
import courseMessagesPt from "@/data/course_messages_pt.json";
import supportMessagesPt from "@/data/support_messages_pt.json";
import productionMessages from "@/data/production_messages.json";
import productionMessagesPt from "@/data/production_messages_pt.json";
import ourProductionPt from "@/data/our_production_messages_pt.json";
import ourProduction from "@/data/our_production_messages.json";
import ChatContainer from "@/components/ChatContainer";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  const [key, setKey] = useState(0);
  const [immediate, setImmediate] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse URL parameters
  const params = new URLSearchParams(location.search);
  const [language, setLanguage] = useState(params.get("lang") || "en");
  const [story, setStory] = useState(location.pathname.slice(1) || "funding");

  const getMessages = () => {
    if (language === "pt") {
      switch (story) {
        case "funding":
          return fundingMessagesPt;
        case "course":
          return courseMessagesPt;
        case "support":
          return supportMessagesPt;
        case "production":
          return productionMessagesPt;
        case "production_DM":
          return ourProductionPt;
        default:
          return fundingMessagesPt;
      }
    }

    switch (story) {
      case "funding":
        return fundingMessages;
      case "course":
        return courseMessages;
      case "support":
        return supportMessages;
      case "production":
        return productionMessages;
      case "production_DM":
        return ourProduction;
      default:
        return fundingMessages;
    }
  };


  const handleReset = () => {
    setKey((prev) => prev + 1);
    setImmediate(false);
  };

  const handleAdvance = () => {
    setImmediate(true);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const isNotAtBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight > 20;
    setShowScrollButton(isNotAtBottom);
  };

  const handleStoryChange = (newStory: string) => {
    setStory(newStory);
    navigate(`/${newStory}?lang=${language}`);
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    navigate(`/${story}?lang=${newLang}`);
  };

  return (
    <div className="min-h-screen bg-chat-bg">
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        <Header
          currentStory={story}
          currentLanguage={language}
          onStoryChange={handleStoryChange}
          onLanguageChange={handleLanguageChange}
          onReset={handleReset}
          onAdvance={handleAdvance}
        />
        <div
          className="flex-1 overflow-y-auto chat-scroll-container relative"
          onScroll={handleScroll}
        >
          <ChatContainer
            key={key}
            messages={getMessages()}
            immediate={immediate}
            reset={handleReset}
          />
        </div>
        <div className="p-4 bg-chat-bubble-received/30">
          <div className="bg-chat-bubble-received rounded-full px-4 py-2 text-gray-400">
            Type a message...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;