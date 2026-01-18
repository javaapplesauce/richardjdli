# Public Assets

Add your images, resume PDF, and other static files here.

## Folder Structure

```
public/
├── resume.pdf          # Your resume
├── images/
│   ├── profile.jpg
│   └── projects/
│       ├── project1.png
│       └── project2.png
└── .gitkeep
```

## Usage in Components

Reference files like this:
```tsx
<img src="/images/profile.jpg" alt="Profile" />
<a href="/resume.pdf" download>Download Resume</a>
```

Files in the `public/` folder are served as static assets at the root of your domain.
