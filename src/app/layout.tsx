import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Adinath Vivah — Jain Matrimony',
    template: '%s | Adinath Vivah',
  },
  description:
    'The most trusted matrimony platform for the Adinath Jain community. Find verified, culturally compatible life partners across Digambar & Shwetambar families.',
  keywords: ['jain matrimony', 'adinath jain', 'digambar', 'shwetambar', 'jain shaadi', 'jain vivah'],
  openGraph: {
    title: 'Adinath Vivah — Jain Matrimony',
    description: 'Premium Jain matrimony platform for the Adinath Jain community.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fonts loaded in globals.css */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
