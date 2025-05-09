"use client";

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
import { SendHorizontal, Mic, Plus, X, MessageSquare, FileText, Star } from "lucide-react";
import './PromptArea.css';
import { useDroppable, useDndContext } from '@dnd-kit/core';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Agent {
  iconType: string;
  title: string;
  description: string;
}

interface PromptAreaProps {
  agents: Agent[];
  onRemoveAgent: (title: string) => void;
  onSendMessage: (content: string) => void;
  chatActive?: boolean;
}

// Helper to render the correct icon
function getIcon(iconType: string) {
  switch (iconType) {
    case "slack":
      return <MessageSquare className="w-5 h-5 mr-1 text-blue-500" />;
    case "documenter":
      return <FileText className="w-5 h-5 mr-1 text-green-600" />;
    case "prioritizer":
      return <Star className="w-5 h-5 mr-1 text-yellow-600" />;
    default:
      return null;
  }
}

const PromptArea = ({ agents, onRemoveAgent, onSendMessage, chatActive }: PromptAreaProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({ id: 'prompt-agent-drop' });
  const { active } = useDndContext();
  const isDraggingAgent = !!active;

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
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={cn("w-full flex justify-center items-center bg-slate-50", chatActive && "pb-2")}>
      <div className="w-full" style={{ position: 'relative' }}>
        <Card 
          className={cn(
            "w-full rounded-xl overflow-hidden transition-shadow duration-200 relative z-10 border border-slate-200",
            isActive ? "border-opacity-0 bg-slate-50/95" : "border-opacity-100 bg-slate-50",
            "hover:shadow-[0_4px_16px_-1px_rgba(0,0,0,0.1)]",
            isActive && "active-card",
            chatActive && "shadow-xl"
          )}
          style={{ padding: 0 }}
        >
          {/* Overlay inside the Card, perfectly aligned and matching radius */}
          {isDraggingAgent && (
            <div
              ref={setDropNodeRef}
              className={
                cn(
                  "absolute inset-0 z-30 flex items-center justify-center transition-all duration-200 rounded-xl",
                  isOver ? "bg-blue-100/70 border-2 border-blue-400" : "bg-slate-200/60 border-2 border-dashed border-slate-400"
                )
              }
              style={{ pointerEvents: 'auto' }}
            >
              <span className={cn("text-lg font-semibold text-blue-700", isOver ? "opacity-100" : "opacity-80")}>Drop to add agent</span>
            </div>
          )}
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
                <div className="flex gap-x-3" style={{ minHeight: 40 }}>
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
                        <p>Add files or apps</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {/* Render dropped agents compactly */}
                  {agents.map((agent) => (
                    <RemovableAgentCard key={agent.title} agent={agent} onRemove={onRemoveAgent} />
                  ))}
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
                            ? "bg-blue-500 hover:bg-blue-600" 
                            : "bg-gray-100"
                        )}
                        disabled={!inputValue.trim()}
                      >
                        {inputValue.trim() ? (
                          <SendHorizontal className="h-5 w-5 text-white" />
                        ) : (
                          <Mic className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="sr-only">
                          {inputValue.trim() ? "Send message" : "Dictate voice"}
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
  );
};

function RemovableAgentCard({ agent, onRemove }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 border border-slate-200 ml-1 h-10 min-w-0 relative group"
      style={{ height: 40 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {getIcon(agent.iconType)}
      <span className="text-xs font-medium text-slate-800 truncate max-w-[80px]">{agent.title}</span>
      {/* Remove X button, only visible on hover */}
      <div className="flex items-center ml-1">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={
                  'rounded-full p-1 transition-colors duration-150 bg-transparent hover:bg-red-100 focus:bg-red-100 focus:outline-none ' +
                  (hovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')
                }
                style={{ width: 22, height: 22 }}
                tabIndex={-1}
                onClick={() => onRemove(agent.title)}
              >
                <X className="w-3.5 h-3.5 text-red-500" />
                <span className="sr-only">Remove {agent.title}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={4} className="text-xs font-medium bg-gray-900 text-white/[0.82] px-2 py-1 rounded">
              Remove
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default PromptArea;