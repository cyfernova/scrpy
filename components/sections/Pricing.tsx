import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Rocket,
  ArrowRight,
  Shield,
  Users,
  Globe,
  HeadphonesIcon,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { Card } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );

  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for developers getting started",
      price: {
        monthly: 0,
        yearly: 0,
      },
      color: "from-stone-50 to-stone-100",
      borderColor: "border-stone-300",
      buttonVariant: "secondary" as const,
      popular: false,
      features: [
        { name: "Up to 100 requests/day", included: true },
        { name: "Basic scraping capabilities", included: true },
        { name: "Community support", included: true },
        { name: "WebSocket connections", included: true },
        { name: "Rate limiting", included: true },
        { name: "API documentation", included: true },
        { name: "Priority support", included: false },
        { name: "Custom models", included: false },
        { name: "SLA guarantee", included: false },
        { name: "Dedicated infrastructure", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom integrations", included: false },
      ],
      cta: "Start Free",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      name: "Pro",
      description: "For professional teams and growing projects",
      price: {
        monthly: 49,
        yearly: 39,
      },
      color: "from-sky-50 to-blue-50",
      borderColor: "border-sky-300",
      buttonVariant: "primary" as const,
      popular: true,
      features: [
        { name: "Up to 10,000 requests/day", included: true },
        { name: "Advanced scraping with JS rendering", included: true },
        { name: "Email support", included: true },
        { name: "WebSocket connections", included: true },
        { name: "Custom rate limits", included: true },
        { name: "API documentation", included: true },
        { name: "Priority support", included: true },
        { name: "Custom models (5 included)", included: true },
        { name: "99.9% SLA guarantee", included: true },
        { name: "Shared infrastructure", included: true },
        { name: "Basic analytics", included: true },
        { name: "Standard integrations", included: true },
      ],
      cta: "Start Pro Trial",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: {
        monthly: 199,
        yearly: 159,
      },
      color: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-300",
      buttonVariant: "tertiary" as const,
      popular: false,
      features: [
        { name: "Unlimited requests", included: true },
        { name: "Enterprise-grade scraping", included: true },
        { name: "24/7 phone support", included: true },
        { name: "WebSocket connections", included: true },
        { name: "No rate limiting", included: true },
        { name: "Custom API documentation", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Unlimited custom models", included: true },
        { name: "99.99% SLA guarantee", included: true },
        { name: "Dedicated infrastructure", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Custom integrations & white-labeling", included: true },
      ],
      cta: "Contact Sales",
      icon: <Crown className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !pricingRef.current) return;

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

    // Pricing cards entrance with stagger
    const priceCards = document.querySelectorAll(".pricing-card");
    gsap.fromTo(
      priceCards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Highlight animation for Pro plan
    gsap.from(".popular-badge", {
      scale: 0,
      duration: 0.6,
      delay: 1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: pricingRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Features entrance
    gsap.fromTo(
      ".pricing-feature",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.02,
        delay: 0.5,
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section ref={sectionRef} background="muted" padding="xl">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading size="h2" className="mb-6">
            Simple, Transparent Pricing
          </Heading>

          <Body size="lg" className="max-w-3xl mx-auto text-stone-600 mb-8">
            Choose the plan that fits your needs. All plans include core
            scraping features and WebSocket support. Upgrade or downgrade
            anytime.
          </Body>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 border border-stone-200 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === "monthly"
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                billingCycle === "yearly"
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div
          ref={pricingRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {pricingPlans.map((plan, index) => (
            <div key={plan.name} className="pricing-card relative">
              {plan.popular && (
                <div className="popular-badge absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <Card
                className={`h-full relative ${
                  plan.popular
                    ? "border-2 border-sky-400 shadow-2xl shadow-sky-500/20 scale-105"
                    : "border-2 " + plan.borderColor
                }`}
              >
                <div
                  className={`p-8 bg-gradient-to-br ${plan.color} rounded-t-3xl`}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`p-3 rounded-xl ${
                          plan.popular
                            ? "bg-sky-500 text-white"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {plan.icon}
                      </div>
                    </div>

                    <Heading size="h3" className="mb-2 text-stone-900">
                      {plan.name}
                    </Heading>

                    <Body className="text-stone-600 mb-4">
                      {plan.description}
                    </Body>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-stone-900">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-stone-600">
                        {plan.price[billingCycle] > 0 ? "/month" : ""}
                      </span>
                    </div>
                    {billingCycle === "yearly" && plan.price.yearly > 0 && (
                      <div className="text-sm text-emerald-600 mt-1">
                        Billed annually (${plan.price.monthly * 12}/year)
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="mb-8">
                    <Button
                      variant={plan.buttonVariant}
                      size="lg"
                      className={`w-full ${plan.popular ? "group" : ""}`}
                    >
                      {plan.cta}
                      {plan.popular && (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Features */}
                <div className="p-8">
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="pricing-feature flex items-start gap-3"
                      >
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            feature.included
                              ? plan.popular
                                ? "bg-sky-500"
                                : "bg-emerald-500"
                              : "bg-stone-300"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="w-3 h-3 text-white" />
                          ) : (
                            <X className="w-3 h-3 text-stone-500" />
                          )}
                        </div>
                        <div
                          className={`text-sm ${
                            feature.included
                              ? "text-stone-700"
                              : "text-stone-400"
                          }`}
                        >
                          {feature.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Money-back guarantee */}
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Heading size="h4" className="text-emerald-900">
                    30-Day Money Back Guarantee
                  </Heading>
                  <Body className="text-emerald-700">
                    Try Scrpy risk-free. If you're not satisfied, get a full
                    refund.
                  </Body>
                </div>
              </div>
            </div>
          </Card>

          {/* Support information */}
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-500 rounded-xl">
                  <HeadphonesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Heading size="h4" className="text-yellow-900">
                    Expert Support
                  </Heading>
                  <Body className="text-yellow-700">
                    Get help when you need it. Free tier includes community
                    support, Pro and Enterprise include dedicated support
                    channels.
                  </Body>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Preview */}
        <Card className="bg-white border-2 border-stone-200">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Heading size="h3" className="mb-4">
                  Frequently Asked Questions
                </Heading>
                <Body className="text-stone-600 mb-6">
                  Have questions about pricing or features? We've got answers.
                </Body>

                <div className="space-y-4">
                  <details className="group cursor-pointer">
                    <summary className="font-medium text-stone-900 mb-2 list-none">
                      Can I change plans anytime?
                    </summary>
                    <p className="text-sm text-stone-600 ml-6">
                      Yes! You can upgrade or downgrade your plan at any time.
                      Changes take effect immediately.
                    </p>
                  </details>

                  <details className="group cursor-pointer">
                    <summary className="font-medium text-stone-900 mb-2 list-none">
                      What happens if I exceed my limits?
                    </summary>
                    <p className="text-sm text-stone-600 ml-6">
                      We'll notify you when you're approaching your limits. You
                      can upgrade temporarily or permanently.
                    </p>
                  </details>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-sky-500 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-stone-900 mb-2">
                    5,000+ Developers
                  </div>
                  <div className="text-stone-600 mb-4">
                    Trust Scrpy for their documentation needs
                  </div>
                  <Button variant="secondary">Read More Reviews</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            Join developers from 100+ countries
          </div>

          <Heading size="h3" className="mb-4">
            Ready to Get Started?
          </Heading>

          <Body size="lg" className="text-stone-600 mb-8">
            Transform your documentation into intelligent endpoints today.
          </Body>

          <Button size="lg" className="group">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
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

export default Pricing;
