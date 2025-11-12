import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Rocket,
  Play,
  Download,
  ArrowRight,
  Zap,
  Star,
  CheckCircle,
  Globe,
  Code,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !ctaRef.current) return;

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

    // CTA content entrance
    gsap.fromTo(
      ".cta-content",
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Rocket animation
    if (rocketRef.current) {
      gsap.from(rocketRef.current, {
        scale: 0,
        rotation: -45,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Continuous floating animation
      gsap.to(rocketRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Hover effect
      rocketRef.current.addEventListener("mouseenter", () => {
        gsap.to(rocketRef.current, {
          scale: 1.1,
          rotation: -15,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      rocketRef.current.addEventListener("mouseleave", () => {
        gsap.to(rocketRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // Floating stars animation
    starsRef.current.forEach((star, index) => {
      if (star) {
        gsap.from(star, {
          opacity: 0,
          scale: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Continuous floating for each star
        gsap.to(star, {
          y: -10 - index * 5,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      }
    });

    // Stats counter animation
    const stats = document.querySelectorAll(".cta-stat");
    stats.forEach((stat, index) => {
      gsap.from(stat, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        delay: 0.5 + index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Background gradient animation
    gsap.to(".cta-gradient", {
      backgroundPosition: "200% 50%",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const benefits = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "No credit card required",
    },
    { icon: <Zap className="w-5 h-5" />, text: "Setup in 60 seconds" },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Works with any documentation site",
    },
    { icon: <Code className="w-5 h-5" />, text: "Full MCP protocol support" },
  ];

  const stats = [
    { value: "5K+", label: "Developers" },
    { value: "50K+", label: "Documents Processed" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <Section ref={sectionRef} background="gradient" padding="xl">
      <Container size="xl">
        <div className="text-center relative">
          {/* Floating 3D Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Stars */}
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) starsRef.current[index] = el;
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
                style={{
                  top: `${(index * 8.3) % 100}%`,
                  left: `${(index * 13.7) % 100}%`,
                  animationDelay: `${index * 0.5}s`,
                }}
              />
            ))}

            {/* Geometric shapes */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-sky-200/20 rounded-full blur-xl animate-float" />
            <div
              className="absolute top-40 right-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-30 left-1/4 w-24 h-24 bg-emerald-200/20 rounded-full blur-xl animate-float"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-20 right-1/3 w-28 h-28 bg-amber-200/20 rounded-full blur-xl animate-float"
              style={{ animationDelay: "3s" }}
            />
          </div>

          {/* Main CTA Content */}
          <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto">
            {/* Rocket Icon */}
            <div
              ref={rocketRef}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-500 to-yellow-600 rounded-full shadow-2xl shadow-sky-500/25 mb-8 cursor-pointer"
            >
              <Rocket className="w-10 h-10 text-white" />
            </div>

            <div className="cta-content">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Launch Your AI Workflow Today
              </div>

              <Heading size="h2" className="mb-6 gradient-text">
                Ready to Transform Your
                <br />
                Development Workflow?
              </Heading>

              <Body
                size="lg"
                className="text-stone-700 mb-12 max-w-2xl mx-auto"
              >
                Join thousands of developers building the future of AI-powered
                coding. Get started in seconds with our browser extension.
              </Body>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-sky-500 to-yellow-600 hover:from-sky-600 hover:to-yellow-700 border-0 text-white shadow-xl shadow-yellow-500/25"
                >
                  <Download className="w-5 h-5" />
                  Install Chrome Extension
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white/90 backdrop-blur border-2 border-stone-300 hover:border-stone-400"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="cta-stat flex items-center gap-2 text-stone-700"
                  >
                    <div className="p-2 bg-white/80 backdrop-blur rounded-lg">
                      {benefit.icon}
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="bg-white/80 backdrop-blur rounded-3xl p-8 border border-stone-200 shadow-xl">
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-500 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-lg font-semibold text-stone-900 mb-2">
                    Loved by 5,000+ Developers
                  </div>
                  <Body className="text-stone-600">
                    "Scrpy has completely transformed how we work with
                    documentation. It\'s like having a superpower for AI
                    development."
                  </Body>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-stone-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-stone-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Terminal Style Prompt */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-stone-900/90 backdrop-blur rounded-2xl p-6 border border-stone-700">
              <div className="flex items-center gap-3 text-stone-300 font-mono">
                <span className="text-green-400">$</span>
                <span>npx scrpy init</span>
                <span className="text-stone-500">
                  # Transform your docs in minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FinalCTA;
