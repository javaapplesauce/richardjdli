'use client';

import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  background?: 'beige' | 'sky-blue' | 'pale-pink';
}

export function Section({ title, children, className = '', background = 'beige' }: SectionProps) {
  const bgColors = {
    beige: 'bg-beige',
    'sky-blue': 'bg-sky-blue',
    'pale-pink': 'bg-pale-pink',
  };

  return (
    <section className={`section-container ${bgColors[background]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="section-title">{title}</h1>
        {children}
      </div>
    </section>
  );
}

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ title, description, children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow border border-navy/5 ${className}`}
    >
      <h3 className="text-xl md:text-2xl font-bold text-navy mb-3">{title}</h3>
      <p className="text-navy/70 text-sm md:text-base leading-relaxed mb-4">{description}</p>
      {children}
    </div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon?: ReactNode;
}

export function TimelineItem({ year, title, description, icon }: TimelineItemProps) {
  return (
    <div className="flex gap-6 mb-8">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-dark-pink flex items-center justify-center text-white font-bold">
          {icon || '•'}
        </div>
        <div className="w-1 h-24 bg-sky-blue mt-2" />
      </div>
      <div className="pb-8">
        <p className="text-dark-pink font-semibold">{year}</p>
        <h4 className="text-2xl font-bold text-navy mb-2">{title}</h4>
        <p className="text-navy/70">{description}</p>
      </div>
    </div>
  );
}
