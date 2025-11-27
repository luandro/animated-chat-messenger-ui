import fundingMessages from "@/data/grant_messages.json";
import courseMessages from "@/data/course_messages.json";
import supportMessages from "@/data/support_messages.json";
import fundingMessagesPt from "@/data/grant_messages_pt.json";
import courseMessagesPt from "@/data/course_messages_pt.json";
import supportMessagesPt from "@/data/support_messages_pt.json";
import indigenousMessages from "@/data/indigenous_ai_validation_flow_en.json";
import indigenousMessagesPt from "@/data/indigenous_ai_validation_flow_pt.json";
import { Message } from "@/types/message";

export interface DialogueConfig {
  id: string;
  name: string;
  messagesEn: Message[];
  messagesPt: Message[];
}

export const dialogues: DialogueConfig[] = [
  {
    id: "funding",
    name: "Funding Opportunity Plugin",
    messagesEn: fundingMessages as Message[],
    messagesPt: fundingMessagesPt as Message[],
  },
  {
    id: "course",
    name: "Course Plugin",
    messagesEn: courseMessages as Message[],
    messagesPt: courseMessagesPt as Message[],
  },
  {
    id: "support",
    name: "Product Support Plugin",
    messagesEn: supportMessages as Message[],
    messagesPt: supportMessagesPt as Message[],
  },
  {
    id: "indigenous",
    name: "Indigenous AI Validation Flow",
    messagesEn: indigenousMessages as Message[],
    messagesPt: indigenousMessagesPt as Message[],
  },
];

export const getDialogueById = (id: string, language: string = "en"): Message[] => {
  const dialogue = dialogues.find((d) => d.id === id);
  if (!dialogue) {
    // Default to first dialogue if not found
    return language === "pt" ? dialogues[0].messagesPt : dialogues[0].messagesEn;
  }
  return language === "pt" ? dialogue.messagesPt : dialogue.messagesEn;
};
