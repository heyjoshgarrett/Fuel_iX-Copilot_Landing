import React, { useState } from "react";
import Navbar from "./landing/Navbar";
import HeroSection from "./landing/HeroSection";
import FeaturesSection from "./landing/FeaturesSection";
import DemoSection from "./landing/DemoSection";
import TestimonialsSection from "./landing/TestimonialsSection";
import ContactSection from "./landing/ContactSection";
import Footer from "./landing/Footer";
import SignupDialog from "./landing/SignupDialog";
import CaseStudyDialog from "./landing/CaseStudyDialog";

const Home = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleGetStartedClick = () => {
    setIsSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - positioned on top of hero section */}
      <Navbar onGetStartedClick={handleGetStartedClick} />

      {/* Hero Section */}
      <HeroSection ctaText="Get Started" />

      {/* Features Section */}
      <FeaturesSection />

      {/* Demo Section */}
      <DemoSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Signup Dialog */}
      <SignupDialog open={isSignupOpen} onOpenChange={setIsSignupOpen} />

      {/* Case Study Dialog - will be shown when a case study is selected */}
      {selectedCaseStudy && (
        <CaseStudyDialog
          isOpen={!!selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          caseStudy={selectedCaseStudy}
        />
      )}
    </div>
  );
};

export default Home;
