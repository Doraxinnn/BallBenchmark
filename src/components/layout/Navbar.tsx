import { Link, useLocation } from 'react-router-dom';
import { Activity, Sun } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/dataset', label: 'Dataset' },
  { path: '/statistics', label: 'Statistics' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-heading font-semibold text-lg">
          <Activity className="w-6 h-6 text-primary" />
          <span>TS-Benchmark</span>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-body'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </nav>
  );
}
