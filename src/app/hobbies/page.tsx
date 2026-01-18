'use client';

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations';
import { Section, Card } from '@/components/Section';

export default function Hobbies() {
  const hobbies = [
    {
      title: 'Wushu',
      emoji: '🥋',
      description: 'Martial arts training and discipline.',
      details: 'Training in traditional and modern martial arts techniques. Focus on discipline, body control, and mental focus.',
    },
    {
      title: 'Jazz',
      emoji: '🎷',
      description: 'Exploring improvisation and rhythm.',
      details: 'Playing and listening to jazz music. Fascinated by the spontaneity and collaborative nature of improvisation.',
    },
    {
      title: 'Book Club',
      emoji: '📚',
      description: 'Reading and discussing great literature.',
      details: 'Regular meetings to discuss books spanning fiction, non-fiction, philosophy, and more. Great for expanding perspectives.',
    },
    {
      title: 'Skateboarding',
      emoji: '🛹',
      description: 'Pushing boundaries and having fun.',
      details: 'Learning new tricks and exploring different skate spots. Combines creativity with physical challenge.',
    },
    {
      title: 'Fitness',
      emoji: '💪',
      description: 'Building strength and endurance.',
      details: 'Regular training focused on functional fitness, strength building, and maintaining overall health.',
    },
    {
      title: 'Cooking',
      emoji: '🍳',
      description: 'Experimenting with flavors and techniques.',
      details: 'Love trying new recipes and learning different cuisines. Cooking is both creative and practical.',
    },
  ];

  return (
    <main className="pt-16">
      <Section title="Hobbies & Interests" className="!pt-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby, idx) => (
            <PopUpElement key={hobby.title} delay={idx}>
              <Card
                title={`${hobby.emoji} ${hobby.title}`}
                description={hobby.description}
                className="h-full"
              >
                <p className="text-sm text-navy/70">{hobby.details}</p>
              </Card>
            </PopUpElement>
          ))}
        </div>
      </Section>

      {/* Why These Matter */}
      <Section title="Why These Matter to Me" background="pale-pink">
        <ScrubElement>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-navy/70 mb-8 leading-relaxed">
              These hobbies are more than just activities—they're extensions of my philosophy about applying programming
              techniques to improve quality of life. Whether it's the discipline of martial arts, the improvisation in
              jazz, or the creativity in cooking, each teaches me something valuable that I bring back to my work and
              personal growth.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Discipline', desc: 'Teaches focus and dedication' },
                { title: 'Creativity', desc: 'Encourages experimental thinking' },
                { title: 'Community', desc: 'Builds meaningful connections' },
              ].map((item) => (
                <Card key={item.title} title={item.title} description={item.desc} />
              ))}
            </div>
          </div>
        </ScrubElement>
      </Section>

      {/* Let's Connect */}
      <Section title="Want to chat about hobbies?" background="sky-blue">
        <ScrubElement className="text-center">
          <p className="text-lg text-navy/70 mb-8">
            I'd love to connect with people who share similar interests or want to explore new ones together!
          </p>
          <a
            href="mailto:lirichard6474@gmail.com"
            className="inline-block px-8 py-3 bg-dark-pink text-white rounded-lg font-semibold hover:bg-dark-pink/90 transition-colors"
          >
            Get in Touch
          </a>
        </ScrubElement>
      </Section>
    </main>
  );
}
