import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#090D16',
};

export const metadata: Metadata = {
  title: 'WizeTV | Sri Lanka’s Leading Podcast & Media Production Studio',
  description:
    'WizeTV is a premier podcast and media production studio in Colombo, Sri Lanka,and professional audio mastering services.',
  keywords: [
    'Podcast Studio Sri Lanka',
    'Colombo Podcast Studio',
    'WizeTV',
    'Video Podcast Production',
    'Studio Colombo',
    'Multi-Cam Podcast Studio',
    'Short Form Video Agency Sri Lanka',
    'Audio Mastering Colombo',
  ],
  authors: [{ name: 'WizeTV Media Production' }],
  openGraph: {
    title: 'WizeTV | Premier Podcast & Media Studio Colombo',
    description:
      'WizeTV is a premier podcast and media production studio in Colombo, Sri Lanka,and professional audio mastering services.',
    url: 'https://wizetv.lk',
    siteName: 'WizeTV Studio',
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WizeTV | Podcast & Media Production Studio Sri Lanka',
    description:
      'WizeTV is a premier podcast and media production studio in Colombo, Sri Lanka,and professional audio mastering services.',
  },
  icons: {
    icon: [
      { url: '/icon.png?v=2' },
      { url: '/favicon.ico?v=2' },
    ],
    shortcut: ['/icon.png?v=2'],
    apple: [
      { url: '/icon.png?v=2' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
        <link rel="shortcut icon" href="/icon.png?v=2" />
      </head>
      <body className="bg-brand-dark text-slate-100 min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white">
        <Navbar />
        <main className="flex-grow pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
