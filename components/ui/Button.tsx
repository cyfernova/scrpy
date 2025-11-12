import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  magnetic = false,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic || !buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

      // Use GPU-accelerated transforms
      button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      button.style.willChange = "transform";
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
          // Clear will-change after animation
          button.style.willChange = "auto";
        },
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [magnetic]);

  const baseClasses =
    "btn-base font-medium transition-all duration-300 relative overflow-hidden animate-optimized focus-visible";

  const variantClasses = {
    primary:
      "bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-lg shadow-yellow-300/25 hover:bg-yellow-200 hover:shadow-xl hover:shadow-yellow-300/35 hover-lift focus:ring-yellow-500/40",
    secondary:
      "bg-yellow-50 text-gray-800 border-2 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 hover-lift focus:ring-yellow-500/40",
    tertiary:
      "bg-transparent text-gray-600 border-2 border-yellow-200 hover:border-yellow-300 hover:text-gray-900 hover-lift focus:ring-yellow-500/40",
  };

  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <div ref={scopeRef} className="inline-block">
      <button
        ref={buttonRef}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          "rounded-2xl",
          className,
        )}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
        )}
      </button>
    </div>
  );
};

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  magnetic = false,
  ...props
}) => {
  const baseClasses =
    "btn-base font-medium transition-all duration-300 relative overflow-hidden animate-optimized focus-visible";

  const variantClasses = {
    primary:
      "bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-lg shadow-yellow-300/25 hover:bg-yellow-200 hover:shadow-xl hover:shadow-yellow-300/35 hover-lift focus:ring-yellow-500/40",
    secondary:
      "bg-yellow-50 text-gray-800 border-2 border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 hover-lift focus:ring-yellow-500/40",
    tertiary:
      "bg-transparent text-gray-600 border-2 border-yellow-200 hover:border-yellow-300 hover:text-gray-900 hover-lift focus:ring-yellow-500/40",
  };

  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <a
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "rounded-2xl",
        "inline-flex items-center justify-center",
        "no-underline",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-out" />
      )}
    </a>
  );
};
