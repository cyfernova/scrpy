import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Custom hook to handle GSAP ScrollTrigger cleanup
 * Prevents memory leaks by automatically cleaning up ScrollTrigger instances
 */
export const useGSAPCleanup = () => {
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    return () => {
      // Clean up all registered ScrollTrigger instances
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
      scrollTriggersRef.current = [];
    };
  }, []);

  const registerScrollTrigger = (trigger: ScrollTrigger | null) => {
    if (trigger) {
      scrollTriggersRef.current.push(trigger);
    }
    return trigger;
  };

  const cleanupAll = () => {
    scrollTriggersRef.current.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
    scrollTriggersRef.current = [];
  };

  return { registerScrollTrigger, cleanupAll };
};

/**
 * Hook to handle GSAP timeline cleanup
 */
export const useGSAPTimeline = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const createTimeline = (config?: gsap.TimelineVars) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline(config);
    return timelineRef.current;
  };

  return { createTimeline };
};

/**
 * Hook for intersection observer based animations
 * More performant than ScrollTrigger for simple entrance animations
 */
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('animate-in');
          } else {
            // Optional: remove class when element leaves viewport
            // element.classList.remove('animate-in');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return elementRef;
};