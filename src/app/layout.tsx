import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://richardjdli.com'),
  title: 'Richard JD Li — ML / AI Engineer & Researcher',
  description:
    'Richard JD Li — undergraduate at Columbia studying Computer Science & East Asian Studies. Machine-learning research and software across NASA JPL, Microsoft Research, UW Medicine, and more.',
  authors: [{ name: 'Richard JD Li' }],
  openGraph: {
    title: 'Richard JD Li — ML / AI Engineer & Researcher',
    description:
      'ML research and software across NASA JPL, Microsoft Research, UW Medicine, Columbia, and more — explored through a live knowledge graph.',
    url: 'https://richardjdli.com',
    siteName: 'Richard JD Li',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {children}
      </body>
    </html>
  );
}
