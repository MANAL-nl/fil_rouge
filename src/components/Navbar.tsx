// 
import Link from 'next/link';
import { FiBook, FiHelpCircle, FiEdit } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-6 p-4 bg-white shadow-md sticky top-0 z-50">
      <Link
        href="/histoire"
        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
      >
        <FiBook size={20} />
        Histoire
      </Link>
      <Link
        href="/jeu/course-sebi/conseils"
        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
      >
        <FiHelpCircle size={20} />
        Conseils
      </Link>
      <Link
        href="/quiz"
        className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
      >
        <FiEdit size={20} />
        Quiz
      </Link>
    </nav>
  );
}
