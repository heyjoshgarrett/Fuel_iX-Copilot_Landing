"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Search, Filter, Bell, Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const welcomeMessages = [
  { text: "3 new Slack messages from the Fuel team", app: "Slack", time: "5m" },
  { text: "Updates to your Objectives Google doc", app: "Google Docs", time: "10m" },
  { text: "5 pull requests need your review on GitHub", app: "GitHub", time: "15m" },
  { text: "Team standup in 15 minutes on Google Meet", app: "Google Meet", time: "20m" },
  { text: "2 comments on your Figma design", app: "Figma", time: "25m" },
  { text: "New tasks assigned to you in Jira", app: "Jira", time: "30m" },
  { text: "3 emails need your response in Outlook", app: "Outlook", time: "35m" },
  { text: "Updates to the Q4 Planning spreadsheet", app: "Google Sheets", time: "40m" },
  { text: "Calendar: 1:1 with Sarah in 30 minutes", app: "Google Calendar", time: "45m" },
  { text: "4 new mentions in Notion docs", app: "Notion", time: "50m" },
  { text: "Teams: Marketing channel is active", app: "Teams", time: "55m" },
  { text: "Asana: 2 tasks due today", app: "Asana", time: "1h" },
  { text: "Miro board updated by Design team", app: "Miro", time: "2h" },
  { text: "Confluence: Changes to Product Specs", app: "Confluence", time: "3h" },
];

const WelcomeText: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');

  useEffect(() => {
    if (!isExpanded) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isExpanded]);

  const filteredMessages = welcomeMessages.filter(message => {
    const matchesSearch = message.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.app.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesApp = selectedApp === 'all' || message.app === selectedApp;
    const matchesTime = selectedTime === 'all' || (
      selectedTime === 'recent' ? ['5m', '10m', '15m'].includes(message.time) :
      selectedTime === 'hour' ? message.time.includes('m') :
      selectedTime === 'older' ? message.time.includes('h') : true
    );

    return matchesSearch && matchesApp && matchesTime;
  });

  const uniqueApps = Array.from(new Set(welcomeMessages.map(m => m.app)));

  return (
    <div className={`relative w-full max-w-3xl mx-auto ${isExpanded ? 'h-[50vh] min-h-[300px] max-h-[50vh]' : 'h-[64px]'} transition-all duration-300 ease-in-out`}>
      {!isExpanded ? (
        // Collapsed view with cycling messages
        <div 
          className="relative h-full flex items-center justify-center w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onClick={() => setIsExpanded(true)}
        >
          {/* Bell Icon - Positioned inside the container */}
          <div className="absolute left-6 flex items-center">
            <Bell className={`h-5 w-5 text-[#1e3a5f] transition-opacity duration-200 ${isHovered ? 'opacity-100 text-[#2d5a94]' : 'opacity-0'}`} />
          </div>

          {/* Container for the text */}
          <div 
            className={`
              relative inline-flex items-center justify-center w-full h-full px-16 py-4 rounded-xl transition-all duration-200
              ${isHovered ? 'ring-1 ring-slate-200' : ''}
              ${isPressed ? 'scale-[0.98] ring-2 ring-slate-200' : ''}
            `}
          >
            <motion.h1
              key={currentIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`
                text-2xl font-semibold text-center text-[#1e3a5f] cursor-pointer transition-colors
                ${isHovered ? 'text-[#2d5a94]' : ''}
                ${isPressed ? 'text-[#1e3a5f]' : ''}
              `}
            >
              {welcomeMessages[currentIndex].text}
            </motion.h1>
          </div>
        </div>
      ) : (
        // Expanded view with notification list
        <motion.div
          initial={{ opacity: 0, height: 45 }}
          animate={{ opacity: 1, height: "100%" }}
          exit={{ opacity: 0, height: 45 }}
          className="rounded-xl w-full h-full flex flex-col overflow-hidden"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          {/* Combined header with search and filters */}
          <div className="flex-none flex items-center gap-3 mb-4">
            {/* Search bar with Notifications title */}
            <div className="flex-1 relative group">
              <Bell className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#1e3a5f]" />
              <Input
                placeholder="Search notifications"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  pl-12 py-4 bg-slate-50 border-slate-200 rounded-xl text-xl font-semibold
                  placeholder:text-[#1e3a5f]/50 placeholder:font-semibold
                  hover:placeholder:text-[#1e3a5f]/65
                  focus:placeholder:text-[#1e3a5f]/60
                  ${searchQuery ? 'text-[#1e3a5f]' : 'text-[#1e3a5f]/50'}
                `}
              />
            </div>

            {/* Apps filter */}
            <Select value={selectedApp} onValueChange={setSelectedApp}>
              <SelectTrigger className="w-[140px] bg-slate-50 border-slate-200 rounded-xl">
                <SelectValue placeholder="All apps" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white shadow-lg z-50">
                <SelectItem value="all">All apps</SelectItem>
                {uniqueApps.map(app => (
                  <SelectItem key={app} value={app}>{app}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Time filter */}
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-[50px] bg-slate-50 border-slate-200 rounded-xl">
                <Clock className="h-5 w-5 text-slate-500" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white shadow-lg z-50">
                <SelectItem value="all">All time</SelectItem>
                <SelectItem value="recent">Last 15m</SelectItem>
                <SelectItem value="hour">This hour</SelectItem>
                <SelectItem value="older">Older</SelectItem>
              </SelectContent>
            </Select>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="hover:bg-slate-100 rounded-xl"
            >
              <X className="h-5 w-5 text-slate-500" />
            </Button>
          </div>

          {/* Notification list container with gradient overlay */}
          <div className="relative flex-1 min-h-0">
            {/* Notification list */}
            <div 
              className="absolute inset-0 overflow-y-auto space-y-2 pr-4 -mr-4 hover:pr-0 hover:-mr-0 transition-[padding,margin] duration-200"
            >
              <div className="space-y-2 hover-scrollbar">
                <AnimatePresence>
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-[#1e3a5f]">{message.text}</p>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium text-blue-600">{message.app}</span>
                          <span className="text-xs text-slate-400">{message.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WelcomeText; 