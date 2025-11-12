import React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = "lg",
  padding = true,
}) => {
  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = padding ? "px-6 md:px-8 lg:px-12" : "";

  return (
    <div
      className={cn(
        "mx-auto w-full",
        sizeClasses[size],
        paddingClasses,
        className,
      )}
    >
      {children}
    </div>
  );
};

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "gradient";
  padding?: "sm" | "md" | "lg" | "xl";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { children, className = "", id, background = "default", padding = "lg" },
    ref,
  ) => {
    const backgroundClasses = {
      default: "bg-stone-50",
      muted: "bg-white",
      gradient: "bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200",
    };

    const paddingClasses = {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      xl: "py-32 md:py-40",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative overflow-hidden",
          backgroundClasses[background],
          paddingClasses[padding],
          className,
        )}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
}

export const Grid: React.FC<GridProps> = ({
  children,
  className = "",
  cols = 3,
  gap = "lg",
}) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    12: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  return (
    <div className={cn("grid", colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
};
