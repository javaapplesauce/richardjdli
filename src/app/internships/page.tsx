'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card } from '@/components/Section';

export default function Internships() {
  const internships = [
    {
      company: 'Toonsutra',
      location: 'Bellevue, WA',
      role: 'AI Research Intern',
      period: 'Sept. 2025 – Present',
      highlights: [
        'Improved the accuracy of comic-book translation for four south-Asian dialects by 25% with image-based Retrieval-Augmented Generation.',
        'Decreased expected translation time by 50% by reducing human intervention on incorrect translations.',
      ],
      skills: ['Vision Language Models', 'RAG (Retrieval-Augmented Generation)', 'Python', 'Computer Vision', 'NLP'],
    },
    {
      company: 'Microsoft',
      location: 'Redmond, WA',
      role: 'Research Intern',
      period: 'Jun. 2025 – Aug. 2025',
      highlights: [
        'Researched the use of custom semantic linear classifiers for improving zero-shot model prediction.',
        'Modified OpenAI\'s SOTA Contrastive Language-Image Pretrained (CLIP) model, improving mAP on the human action recognition dataset from 60% to 93%.',
        'Decreased finetuning time by 3x with PyTorch DDP (Distributed Data Parallel) and integrated Weights & Biases (W&B) for efficient experiment tracking and debugging.',
      ],
      skills: ['PyTorch', 'CLIP', 'DDP', 'Weights & Biases', 'Python'],
    },
    {
      company: 'University of Washington, Department of Medicine',
      location: 'Seattle, WA',
      role: 'Bioinformatics and Data Analyst Intern',
      period: 'Jan. 2023 – Aug. 2025',
      highlights: [
        'Conducted research characterizing the macaque placenta and fetal brain, serving as references for studying inflammatory and infection dynamics during the third trimester.',
        'Developed pipeline that automates preprocessing and downstream analysis of single-cell RNA datasets, reducing cell annotation processing time 90+% (7+ days to <12 hours).',
        'Leveraged statistical analysis and research findings to help successfully secure $200K in grant funding.',
      ],
      skills: ['Python', 'Bioinformatics', 'Single-cell RNA Analysis', 'Data Pipeline', 'Statistical Analysis'],
    },
    {
      company: 'Columbia Wushu',
      location: 'New York, NY',
      role: 'Vice President',
      period: 'Jan. 2025 – Present',
      highlights: [
        'Created a fully automated outreach pipeline using Python, Playwright, Google Maps API, and Gemini 2.5 Flash to scrape and personalize outreach for 700+ businesses, improving sponsor response success by 5x.',
        'Launched columbiawushu.org with animations, embedded videos, and automated email systems, increasing web activity 4x and reducing administrative email traffic by 70%.',
      ],
      skills: ['Python', 'Playwright', 'Google Maps API', 'Gemini 2.5 Flash', 'Web Development'],
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
                description={internship.location}
                className="mb-4"
              >
                <div className="space-y-3">
                  <p className="text-sm text-navy font-medium">{internship.period}</p>
                  <ul className="space-y-2">
                    {internship.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-sm text-navy leading-relaxed flex gap-2">
                        <span className="text-dark-pink font-bold">–</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-3">
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
