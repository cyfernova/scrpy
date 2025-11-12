import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Advanced animation utilities for enhanced micro-interactions
 */
export class AnimationUtils {
  /**
   * Create a staggered reveal animation for a list of elements
   */
  static staggeredReveal(
    elements: Element[],
    options: {
      duration?: number;
      stagger?: number;
      from?: number;
      direction?: 'up' | 'down' | 'left' | 'right';
      ease?: string;
    } = {}
  ) {
    const {
      duration = 0.6,
      stagger = 0.1,
      from = 50,
      direction = 'up',
      ease = 'power2.out'
    } = options;

    const getDirectionProps = () => {
      switch (direction) {
        case 'up':
          return { y: from, opacity: 0 };
        case 'down':
          return { y: -from, opacity: 0 };
        case 'left':
          return { x: from, opacity: 0 };
        case 'right':
          return { x: -from, opacity: 0 };
        default:
          return { y: from, opacity: 0 };
      }
    };

    return gsap.fromTo(
      elements,
      getDirectionProps(),
      {
        ...Object.fromEntries(
          Object.entries(getDirectionProps()).map(([key]) => [key, key === 'opacity' ? 1 : 0])
        ),
        duration,
        stagger,
        ease
      }
    );
  }

  /**
   * Create a magnetic effect for elements
   */
  static magneticEffect(
    element: HTMLElement,
    options: {
      strength?: number;
      ease?: string;
      duration?: number;
    } = {}
  ) {
    const { strength = 0.3, ease = 'power2.out', duration = 0.5 } = options;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;

      gsap.to(element, {
        x,
        y,
        duration,
        ease,
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  /**
   * Create a parallax effect
   */
  static parallax(
    element: HTMLElement,
    options: {
      speed?: number;
      direction?: 'up' | 'down' | 'left' | 'right';
      trigger?: HTMLElement;
    } = {}
  ) {
    const { speed = 0.5, direction = 'up', trigger } = options;

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return (progress: number) => `translateY(${progress * speed * 100}px)`;
        case 'down':
          return (progress: number) => `translateY(-${progress * speed * 100}px)`;
        case 'left':
          return (progress: number) => `translateX(${progress * speed * 100}px)`;
        case 'right':
          return (progress: number) => `translateX(-${progress * speed * 100}px)`;
        default:
          return (progress: number) => `translateY(${progress * speed * 100}px)`;
      }
    };

    return ScrollTrigger.create({
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const transform = getTransform()(self.progress);
        element.style.transform = transform;
      }
    });
  }

  /**
   * Create a text scramble effect
   */
  static textScramble(
    element: HTMLElement,
    finalText: string,
    options: {
      duration?: number;
      chars?: string;
      speed?: number;
    } = {}
  ) {
    const { chars = '!<>-_\\/[]{}—=+*^?#________', speed = 50 } = options;

    let iteration = 0;
    const originalText = finalText;
    const textLength = originalText.length;

    const scramble = () => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration < textLength) {
        iteration++;
        setTimeout(scramble, speed);
      }
    };

    scramble();
  }

  /**
   * Create a gradient text animation
   */
  static animatedGradient(
    element: HTMLElement,
    options: {
      colors?: string[];
      duration?: number;
      angle?: number;
    } = {}
  ) {
    const {
      colors = ['hsl(200, 100%, 50%)', 'hsl(280, 100%, 50%)', 'hsl(340, 100%, 50%)'],
      duration = 3,
      angle = 45
    } = options;

    const gradientId = `gradient-${Date.now()}`;

    // Create SVG gradient
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', gradientId);
    gradient.setAttribute('gradientTransform', `rotate(${angle})`);

    colors.forEach((color, index) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', `${(index / (colors.length - 1)) * 100}%`);
      stop.setAttribute('stop-color', color);
      gradient.appendChild(stop);
    });

    defs.appendChild(gradient);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    // Apply gradient
    element.style.background = `url(#${gradientId})`;
    element.style.backgroundClip = 'text';
    element.style.webkitBackgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';

    // Animate gradient positions
    gsap.to(gradient, {
      attr: { gradientTransform: `rotate(${angle + 360})` },
      duration,
      ease: 'none',
      repeat: -1
    });

    return () => {
      document.body.removeChild(svg);
    };
  }

  /**
   * Create a blob animation
   */
  static blobAnimation(
    element: HTMLElement,
    options: {
      duration?: number;
      points?: number;
      radius?: number;
    } = {}
  ) {
    const { duration = 4, points = 6, radius = 100 } = options;

    const createBlobPath = (time: number) => {
      let path = `M ${radius} 0`;

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const nextAngle = ((i + 1) / points) * Math.PI * 2;

        const x1 = Math.cos(angle) * radius + Math.sin(time + i) * 30;
        const y1 = Math.sin(angle) * radius + Math.cos(time + i) * 30;
        const x2 = Math.cos(angle) * radius;
        const y2 = Math.sin(angle) * radius;
        const x3 = Math.cos(nextAngle) * radius + Math.sin(time + i + 1) * 30;
        const y3 = Math.sin(nextAngle) * radius + Math.cos(time + i + 1) * 30;

        path += ` Q ${x1} ${y1}, ${x2} ${y2} T ${x3} ${y3}`;
      }

      path += ' Z';
      return path;
    };

    gsap.to({}, {
      duration,
      repeat: -1,
      ease: 'none',
      onUpdate: function() {
        const time = this.progress() * Math.PI * 2;
        element.style.clipPath = `path('${createBlobPath(time)}')`;
      }
    });
  }

  /**
   * Create a magnetic cursor effect
   */
  static magneticCursor(
    element: HTMLElement,
    cursor: HTMLElement
  ) {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(cursor, {
        x,
        y,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }

  /**
   * Create a smooth counter animation
   */
  static counterAnimation(
    element: HTMLElement,
    target: number,
    options: {
      duration?: number;
      prefix?: string;
      suffix?: string;
      decimal?: number;
    } = {}
  ) {
    const { duration = 2, prefix = '', suffix = '', decimal = 0 } = options;

    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = `${prefix}${counter.value.toFixed(decimal)}${suffix}`;
      }
    });
  }

  /**
   * Create a typewriter effect
   */
  static typewriterEffect(
    element: HTMLElement,
    text: string,
    options: {
      speed?: number;
      cursor?: boolean;
      cursorChar?: string;
    } = {}
  ) {
    const { speed = 50, cursor = true, cursorChar = '|' } = options;

    element.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();

    if (cursor) {
      const cursorSpan = document.createElement('span');
      cursorSpan.textContent = cursorChar;
      cursorSpan.style.animation = 'blink 1s infinite';
      element.appendChild(cursorSpan);
    }
  }
}

/**
 * Performance-optimized animation controller
 */
export class AnimationController {
  private static instance: AnimationController;
  private animations: Map<string, gsap.core.Tween | ScrollTrigger> = new Map();
  private reducedMotion: boolean = false;

  private constructor() {
    this.checkReducedMotion();
  }

  static getInstance(): AnimationController {
    if (!AnimationController.instance) {
      AnimationController.instance = new AnimationController();
    }
    return AnimationController.instance;
  }

  private checkReducedMotion() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  registerAnimation(id: string, animation: gsap.core.Tween | ScrollTrigger) {
    if (this.reducedMotion) {
      if ('kill' in animation) animation.kill();
      return;
    }

    this.animations.set(id, animation);
  }

  killAnimation(id: string) {
    const animation = this.animations.get(id);
    if (animation && 'kill' in animation) {
      animation.kill();
    }
    this.animations.delete(id);
  }

  killAllAnimations() {
    this.animations.forEach(animation => {
      if ('kill' in animation) animation.kill();
    });
    this.animations.clear();
  }

  pauseAllAnimations() {
    gsap.globalTimeline.pause();
  }

  resumeAllAnimations() {
    gsap.globalTimeline.resume();
  }
}