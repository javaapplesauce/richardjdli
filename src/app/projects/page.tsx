'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card } from '@/components/Section';

export default function Projects() {
  const projects = [
    {
      title: 'Personal Portfolio',
      description: 'This website! Built with Next.js, Tailwind CSS, and Framer Motion.',
      highlights: 'Scroll-triggered animations, responsive design, smooth transitions.',
      link: '#',
    },
    {
      title: 'Task Management App',
      description: 'Full-stack web application for collaborative task management.',
      highlights: 'Real-time sync, user authentication, drag-and-drop interface.',
      link: '#',
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for exploring complex datasets.',
      highlights: 'Custom visualizations, filters, real-time updates.',
      link: '#',
    },
    {
      title: 'Open Source Contribution',
      description: 'Active contributor to several popular open-source projects.',
      highlights: 'Bug fixes, feature implementations, documentation.',
      link: '#',
    },
  ];

  return (
    <main className="pt-16">
      <Section title="Projects" className="!pt-32">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <PopUpElement key={project.title} delay={idx}>
              <Card
                title={project.title}
                description={project.description}
                className="mb-4 h-full flex flex-col"
              >
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-xs font-semibold text-dark-pink mb-1">Highlights</p>
                    <p className="text-sm text-navy/70">{project.highlights}</p>
                  </div>
                </div>
                <a
                  href={project.link}
                  className="inline-block mt-4 text-dark-pink font-semibold hover:underline"
                >
                  View Project →
                </a>
              </Card>
            </PopUpElement>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section title="Technical Skills" background="sky-blue">
        <ScrubElement>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Languages</h3>
              <div className="space-y-3">
                {['Python', 'JavaScript/TypeScript', 'Java', 'SQL', 'Rust'].map((lang) => (
                  <div key={lang} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-dark-pink" />
                    <span className="text-navy">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">Technologies</h3>
              <div className="space-y-3">
                {['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
                  <div key={tech} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-dark-pink" />
                    <span className="text-navy">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrubElement>
      </Section>
    </main>
  );
}
