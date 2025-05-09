"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, FileText, Star } from "lucide-react";
import { useDraggable } from '@dnd-kit/core';

const agents = [
  {
    iconType: "slack",
    title: "Slack / Jira",
    description: "Send updates or create tickets in your workspace.",
  },
  {
    iconType: "documenter",
    title: "Documenter",
    description: "Summarize and document your conversations.",
  },
  {
    iconType: "prioritizer",
    title: "Prioritizer",
    description: "Highlight and rank the most important tasks.",
  },
];

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

const AgentCard = ({ iconType, title, description, onAddAgent, isAdded }) => {
  const [hovered, setHovered] = useState(false);
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `agent-${title}`,
    data: { iconType, title, description },
  });
  return (
    <Card
      ref={setNodeRef}
      className={
        `flex flex-col justify-center min-w-0 flex-1 h-full rounded-xl bg-slate-50 px-4 py-2 transition-shadow duration-200 select-none ` +
        (hovered
          ? "shadow-lg bg-gradient-to-br from-slate-100 to-slate-100/80"
          : "shadow") +
        (isDragging ? " opacity-50 cursor-grabbing" : " cursor-grab")
      }
      style={{ flex: 1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center w-full min-w-0">
        {/* Drag handle: listeners only on this area */}
        <div
          className="flex items-center w-full min-w-0 cursor-grab"
          {...listeners}
          {...attributes}
          style={{ flex: 1 }}
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 mr-3 shrink-0">{getIcon(iconType)}</div>
          {/* Title & Description */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-semibold text-sm text-slate-900 truncate w-full block">{title}</span>
            <span className="text-sm text-slate-500 truncate w-full block">{description}</span>
          </div>
        </div>
        {/* Plus Button (only on hover) */}
        <div className="ml-3 flex items-center shrink-0">
          {hovered && (
            <Button
              size="icon"
              className="h-10 w-10 rounded-[6px] transition-colors duration-150 bg-transparent hover:bg-gray-200"
              tabIndex={-1}
              disabled={isAdded}
              onClick={e => {
                e.stopPropagation();
                if (!isAdded) onAddAgent({ iconType, title, description });
              }}
            >
              <Plus className={isAdded ? "h-5 w-5 text-gray-300" : "h-5 w-5 text-gray-600"} />
              <span className="sr-only">Add {title}</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

const SnapBar = ({ onAddAgent, agentsInPrompt }) => {
  return (
    <div className="w-full max-w-3xl mx-auto h-[72px] flex items-center">
      <div className="flex gap-4 w-full h-full">
        {agents.map((agent) => (
          <AgentCard
            key={agent.title}
            {...agent}
            onAddAgent={onAddAgent}
            isAdded={!!agentsInPrompt.find((a) => a.title === agent.title)}
          />
        ))}
      </div>
    </div>
  );
};

function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return children;
}

export default SnapBar; 