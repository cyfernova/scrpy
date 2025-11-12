import { useEffect, useRef, useState, useCallback } from 'react';

interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationClass?: string;
  delay?: number;
  disabled?: boolean;
}

/**
 * Optimized animation hook using Intersection Observer
 * Better performance than ScrollTrigger for simple entrance animations
 */
export const useOptimizedAnimation = (options: AnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animationClass = 'animate-in-up',
    delay = 0,
    disabled = false
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (entry.isIntersecting && (!triggerOnce || !hasAnimated.current)) {
      if (delay > 0) {
        setTimeout(() => {
          setIsVisible(true);
          hasAnimated.current = true;
        }, delay);
      } else {
        setIsVisible(true);
        hasAnimated.current = true;
      }
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
    }
  }, [triggerOnce, delay]);

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    const element = elementRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin, disabled]);

  return {
    elementRef,
    isVisible,
    animationClasses: disabled
      ? ''
      : `intersection-observer ${isVisible ? 'visible ' + animationClass : ''}`
  };
};

/**
 * Staggered animation hook for lists and grids
 */
export const useStaggeredAnimation = (
  itemCount: number,
  options: AnimationOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 100, ...animationOptions } = options;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate items with stagger
          const newVisibleItems = new Set<number>();
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(i));
            }, i * staggerDelay);
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [itemCount, staggerDelay]);

  const getItemProps = useCallback((index: number) => ({
    className: `intersection-observer ${visibleItems.has(index) ? 'visible animate-in-up' : ''}`,
    style: {
      transitionDelay: visibleItems.has(index) ? `${index * staggerDelay}ms` : '0ms'
    }
  }), [visibleItems, staggerDelay]);

  return {
    containerRef,
    getItemProps,
    visibleItems
  };
};

/**
 * Performance monitoring hook for animations
 */
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime.current;

      if (delta >= 1000) {
        const currentFPS = Math.round((frameCount.current * 1000) / delta);
        setFps(currentFPS);
        setIsLowPerformance(currentFPS < 30);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const getPerformanceClass = useCallback(() => {
    if (isLowPerformance) {
      return 'reduce-animations';
    }
    return '';
  }, [isLowPerformance]);

  return {
    fps,
    isLowPerformance,
    getPerformanceClass
  };
};

/**
 * Reduce animations on low-end devices
 */
export const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check for low-end device (based on memory and cores)
    const isLowEndDevice =
      (navigator as any).deviceMemory <= 2 ||
      (navigator as any).hardwareConcurrency <= 2;

    setShouldReduceMotion(prefersReducedMotion || isLowEndDevice);
  }, []);

  return {
    shouldReduceMotion,
    animationClass: shouldReduceMotion ? 'no-animation' : ''
  };
};