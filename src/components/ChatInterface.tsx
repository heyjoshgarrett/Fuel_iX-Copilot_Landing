"use client";

import React from "react";
import ReactDOM from "react-dom";
import WelcomeText from "./WelcomeText";
import SnapBar from "./SnapBar";
import PromptArea from "./PromptArea";
import { DndContext, DragOverlay, useDndContext } from '@dnd-kit/core';
import ChatArea from "./ChatArea";

const ChatInterface = () => {
  const [agents, setAgents] = React.useState([]);
  const [messages, setMessages] = React.useState([]); // Chat messages
  const [chatActive, setChatActive] = React.useState(false); // AI chat mode

  // Add agent (from drag or button)
  const handleAddAgent = (agent) => {
    setAgents((prev) => prev.some((a) => a.title === agent.title) ? prev : [...prev, agent]);
  };

  // Remove agent
  const handleRemoveAgent = (title) => {
    setAgents((prev) => prev.filter((a) => a.title !== title));
  };

  // Handle agent drop
  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && over.id === 'prompt-agent-drop') {
      const agent = active.data.current;
      if (agent) handleAddAgent(agent);
    }
  };

  // Handle prompt submission from PromptArea
  const handleSendMessage = async (content) => {
    if (!content.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setChatActive(true); // Enter chat mode

    // Send message to backend API
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      const data = await res.json();
      if (data.reply) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: data.reply,
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else if (data.error) {
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          content: `Error: ${data.error}`,
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 3).toString(),
        content: 'Error: Failed to reach backend API.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // Helper to render WelcomeText at top right of viewport in chat mode
  const renderWelcomeText = () => {
    if (!chatActive) {
      // Render WelcomeText in normal flow, close to PromptArea
      return null;
    }
    // Use a portal to render at top right of the screen
    return ReactDOM.createPortal(
      <div className="fixed top-6 right-8 z-50 w-[340px] transition-all">
        <WelcomeText />
      </div>,
      document.body
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DndOverlayWithAgent />
      {renderWelcomeText()}
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className={`w-full max-w-3xl relative flex flex-col ${chatActive ? 'h-[80vh] min-h-[600px]' : 'space-y-6'}`}>  
          {/* WelcomeText is rendered in normal flow in idle state */}
          {!chatActive && (
            <div className="mb-6">
              <WelcomeText />
            </div>
          )}
          {/* ChatArea appears above PromptArea in chat mode */}
          {chatActive && (
            <div className="flex-1 min-h-0 mb-4">
              <ChatArea messages={messages} />
            </div>
          )}
          {/* PromptArea always at bottom in chat mode */}
          <div className={chatActive ? 'absolute bottom-0 left-0 w-full z-30' : ''}>
            <PromptArea
              agents={agents}
              onRemoveAgent={handleRemoveAgent}
              onSendMessage={handleSendMessage}
              chatActive={chatActive}
            />
          </div>
          {/* SnapBar hidden in chat mode */}
          {!chatActive && (
            <SnapBar onAddAgent={handleAddAgent} agentsInPrompt={agents} />
          )}
        </div>
      </div>
    </DndContext>
  );
};

function DndOverlayWithAgent() {
  const { active } = useDndContext();
  const agent = active?.data?.current;
  if (!agent) return null;
  return (
    <DragOverlay>
      <div className="flex flex-col justify-center min-w-0 flex-1 h-full rounded-xl bg-slate-50 px-4 py-2 shadow-lg border border-slate-200">
        <div className="flex items-center w-full min-w-0">
          <div className="flex items-center justify-center w-10 h-10 mr-3 shrink-0">{agent.icon}</div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-semibold text-sm text-slate-900 truncate w-full block">{agent.title}</span>
            <span className="text-sm text-slate-500 truncate w-full block">{agent.description}</span>
          </div>
        </div>
      </div>
    </DragOverlay>
  );
}

export default ChatInterface; 