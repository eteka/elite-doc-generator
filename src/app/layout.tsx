import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Elite Doc Generator - Professional Document Creation',
  description: 'Create consulting-grade reports and presentations with AI-powered content generation',
  keywords: ['document generator', 'consulting', 'reports', 'presentations', 'AI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
