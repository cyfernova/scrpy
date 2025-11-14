import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Globe,
  Database,
  Cloud,
  Lock,
  ArrowRight,
  Play,
  BarChart3,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { cn } from "@/lib/utils/utils";
import { useGSAPCleanup } from "@/lib/hooks/useGSAP";

interface Metric {
  label: string;
  value?: string;
}

interface FeatureBox {
  id: string;
  size: "small" | "large" | "full";
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features?: string[];
  codeSnippet?: string;
  metric?: string;
  partners?: string[];
  stats?: string;
  badge?: string;
  metrics?: Metric[];
  worldMap?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const FeatureGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const featureBoxes: FeatureBox[] = [
    {
      id: "architecture",
      size: "large",
      title: "Client-Side Architecture",
      description:
        "Modern browser-based approach eliminates server-side restrictions and delivers unmatched reliability.",
      icon: <Database className="w-16 h-16" />,
      gradient: "from-yellow-50 to-yellow-100",
      features: ["No IP blocks", "Zero rate limits", "JavaScript rendering"],
      codeSnippet: `// Client-side scraping
const result = await scrpy.scrape({
  url: 'https://docs.example.com',
  selectors: ['h1', '.content', '.api-table']
});`,
    },
    {
      id: "instant",
      size: "small",
      title: "Zero Configuration",
      description:
        "Deploy in 60 seconds flat. No servers, no setup, no headaches.",
      icon: <Zap className="w-16 h-16" />,
      gradient: "from-yellow-50 to-yellow-100",
      metric: "60s",
    },
    {
      id: "compatibility",
      size: "large",
      title: "Universal Compatibility",
      description:
        "Works seamlessly with all major AI coding tools and platforms.",
      icon: <Globe className="w-16 h-16" />,
      gradient: "from-yellow-50 to-yellow-100",
      partners: ["Claude Code", "Kilo Code", "Cline", "OpenCode"],
      stats: "4+ Tools",
    },
    {
      id: "privacy",
      size: "small",
      title: "Privacy First",
      description: "GDPR compliant with enterprise-grade security built-in.",
      icon: <Lock className="w-16 h-16" />,
      gradient: "from-yellow-50 to-yellow-100",
      badge: "GDPR Ready",
    },
    {
      id: "infrastructure",
      size: "full",
      title: "Production Infrastructure",
      description:
        "Enterprise-ready infrastructure with real-time monitoring and global CDN distribution.",
      icon: <Cloud className="w-16 h-16" />,
      gradient: "from-yellow-50 to-yellow-100",
      metrics: [
        { label: "Global CDN", value: "99.9%" },
        { label: "Uptime", value: "<100ms" },
        { label: "Response", value: "500+" },
        { label: "Locations" },
      ],
      worldMap: true,
    },
  ];

  const { registerScrollTrigger } = useGSAPCleanup();

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    // Staggered entrance animation for grid items with proper cleanup
    const cardsAnimation = gsap.fromTo(
      cardsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotation: -2,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.3)",
      },
    );

    const cardsTrigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top 75%",
      toggleActions: "play none none reverse",
      animation: cardsAnimation,
    });

    registerScrollTrigger(cardsTrigger);

    // Section entrance
    const sectionAnimation = gsap.from(sectionRef.current, {
      opacity: 0,
      y: 60,
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

    // Parallax effect for the section background
    const parallaxAnimation = gsap.to(gridRef.current, {
      y: -50,
      ease: "none",
    });

    const parallaxTrigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: parallaxAnimation,
    });

    registerScrollTrigger(parallaxTrigger);
  }, [registerScrollTrigger]);

  const renderFeatureBox = (box: FeatureBox, index: number) => {
    const baseClasses =
      "rounded-3xl border border-stone-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative";
    const gradientClasses = `bg-gradient-to-br ${box.gradient}`;

    switch (box.size) {
      case "large":
        return (
          <div
            key={box.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={cn(baseClasses, gradientClasses, "p-8")}
          >
            <div className="h-full flex flex-col">
              {/* Icon */}
              <div className="flex items-center justify-center mb-6 text-yellow-600">
                <div className="p-4 bg-white/80 rounded-2xl shadow-lg">
                  {box.icon}
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <Heading size="h4" className="mb-3">
                  {box.title}
                </Heading>
                <Body className="text-stone-600">{box.description}</Body>
              </div>

              {/* Code snippet */}
              {box.codeSnippet && (
                <div className="bg-stone-900/90 backdrop-blur rounded-xl sm:rounded-2xl p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400 mb-4 sm:mb-6 overflow-x-auto">
                  <pre className="whitespace-pre-wrap sm:whitespace-pre">{box.codeSnippet}</pre>
                </div>
              )}

              {/* Features list */}
              {box.features && (
                <div className="space-y-2 mb-6">
                  {box.features.map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-stone-700"
                    >
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              )}

              {/* Partners grid */}
              {box.partners && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {box.partners.map((partner: string, i: number) => (
                    <div
                      key={i}
                      className="bg-white/60 backdrop-blur rounded-xl p-3 text-center"
                    >
                      <div className="font-semibold text-stone-800">
                        {partner}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto">
                <Button variant="secondary" size="sm" className="w-full">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
            </div>
          </div>
        );

      case "small":
        return (
          <div
            key={box.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={cn(baseClasses, gradientClasses, "p-6 text-center")}
          >
            <div className="h-full flex flex-col justify-center">
              {/* Icon */}
              <div className="flex justify-center mb-4 text-yellow-600">
                <div className="p-3 bg-white/80 rounded-xl shadow-lg">
                  {box.icon}
                </div>
              </div>

              {/* Content */}
              <Heading size="h5" className="mb-3">
                {box.title}
              </Heading>

              <Body className="text-stone-600 mb-4">{box.description}</Body>

              {/* Special elements */}
              {box.metric && (
                <div className="text-3xl font-bold text-stone-900 mb-2">
                  {box.metric}
                </div>
              )}

              {box.badge && (
                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
                  {box.badge}
                </div>
              )}

              {/* Hover indicator */}
              <div className="flex justify-center">
                <div className="p-2 rounded-full bg-white/60">
                  <ArrowRight className="w-4 h-4 text-stone-700" />
                </div>
              </div>
            </div>
          </div>
        );

      case "full":
        return (
          <div
            key={box.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={cn(baseClasses, gradientClasses, "p-8")}
            style={{ gridColumn: "1 / -1" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div>
                <div className="flex items-center mb-6 text-yellow-600">
                  <div className="p-4 bg-white/80 rounded-2xl shadow-lg">
                    {box.icon}
                  </div>
                </div>

                <Heading size="h3" className="mb-4">
                  {box.title}
                </Heading>

                <Body size="lg" className="text-stone-600 mb-8">
                  {box.description}
                </Body>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {box.metrics?.map((metric: Metric, i: number) => (
                    <div
                      key={i}
                      className="bg-white/60 backdrop-blur rounded-xl p-4"
                    >
                      <div className="text-2xl font-bold text-stone-900 mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-stone-600">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button size="lg" className="group">
                  View Live Dashboard
                  <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Right visual - World map representation */}
              <div className="relative h-80 bg-stone-900/10 rounded-3xl overflow-hidden">
                {/* World map placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                    <div className="text-lg font-semibold text-stone-800">
                      Real-time Analytics
                    </div>
                    <div className="text-sm text-stone-600">
                      Monitor performance worldwide
                    </div>
                  </div>
                </div>

                {/* Animated connection dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                    style={{
                      top: `${20 + ((i * 7.5) % 60)}%`,
                      left: `${10 + ((i * 12.5) % 80)}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="20%"
                    y1="30%"
                    x2="60%"
                    y2="40%"
                    stroke="#EAB308"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="60%"
                    y1="40%"
                    x2="80%"
                    y2="70%"
                    stroke="#EAB308"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Section ref={sectionRef} background="default" padding="xl">
      <Container size="xl">
        <div className="text-center mb-16">
          <Heading size="h2" className="mb-6">
            Packed with Power
          </Heading>
          <Body size="lg" className="max-w-3xl mx-auto text-stone-600">
            Everything you need to transform documentation into intelligent MCP
            endpoints. Built for developers, designed for scale.
          </Body>
        </div>

        {/* Bento Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 auto-rows-min"
          style={{
            gridAutoRows: "minmax(min-content, max-content)",
          }}
        >
          {/* Row 1 - Top section */}
          {/* Box A - Large (Client-Side Architecture) */}
          <div className="xs:col-span-2 md:col-span-1 lg:col-span-2 lg:row-span-2">
            {renderFeatureBox(featureBoxes[0], 0)}
          </div>

          {/* Box B - Small (Zero Config) */}
          <div className="xs:col-span-2 md:col-span-1">
            {renderFeatureBox(featureBoxes[1], 1)}
          </div>

          {/* Box D - Small (Privacy First) */}
          <div className="xs:col-span-2 md:col-span-1">
            {renderFeatureBox(featureBoxes[3], 3)}
          </div>

          {/* Row 2 - Bottom section */}
          {/* Box C - Large (Universal Compatibility) */}
          <div className="xs:col-span-2 md:col-span-2 lg:col-span-2">
            {renderFeatureBox(featureBoxes[2], 2)}
          </div>

          {/* Box E - Full (Production Infrastructure) */}
          <div className="xs:col-span-2 md:col-span-2 lg:col-span-3">
            {renderFeatureBox(featureBoxes[4], 4)}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/10 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </Container>
    </Section>
  );
};

export default FeatureGrid;
