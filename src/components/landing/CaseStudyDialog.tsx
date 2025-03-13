import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  BarChart,
  Clock,
  Users,
} from "lucide-react";

interface CaseStudyProps {
  isOpen?: boolean;
  onClose?: () => void;
  caseStudy?: {
    title: string;
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: {
      metric: string;
      value: string;
      icon: React.ReactNode;
    }[];
    testimonial: {
      quote: string;
      author: string;
      position: string;
      avatar: string;
    };
    timeline: {
      title: string;
      description: string;
    }[];
  };
}

const CaseStudyDialog = ({
  isOpen = true,
  onClose = () => {},
  caseStudy,
}: CaseStudyProps) => {
  const defaultCaseStudy = {
    title: "Transforming Customer Support with AI Agents",
    company: "Global Tech Solutions",
    industry: "Enterprise Software",
    challenge:
      "Global Tech Solutions was struggling with scaling their customer support operations. Response times were increasing, and customer satisfaction scores were declining as the company grew. They needed a solution that could handle routine inquiries efficiently while maintaining a personalized touch.",
    solution:
      "By implementing our AI agent platform, Global Tech Solutions created custom AI assistants that could handle 80% of routine customer inquiries. The AI agents were trained on the company's knowledge base and integrated with their existing CRM system, allowing for seamless handoff to human agents when necessary.",
    results: [
      {
        metric: "Response Time",
        value: "85% Reduction",
        icon: <Clock className="h-6 w-6 text-blue-500" />,
      },
      {
        metric: "Customer Satisfaction",
        value: "32% Increase",
        icon: <BarChart className="h-6 w-6 text-green-500" />,
      },
      {
        metric: "Support Team Productivity",
        value: "47% Improvement",
        icon: <Users className="h-6 w-6 text-purple-500" />,
      },
    ],
    testimonial: {
      quote:
        "The AI agents have transformed how we handle customer support. Our team now focuses on complex issues that truly require human expertise, while routine inquiries are handled instantly by the AI. The result has been happier customers and a more engaged support team.",
      author: "Sarah Johnson",
      position: "VP of Customer Success",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    timeline: [
      {
        title: "Implementation",
        description: "2-week onboarding and integration with existing systems",
      },
      {
        title: "Training",
        description:
          "AI agents trained on company knowledge base and support history",
      },
      {
        title: "Deployment",
        description:
          "Gradual rollout starting with email support, then expanding to chat",
      },
      {
        title: "Optimization",
        description:
          "Continuous improvement based on feedback and performance metrics",
      },
    ],
  };

  const displayCaseStudy = caseStudy || defaultCaseStudy;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Building className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              {displayCaseStudy.company} | {displayCaseStudy.industry}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold">
            {displayCaseStudy.title}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            A detailed case study showcasing the implementation and results of
            our AI agent platform.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {/* Challenge Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">The Challenge</h3>
            <p className="text-gray-700">{displayCaseStudy.challenge}</p>
          </div>

          {/* Solution Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
            <p className="text-gray-700">{displayCaseStudy.solution}</p>
          </div>

          {/* Results Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayCaseStudy.results.map((result, index) => (
                <Card key={index} className="border-2 border-gray-100">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="mb-2 mt-2">{result.icon}</div>
                    <h4 className="font-medium">{result.metric}</h4>
                    <p className="text-xl font-bold text-blue-600">
                      {result.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <img
                src={displayCaseStudy.testimonial.avatar}
                alt={displayCaseStudy.testimonial.author}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-gray-700 italic mb-3">
                  "{displayCaseStudy.testimonial.quote}"
                </p>
                <p className="font-semibold">
                  {displayCaseStudy.testimonial.author}
                </p>
                <p className="text-sm text-gray-600">
                  {displayCaseStudy.testimonial.position}
                </p>
              </div>
            </div>
          </div>

          {/* Implementation Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Implementation Timeline
            </h3>
            <div className="space-y-4">
              {displayCaseStudy.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Testimonials
          </Button>
          <Button>
            Request Similar Solution <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyDialog;
