import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Settings,
  Users,
  Workflow,
  Bot,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface DemoSectionProps {
  title?: string;
  description?: string;
}

const DemoSection = ({
  title = "See AI Agents in Action",
  description = "Experience how our AI agents enhance productivity and creativity in real work environments.",
}: DemoSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : 3));
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-50 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          {/* Demo Interface Header */}
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">Fuel iX Demo</span>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-gray-700"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agent Settings</DialogTitle>
                    <DialogDescription>
                      Configure your AI agent's behavior and capabilities.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm">
                        Response Style:
                      </label>
                      <select className="col-span-3 p-2 border rounded">
                        <option>Concise</option>
                        <option>Detailed</option>
                        <option>Conversational</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm">
                        Knowledge Base:
                      </label>
                      <select className="col-span-3 p-2 border rounded">
                        <option>Company Docs</option>
                        <option>Industry Standards</option>
                        <option>General Knowledge</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-right text-sm">
                        Creativity Level:
                      </label>
                      <input
                        type="range"
                        className="col-span-3"
                        min="1"
                        max="10"
                        defaultValue="7"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            <Tabs defaultValue="workflow" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="workflow">
                  <Workflow className="h-4 w-4 mr-2" />
                  Workflow
                </TabsTrigger>
                <TabsTrigger value="assistant">
                  <Bot className="h-4 w-4 mr-2" />
                  Assistant
                </TabsTrigger>
                <TabsTrigger value="team">
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </TabsTrigger>
              </TabsList>

              <TabsContent value="workflow" className="space-y-4 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">
                    Automated Workflow
                  </h3>
                  <div className="flex flex-col space-y-4">
                    <div
                      className={`p-4 rounded-lg border ${currentStep === 1 ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Data Collection</h4>
                          <p className="text-sm text-gray-600">
                            AI agent automatically gathers relevant information
                            from multiple sources
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${currentStep === 2 ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Analysis & Processing</h4>
                          <p className="text-sm text-gray-600">
                            Agent analyzes data and generates insights based on
                            patterns
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${currentStep === 3 ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"}`}
                    >
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Report Generation</h4>
                          <p className="text-sm text-gray-600">
                            Creates comprehensive reports and actionable
                            recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                  <Button variant="outline" size="sm" onClick={prevStep}>
                    <SkipBack className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" onClick={togglePlayback}>
                    {isPlaying ? (
                      <Pause className="h-4 w-4 mr-1" />
                    ) : (
                      <Play className="h-4 w-4 mr-1" />
                    )}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextStep}>
                    Next
                    <SkipForward className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="assistant" className="space-y-4 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">
                    AI Assistant Chat
                  </h3>
                  <div className="flex flex-col space-y-4 max-h-80 overflow-y-auto">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-800" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          I need to prepare a competitive analysis report for
                          our new product launch. Can you help?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end">
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          I'd be happy to help with your competitive analysis
                          report. I'll need some information about your product
                          and target competitors. Would you like me to create a
                          template first?
                        </p>
                      </div>
                      <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center ml-3">
                        <Bot className="h-4 w-4 text-purple-800" />
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                        <Users className="h-4 w-4 text-blue-800" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Yes, a template would be great. We're launching a new
                          project management software and need to analyze Asana,
                          Monday, and ClickUp.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end">
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          I've created a competitive analysis template for your
                          project management software. It includes sections for
                          feature comparison, pricing analysis, target audience,
                          and market positioning. I've pre-filled some
                          information about Asana, Monday, and ClickUp. Would
                          you like me to share it with your team?
                        </p>
                      </div>
                      <div className="bg-purple-100 rounded-full h-8 w-8 flex items-center justify-center ml-3">
                        <Bot className="h-4 w-4 text-purple-800" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <input
                      type="text"
                      placeholder="Ask your AI assistant..."
                      className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button className="rounded-l-none">Send</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-4 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4">
                    Team Collaboration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <span className="text-orange-800 font-medium">
                            JD
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Jane Doe</h4>
                          <p className="text-xs text-gray-500">
                            Product Manager
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm">
                          AI agent is helping me track project milestones and
                          automatically sending progress reports to
                          stakeholders.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-800 font-medium">MS</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Mike Smith</h4>
                          <p className="text-xs text-gray-500">Developer</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm">
                          Using the AI to generate code documentation and
                          troubleshoot bugs has saved me hours of work each
                          week.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="text-purple-800 font-medium">
                            AL
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">Amy Lee</h4>
                          <p className="text-xs text-gray-500">Marketing</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm">
                          The AI helps me analyze campaign performance and
                          suggests optimization strategies based on real-time
                          data.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-800 font-medium">RJ</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Robert Johnson</h4>
                          <p className="text-xs text-gray-500">Sales</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-200">
                        <p className="text-sm">
                          My AI assistant prepares customer briefs before calls
                          and suggests personalized offerings based on their
                          history.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Request Full Demo
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            See how our AI agents can transform your team's productivity
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
