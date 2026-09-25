import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-purple-950/90 backdrop-blur-md border-b border-amber-500/20 sticky top-0 z-50 animate-fade-in-down">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
            <Eye className="h-8 w-8 animate-glow" />
            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Mystic Vision
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-amber-100 hover:text-amber-300 transition-colors">
              Accueil
            </Link>
            <Link to="/packs" className="text-amber-100 hover:text-amber-300 transition-colors">
              Nos Packs
            </Link>
            <Link to="/contact" className="text-amber-100 hover:text-amber-300 transition-colors">
              Contact
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}
