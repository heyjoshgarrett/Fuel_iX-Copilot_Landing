import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SendHorizontal, Mic, UserCircle2, Plus } from "lucide-react";
import WelcomeText from "./WelcomeText";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '68px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${Math.min(68, scrollHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientPulse {
          0% {
            box-shadow: 0 2px 15px 0px rgba(59, 130, 246, 0.3),
                      0 2px 15px 0px rgba(236, 72, 153, 0.3);
          }
          50% {
            box-shadow: 0 4px 18px 2px rgba(59, 130, 246, 0.4),
                      0 4px 18px 2px rgba(236, 72, 153, 0.4);
          }
          100% {
            box-shadow: 0 2px 15px 0px rgba(59, 130, 246, 0.3),
                      0 2px 15px 0px rgba(236, 72, 153, 0.3);
          }
        }
        .active-card {
          animation: gradientPulse 2.4s ease-in-out infinite;
        }
      `}</style>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-3xl space-y-12">
          <WelcomeText />
          <Card 
            className={cn(
              "w-full rounded-xl overflow-hidden transition-shadow duration-200",
              "hover:shadow-[0_4px_16px_-1px_rgba(0,0,0,0.1)]",
              isActive && "active-card"
            )}
          >
            <div className="flex h-[128px] p-3">
              <div className="flex w-full flex-col">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setIsActive(true)}
                  onBlur={() => setIsActive(false)}
                  placeholder="Type your message..."
                  className="flex-1 resize-none rounded-xl bg-transparent p-4 text-base ring-offset-background placeholder:text-gray-400 hover:placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex justify-between items-end mt-2">
                  <div className="flex gap-x-3">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon"
                            className="h-10 w-10 rounded-[6px] bg-gray-100 hover:bg-gray-200"
                          >
                            <UserCircle2 className="h-5 w-5 text-gray-600" />
                            <span className="sr-only">Profile</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="bottom" 
                          sideOffset={4}
                          className="text-sm font-medium bg-gray-900 text-white/[0.82] px-3 py-1.5 rounded-[6px]"
                        >
                          <p>View Profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="icon"
                            className="h-10 w-10 rounded-[6px] bg-gray-100 hover:bg-gray-200"
                          >
                            <Plus className="h-5 w-5 text-gray-600" />
                            <span className="sr-only">Add</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="bottom" 
                          sideOffset={4}
                          className="text-sm font-medium bg-gray-900 text-white/[0.82] px-3 py-1.5 rounded-[6px]"
                        >
                          <p>Add files and more</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          onClick={handleSendMessage}
                          size="icon"
                          className={cn(
                            "h-10 w-10 rounded-[6px]",
                            inputValue.trim() 
                              ? "bg-gray-100 hover:bg-gray-200" 
                              : "bg-blue-500 hover:bg-blue-600"
                          )}
                        >
                          {inputValue.trim() ? (
                            <SendHorizontal className="h-5 w-5 text-gray-600" />
                          ) : (
                            <Mic className="h-5 w-5 text-white" />
                          )}
                          <span className="sr-only">
                            {inputValue.trim() ? "Send message" : "Start voice input"}
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="bottom" 
                        sideOffset={4}
                        className="text-sm font-medium bg-gray-900 text-white/[0.82] px-3 py-1.5 rounded-[6px]"
                      >
                        <p>{inputValue.trim() ? "Send Message" : "Dictate voice"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ChatInterface; 