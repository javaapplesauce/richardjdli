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
        <div className="grid md:grid-cols-2 gap-8">
          <ScrubElement>
            <Card
              title="University"
              description="Currently studying Computer Science with a focus on AI/ML and systems design."
            >
              <div className="space-y-2 text-sm text-navy/70">
                <p>• Relevant Coursework: Algorithms, Data Structures, ML, Distributed Systems</p>
                <p>• Clubs: [Your clubs here]</p>
              </div>
            </Card>
          </ScrubElement>

          <PopUpElement>
            <Card
              title="Academics"
              description="Committed to excellence in both coursework and practical learning experiences."
            >
              <div className="space-y-2 text-sm text-navy/70">
                <p>• GPA: [Your GPA]</p>
                <p>• Dean's List / Honors: [If applicable]</p>
                <p>• Key Skills: Python, TypeScript, Systems Design</p>
              </div>
            </Card>
          </PopUpElement>
        </div>
      </Section>

      {/* Experience Timeline */}
      <Section title="Experience Timeline" background="pale-pink">
        <div className="max-w-2xl">
          <PopUpElement>
            <TimelineItem
              year="2024"
              title="Internship at [Company]"
              description="Developed full-stack features using React and Node.js, improving performance by 40%."
              icon="🚀"
            />
          </PopUpElement>

          <PopUpElement delay={1}>
            <TimelineItem
              year="2023"
              title="Research Project"
              description="Conducted research on machine learning optimization techniques and published findings."
              icon="🔬"
            />
          </PopUpElement>

          <PopUpElement delay={2}>
            <TimelineItem
              year="2022"
              title="Personal Project Launch"
              description="Built and deployed a web application that helped me explore full-stack development."
              icon="💡"
            />
          </PopUpElement>

          <PopUpElement delay={3}>
            <TimelineItem
              year="2021"
              title="Started Journey"
              description="Began programming and exploring the intersection of tech and passion projects."
              icon="🌟"
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
                href="mailto:your.email@example.com"
                className="px-8 py-3 bg-dark-pink text-white rounded-lg font-semibold hover:bg-dark-pink/90 transition-colors"
              >
                Email Me
              </a>
              <a
                href="#"
                className="px-8 py-3 border-2 border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-beige transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
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
