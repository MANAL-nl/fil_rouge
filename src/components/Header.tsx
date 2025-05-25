"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Jouons Ensemble!</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Connexion
          </Link>
          
          <Link 
            href="/register" 
            className="px-4 py-2 bg-yellow-400 text-purple-800 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}