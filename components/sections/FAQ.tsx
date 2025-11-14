import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  HelpCircle,
  Shield,
  Zap,
  Globe,
  Code,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { Card } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How does the browser extension work?",
      answer:
        "Our extension runs in your browser and crawls documentation sites you visit. It extracts content, builds a knowledge base locally, and creates a RAG agent that you can query directly from your IDE or through our built-in chat interface.",
      icon: <Globe className="w-5 h-5" />,
      category: "Technology",
    },
    {
      question: "Which IDEs are supported?",
      answer:
        "Our extension integrates seamlessly with AI-powered IDEs like Cursor, VS Code with Copilot, and other development environments that support external knowledge sources. The integration is straightforward and takes seconds to configure.",
      icon: <Code className="w-5 h-5" />,
      category: "Integrations",
    },
    {
      question: "Is my documentation data secure?",
      answer:
        "Absolutely. All processing happens locally on your machine. We use a local-first architecture, meaning your documentation never leaves your device unless you explicitly choose to share it. This ensures complete privacy and security for internal or proprietary documentation.",
      icon: <Shield className="w-5 h-5" />,
      category: "Security",
    },
    {
      question: "Can I use this for commercial projects?",
      answer:
        "Yes! Our extension is designed for both personal and commercial use. Whether you're working on open-source projects or proprietary enterprise applications, you can use our tool to enhance your workflow.",
      icon: <CheckCircle className="w-5 h-5" />,
      category: "Pricing",
    },
    {
      question: "How accurate are the answers?",
      answer:
        "Our RAG-powered system provides highly accurate, context-aware answers based on the specific documentation you've crawled. Unlike generic LLMs, it references your exact documentation, resulting in precise and relevant responses.",
      icon: <Zap className="w-5 h-5" />,
      category: "Performance",
    },
    {
      question: "How quickly can I get started?",
      answer:
        "You can be up and running in under 60 seconds. Install the extension, visit a documentation site, click to crawl, and you're ready to start querying. No server setup, no API keys, no complex configuration.",
      icon: <Clock className="w-5 h-5" />,
      category: "Getting Started",
    },
    {
      question: "Do I need technical expertise?",
      answer:
        "Not at all! The extension is designed to be user-friendly for developers and knowledge workers of all skill levels. If you can browse a website and use a chat interface, you can use our extension.",
      icon: <Users className="w-5 h-5" />,
      category: "Support",
    },
    {
      question: "Can I crawl internal documentation?",
      answer:
        "Yes! Since everything runs locally in your browser, you can crawl any website you have access to, including internal wikis, private documentation sites, and company knowledge bases. All data stays on your machine.",
      icon: <HelpCircle className="w-5 h-5" />,
      category: "Integration",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !faqRef.current) return;

    // Section entrance animation
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // FAQ items entrance
    const faqItemsElements = document.querySelectorAll(".faq-item");
    gsap.fromTo(
      faqItemsElements,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <Section ref={sectionRef} background="default" padding="xl">
      <Container size="lg">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading size="h2" className="mb-6">
            Frequently Asked Questions
          </Heading>

          <Body size="lg" className="max-w-3xl mx-auto text-stone-600 mb-8">
            Everything you need to know about our browser extension and how it
            transforms documentation into an intelligent RAG agent.
          </Body>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[
              "Technology",
              "Integrations",
              "Security",
              "Pricing",
              "Performance",
              "Getting Started",
              "Support",
            ].map((category) => (
              <span
                key={category}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-stone-100 text-stone-600 rounded-full text-xs sm:text-sm font-medium hover:bg-stone-200 transition-colors cursor-pointer min-h-[32px] flex items-center"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div ref={faqRef} className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <Card
                  className={`bg-white border-2 transition-all duration-300 cursor-pointer ${openItem === index
                      ? "border-sky-400 shadow-lg"
                      : "border-stone-200 hover:border-stone-300"
                    }`}
                  onClick={() => toggleItem(index)}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`p-2 rounded-lg flex-shrink-0 ${openItem === index
                            ? "bg-sky-100 text-sky-600"
                            : "bg-stone-100 text-stone-600"
                          } transition-colors`}
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5">
                          {item.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Heading size="h4" className="text-stone-900 mb-1 text-sm sm:text-base pr-2">
                            {item.question}
                          </Heading>
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-stone-400 transition-transform duration-300 flex-shrink-0 mt-0.5 ${openItem === index ? "rotate-180" : ""
                              }`}
                          />
                        </div>
                        <div className="text-xs sm:text-sm text-stone-500 mb-2">
                          {item.category}
                        </div>

                        {/* Answer */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${openItem === index
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="pt-3 sm:pt-4 border-t border-stone-100">
                            <Body className="text-stone-600 text-sm sm:text-base">
                              {item.answer}
                            </Body>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 p-4 sm:p-6 text-center">
            <div className="p-2.5 sm:p-3 bg-sky-100 rounded-lg sm:rounded-xl inline-flex mb-3 sm:mb-4">
              <Code className="w-4 h-4 sm:w-6 sm:h-6 text-sky-600" />
            </div>
            <Heading size="h4" className="mb-2 text-sm sm:text-base">
              Documentation
            </Heading>
            <Body className="text-stone-600 mb-3 sm:mb-4 text-xs sm:text-sm">
              Comprehensive guides and API references
            </Body>
            <Button variant="secondary" size="sm" className="min-h-[40px]">
              View Docs
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 p-4 sm:p-6 text-center">
            <div className="p-2.5 sm:p-3 bg-yellow-100 rounded-lg sm:rounded-xl inline-flex mb-3 sm:mb-4">
              <Users className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <Heading size="h4" className="mb-2 text-sm sm:text-base">
              Community
            </Heading>
            <Body className="text-stone-600 mb-3 sm:mb-4 text-xs sm:text-sm">
              Join 5,000+ developers using Scrpy
            </Body>
            <Button variant="secondary" size="sm" className="min-h-[40px]">
              Join Discord
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 p-4 sm:p-6 text-center">
            <div className="p-2.5 sm:p-3 bg-emerald-100 rounded-lg sm:rounded-xl inline-flex mb-3 sm:mb-4">
              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <Heading size="h4" className="mb-2 text-sm sm:text-base">
              Support
            </Heading>
            <Body className="text-stone-600 mb-3 sm:mb-4 text-xs sm:text-sm">
              Get help from our expert team
            </Body>
            <Button variant="secondary" size="sm" className="min-h-[40px]">
              Contact Us
            </Button>
          </Card>
        </div>

        {/* Still Have Questions */}
        <Card className="bg-gradient-to-r from-stone-50 to-stone-100 border-2 border-stone-200">
          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-2 bg-stone-200 text-stone-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Still have questions?
            </div>

            <Heading size="h3" className="mb-4">
              Can&apos;t find what you&apos;re looking for?
            </Heading>

            <Body size="lg" className="text-stone-600 mb-8">
              Our support team is here to help. Get answers to your specific
              questions and guidance on implementing Scrpy in your workflow.
            </Body>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Contact Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="secondary" size="lg">
                Schedule a Call
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise support available</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/10 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </Container>
    </Section>
  );
};

export default FAQ;
