import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const welcomeMessages = [
  "3 new Slack messages from the Fuel team",
  "Updates to your Objectives Google doc",
  "5 pull requests need your review on GitHub",
  "Team standup in 15 minutes on Google Meet",
  "2 comments on your Figma design",
  "New tasks assigned to you in Jira",
  "3 emails need your response in Outlook",
  "Updates to the Q4 Planning spreadsheet",
  "Calendar: 1:1 with Sarah in 30 minutes",
  "4 new mentions in Notion docs",
  "Teams: Marketing channel is active",
  "Asana: 2 tasks due today",
  "Miro board updated by Design team",
  "Confluence: Changes to Product Specs",
];

const WelcomeText: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[45px] relative overflow-hidden">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[15px] z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to bottom, rgb(248 250 252) 0%, rgba(248, 250, 252, 0) 100%)'
           }}
      />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[15px] z-10 pointer-events-none"
           style={{
             background: 'linear-gradient(to top, rgb(248 250 252) 0%, rgba(248, 250, 252, 0) 100%)'
           }}
      />

      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="text-3xl font-semibold text-center text-[#1e3a5f] absolute w-full"
        >
          {welcomeMessages[currentIndex]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default WelcomeText; 