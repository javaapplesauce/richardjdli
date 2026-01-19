'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card, TimelineItem } from '@/components/Section';

export default function Home() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <Section title="Richard Li" className="!pt-32">
        <PopUpElement className="mb-12">
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl text-navy/80 mb-6 leading-relaxed">
              I'm passionate about applying programming techniques to improve quality of life—whether that's optimizing
              activities I love or pushing forward fields I'm curious about.
            </p>
            <p className="text-lg text-navy/60">
              Welcome to my corner of the internet. Here you'll find my internships, research, projects, and a bit
              about my hobbies.
            </p>
          </div>
        </PopUpElement>
      </Section>

      {/* About Me - College */}
      <Section title="Education" background="sky-blue">
        <PopUpElement>
          <div className="grid md:grid-cols-2 gap-8">
            <Card
              title="Columbia University"
              description="Computer Science Major, Minor in East Asian Language and Culture"
            >
              <div className="space-y-3 text-sm text-navy/70">
                <div>
                  <p className="font-semibold text-navy mb-1">Previous Classes:</p>
                  <p>Data Structures and Algorithms, Classical Machine Learning, Advanced Systems Programming, Deep Learning for Computer Vision, Discrete Mathematics, Linear Algebra & Probability</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Current Classes:</p>
                  <p>Operating Systems, Fundamentals of Computer Systems, Applied Machine Learning</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Clubs:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Wushu (Vice President Fall '25 - present)</li>
                    <li>Application Development Initiative (Exec Board Co-lead Fall '25 - present)</li>
                    <li>Columbia Space Initiative (SUITS Mission @ NASA Subteeam lead Spring '26 - present)</li>
                    <li>Columbia Wealth Management Club (Marketing direction Spring '25, Treasurer Fall '25-present)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card
              title="Academics"
              description="GPA 3.65/4.00 • Dean's List Spring '25, Fall '25"
            >
              <div className="space-y-3 text-sm text-navy/70">
                <div>
                  <p className="font-semibold text-navy mb-1">Languages</p>
                  <p>Python, Java, C, R, SQL, JavaScript, C#, TypeScript, Bash</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">ML & AI</p>
                  <p>Vision-Language Models, CLIP, Retrieval-Augmented Generation, LLMs, Text-to-Audio</p>
                </div>
                <div>
                  <p className="font-semibold text-navy mb-1">Frameworks & Tools</p>
                  <p>PyTorch, PyTorch Lightning, React, Supabase, Unity, NumPy, Hydra, Playwright, AWS (S3/EC2), PostgreSQL, PineconeDB, Docker, CUDA, Linux, Git</p>
                </div>
              </div>
            </Card>
          </div>
        </PopUpElement>
      </Section>

      {/* Experience Timeline */}
      <Section title="Experience Timeline" background="pale-pink">
        <div className="max-w-2xl">
          <PopUpElement>
            <TimelineItem
              year="Nov 2025"
              title="Software Engineer Intern @ Bite Campus Eats — New York, NY"
              description={`Backend/API Software Engineer. Research algorithmic surge pricing in large food delivery companies.`}
              icon="🍔"
            />
          </PopUpElement>

          <PopUpElement delay={1}>
            <TimelineItem
              year="Sep 2025"
              title="AI Research Intern @ Toonsutra — Bellevue, WA"
              description={`Research the use of Vision Language Models to increase the accuracy of comic-book translation for four south-Asian dialects.`}
              icon="🖼️"
            />
          </PopUpElement>

          <PopUpElement delay={2}>
            <TimelineItem
              year="Jun 2025"
              title="Research Intern @ Microsoft — Redmond, WA"
              description={`Researched the use of custom semantic linear classifiers for improving zero-shot model prediction.`}
              icon="💻"
            />
          </PopUpElement>

          <PopUpElement delay={3}>
            <TimelineItem
              year="Jan 2023"
              title="Bioinformatics & Data Analyst Intern @ University of Washington, Department of Medicine — Seattle, WA"
              description={`Conducted research characterizing infection dynamics within the macaque placenta and fetal brain.`}
              icon="🧬"
            />
          </PopUpElement>

          <PopUpElement delay={4}>
            <TimelineItem
              year="2023"
              title="Research Assistant @ Department of Geological and Planetary Sciences — Pasadena, CA"
              description={`Researched use of Monte Carlo Markov Chains in adjusting NO2 Satellite readings for atmospheric factors (’23). Created a novel algorithm to predict and monitor spread of wildfires using satellite data (’22).`}
              icon="🌍"
            />
          </PopUpElement>

          <PopUpElement delay={5}>
            <TimelineItem
              year="Jun 2022"
              title="Intern @ Clobotics Wind Services — Bellevue, WA"
              description={`Gained experience applying neural networks for analyzing wind turbine quality datasets.`}
              icon="�️"
            />
          </PopUpElement>
        </div>
      </Section>

      {/* Featured Activities */}
      <Section title="What I'm Into" background="beige">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Wushu', desc: 'Martial arts training and discipline' },
            { title: 'Jazz', desc: 'Exploring improvisation and rhythm' },
            { title: 'Book Club', desc: 'Reading and discussing great literature' },
            { title: 'Skateboarding', desc: 'Pushing boundaries and having fun' },
            { title: 'Fitness', desc: 'Building strength and endurance' },
            { title: 'Tech', desc: 'Always learning and building' },
          ].map((hobby, idx) => (
            <PopUpElement key={hobby.title} delay={idx}>
              <Card title={hobby.title} description={hobby.desc} />
            </PopUpElement>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section title="Let's Connect" className="text-center">
        <ScrubElement className="text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-navy/70 mb-8">
              I'm always interested in discussing tech, hobbies, or potential collaborations.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="mailto:lirichard6474@gmail.com"
                className="px-8 py-3 bg-dark-pink text-white rounded-lg font-semibold hover:bg-dark-pink/90 transition-colors"
              >
                Email Me
              </a>
              <a
                href="https://github.com/javaapplesauce"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-beige transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/richardjdli/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-beige transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </ScrubElement>
      </Section>
    </main>
  );
}
