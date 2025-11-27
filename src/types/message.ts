export interface Message {
  id?: number;
  sender: string;
  text: string;
  timestamp: string;
  isSentByMe: boolean;
}
