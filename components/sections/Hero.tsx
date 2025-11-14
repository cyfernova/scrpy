import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Play, Terminal, Zap, Globe, Code } from "lucide-react";
import { Button, Heading, Body, Eyebrow } from "@/components/ui";
import { Container } from "@/components/layout";
import { useGSAPCleanup } from "@/lib/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { registerScrollTrigger } = useGSAPCleanup();

  useEffect(() => {
    if (!heroRef.current) return;

    // Background gradient animation
    gsap.to(backgroundRef.current, {
      backgroundPosition: "200% 50%",
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    // Word-based split animation for headline to avoid mid-word breaks
    const headlineText = headlineRef.current?.innerText.trim();
    if (headlineRef.current && headlineText) {
      const words = headlineText.split(/\s+/);
      headlineRef.current.innerHTML = words
        .map(
          (word) =>
            `<span class="inline-block whitespace-nowrap mr-2">${word}</span>`,
        ) // nbsp via spacing
        .join("");

      gsap.from(headlineRef.current.children, {
        opacity: 0,
        y: 60,
        rotation: -3,
        duration: 0.7,
        stagger: 0.06,
        delay: 0.5,
        ease: "back.out(1.7)",
        filter: "blur(8px)",
      });
    }

    // Subheadline reveal
    gsap.from(subheadlineRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 1.2,
      ease: "power3.out",
    });

    // CTA buttons entrance
    gsap.from(ctaContainerRef.current?.children || [], {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      delay: 1.5,
      ease: "power2.out",
    });

    // Mockup floating animation
    gsap.to(mockupRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Parallax effect on scroll with proper cleanup
    const parallaxAnimation = gsap.fromTo(
      backgroundRef.current,
      { scale: 1 },
      {
        scale: 1.1,
        ease: "none",
      },
    );

    const parallaxTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: parallaxAnimation,
    });

    registerScrollTrigger(parallaxTrigger);
  }, [registerScrollTrigger]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50"
    >
      {/* Background with animated gradient */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 bg-[length:200%_200%] opacity-60"
      />

      {/* Enhanced floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-12 sm:top-20 left-6 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-sky-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float animate-optimized" />
        <div
          className="absolute top-24 sm:top-40 right-6 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-yellow-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float animate-optimized"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-12 sm:bottom-20 left-1/4 sm:left-1/3 w-40 h-40 sm:w-80 sm:h-80 bg-amber-200/20 rounded-full mix-blend-multiply filter blur-xl animate-float animate-optimized"
          style={{ animationDelay: "4s" }}
        />

        {/* Additional animated elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-sky-400/20 to-yellow-400/20 rounded-full animate-pulse pause-on-hover" />
        <div
          className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-400/20 to-pink-400/20 rounded-full animate-pulse pause-on-hover"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[70vh] lg:min-h-[80vh] py-8 lg:py-0">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <Eyebrow className="mb-4 sm:mb-6">Documentation RAG Agent</Eyebrow>

            <Heading ref={headlineRef} size="h1" className="mb-6 sm:mb-8">
              <span className="block">Transform Any Website</span>
              <span className="block">Into Your Personal</span>
              <span className="gradient-text block">AI Assistant</span>
            </Heading>

            <div
              ref={subheadlineRef}
              className="max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12"
            >
              <Body size="lg" className="text-stone-600 text-base sm:text-lg">
                Stop context-switching. Our browser extension instantly converts
                any documentation into a secure, local-first RAG agent accessible
                directly in your IDE.
              </Body>
            </div>

            <div
              ref={ctaContainerRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              <Button size="lg" magnetic className="w-full sm:w-auto min-h-[48px]">
                Start Building Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto min-h-[48px]"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                <span>Instant setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-sky-500" />
                <span>Local-first & secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                <span>IDE integrated</span>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Mockup */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={mockupRef}
              className="relative transform rotate-1 lg:rotate-3 hover:rotate-2 lg:hover:rotate-6 transition-all duration-300 w-full max-w-md lg:max-w-none"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Browser Window Mockup */}
              <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
                {/* Browser Header */}
                <div className="bg-stone-100 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 border-b border-stone-200">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full" />
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="flex-1 bg-white rounded-md sm:rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-stone-500 text-center truncate">
                    app.scrpy.ai
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="p-3 sm:p-6 bg-stone-50">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-stone-200">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
                        <span className="font-mono text-xs sm:text-sm font-semibold">
                          Query Documentation
                        </span>
                      </div>
                      <div className="bg-stone-900 text-green-400 p-2 sm:p-3 rounded-lg font-mono text-xs sm:text-sm">
                        <div>How do I implement authentication?</div>
                        <div className="text-amber-400">
                          → Searching documentation...
                        </div>
                        <div className="text-green-400">
                          ✓ Found 5 relevant sections
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-sm border border-stone-200">
                        <div className="text-lg sm:text-2xl font-bold text-sky-600">
                          100%
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600">
                          Success Rate
                        </div>
                      </div>
                      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 text-center shadow-sm border border-stone-200">
                        <div className="text-lg sm:text-2xl font-bold text-yellow-600">
                          0ms
                        </div>
                        <div className="text-xs sm:text-sm text-stone-600">Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating UI Elements - Hidden on very small screens */}
              <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-lg border border-stone-200 p-2 sm:p-3 animate-pulse-glow">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium text-stone-700">
                    Live
                  </span>
                </div>
              </div>

              <div className="hidden sm:block absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 bg-gradient-to-r from-sky-500 to-yellow-600 text-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-4 animate-float">
                <div className="text-xs sm:text-sm font-bold">5,000+ Developers</div>
                <div className="text-xs opacity-90">Already building</div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
