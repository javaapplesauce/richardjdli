'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PopUpElement } from '@/components/ScrollAnimations';
import { Section } from '@/components/Section';

type ResearchProject = {
  id: string;
  institution: string;
  title: string;
  period: string;
  description: string;
  highlights: string[];
  logo: string;
  photo: string;
};

export default function Research() {
  const projects: ResearchProject[] = [
    {
      id: 'microsoft',
      institution: 'Microsoft',
      title: 'Research Intern',
      period: 'Jun. 2025 – Aug. 2025',
      description: 'Redmond, WA',
      highlights: [
        'Researched the use of custom semantic linear classifiers for improving zero-shot model prediction.',
        'Modified OpenAI\'s SOTA Contrastive Language-Image Pretrained (CLIP) model, improving mAP on the human action recognition dataset from 60% to 93%.',
        'Decreased finetuning time by 3x with PyTorch DDP (Distributed Data Parallel) and integrated Weights & Biases (W&B) for efficient experiment tracking and debugging.',
      ],
      logo: '/logos/microsoft.svg',
      photo: '/research-photos/microsoft-action.svg',
    },
    {
      id: 'columbia',
      institution: 'Columbia University',
      title: 'Machine Learning Research',
      period: '2024 – Present',
      description: 'New York, NY',
      highlights: [
        'Developed and optimized text-to-audio diffusion models achieving 85% accuracy on WaveNet objectives.',
        'Contributed technical blog posts read by 1000+ practitioners in the ML community.',
        'Collaborated with faculty on cutting-edge deep learning research.',
      ],
      logo: '/logos/columbia.svg',
      photo: '/research-photos/columbia-action.svg',
    },
    {
      id: 'caltech',
      institution: 'Caltech - Dept. of Geological and Planetary Sciences',
      title: 'Research Assistant',
      period: '2022 – 2023',
      description: 'Pasadena, CA',
      highlights: [
        'Researched use of Monte Carlo Markov Chains in adjusting NO2 Satellite readings for atmospheric factors (\'23).',
        'Created a novel algorithm to predict and monitor spread of wildfires using satellite data (\'22).',
        'Applied advanced statistical methods to planetary science problems.',
      ],
      logo: '/logos/caltech.svg',
      photo: '/research-photos/caltech-action.svg',
    },
    {
      id: 'uw-medicine',
      institution: 'University of Washington - Department of Medicine',
      title: 'Bioinformatics and Data Analyst Intern',
      period: 'Jan. 2023 – Aug. 2025',
      description: 'Seattle, WA',
      highlights: [
        'Conducted research characterizing the macaque placenta and fetal brain, serving as references for studying inflammatory and infection dynamics during the third trimester.',
        'Developed pipeline that automates preprocessing and downstream analysis of single-cell RNA datasets, reducing cell annotation processing time 90+% (7+ days to <12 hours).',
        'Leveraged statistical analysis and research findings to help successfully secure $200K in grant funding.',
      ],
      logo: '/logos/uw-medicine.svg',
      photo: '/research-photos/uw-medicine-action.svg',
    },
  ];

  const [selectedProject, setSelectedProject] = useState<ResearchProject>(projects[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProjectChange = (project: ResearchProject) => {
    if (project.id === selectedProject.id) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <main className="pt-16 min-h-screen bg-beige">
      <Section title="Research" className="!pt-32" background="beige">
        <div className="max-w-7xl mx-auto">
          {/* Why I Do Research - Compact Version */}
          <PopUpElement>
            <div className="bg-white rounded-lg p-6 lg:p-8 shadow-md border border-navy/5 mb-12">
              <h2 className="text-xl lg:text-2xl font-bold text-navy mb-4">Why I Do Research</h2>
              <p className="text-base lg:text-lg text-navy/80 leading-relaxed">
                Research is where curiosity meets impact. I'm driven by the opportunity to tackle problems that don't 
                have clear solutions yet—whether that's improving AI model performance, analyzing biological datasets, 
                or using satellite data to predict environmental changes. What excites me most is bridging the gap between 
                cutting-edge research and real-world applications. I believe the best research doesn't just push 
                boundaries—it makes a meaningful difference in how we live and work.
              </p>
            </div>
          </PopUpElement>

          {/* Research Experiences */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12">
            {/* Logo Buttons - Vertical on Desktop, Horizontal on Mobile */}
            <div className="flex lg:flex-col gap-4 lg:gap-6 order-1 lg:order-none">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectChange(project)}
                  onMouseEnter={() => handleProjectChange(project)}
                  className={`
                    w-20 h-20 lg:w-24 lg:h-24 rounded-full 
                    flex items-center justify-center
                    transition-all duration-300 ease-out
                    hover:scale-110 hover:shadow-xl
                    bg-white p-3 lg:p-4
                    ${
                      selectedProject.id === project.id
                        ? 'shadow-lg scale-110 ring-4 ring-dark-pink/40'
                        : 'shadow-md hover:ring-2 hover:ring-sky-blue/50'
                    }
                  `}
                  aria-label={`View ${project.institution} research`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={project.logo}
                      alt={`${project.institution} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80px, 96px"
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-3xl order-2">
              <PopUpElement key={selectedProject.id}>
                <div
                  className={`
                    bg-white rounded-lg shadow-xl
                    border border-navy/5 overflow-hidden
                    transition-all duration-300
                    ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
                    animate-slide-up-fade
                  `}
                >
                  {/* Action Photo */}
                  <div className="relative w-full h-48 lg:h-64 bg-gradient-to-br from-sky-blue/20 to-pale-pink/20">
                    <Image
                      src={selectedProject.photo}
                      alt={`Research at ${selectedProject.institution}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className="absolute bottom-4 left-6 right-6">
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {selectedProject.institution}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 space-y-4">
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-dark-pink mb-1">
                        {selectedProject.title}
                      </h3>
                      <p className="text-sm text-navy/60 font-medium">{selectedProject.description}</p>
                      <p className="text-sm text-navy/50 font-medium">{selectedProject.period}</p>
                    </div>

                    <div className="pt-2">
                      <ul className="space-y-3">
                        {selectedProject.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="text-sm lg:text-base text-navy/80 leading-relaxed flex gap-3"
                            style={{
                              animation: `fadeInUp 0.4s ease-out ${idx * 0.1}s both`,
                            }}
                          >
                            <span className="text-dark-pink font-bold flex-shrink-0">–</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </PopUpElement>
            </div>
          </div>
        </div>
      </Section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up-fade {
          animation: slide-up-fade 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}

