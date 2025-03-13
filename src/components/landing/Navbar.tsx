import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logo?: string;
  links?: Array<{
    label: string;
    href: string;
    isDropdown?: boolean;
    dropdownItems?: Array<{
      label: string;
      href: string;
      description?: string;
    }>;
  }>;
  onGetStartedClick?: () => void;
}

const Navbar = ({
  logo = "Fuel iX",
  links = [
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
    {
      label: "Resources",
      href: "#",
      isDropdown: true,
      dropdownItems: [
        {
          label: "Documentation",
          href: "#documentation",
          description: "Detailed guides and API references",
        },
        {
          label: "Case Studies",
          href: "#case-studies",
          description: "Real-world examples of our platform in action",
        },
        {
          label: "Blog",
          href: "#blog",
          description: "Latest news and insights about AI agents",
        },
      ],
    },
  ],
  onGetStartedClick = () => console.log("Get Started clicked"),
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-white/10 bg-white/50 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="container flex h-20 max-w-screen-xl items-center">
        {/* Logo */}
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/custom-logo.svg" alt="Fuel iX" className="h-8 w-auto" />
            <span
              className={`font-bold text-xl font-[Default] ${scrolled ? "text-slate-800" : "text-white"}`}
            >
              {logo}
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <NavigationMenu className="mx-auto">
          <NavigationMenuList>
            {links.map((link, index) => {
              if (link.isDropdown && link.dropdownItems) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200/20 focus:bg-slate-200/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        scrolled
                          ? "text-slate-800 hover:text-slate-900 focus:text-slate-900 data-[active]:bg-slate-300 data-[state=open]:bg-slate-300"
                          : "text-white hover:text-white focus:text-white",
                      )}
                    >
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {link.dropdownItems.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                )}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild>
                    <a
                      href={link.href}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-200/20 focus:bg-slate-200/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        scrolled
                          ? "text-slate-800 hover:text-slate-900 focus:text-slate-900 data-[active]:bg-slate-300 data-[state=open]:bg-slate-300"
                          : "text-white hover:text-white focus:text-white",
                      )}
                    >
                      {link.label}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="ml-auto">
          <Button
            onClick={onGetStartedClick}
            size="lg"
            className="font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
