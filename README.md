# Richard Li - Portfolio Website

A modern, animated personal portfolio built with **Next.js**, **Tailwind CSS**, and **GSAP ScrollTrigger** featuring scroll-triggered animations similar to Zoox.

## 🎨 Features

- **Pop-up on Scroll**: Elements scale from 0 to 1 as they enter the viewport
- **Scrub Effect**: Animations perfectly synced with scroll wheel movement
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Custom Color Palette**: Navy, Beige, Sky Blue, Dark Pink, and Pale Pink
- **Smooth Transitions**: Enhanced user experience with Tailwind CSS and GSAP

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger
- **Language**: TypeScript
- **Deployment**: Cloudflare Workers

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with navigation
│   │   ├── page.tsx           # Home/About page
│   │   ├── internships/
│   │   │   └── page.tsx
│   │   ├── research/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── hobbies/
│   │   │   └── page.tsx
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── Navigation.tsx     # Top navigation bar
│   │   ├── ScrollAnimations.tsx # PopUpElement & ScrubElement
│   │   └── Section.tsx        # Reusable section components
│   └── hooks/
│       └── useScrollAnimations.ts
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Installation

```bash
cd portfolio-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization

### Update Personal Information

- Edit `src/app/page.tsx` to update your introduction
- Modify internship details in `src/app/internships/page.tsx`
- Add your research projects in `src/app/research/page.tsx`
- Showcase your projects in `src/app/projects/page.tsx`
- Customize hobbies in `src/app/hobbies/page.tsx`

### Color Palette

Colors are defined in `tailwind.config.js`:

```js
colors: {
  navy: '#2F4156',
  beige: '#F5EFEB',
  'sky-blue': '#C8D9E6',
  'dark-pink': '#F7C9D4',
  'pale-pink': '#FFE1E6',
}
```

### Animation Tuning

Modify animation timings in `src/components/ScrollAnimations.tsx`:

```tsx
// Pop-up duration and easing
duration: 0.8,
ease: 'back.out',

// Scrub intensity (1.2 = smoothly follows scroll)
scrub: 1.2,
```

## 🌐 Deployment with Cloudflare Workers

### Setup

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Create a `wrangler.toml` in the root directory:
```toml
name = "richard-portfolio"
type = "javascript"
account_id = "YOUR_ACCOUNT_ID"
workers_dev = true
route = "your-domain.com/*"
```

3. Deploy:
```bash
wrangler publish
```

For more details, see [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/).

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Framer Motion](https://www.framer.com/motion/)

## 🎯 Future Enhancements

- [ ] Add dark mode toggle
- [ ] Implement blog section
- [ ] Add contact form with email notification
- [ ] Image optimization with Next.js Image
- [ ] SEO improvements with structured data
- [ ] Analytics integration
- [ ] Testing (Jest + React Testing Library)

## 📧 Contact

Feel free to customize the contact links and email addresses throughout the site.

## 📄 License

This project is personal and free to use for inspiration.
