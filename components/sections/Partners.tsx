import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  CheckCircle,
  Shield,
  Globe,
  Rocket,
  Terminal,
  Cloud,
  Database,
  Code,
  Sparkles,
} from "lucide-react";
import { Heading, Body } from "@/components/ui";
import { Container, Section } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Partners: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoCloudRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  const partnerLogos = [
    {
      name: "Claude Code",
      initials: "CC",
      color: "from-yellow-500 to-yellow-600",
    },
    { name: "Kilo Code", initials: "KC", color: "from-blue-500 to-cyan-500" },
    { name: "Cline", initials: "CL", color: "from-green-500 to-emerald-500" },
    { name: "OpenCode", initials: "OC", color: "from-orange-500 to-red-500" },
    { name: "Cursor", initials: "CU", color: "from-yellow-500 to-orange-500" },
    { name: "Aider", initials: "AI", color: "from-amber-500 to-yellow-500" },
    { name: "Continue", initials: "CN", color: "from-teal-500 to-cyan-500" },
    { name: "Tabnine", initials: "TN", color: "from-rose-500 to-pink-500" },
    {
      name: "GitHub Copilot",
      initials: "GC",
      color: "from-gray-700 to-gray-900",
    },
    { name: "Codeium", initials: "CD", color: "from-violet-500 to-indigo-500" },
    {
      name: "Amazon CodeWhisperer",
      initials: "AC",
      color: "from-orange-400 to-orange-600",
    },
    {
      name: "Replit Ghostwriter",
      initials: "RG",
      color: "from-orange-500 to-pink-500",
    },
  ];

  const features = [
    { icon: <CheckCircle className="w-5 h-5" />, text: "WebSocket Support" },
    { icon: <Zap className="w-5 h-5" />, text: "Real-time Updates" },
    { icon: <Database className="w-5 h-5" />, text: "400+ Models" },
    { icon: <Shield className="w-5 h-5" />, text: "Zero Latency" },
    { icon: <Globe className="w-5 h-5" />, text: "Global CDN" },
    { icon: <Rocket className="w-5 h-5" />, text: "Instant Setup" },
  ];

  useEffect(() => {
    if (!sectionRef.current || !logoCloudRef.current) return;

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

    // Logo cloud entrance
    const logos = document.querySelectorAll(".partner-logo");
    gsap.fromTo(
      logos,
      {
        opacity: 0,
        scale: 0.5,
        y: 50,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: logoCloudRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Continuous scroll animation for logo cloud
    if (logoContainerRef.current) {
      const container = logoContainerRef.current;
      const scrollWidth = container.scrollWidth / 2; // Half because we duplicate

      gsap.to(container, {
        x: -scrollWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % scrollWidth),
        },
      });
    }

    // Hover effects for logos
    const logoElements = document.querySelectorAll(".partner-logo");
    logoElements.forEach((logo) => {
      logo.addEventListener("mouseenter", () => {
        gsap.to(logo, {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      logo.addEventListener("mouseleave", () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Feature badges animation
    gsap.fromTo(
      ".feature-badge",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <Section ref={sectionRef} background="muted" padding="xl">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Trusted by Elite AI Coding Tools
          </div>

          <Heading size="h2" className="mb-6">
            Integration Partners
          </Heading>

          <Body size="lg" className="max-w-3xl mx-auto text-stone-600">
            Scrpy seamlessly integrates with the world&apos;s leading AI coding
            platforms. Transform documentation into intelligent endpoints for
            your favorite tools.
          </Body>
        </div>

        {/* Logo Cloud */}
        <div ref={logoCloudRef} className="mb-16 relative">
          {/* Scrolling container */}
          <div className="overflow-hidden relative">
            <div
              ref={logoContainerRef}
              className="flex gap-8 py-8"
              style={{ width: "max-content" }}
            >
              {duplicatedLogos.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="partner-logo flex-shrink-0"
                >
                  <div className="group relative">
                    {/* Logo container */}
                    <div className="w-32 h-20 bg-white rounded-2xl shadow-lg border border-stone-200 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-sky-300 hover:-translate-y-1">
                      {/* Gradient initials */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-1`}
                      >
                        {partner.initials}
                      </div>

                      {/* Partner name */}
                      <div className="text-xs font-medium text-stone-700 group-hover:text-sky-600 transition-colors">
                        {partner.name}
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/20 to-yellow-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-stone-100 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-stone-100 to-transparent pointer-events-none" />
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-badge bg-white rounded-2xl border border-stone-200 p-6 text-center hover:shadow-lg hover:border-sky-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-center mb-3 text-sky-600">
                <div className="p-3 bg-sky-100 rounded-xl">{feature.icon}</div>
              </div>
              <div className="text-sm font-medium text-stone-700">
                {feature.text}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Stats */}
        <div className="bg-gradient-to-r from-sky-50 to-yellow-50 rounded-3xl p-8 border border-yellow-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-600 mb-2">12+</div>
              <div className="text-stone-700 font-medium">
                AI Tools Supported
              </div>
              <div className="text-sm text-stone-600 mt-1">
                And growing every month
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                100%
              </div>
              <div className="text-stone-700 font-medium">
                API Compatibility
              </div>
              <div className="text-sm text-stone-600 mt-1">
                Full MCP protocol support
              </div>
            </div>

            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                &lt;1s
              </div>
              <div className="text-stone-700 font-medium">Integration Time</div>
              <div className="text-sm text-stone-600 mt-1">
                Connect in seconds
              </div>
            </div>
          </div>

          {/* Technical details */}
          <div className="mt-8 pt-8 border-t border-sky-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>WebSocket Protocol</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                <span>Cloud Native</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span>Zero Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Open Source Ready</span>
              </div>
            </div>
          </div>
        </div>

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

export default Partners;
