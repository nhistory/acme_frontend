import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'NFL Teams - List of All Teams, Conferences & Divisions | ACME Sports',
  description:
    ' View the complete list of NFL teams on ACME Sports. Find your favorite teams by conference and division. Stay updated with the latest team information.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="container mx-auto px-30 py-14 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
