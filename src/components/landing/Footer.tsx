import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  navigationLinks?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ icon: keyof typeof socialIcons; href: string }>;
}

const socialIcons = {
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail,
};

const Footer = ({
  companyName = "Fuel iX",
  companyLogo = "/custom-logo.svg",
  navigationLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  socialLinks = [
    { icon: "Facebook", href: "#" },
    { icon: "Twitter", href: "#" },
    { icon: "Instagram", href: "#" },
    { icon: "Linkedin", href: "#" },
  ],
}: FooterProps) => {
  return (
    <footer className="w-full bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-8 w-auto mr-2"
              />
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-sm text-slate-300 mb-4">
              Empowering enterprises to build custom AI assistants that enhance
              employee productivity and creativity.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => {
                const SocialIcon = socialIcons[link.icon];
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                    aria-label={link.icon}
                  >
                    <SocialIcon size={20} />
                  </a>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Subscribe to our newsletter
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-slate-800 text-white rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Button className="rounded-l-none" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-slate-400 hover:text-white mr-4"
            >
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
