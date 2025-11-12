import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  Copy,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Code,
  Zap as ZapIcon,
} from "lucide-react";
import { Heading, Body, Button } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import { Card } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

const DemoPlayground: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const [inputUrl, setInputUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const sampleUrls = [
    "https://docs.react.dev",
    "https://nextjs.org/docs",
    "https://tailwindcss.com/docs",
    "https://vercel.com/docs",
  ];

  const mockMCPResponse = {
    endpoint: "wss://api.scrpy.ai/mcp/react-docs",
    status: "ready",
    features: [
      "Component search",
      "API documentation",
      "Code examples",
      "Type definitions",
    ],
    usage: {
      requests_per_second: 1000,
      response_time: "12ms",
      cache_hit_rate: "98%",
    },
  };

  // Cursor blinking animation
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !demoRef.current) return;

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

    // Demo terminal animation
    gsap.from(".demo-terminal", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: demoRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    // Scan line effect
    gsap.to(".scan-line", {
      y: 400,
      duration: 3,
      repeat: -1,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleGenerateMCP = async () => {
    if (!inputUrl) return;

    setIsProcessing(true);
    setShowResult(false);

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setShowResult(true);
  };

  const handleCopyCode = () => {
    const code = `const mcp = new ScrpyMCP({
  endpoint: "${mockMCPResponse.endpoint}",
  apiKey: "your-api-key"
});

// Search for React hooks
const hooks = await mcp.search("useEffect");
console.log(hooks);`;

    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <Section ref={sectionRef} background="default" padding="xl">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Try it yourself
          </div>

          <Heading size="h2" className="mb-6">
            Interactive Demo
          </Heading>

          <Body size="lg" className="max-w-3xl mx-auto text-stone-600">
            See Scrpy in action. Transform any documentation site into an
            intelligent MCP endpoint in real-time.
          </Body>
        </div>

        {/* Demo Playground */}
        <div ref={demoRef} className="max-w-4xl mx-auto">
          {/* Input Section */}
          <Card variant="elevated" className="mb-8 bg-stone-900 text-white">
            <div className="p-8">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex-1 text-center text-sm text-stone-400">
                  scrpy-terminal
                </div>
              </div>

              {/* Command Input */}
              <div className="bg-stone-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 font-mono">$</span>
                  <span className="text-stone-300 font-mono">
                    scrpy generate
                  </span>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://docs.example.com"
                    className="flex-1 bg-transparent border-none outline-none text-stone-100 font-mono placeholder-stone-500"
                  />
                  <span ref={cursorRef} className="text-stone-100">
                    |
                  </span>
                </div>
              </div>

              {/* Sample URLs */}
              <div className="mb-6">
                <div className="text-sm text-stone-400 mb-3">
                  Try these examples:
                </div>
                <div className="flex flex-wrap gap-2">
                  {sampleUrls.map((url, index) => (
                    <button
                      key={index}
                      onClick={() => setInputUrl(url)}
                      className="px-3 py-1 bg-stone-800 hover:bg-stone-700 rounded-lg text-sm text-stone-300 transition-colors"
                    >
                      {url}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleGenerateMCP}
                disabled={!inputUrl || isProcessing}
                className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 border-0 text-white font-semibold"
              >
                {isProcessing ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating MCP Server...</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Generate MCP Server
                  </>
                )}
              </Button>
            </div>

            {/* Scan Line Effect */}
            <div className="scan-line absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />
          </Card>

          {/* Results Section */}
          {showResult && (
            <div className="space-y-6">
              {/* Success Message */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-900 mb-1">
                    MCP Server Generated Successfully!
                  </div>
                  <div className="text-emerald-700">
                    Your server is ready and waiting for connections.
                  </div>
                </div>
              </div>

              {/* Endpoint Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Connection Info */}
                <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-6 h-6 text-sky-600" />
                      <Heading size="h4" className="text-sky-900">
                        Connection Info
                      </Heading>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-stone-600 mb-1">
                          WebSocket Endpoint
                        </div>
                        <code className="block bg-stone-100 rounded-lg p-3 text-sm font-mono text-stone-800">
                          {mockMCPResponse.endpoint}
                        </code>
                      </div>

                      <div>
                        <div className="text-sm text-stone-600 mb-1">
                          Status
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-emerald-700 font-medium">
                            {mockMCPResponse.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Available Features */}
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <ZapIcon className="w-6 h-6 text-yellow-600" />
                      <Heading size="h4" className="text-yellow-900">
                        Available Features
                      </Heading>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {mockMCPResponse.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Code Example */}
              <Card className="bg-stone-900">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-stone-400" />
                      <span className="text-stone-300 font-semibold">
                        Usage Example
                      </span>
                    </div>

                    <Button
                      onClick={handleCopyCode}
                      variant="secondary"
                      size="sm"
                      className="bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-300"
                    >
                      {copiedCode ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Code
                        </>
                      )}
                    </Button>
                  </div>

                  <pre className="text-stone-100 font-mono text-sm overflow-x-auto">
                    <code>
                      {`const mcp = new ScrpyMCP({
  endpoint: "${mockMCPResponse.endpoint}",
  apiKey: "your-api-key"
});

// Search for React hooks
const hooks = await mcp.search("useEffect");
console.log(hooks);

// Get component documentation
const button = await mcp.getComponent("Button");
console.log(button.props);

// List all available APIs
const apis = await mcp.listAPIs();
console.log(apis);`}
                    </code>
                  </pre>
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-emerald-700 mb-2">
                        {mockMCPResponse.usage.requests_per_second}+
                      </div>
                      <div className="text-sm text-emerald-600">
                        Requests per second
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-emerald-700 mb-2">
                        {mockMCPResponse.usage.response_time}
                      </div>
                      <div className="text-sm text-emerald-600">
                        Average response time
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-emerald-700 mb-2">
                        {mockMCPResponse.usage.cache_hit_rate}
                      </div>
                      <div className="text-sm text-emerald-600">
                        Cache hit rate
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* CTA */}
              <div className="text-center">
                <Button size="lg" className="group">
                  Start Building with Scrpy
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="mt-4 text-sm text-stone-600">
                  No credit card required • Free tier available
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/10 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/10 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </Container>
    </Section>
  );
};

export default DemoPlayground;
