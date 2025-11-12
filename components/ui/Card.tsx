import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  hover?: boolean;
  tilt?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  variant = 'default',
  hover = true,
  tilt = false,
  padding = 'lg',
  onClick
}, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const cardRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

  useEffect(() => {
    if (!tilt || !cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 12;
      const rotateX = (y - 0.5) * -12;

      gsap.to(card, {
        rotateY,
        rotateX,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [tilt]);

  const variantClasses = {
    default: 'bg-white border border-stone-200',
    elevated: 'bg-white border border-stone-200 shadow-xl',
    glass: 'glass-effect border border-stone-200'
  };

  const paddingClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-12',
    xl: 'p-16'
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={cn(
        'rounded-3xl transition-all duration-300 animate-optimized',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:shadow-2xl hover:-translate-y-1 hover-lift',
        onClick && 'cursor-pointer focus-visible',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow'
      }}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = '',
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Enhanced entrance animation
    gsap.fromTo(cardRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        rotation: -5,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay,
        ease: "back.out(1.4)",
        onComplete: () => {
          // Clear will-change after animation
          if (cardRef.current) {
            cardRef.current.style.willChange = 'auto';
          }
        },
        onStart: () => {
          // Set will-change for animation
          if (cardRef.current) {
            cardRef.current.style.willChange = 'transform, opacity, filter';
          }
        }
      }
    );
  }, [delay]);

  return (
    <Card
      ref={cardRef}
      className={className}
      tilt
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 text-sky-500">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold text-stone-900 mb-4 font-display">
          {title}
        </h3>
        <p className="text-stone-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

interface MetricCardProps {
  value: string;
  label: string;
  className?: string;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  className = '',
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      delay,
      ease: "back.out(1.7)"
    });

    if (valueRef.current && value.match(/\d+/)) {
      const numericValue = parseInt(value.match(/\d+/)![0]);
      gsap.from(valueRef.current, {
        textContent: 0,
        duration: 2,
        delay: delay + 0.3,
        ease: "power2.out",
        snap: { textContent: 1 },
        onUpdate: function() {
          this.targets()[0].innerHTML = Math.ceil(this.progress() * numericValue).toLocaleString() + '+';
        }
      });
    }
  }, [value, delay]);

  return (
    <div ref={cardRef} className={cn('text-center', className)}>
      <div
        ref={valueRef}
        className="text-4xl font-bold text-white mb-2 font-display"
      >
        {value}
      </div>
      <div className="text-white/80 text-sm font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};