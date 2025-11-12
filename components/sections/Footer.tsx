import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Zap,
  Shield,
  Terminal,
  Code,
  ArrowUp,
  Chrome,
} from "lucide-react";
import { Heading, Body } from "@/components/ui";
import { Container, Section } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api" },
      { label: "Changelog", href: "/changelog" },
    ],
    resources: [
      { label: "Getting Started", href: "/getting-started" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Support", href: "/support" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Brand Assets", href: "/brand" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/compliance" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!footerRef.current) return;

    // Footer entrance animation
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate footer sections
    const footerSections = document.querySelectorAll(".footer-section");
    gsap.fromTo(
      footerSections,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-stone-100 border-t-2 border-stone-200"
    >
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-sky-50 to-yellow-50 border-b border-stone-200">
        <Container size="lg">
          <div className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-sky-500 rounded-xl text-white">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <Heading size="h3" className="mb-4">
              Stay Updated
            </Heading>
            <Body className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Get the latest updates on Scrpy features, MCP protocol
              developments, and AI coding tool integrations.
            </Body>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:border-sky-400 focus:outline-none bg-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 text-sm text-stone-500">
              No spam, unsubscribe anytime. 5,000+ developers already
              subscribed.
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container size="xl">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="footer-section lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Chrome className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold font-display text-stone-900">
                  Scrpy
                </span>
              </div>

              <Body className="text-stone-600 mb-6 max-w-sm">
                AI Infrastructure for Modern Development. Transform
                documentation into intelligent MCP endpoints for elite AI coding
                tools.
              </Body>

              <div className="flex items-center gap-4 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-lg border border-stone-200 hover:border-stky-400 hover:bg-sky-50 transition-colors"
                    aria-label={social.label}
                  >
                    <div className="text-stone-600 hover:text-sky-600 transition-colors">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>

              {/* Browser Extension Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-stone-200">
                  <Chrome className="w-4 h-4 text-stone-600" />
                  <span className="text-sm text-stone-700">Chrome</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-stone-200">
                  <Globe className="w-4 h-4 text-stone-600" />
                  <span className="text-sm text-stone-700">Edge</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div className="footer-section">
              <Heading size="h4" className="mb-6 text-stone-900">
                Product
              </Heading>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-stone-600 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="footer-section">
              <Heading size="h4" className="mb-6 text-stone-900">
                Resources
              </Heading>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-stone-600 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <Heading size="h4" className="mb-6 text-stone-900">
                Company
              </Heading>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-stone-600 hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features Grid */}
          <div className="border-t border-stone-200 pt-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 rounded-lg">
                  <Zap className="w-4 h-4 text-sky-600" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">
                    Lightning Fast
                  </div>
                  <div className="text-sm text-stone-600">60-second setup</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Shield className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">
                    Enterprise Grade
                  </div>
                  <div className="text-sm text-stone-600">99.9% uptime</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Globe className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">Global Scale</div>
                  <div className="text-sm text-stone-600">100+ countries</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Terminal className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium text-stone-900">
                    Developer First
                  </div>
                  <div className="text-sm text-stone-600">Full MCP support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-200 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Code className="w-4 h-4" />
                <span>AI Infrastructure for Modern Development</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-stone-600">
                <div>© 2025 Scrpy. All rights reserved.</div>
                <div className="flex items-center gap-4">
                  {footerLinks.legal.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="hover:text-sky-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-all duration-300 hover:shadow-xl z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
