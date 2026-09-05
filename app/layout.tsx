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
    'Experience broadcast-grade podcasting in Colombo. 4K Sony FX cinema multi-cam, Shure SM7B broadcast audio, live switching, viral shorts editing, and sound mastering for founders, creators, and enterprise brands.',
  keywords: [
    'Podcast Studio Sri Lanka',
    'Colombo Podcast Studio',
    'WizeTV',
    'Video Podcast Production',
    'Shure SM7B Studio Colombo',
    '4K Multi-Cam Podcast Studio',
    'Short Form Video Agency Sri Lanka',
    'Audio Mastering Colombo',
  ],
  authors: [{ name: 'WizeTV Media Production' }],
  openGraph: {
    title: 'WizeTV | Premier Podcast & Media Studio Colombo',
    description:
      'Record your flagship podcast with 4K multi-cam cinema cameras, Shure broadcast mics, and viral clip editing in Colombo 07.',
    url: 'https://wizetv.lk',
    siteName: 'WizeTV Studio',
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WizeTV | Podcast & Media Production Studio Sri Lanka',
    description:
      'State-of-the-art podcast and video production studio in Colombo 07.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${montserrat.variable}`}>
      <body className="bg-brand-dark text-slate-100 min-h-screen flex flex-col antialiased selection:bg-brand-red selection:text-white">
        <Navbar />
        <main className="flex-grow pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
