import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check, Zap, Shield, Globe, Clock, DollarSign, Users } from 'lucide-react';
import { Heading, Body, Button } from '@/components/ui';
import { Container, Section } from '@/components/layout';

gsap.registerPlugin(ScrollTrigger);

const Comparison: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const comparisonFeatures = [
    {
      title: 'IP Blocks',
      description: 'Avoid getting blocked by anti-scraping measures',
      traditional: { status: 'bad', text: '❌ Frequently blocked' },
      scrpy: { status: 'good', text: '✅ Client-side, no blocks' }
    },
    {
      title: 'Rate Limits',
      description: 'Handle high-volume requests without throttling',
      traditional: { status: 'bad', text: '❌ Strict limitations' },
      scrpy: { status: 'good', text: '✅ Unlimited requests' }
    },
    {
      title: 'Setup Time',
      description: 'Time to get up and running',
      traditional: { status: 'bad', text: '❌ Hours to days' },
      scrpy: { status: 'good', text: '✅ 60 seconds' }
    },
    {
      title: 'Server Costs',
      description: 'Infrastructure and maintenance expenses',
      traditional: { status: 'bad', text: '❌ High server costs' },
      scrpy: { status: 'good', text: '✅ Browser-powered' }
    },
    {
      title: 'Maintenance',
      description: 'Ongoing updates and bug fixes',
      traditional: { status: 'bad', text: '❌ Constant maintenance' },
      scrpy: { status: 'good', text: '✅ Auto-updates' }
    },
    {
      title: 'JavaScript Support',
      description: 'Handle dynamic, JavaScript-heavy sites',
      traditional: { status: 'bad', text: '❌ Limited support' },
      scrpy: { status: 'good', text: '✅ Full JS rendering' }
    },
    {
      title: 'Cloudflare Bypass',
      description: 'Navigate modern protection systems',
      traditional: { status: 'bad', text: '❌ Often blocked' },
      scrpy: { status: 'good', text: '✅ Seamless access' }
    },
    {
      title: 'Real Browser',
      description: 'Use actual browser rendering for accuracy',
      traditional: { status: 'bad', text: '❌ Emulation only' },
      scrpy: { status: 'good', text: '✅ Chrome/Firefox engine' }
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !comparisonRef.current) return;

    // Section entrance animation
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate feature cards with stagger
    const features = document.querySelectorAll('.comparison-feature');
    gsap.fromTo(features,
      {
        opacity: 0,
        x: -50,
        scale: 0.95
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate the comparison cards
    gsap.fromTo('.comparison-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: comparisonRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Pulse animation for the winner badge
    gsap.to('.winner-badge', {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Section ref={sectionRef} background="muted" padding="xl">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading size="h2" className="mb-6">
            Why Developers Choose Scrpy
          </Heading>
          <Body size="lg" className="max-w-3xl mx-auto text-stone-600">
            Stop fighting with traditional scraping limitations. See how Scrpy&apos;s
            client-side approach transforms web data extraction.
          </Body>
        </div>

        {/* Comparison Cards */}
        <div ref={comparisonRef} className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Traditional Scraping */}
          <div className="comparison-card relative">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl border-2 border-red-200 p-6 sm:p-8 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-red-100/20" />

              {/* Header */}
              <div className="relative z-10 text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-3 sm:mb-4">
                  <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                </div>
                <Heading size="h3" className="text-red-900 mb-2 text-lg sm:text-xl">
                  Traditional Scraping
                </Heading>
                <Body className="text-red-700 text-sm sm:text-base">
                  The old way of doing things
                </Body>
              </div>

              {/* Feature list */}
              <div className="space-y-3 sm:space-y-4 relative z-10">
                {comparisonFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-red-200"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-red-900 mb-1 text-sm sm:text-base">
                          {feature.title}
                        </div>
                        <div className="text-xs sm:text-sm text-red-700">
                          {feature.traditional.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom badge */}
              <div className="relative z-10 mt-6 sm:mt-8 text-center">
                <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium">
                  Outdated Technology
                </div>
              </div>
            </div>
          </div>

          {/* Scrpy */}
          <div className="comparison-card relative">
            <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-2xl sm:rounded-3xl border-2 border-sky-300 p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-sky-500/20">
              {/* Winner badge */}
              <div className="winner-badge absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg z-20">
                🏆 WINNER
              </div>

              {/* Background pattern with glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100/50 to-emerald-100/50" />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-emerald-500/5 animate-gradient" />

              {/* Header */}
              <div className="relative z-10 text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-sky-100 rounded-full mb-3 sm:mb-4">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-sky-600" />
                </div>
                <Heading size="h3" className="text-sky-900 mb-2 text-lg sm:text-xl">
                  Scrpy
                </Heading>
                <Body className="text-sky-700 text-sm sm:text-base">
                  The future of web automation
                </Body>
              </div>

              {/* Feature list */}
              <div className="space-y-3 sm:space-y-4 relative z-10">
                {comparisonFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4 border border-sky-200 hover:bg-white/80 transition-all duration-300 cursor-pointer group"
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sky-900 mb-1 group-hover:text-sky-600 transition-colors text-sm sm:text-base">
                          {feature.title}
                        </div>
                        <div className="text-xs sm:text-sm text-sky-700">
                          {feature.scrpy.text}
                        </div>
                      </div>
                    </div>

                    {/* Hover effect */}
                    {hoveredFeature === index && (
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-500/5 to-emerald-500/5 pointer-events-none" />
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 mt-6 sm:mt-8 text-center">
                <Button variant="primary" size="lg" className="w-full min-h-[44px]">
                  Try Scrpy Now
                </Button>
                <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-sky-600">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Instant setup</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Enterprise ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Comparison */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-4 sm:p-6 lg:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="comparison-feature">
              <div className="flex justify-center mb-2 sm:mb-3 text-red-500">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-red-600 mb-1">72h</div>
              <div className="text-xs sm:text-sm text-stone-600">Average setup time</div>
            </div>

            <div className="comparison-feature">
              <div className="flex justify-center mb-2 sm:mb-3 text-amber-500">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-amber-600 mb-1">$500+</div>
              <div className="text-xs sm:text-sm text-stone-600">Monthly server costs</div>
            </div>

            <div className="comparison-feature">
              <div className="flex justify-center mb-2 sm:mb-3 text-sky-500">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-sky-600 mb-1">1 min</div>
              <div className="text-xs sm:text-sm text-stone-600">Setup with Scrpy</div>
            </div>

            <div className="comparison-feature">
              <div className="flex justify-center mb-2 sm:mb-3 text-emerald-500">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-600 mb-1">$0</div>
              <div className="text-xs sm:text-sm text-stone-600">Additional infrastructure</div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      </Container>
    </Section>
  );
};

export default Comparison;