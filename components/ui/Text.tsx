import React, { forwardRef } from "react";
import { cn } from "@/lib/utils/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className = "", size = "h2", gradient = false, as }, ref) => {
    const sizeClasses = {
      h1: "text-display-hero",
      h2: "text-display-section",
      h3: "text-3xl font-semibold",
      h4: "text-2xl font-semibold",
      h5: "text-xl font-semibold",
      h6: "text-lg font-semibold",
    };

    const Component = as || size;

    return (
      <Component
        ref={ref}
        className={cn(
          "font-display leading-tight",
          sizeClasses[size],
          gradient && "gradient-text",
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = "Heading";

interface SubheadingProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Subheading: React.FC<SubheadingProps> = ({
  children,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <p
      className={cn(
        "text-body font-medium text-stone-600",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </p>
  );
};

interface BodyProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  as?: "p" | "span" | "div";
}

export const Body: React.FC<BodyProps> = ({
  children,
  className = "",
  size = "md",
  as: Component = "p",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-body",
    lg: "text-body-large",
  };

  return (
    <Component className={cn(sizeClasses[size], className)}>
      {children}
    </Component>
  );
};

interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
}

export const Caption: React.FC<CaptionProps> = ({
  children,
  className = "",
  uppercase = true,
}) => {
  return (
    <span className={cn("text-caption", uppercase && "uppercase", className)}>
      {children}
    </span>
  );
};

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  accent?: "primary" | "secondary" | "tertiary";
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  className = "",
  accent = "primary",
}) => {
  const accentClasses = {
    primary: "text-sky-600",
    secondary: "text-amber-600",
    tertiary: "text-yellow-600",
  };

  return (
    <span
      className={cn(
        "text-caption font-semibold",
        accentClasses[accent],
        className,
      )}
    >
      {children}
    </span>
  );
};
