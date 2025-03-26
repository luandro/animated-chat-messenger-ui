import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Play } from "lucide-react";

export interface Message {
  sender: string;
  text: string;
  timestamp: string;
  isSentByMe: boolean;
  mediaType?: "video" | "document" | "button" | "image" | "audio";
  mediaUrl?: string;
  mediaTitle?: string;
  mediaSize?: string;
  buttonText?: string;
}

interface ChatMessageProps {
  message: Message;
  showSender: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, showSender }) => {
  const highlightMentions = (text: string) => {
    return text.split(" ").map((word, index) => {
      if (word.startsWith("@")) {
        return (
          <span key={index} className="text-chat-mention cursor-pointer">
            {word}{" "}
          </span>
        );
      }
      if (word.match(/(?:\+\d{1,2}-\d{3}-\d{4}|\d{3}-\d{4}|\d{10})/)) {
        return (
          <span key={index} className="text-chat-mention cursor-pointer">
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  const renderMedia = () => {
    if (!message.mediaType) return null;

    switch (message.mediaType) {
      case "document":
        return (
          <div className="mt-2 bg-gray-100 rounded-lg p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200">
            <FileText className="h-8 w-8 text-blue-500" />
            <div className="flex-1">
              <div className="text-sm font-medium">{message.mediaTitle}</div>
              <div className="text-xs text-gray-500">{message.mediaSize}</div>
            </div>
          </div>
        );
      case "image":
        return (
          <div className="mt-2 rounded-lg overflow-hidden relative group">
            <img
              src={message.mediaUrl}
              alt={message.mediaTitle}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onError={() => {
                console.log("Image failed to load");
              }}
            />
          </div>
        );
      case "audio":
        return (
          <div className="mt-2 rounded-lg overflow-hidden relative group">
            <audio
              src={message.mediaUrl}
              controls
              preload="metadata"
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onError={() => {
                console.log("Audio failed to load");
              }}
            />
          </div>
        );
      case "video":
        return (
          <div className="mt-2 rounded-lg overflow-hidden relative group">
            <div
              className="relative w-full max-w-[320px] aspect-video rounded-lg bg-black/10 cursor-pointer"
              onClick={() => {
                const dialog = document.getElementById(`video-${message.timestamp}`) as HTMLDialogElement;
                if (dialog) dialog.showModal();
              }}
            >
              <video
                className="w-full h-full object-cover rounded-lg"
                preload="metadata"
                onError={() => {
                  console.log("Video failed to load");
                }}
              >
                <source src={message.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/25 rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-gray-800 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-1 text-xs text-gray-500 flex items-center gap-2">
              <Play className="h-4 w-4" />
              <span>{message.mediaTitle}</span>
              <span>•</span>
              <span>{message.mediaSize}</span>
            </div>

            {/* Fullscreen video modal */}
            <dialog id={`video-${message.timestamp}`} className="modal bg-black/90 fixed inset-0 w-full h-full p-4">
              <div className="w-full h-full flex flex-col">
                <div className="flex justify-end mb-4">
                  <button
                    className="text-white hover:text-gray-300"
                    onClick={() => {
                      const dialog = document.getElementById(`video-${message.timestamp}`) as HTMLDialogElement;
                      if (dialog) dialog.close();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <video
                  className="w-full h-full"
                  controls
                  >
                  <source src={message.mediaUrl} type="video/mp4" />
                </video>
              </div>
            </dialog>
          </div>
        );
      case "button":
        return (
          <Button
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => console.log("Button clicked:", message.buttonText)}
          >
            {message.buttonText}
          </Button>
        );
      default:
        return null;
    }
  };

  const isBot = message.sender.includes("(Bot)");
  const avatarUrl = isBot
    ? "https://st5.depositphotos.com/72897924/62255/v/450/depositphotos_622556394-stock-illustration-robot-web-icon-vector-illustration.jpg"
    : `https://i.pravatar.cc/300?u=${message.sender}`;

  return (
    <div
      className={cn(
        "animate-message-in opacity-0 group flex gap-3 px-4",
        message.isSentByMe ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div className="flex-shrink-0 w-8">
        {showSender && (
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{message.sender[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div
        className={cn(
          "flex flex-col max-w-[70%]",
          message.isSentByMe && "items-end",
        )}
      >
        {showSender && !message.isSentByMe && (
          <span className="text-xs text-gray-400 mb-1">{message.sender}</span>
        )}
        <div
          className={cn(
            "rounded-lg px-4 py-2 break-words w-fit",
            message.isSentByMe
              ? "bg-chat-bubble-sent text-white"
              : "bg-chat-bubble-received text-gray-100",
          )}
        >
          <p className="text-sm whitespace-pre-line">
            {highlightMentions(message.text)}
          </p>
          {renderMedia()}
          <span className="text-[10px] text-gray-300 block text-right mt-1">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;