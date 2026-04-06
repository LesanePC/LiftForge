import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, History, TrendingUp } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full p-4 flex flex-col">
      <div className="mb-8 px-4">
        <h2 className="text-lg font-semibold text-accent-color">LiftForge</h2>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/') ? 'bg-accent-color text-black' : 'hover:bg-gray-800'}`}
        >
          <Home size={20} />
          <span>Главная</span>
        </Link>

        <Link
          to="/new-workout"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/new-workout') ? 'bg-accent-color text-black' : 'hover:bg-gray-800'}`}
        >
          <PlusCircle size={20} />
          <span>Новая тренировка</span>
        </Link>

        <Link
          to="/history"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/history') ? 'bg-accent-color text-black' : 'hover:bg-gray-800'}`}
        >
          <History size={20} />
          <span>История</span>
        </Link>

        <Link
          to="/progress"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive('/progress') ? 'bg-accent-color text-black' : 'hover:bg-gray-800'}`}
        >
          <TrendingUp size={20} />
          <span>Прогресс</span>
        </Link>
      </nav>
    </div>
  );
}