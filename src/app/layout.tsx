import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';  // <- Import de la navbar

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Site pour Enfants',
  description: 'Jeux éducatifs pour enfants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-sky-400`}>
        <Header />
        <Navbar />  
        {children}
      </body>
    </html>
  );
}
