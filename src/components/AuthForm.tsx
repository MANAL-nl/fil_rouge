"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type AuthFormProps = {
  isLogin?: boolean;
};

export default function AuthForm({ isLogin = false }: AuthFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
      } else {
        router.push('/test');
    }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="age" className="block text-gray-700 mb-1">
                Âge (facultatif)
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="3"
                max="12"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white font-medium ${
              loading
                ? 'bg-purple-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            {isLogin ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
            <Link
              href={isLogin ? '/register' : '/login'}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? 'Créer un compte' : 'Se connecter'}
            </Link>
          </p>
        </div>

        {isLogin && (
          <div className="mt-4 text-center text-sm">
            <Link href="/forgot-password" className="text-purple-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
