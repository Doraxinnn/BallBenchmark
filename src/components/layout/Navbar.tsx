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
      <div className="mx-auto flex max-w-container flex-col items-start gap-1 px-4 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-0">
        <Link to="/" className="flex items-center gap-2 text-heading font-semibold text-lg">
          <Activity className="w-6 h-6 text-primary" />
          <span>TS-Benchmark</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:flex-nowrap sm:gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`py-2 text-sm font-medium transition-colors hover:text-primary sm:py-0 ${
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
