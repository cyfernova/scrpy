import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Zap, Server, Code2 } from "lucide-react";
import { MetricCard } from "@/components/ui";
import { Container } from "@/components/layout";
import { useGSAPCleanup } from "@/lib/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const MetricsBar: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const metrics = [
    {
      value: "5,000+",
      label: "Developers",
      icon: <Users className="w-6 h-6" />,
      delay: 0,
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: <Zap className="w-6 h-6" />,
      delay: 0.2,
    },
    {
      value: "400+",
      label: "AI Models",
      icon: <Server className="w-6 h-6" />,
      delay: 0.4,
    },
    {
      value: "OSS",
      label: "Open Source",
      icon: <Code2 className="w-6 h-6" />,
      delay: 0.6,
    },
  ];

  const { registerScrollTrigger } = useGSAPCleanup();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax background effect with proper cleanup
    const parallaxAnimation = gsap.fromTo(
      backgroundRef.current,
      { backgroundPosition: "50% 0%" },
      {
        backgroundPosition: "50% 100%",
        ease: "none",
      },
    );

    const parallaxTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: parallaxAnimation,
    });

    registerScrollTrigger(parallaxTrigger);

    // Animate section entrance
    const sectionAnimation = gsap.from(sectionRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power3.out",
    });

    const sectionTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      toggleActions: "play none none reverse",
      animation: sectionAnimation,
    });

    registerScrollTrigger(sectionTrigger);
  }, [registerScrollTrigger]);

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Animated gradient background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 bg-[length:100%_200%]"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-4 text-white/80">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  {metric.icon}
                </div>
              </div>

              {/* Metric */}
              <MetricCard
                value={metric.value}
                label={metric.label}
                delay={metric.delay}
              />
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute bottom-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </Container>
    </section>
  );
};

export default MetricsBar;
