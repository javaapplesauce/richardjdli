'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card } from '@/components/Section';

export default function Internships() {
  const internships = [
    {
      company: 'Tech Company A',
      role: 'Software Engineer Intern',
      period: 'Summer 2024',
      description: 'Developed full-stack features using React and Node.js, improved performance by 40%.',
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    },
    {
      company: 'Tech Company B',
      role: 'Backend Engineer Intern',
      period: 'Summer 2023',
      description: 'Built microservices architecture and optimized database queries.',
      skills: ['Python', 'FastAPI', 'MongoDB', 'Kubernetes'],
    },
    {
      company: 'Startup C',
      role: 'Full-stack Developer Intern',
      period: 'Spring 2023',
      description: 'Contributed to product development and improved user experience.',
      skills: ['TypeScript', 'React', 'Firebase', 'Tailwind CSS'],
    },
  ];

  return (
    <main className="pt-16">
      <Section title="Internships" className="!pt-32">
        <div className="space-y-8">
          {internships.map((internship, idx) => (
            <PopUpElement key={internship.company} delay={idx}>
              <Card
                title={`${internship.role} @ ${internship.company}`}
                description={internship.description}
                className="mb-4"
              >
                <div className="space-y-3">
                  <p className="text-sm text-dark-pink font-semibold">{internship.period}</p>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-sky-blue/20 text-navy rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </PopUpElement>
          ))}
        </div>
      </Section>

      {/* Impact Section */}
      <Section title="Key Takeaways" background="sky-blue">
        <ScrubElement>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Technical Growth',
                desc: 'Expanded my stack and learned industry best practices.',
              },
              {
                title: 'Team Collaboration',
                desc: 'Worked with talented engineers and product designers.',
              },
              {
                title: 'Problem Solving',
                desc: 'Tackled real-world challenges and shipped features to production.',
              },
            ].map((item) => (
              <Card key={item.title} title={item.title} description={item.desc} />
            ))}
          </div>
        </ScrubElement>
      </Section>
    </main>
  );
}
