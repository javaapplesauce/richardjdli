'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card } from '@/components/Section';

export default function Research() {
  const projects = [
    {
      title: 'Machine Learning Optimization',
      description: 'Research on optimization techniques for neural networks.',
      contributions: 'Implemented novel algorithms, conducted experiments, published findings.',
      date: '2023-2024',
    },
    {
      title: 'Distributed Systems',
      description: 'Study of consensus protocols and fault-tolerant systems.',
      contributions: 'Built simulation framework, analyzed performance metrics.',
      date: '2023',
    },
    {
      title: 'Human-Computer Interaction',
      description: 'Exploring better UX patterns for complex applications.',
      contributions: 'Conducted user studies, designed prototypes, gathered insights.',
      date: '2022-2023',
    },
  ];

  return (
    <main className="pt-16">
      <Section title="Research" className="!pt-32">
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <PopUpElement key={project.title} delay={idx}>
              <Card
                title={project.title}
                description={project.description}
                className="mb-4"
              >
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-dark-pink mb-1">Contributions</p>
                    <p className="text-sm text-navy/70">{project.contributions}</p>
                  </div>
                  <p className="text-xs text-navy/50 font-medium">{project.date}</p>
                </div>
              </Card>
            </PopUpElement>
          ))}
        </div>
      </Section>

      {/* Future Directions */}
      <Section title="Future Interests" background="pale-pink">
        <ScrubElement>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                area: 'AI & ML',
                interest: 'Exploring interpretability and alignment in large language models.',
              },
              {
                area: 'Systems Design',
                interest: 'Building scalable and resilient distributed systems.',
              },
              {
                area: 'HCI',
                interest: 'Creating intuitive interfaces for complex problems.',
              },
              {
                area: 'Open Source',
                interest: 'Contributing to projects that push the boundaries of technology.',
              },
            ].map((item) => (
              <Card key={item.area} title={item.area} description={item.interest} />
            ))}
          </div>
        </ScrubElement>
      </Section>
    </main>
  );
}
