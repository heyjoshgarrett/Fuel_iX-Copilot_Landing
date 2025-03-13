import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";

interface Testimonial {
  id: string;
  companyName: string;
  industry: string;
  logo: string;
  quote: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  caseStudyDetails: {
    challenge: string;
    solution: string;
    results: string;
    testimonial: string;
  };
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

const TestimonialsSection = ({
  testimonials = [
    {
      id: "1",
      companyName: "TechCorp Global",
      industry: "Technology",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp",
      quote:
        "The AI agent platform has transformed how our teams collaborate and solve problems. We've seen a 40% increase in productivity across departments.",
      author: {
        name: "Sarah Johnson",
        title: "CTO, TechCorp Global",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      stats: [
        { label: "Productivity Increase", value: "40%" },
        { label: "Time Saved", value: "15 hrs/week" },
        { label: "ROI", value: "320%" },
      ],
      caseStudyDetails: {
        challenge:
          "TechCorp was struggling with siloed information across departments, leading to duplicated work and slow decision-making processes.",
        solution:
          "Implemented custom AI agents for each department that could access cross-functional data while maintaining security protocols.",
        results:
          "Reduced meeting time by 30%, improved cross-team collaboration, and accelerated project delivery timelines by 25%.",
        testimonial:
          "The platform has become an essential part of our workflow. Our teams now have instant access to the information they need, and the AI agents help automate routine tasks that used to consume hours of valuable time.",
      },
    },
    {
      id: "2",
      companyName: "FinServe Solutions",
      industry: "Financial Services",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FinServe",
      quote:
        "Our compliance team now processes regulatory updates in minutes instead of days. The AI agents have revolutionized how we handle complex financial regulations.",
      author: {
        name: "Michael Chen",
        title: "Head of Compliance, FinServe Solutions",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      },
      stats: [
        { label: "Processing Time", value: "-85%" },
        { label: "Compliance Accuracy", value: "+37%" },
        { label: "Cost Savings", value: "$1.2M/year" },
      ],
      caseStudyDetails: {
        challenge:
          "Keeping up with constantly changing financial regulations across multiple jurisdictions was causing delays and compliance risks.",
        solution:
          "Deployed specialized AI agents trained on regulatory frameworks that could analyze updates and suggest implementation strategies.",
        results:
          "Achieved near-perfect compliance scores in audits while reducing the compliance team's workload by 40%.",
        testimonial:
          "The AI agents don't just save us time—they've improved our accuracy and reduced our risk exposure significantly. They've become trusted advisors to our compliance team.",
      },
    },
    {
      id: "3",
      companyName: "HealthPlus Systems",
      industry: "Healthcare",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=HealthPlus",
      quote:
        "Our medical staff can now focus more on patient care instead of administrative tasks. The AI agents have helped us improve both efficiency and patient satisfaction.",
      author: {
        name: "Dr. Alicia Ramirez",
        title: "Medical Director, HealthPlus Systems",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alicia",
      },
      stats: [
        { label: "Patient Interaction", value: "+28%" },
        { label: "Documentation Time", value: "-45%" },
        { label: "Satisfaction Score", value: "4.9/5" },
      ],
      caseStudyDetails: {
        challenge:
          "Medical staff were spending up to 60% of their time on documentation and administrative tasks rather than patient care.",
        solution:
          "Implemented AI agents that could transcribe patient interactions, suggest appropriate medical codes, and handle routine documentation.",
        results:
          "Doctors and nurses now spend 28% more time with patients while maintaining comprehensive and accurate medical records.",
        testimonial:
          "The platform has given us back the most valuable resource in healthcare—time with our patients. The AI agents handle the administrative burden so our medical professionals can focus on what matters most.",
      },
    },
  ],
  title = "Trusted by Industry Leaders",
  subtitle = "See how enterprises are transforming their operations with our AI agent platform",
}: TestimonialsSectionProps) => {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full flex flex-col bg-white border border-slate-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="h-12 w-12 rounded-md overflow-hidden bg-slate-100">
            <img
              src={testimonial.logo}
              alt={`${testimonial.companyName} logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <Badge variant="outline" className="bg-slate-100 text-slate-700">
            {testimonial.industry}
          </Badge>
        </div>
        <CardTitle className="text-xl font-semibold">
          {testimonial.companyName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
        <CardDescription className="text-slate-700 text-base mb-6 italic">
          "{testimonial.quote}"
        </CardDescription>
        <div className="flex items-center mt-auto">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
            />
            <AvatarFallback>
              {testimonial.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{testimonial.author.name}</p>
            <p className="text-sm text-slate-500">{testimonial.author.title}</p>
          </div>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              View Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <CaseStudyContent testimonial={testimonial} />
        </Dialog>
      </div>
    </Card>
  );
};

const CaseStudyContent = ({ testimonial }: TestimonialCardProps) => {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-slate-100">
            <img
              src={testimonial.logo}
              alt={`${testimonial.companyName} logo`}
              className="h-full w-full object-contain"
            />
          </div>
          <DialogTitle className="text-2xl">
            {testimonial.companyName} Case Study
          </DialogTitle>
        </div>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {testimonial.stats.map((stat, index) => (
          <div key={index} className="bg-slate-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Challenge</h3>
          <p className="text-slate-700">
            {testimonial.caseStudyDetails.challenge}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Solution</h3>
          <p className="text-slate-700">
            {testimonial.caseStudyDetails.solution}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Results</h3>
          <p className="text-slate-700">
            {testimonial.caseStudyDetails.results}
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg italic">
          <p className="text-slate-700">
            "{testimonial.caseStudyDetails.testimonial}"
          </p>
          <div className="flex items-center mt-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
              />
              <AvatarFallback>
                {testimonial.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{testimonial.author.name}</p>
              <p className="text-sm text-slate-500">
                {testimonial.author.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default TestimonialsSection;
