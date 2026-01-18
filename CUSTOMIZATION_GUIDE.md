# 🎨 Richard Li Portfolio - Setup & Customization Guide

## ✅ What's Been Created

Your personal portfolio website is now ready to go! Here's what you have:

### 📄 Pages Created
- **Home/About** (`/`) - Hero section with education, timeline, and hobbies overview
- **Internships** (`/internships`) - Showcase your work experience
- **Research** (`/research`) - Display research projects and future interests
- **Projects** (`/projects`) - Feature your personal and open-source projects
- **Hobbies** (`/hobbies`) - Highlight your interests: Wushu, Jazz, Book Club, etc.

### 🎬 Animation Features
- ✨ **Pop-up on Scroll** - Elements scale from 0 to 1 smoothly
- 🎯 **Scrub Effect** - Perfect scroll synchronization with animations
- 🎨 **Custom Color Palette** - Navy, Beige, Sky Blue, Dark Pink, Pale Pink

### 📦 Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS (for styling)
- GSAP + ScrollTrigger (for animations)
- TypeScript (for type safety)
- Responsive mobile-first design

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd portfolio-website
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see your site!

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📝 How to Customize

### Update Your Information

#### Home Page (`src/app/page.tsx`)
- Update the introduction text
- Add your GPA and relevant coursework
- Update club activities
- Adjust the timeline events

#### Internships (`src/app/internships/page.tsx`)
- Replace company names and job titles
- Update descriptions and achievements
- Change dates and skills

#### Research (`src/app/research/page.tsx`)
- Add your research projects
- Include contributions and dates
- List future research interests

#### Projects (`src/app/projects/page.tsx`)
- Replace with your actual projects
- Add project links and highlights
- Update technology stack

#### Hobbies (`src/app/hobbies/page.tsx`)
- Update with your actual hobbies
- Change emojis and descriptions
- Remove skateboarding if not interested (or replace with your hobbies)

#### Navigation (`src/components/Navigation.tsx`)
- Update your name at the top
- Modify navigation links if needed

### Update Contact Information

Replace placeholders in multiple files:
- Email: `your.email@example.com` → your actual email
- GitHub/LinkedIn links: `#` → your actual URLs

### Customize Colors

Edit `tailwind.config.js`:
```js
colors: {
  navy: '#2F4156',      // Main text color
  beige: '#F5EFEB',     // Main background 1
  'sky-blue': '#C8D9E6', // Main background 2
  'dark-pink': '#F7C9D4', // Accent 1
  'pale-pink': '#FFE1E6', // Accent 2
}
```

### Fine-tune Animations

In `src/components/ScrollAnimations.tsx`:

**Pop-up Effect:**
```tsx
duration: 0.8,      // How long the animation takes (seconds)
ease: 'back.out',   // Animation curve
```

**Scrub Effect:**
```tsx
scrub: 1.2,         // Higher = smoother, syncs with scroll
```

---

## 🌐 Deployment to Cloudflare Workers

### Prerequisites
1. Cloudflare account with your domain configured
2. Wrangler CLI installed: `npm install -g wrangler`

### Setup Steps

1. **Update `wrangler.toml`** with your Cloudflare info:
   - Get your Account ID from Cloudflare Dashboard
   - Update zone name to your domain

2. **Authenticate with Cloudflare:**
   ```bash
   wrangler login
   ```

3. **Deploy:**
   ```bash
   npm run build
   wrangler publish
   ```

4. **Custom Domain (Optional):**
   - Go to Cloudflare Dashboard
   - Set up your route in the Workers section
   - Connect your domain

---

## 📸 Features Breakdown

### Pop-up on Scroll
Elements smoothly scale from invisible to visible as they enter the viewport. Great for drawing attention to important sections.

### Scrub Effect
Your scroll wheel controls the animation directly. Perfect for demonstrating timelines, processes, or storytelling content.

### Responsive Design
- Mobile: Single column, optimized spacing
- Tablet: Two columns where appropriate
- Desktop: Full multi-column layouts

### Accessibility
- Semantic HTML
- ARIA labels included
- Smooth animations (respects prefers-reduced-motion)

---

## 🎯 Recommended Next Steps

1. ✅ **Install & Run** locally first
2. ✅ **Customize** all the placeholder content with your info
3. ✅ **Test** on different devices and browsers
4. ✅ **Add** your resume PDF (can be linked or embedded)
5. ✅ **Deploy** to Cloudflare Workers
6. ✅ **Monitor** performance and gather feedback

---

## 🔧 Environment Variables

Create `.env.local` for sensitive data:
```
CONTACT_EMAIL=your@email.com
CLOUDFLARE_API_TOKEN=your_token
```

See `.env.example` for template.

---

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- [Cloudflare Workers](https://developers.cloudflare.com/workers)

---

## 💡 Pro Tips

1. **Add Images:** Place images in `public/` and reference them
2. **Dark Mode:** Easily add with Tailwind's `dark:` prefix
3. **Performance:** Use Next.js Image component for optimization
4. **SEO:** Update metadata in `src/app/layout.tsx`
5. **Analytics:** Add with Cloudflare Analytics Engine or Google Analytics

---

## ❓ Common Questions

**Q: How do I change the animation speed?**
A: Edit the `duration` and `scrub` values in `ScrollAnimations.tsx`

**Q: Can I add more pages?**
A: Yes! Create new folders in `src/app/` with `page.tsx` files

**Q: How do I add a contact form?**
A: You can use services like Formspree, EmailJS, or Cloudflare Forms

**Q: Can I add a blog?**
A: Yes! Create a `blog` folder and use markdown or a CMS

---

## 🎉 You're All Set!

Your portfolio is ready to showcase. Make it your own by filling in your content and deploying it to the world!

Good luck! 🚀
