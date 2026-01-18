portfolio-website/
│
├── 📦 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── tailwind.config.js        # Tailwind CSS theme and colors
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── jsconfig.json             # Path aliases (@/*)
│   ├── wrangler.toml             # Cloudflare Workers config
│   ├── .gitignore                # Git ignore rules
│   ├── .env.example              # Environment variables template
│   │
│
├── 📁 src/
│   │
│   ├── app/
│   │   ├── layout.tsx            # Root layout (HTML structure, Navigation)
│   │   ├── page.tsx              # Home page (About, Education, Timeline)
│   │   ├── globals.css           # Global styles and Tailwind imports
│   │   │
│   │   ├── internships/
│   │   │   └── page.tsx          # Internships page
│   │   │
│   │   ├── research/
│   │   │   └── page.tsx          # Research page
│   │   │
│   │   ├── projects/
│   │   │   └── page.tsx          # Projects page
│   │   │
│   │   └── hobbies/
│   │       └── page.tsx          # Hobbies page
│   │
│   ├── components/
│   │   ├── Navigation.tsx        # Top navigation bar
│   │   │                         # - Responsive menu
│   │   │                         # - Mobile hamburger
│   │   │                         # - Nav links
│   │   │
│   │   ├── ScrollAnimations.tsx  # Animation components
│   │   │                         # - PopUpElement (scale from 0-1)
│   │   │                         # - ScrubElement (scroll sync)
│   │   │
│   │   └── Section.tsx           # Reusable components
│   │                             # - Section (full-width section)
│   │                             # - Card (info card)
│   │                             # - TimelineItem (timeline event)
│   │
│   └── hooks/
│       └── useScrollAnimations.ts # Custom React hooks
│                                 # - usePopUpOnScroll
│                                 # - useScrubScroll
│
├── 📄 Documentation Files
│   ├── README.md                 # Project overview and setup
│   └── CUSTOMIZATION_GUIDE.md    # How to customize your portfolio
│
└── 📚 Other
    ├── node_modules/            # Dependencies (created after npm install)
    └── .next/                   # Build output (created after npm run build)


## 🎨 Color Palette (in tailwind.config.js)
├── Navy (#2F4156)           → Main text color
├── Beige (#F5EFEB)          → Background 1
├── Sky Blue (#C8D9E6)       → Background 2
├── Dark Pink (#F7C9D4)      → Accent 1
└── Pale Pink (#FFE1E6)      → Accent 2


## 📄 Page Structure

Each page follows this pattern:
```
'use client'

import { PopUpElement, ScrubElement } from '@/components/ScrollAnimations'
import { Section, Card, TimelineItem } from '@/components/Section'

export default function PageName() {
  return (
    <main>
      <Section title="Title" background="beige">
        <PopUpElement>
          {content}
        </PopUpElement>
      </Section>
    </main>
  )
}
```


## 🔑 Key Component Props

### Section
- `title` (string) - Section heading
- `background` ('beige' | 'sky-blue' | 'pale-pink') - Background color
- `className` (string) - Additional CSS classes

### Card
- `title` (string) - Card title
- `description` (string) - Card description
- `children` (ReactNode) - Card content

### PopUpElement
- `children` (ReactNode) - Content to animate
- `className` (string) - Additional CSS classes
- `delay` (number) - Stagger delay (default: 0)

### ScrubElement
- `children` (ReactNode) - Content to animate
- `className` (string) - Additional CSS classes


## 📱 Responsive Breakpoints (Tailwind)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Usage: `md:text-2xl` = text-2xl on medium screens and up


## 🎬 Animation Configurations

### PopUpElement (In ScrollAnimations.tsx)
```tsx
{
  opacity: 0,
  scale: 0,      // Starts invisible and tiny
}
→
{
  opacity: 1,
  scale: 1,      // Grows to full size
  duration: 0.8, // Animation length
  ease: 'back.out'
}
```

### ScrubElement (In ScrollAnimations.tsx)
```tsx
{
  opacity: 0,
  y: 100         // Starts below viewport
}
→
{
  opacity: 1,
  y: 0,          // Slides up to position
  scrub: 1.2     // Syncs with scroll (1.2 = smooth)
}
```


## 🚀 Deployment Flow
1. GitHub repo → Cloudflare Workers
2. Wrangler CLI reads wrangler.toml
3. Builds Next.js project
4. Deploys to Cloudflare edge network
5. Live at your custom domain


## 📊 File Hierarchy Summary
- Configuration (5 files)
- Source code (3 directories with 11 files)
- Documentation (2 files)
- Total: ~16 core files
