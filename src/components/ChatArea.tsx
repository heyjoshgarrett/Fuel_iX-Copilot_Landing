import React from "react";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  return (
    <ScrollArea className="w-full h-full max-h-[60vh] rounded-xl bg-white/80 border border-slate-200 p-4 shadow-md">
      <div className="flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="text-center text-slate-400 text-base py-8">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-800'}`}>
                <div className="text-sm whitespace-pre-line">{msg.content}</div>
                <div className="text-xs text-slate-400 mt-1 text-right">{msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString() : ''}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatArea; 