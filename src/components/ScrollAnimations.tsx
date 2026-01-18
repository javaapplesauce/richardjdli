'use client';

import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PopUpElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PopUpElement({ children, className = '', delay = 0 }: PopUpElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out',
        delay: delay * 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: false,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [delay]);

  return (
    <div ref={ref} className={`pop-up-element ${className}`}>
      {children}
    </div>
  );
}

interface ScrubElementProps {
  children: ReactNode;
  className?: string;
}

export function ScrubElement({ children, className = '' }: ScrubElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 1.2,
          markers: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div ref={ref} className={`scrub-element ${className}`}>
      {children}
    </div>
  );
}
