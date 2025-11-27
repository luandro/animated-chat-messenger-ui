import React, { useState, useEffect } from "react";
import { Message } from "@/types/message";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: Message[];
  reset: () => void;  // Added reset to the interface
}

const ChatContainer: React.FC<ChatContainerProps & { immediate?: boolean }> = ({
  messages,
  immediate,
  reset,
}) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    if (immediate) {
      setVisibleMessages(messages);
      setIsTyping(false);
      return;
    }

    setVisibleMessages([]); // Reset visible messages when messages prop changes
    const showMessages = async () => {
      for (let i = 0; i < messages.length; i++) {
        if (isCancelled) return;

        setIsTyping(true);
        const delay = Math.random() * 2500 + 500;
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (isCancelled) return;

        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, messages[i]]);

        if (i < messages.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
    };

    showMessages();

    return () => {
      isCancelled = true;
    };
  }, [messages, immediate]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {visibleMessages.map((message, index) => {
        const showSender =
          index === 0 || visibleMessages[index - 1].sender !== message.sender;
        return (
          <ChatMessage
            key={index}
            message={message}
            showSender={showSender}
          />
        );
      })}
      {isTyping && <TypingIndicator />}
      {!isTyping && visibleMessages.length === messages.length && (
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default ChatContainer;