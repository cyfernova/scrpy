import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Users,
  Building,
  ArrowRight,
  Quote,
  Star,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { Card } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const UseCases: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const casesRef = useRef<HTMLDivElement>(null);

  const useCases = [
    {
      id: "docs",
      title: "Documentation Teams",
      company: "React Development Team",
      description:
        "Transform React, Vue, and Svelte documentation into AI-queryable knowledge bases. Enable developers to get instant, context-aware answers about framework APIs.",
      image: "/images/case-docs.jpg",
      gradient: "from-blue-50 to-indigo-50",
      icon: <BookOpen className="w-16 h-16" />,
      stats: [
        { label: "Response Time", value: "0.8s" },
        { label: "Accuracy", value: "94%" },
        { label: "Developer Satisfaction", value: "+47%" },
      ],
      quote:
        "Scrpy transformed our documentation workflow. What used to take hours of searching now takes seconds.",
      author: "Sarah Chen",
      role: "Tech Lead, React Team",
    },
    {
      id: "research",
      title: "Research Labs",
      company: "Stanford AI Lab",
      description:
        "Convert academic papers and research documentation into structured knowledge bases. Power literature reviews and meta-analysis with instant access to insights.",
      image: "/images/case-research.jpg",
      gradient: "from-yellow-50 to-yellow-100",
      icon: <Users className="w-16 h-16" />,
      stats: [
        { label: "Papers Processed", value: "10K+" },
        { label: "Research Speed", value: "3x faster" },
        { label: "Citations Found", value: "50K+" },
      ],
      quote:
        "We can now query decades of research papers instantly. It\'s revolutionizing how we conduct literature reviews.",
      author: "Dr. Marcus Rodriguez",
      role: "Research Director",
    },
    {
      id: "enterprise",
      title: "Enterprise Knowledge",
      company: "Fortune 500 Tech Company",
      description:
        "Index internal wikis, code documentation, and compliance documents for secure AI agent access. Maintain privacy while enabling intelligent search.",
      image: "/images/case-enterprise.jpg",
      gradient: "from-emerald-50 to-teal-50",
      icon: <Building className="w-16 h-16" />,
      stats: [
        { label: "Documents Indexed", value: "50K+" },
        { label: "Time Saved", value: "40 hrs/week" },
        { label: "Compliance Score", value: "100%" },
      ],
      quote:
        "Our internal knowledge base is now as powerful as our external tools. Security and accessibility in perfect balance.",
      author: "Jennifer Park",
      role: "VP of Engineering",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !casesRef.current) return;

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

    // Staggered entrance for story cards
    const storyCards = document.querySelectorAll(".story-card");
    gsap.fromTo(
      storyCards,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: casesRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Animate stats numbers
    gsap.fromTo(
      ".story-stat",
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        scrollTrigger: {
          trigger: casesRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Hover effects for cards
    storyCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section ref={sectionRef} background="default" padding="xl">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading size="h2" className="mb-6">
            Success Stories
          </Heading>

          <Body size="lg" className="max-w-3xl mx-auto text-stone-600">
            See how leading teams and organizations use Scrpy to transform their
            documentation into intelligent, AI-ready knowledge bases.
          </Body>
        </div>

        {/* Story Cards */}
        <div ref={casesRef} className="space-y-16">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className={`story-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-cols-2 lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content - alternates left/right */}
              <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 bg-gradient-to-br ${useCase.gradient} rounded-2xl text-stone-800`}
                  >
                    {useCase.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-1">
                      Case Study
                    </div>
                    <Heading size="h3" className="text-stone-900">
                      {useCase.title}
                    </Heading>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-lg font-semibold text-stone-800 mb-2">
                    {useCase.company}
                  </div>
                  <Body className="text-stone-600 leading-relaxed">
                    {useCase.description}
                  </Body>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {useCase.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="story-stat text-center p-4 bg-stone-50 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-stone-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-stone-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-lg mb-8">
                  <Quote className="w-6 h-6 text-sky-500 mb-4" />
                  <blockquote className="text-stone-700 italic mb-4">
                    &quot;{useCase.quote}&quot;
                  </blockquote>
                  <div>
                    <div className="font-semibold text-stone-900">
                      {useCase.author}
                    </div>
                    <div className="text-sm text-stone-600">{useCase.role}</div>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="secondary" className="group">
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Image placeholder */}
              <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                <Card
                  className={`bg-gradient-to-br ${useCase.gradient} border-2 border-stone-200 h-full min-h-[400px] flex items-center justify-center relative overflow-hidden`}
                >
                  {/* Content placeholder for image */}
                  <div className="text-center z-10">
                    <div className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-xl">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <TrendingUp className="w-8 h-8 text-emerald-600" />
                        <Star className="w-8 h-8 text-amber-500" />
                        <Clock className="w-8 h-8 text-sky-600" />
                      </div>
                      <div className="text-lg font-bold text-stone-900 mb-2">
                        {useCase.company}
                      </div>
                      <div className="text-stone-600">{useCase.title}</div>
                      <div className="mt-4 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-emerald-700">
                          <TrendingUp className="w-4 h-4" />
                          <span>Efficiency</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-amber-700">
                          <Star className="w-4 h-4" />
                          <span>Quality</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-sky-700">
                          <Clock className="w-4 h-4" />
                          <span>Speed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-stone-800 rounded-full" />
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-stone-800 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-stone-800 rounded-full" />
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-to-br from-sky-50 to-yellow-50 border-yellow-200 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-sky-500 rounded-full">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>

              <Heading size="h3" className="mb-4">
                Ready to Transform Your Documentation?
              </Heading>

              <Body size="lg" className="text-stone-600 mb-8">
                Join thousands of teams already using Scrpy to make their
                documentation intelligent, searchable, and AI-ready.
              </Body>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button variant="secondary" size="lg">
                  Schedule a Demo
                </Button>
              </div>

              <div className="mt-6 text-sm text-stone-600">
                No credit card required • Free tier available • Setup in 60
                seconds
              </div>
            </div>
          </Card>
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

export default UseCases;
