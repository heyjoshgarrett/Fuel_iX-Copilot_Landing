import React from "react";
import { ChevronDown, Shield, Workflow, Settings } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

const Feature = ({ icon, title, description, details = "" }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 bg-primary/10 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center text-gray-600 mb-4">{description}</p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-sm text-primary">
            Learn More
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-600">{details}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

interface FeaturesSectionProps {
  features?: FeatureProps[];
  title?: string;
  subtitle?: string;
}

const FeaturesSection = ({
  features = [
    {
      icon: <Settings className="w-6 h-6 text-primary" />,
      title: "Agent Customization",
      description:
        "Build AI agents tailored to your specific business needs and workflows.",
      details:
        "Our platform allows you to customize every aspect of your AI agents, from their knowledge base to their communication style. Define specific domains of expertise, set boundaries for what the agent can and cannot do, and create custom workflows that integrate with your existing systems.",
    },
    {
      icon: <Workflow className="w-6 h-6 text-primary" />,
      title: "Workflow Integration",
      description:
        "Seamlessly integrate AI agents into your existing business processes and tools.",
      details:
        "Connect your AI agents to your company's tools and data sources through our extensive API and pre-built integrations. Agents can access documents, databases, and applications to provide contextually relevant assistance and automate repetitive tasks across your organization.",
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Enterprise Security",
      description:
        "Keep your data secure with enterprise-grade security and compliance features.",
      details:
        "Our platform is built with security at its core. All data is encrypted in transit and at rest, with role-based access controls and detailed audit logs. We comply with major security standards including SOC 2, GDPR, and HIPAA, ensuring your sensitive information remains protected.",
    },
  ],
  title = "Powerful Features",
  subtitle = "Our platform provides everything you need to create, deploy, and manage custom AI agents for your enterprise.",
}: FeaturesSectionProps) => {
  return (
    <section className="py-20 px-4 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="font-semibold">
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
