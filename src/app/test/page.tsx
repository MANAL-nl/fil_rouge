'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PageUser() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Bienvenue sur votre Page</h1>
      <p className="mt-4">Vous êtes connecté !</p>

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Déconnexion
      </button>
    </div>
  );
}
