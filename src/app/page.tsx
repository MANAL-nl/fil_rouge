import GameExample from '../components/GameExample';
import GameExample2 from '../components/GameExample-2';
import GameExample3 from '../components/GameExample-3';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-blue-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">
        Bienvenue sur Mon Site pour Enfants !
      </h1>
      
      <div className="flex gap-4 mb-8 justify-center">
        <Link href="/login" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Se connecter
        </Link>
        <Link href="/register" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          S'inscrire
        </Link>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-stone-900">Nos Jeux</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameExample />
          <GameExample2 />
          <GameExample3 />
          {/* Ajoutez les jeux ici */}
        </div>
      </div>
    </main>
  );
}