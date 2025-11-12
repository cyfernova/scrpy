import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Zap, Server, Plug, ArrowRight } from "lucide-react";
import { Heading, Body } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { Card } from "@/components/ui";
import { useGSAPCleanup } from "@/lib/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const { registerScrollTrigger } = useGSAPCleanup();

  const timelineSteps = [
    {
      number: "01",
      title: "Install Extension",
      description:
        "Browser integration with one click. Add Scrpy to Chrome, Firefox, or Edge in seconds.",
      icon: <Download className="w-12 h-12" />,
      color: "text-sky-500",
      bgColor: "from-sky-50 to-sky-100",
    },
    {
      number: "02",
      title: "Scrape Intelligently",
      description:
        "Client-side extraction bypasses all restrictions. No more blocked requests or rate limits.",
      icon: <Zap className="w-12 h-12" />,
      color: "text-amber-500",
      bgColor: "from-amber-50 to-amber-100",
    },
    {
      number: "03",
      title: "Generate MCP",
      description:
        "Automated server provisioning with WebSocket support. Production-ready endpoints instantly.",
      icon: <Server className="w-12 h-12" />,
      color: "text-yellow-500",
      bgColor: "from-yellow-50 to-yellow-100",
    },
    {
      number: "04",
      title: "Connect Agents",
      description:
        "Seamless integration with elite AI coding tools. Claude Code, Kilo Code, Cline, OpenCode.",
      icon: <Plug className="w-12 h-12" />,
      color: "text-emerald-500",
      bgColor: "from-emerald-50 to-emerald-100",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    // Animate connecting line with proper cleanup
    const lineLength = lineRef.current?.getTotalLength();
    let lineAnimation: gsap.core.Tween | null = null;
    let lineTrigger: ScrollTrigger | null = null;

    if (lineRef.current && lineLength) {
      lineRef.current.style.strokeDasharray = lineLength.toString();
      lineRef.current.style.strokeDashoffset = lineLength.toString();

      lineAnimation = gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
      });

      lineTrigger = ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
        animation: lineAnimation,
      });

      registerScrollTrigger(lineTrigger);
    }

    // Animate timeline cards with stagger and proper cleanup
    const cardsAnimation = gsap.fromTo(
      cardsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotation: -5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
    );

    const cardsTrigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 75%",
      toggleActions: "play none none reverse",
      animation: cardsAnimation,
    });

    registerScrollTrigger(cardsTrigger);

    // Animate particles using GSAP instead of SVG animateMotion
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;

      // Set initial particle state
      gsap.set(particle, {
        opacity: 0,
        x: -100,
        scale: 0.5,
      });

      // Create a continuous moving animation for particles
      const particleAnimation = gsap.to(particle, {
        x: 1200,
        duration: 4 + index,
        repeat: -1,
        delay: index * 1.5,
        ease: "none",
        onRepeat: function () {
          // Reset opacity and scale for smooth looping
          gsap.set(particle, {
            opacity: 0,
            x: -100,
            scale: 0.5,
          });
        },
        onStart: function () {
          gsap.fromTo(
            particle,
            {
              opacity: 0,
              scale: 0.5,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            },
          );
        },
        onComplete: function () {
          gsap.to(particle, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "power2.in",
          });
        },
      });

      const particleTrigger = ScrollTrigger.create({
        trigger: timelineRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse",
        animation: particleAnimation,
      });

      registerScrollTrigger(particleTrigger);
    });

    // Section entrance animation
    const sectionAnimation = gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
    });

    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
      animation: sectionAnimation,
    });

    registerScrollTrigger(sectionTrigger);
  }, [registerScrollTrigger]);

  return (
    <Section ref={sectionRef} background="muted" padding="xl">
      <Container size="xl">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <Heading size="h2" className="mb-4 sm:mb-6">
            How It Works
          </Heading>
          <Body size="lg" className="max-w-3xl mx-auto text-stone-600 text-base sm:text-lg">
            Transform any website into an MCP endpoint in four simple steps. No
            server setup, no configuration headaches, just pure automation.
          </Body>
        </div>

        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* SVG Connecting Line with Animated Particles */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-2">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 2"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
                  <stop offset="33%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="66%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Main connecting line */}
              <path
                ref={lineRef}
                d="M 100 1 L 1100 1"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                className="drop-shadow-sm"
              />

              {/* GSAP-animated particles will be positioned here */}
            </svg>

            {/* Animated particles */}
            <div className="absolute top-1/2 left-0 right-0 h-1 pointer-events-none">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) particlesRef.current[index] = el;
                  }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #0EA5E9, #F59E0B, #8B5CF6, #10B981)",
                    filter: "blur(0.5px)",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            {/* Decorative dots at connection points */}
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-stone-300 rounded-full"
                style={{
                  left: `${index === 0 ? 8.3 : index === 1 ? 41.6 : index === 2 ? 75 : 91.6}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>

          {/* Timeline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {timelineSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Number Badge */}
                <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    {/* Background number */}
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-200">
                      {step.number}
                    </div>
                    {/* Overlay number */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-lg sm:text-xl lg:text-2xl font-bold ${step.color}`}
                    >
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="relative pt-8 sm:pt-12"
                >
                  <Card
                    variant="elevated"
                    padding="md"
                    hover
                    className={`bg-gradient-to-br ${step.bgColor} border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full`}
                  >
                    {/* Icon */}
                    <div className={`flex justify-center mb-4 sm:mb-6 ${step.color}`}>
                      <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-lg">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <Heading size="h4" className="mb-3 sm:mb-4 text-sm sm:text-base">
                        {step.title}
                      </Heading>

                      <Body className="text-stone-600 leading-relaxed text-xs sm:text-sm">
                        {step.description}
                      </Body>

                      {/* Arrow indicator */}
                      <div className="mt-4 sm:mt-6 flex justify-center">
                        <div className={`p-1.5 sm:p-2 rounded-full ${step.bgColor}`}>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-stone-700" />
                        </div>
                      </div>
                    </div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl sm:rounded-3xl blur-xl opacity-50`}
                      />
                    </div>
                  </Card>
                </div>

                {/* Mobile connector (visible on smaller screens) */}
                {index < timelineSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4 sm:mt-6">
                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-stone-300 to-stone-400" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-stone-400 rounded-full -ml-1 -mt-0.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/10 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/10 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Mobile visual connectors */}
        <div className="lg:hidden mt-12 max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-stone-500 font-medium">
            <span>1 min</span>
            <span>2 min</span>
            <span>3 min</span>
            <span>4 min</span>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Timeline;
