import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout";
import { cn } from "@/lib/utils/utils";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Removed GSAP animations to prevent visibility glitches

  const navItems = [
    { label: "Product", href: "#features" },
    { label: "Docs", href: "#documentation" },
    { label: "Pricing", href: "#pricing" },
    { label: "GitHub", href: "https://github.com", external: true },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-[999] transition-all duration-300 overflow-hidden",
          "border-2 border-stone-200/50 shadow-2xl shadow-stone-900/5",
          "bg-white ring-1 ring-stone-200",
          "h-[72px] md:h-[72px] rounded-full max-w-7xl mx-4",
          isScrolled && "h-16 bg-white border-stone-200",
        )}
      >
        <div className="h-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-full w-full max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0 mr-8">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Chrome className="w-5 h-5 text-white" />
                </div>
                {/* Animated logo mark */}
                <div className="absolute -inset-1 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg opacity-30 animate-pulse" />
              </div>
              <span className="text-xl font-bold font-display text-black">
                Scrpy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12 flex-1 justify-center">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block flex-shrink-0 ml-8">
              <Button size="sm" magnetic>
                Start Free
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors flex-shrink-0"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-stone-900" />
              ) : (
                <Menu className="w-6 h-6 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-20">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="fixed inset-x-4 top-20 bg-white rounded-3xl shadow-2xl border border-stone-200 p-8 max-w-sm mx-auto">
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-6">
                <Button size="lg" className="w-full">
                  Start Free
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
