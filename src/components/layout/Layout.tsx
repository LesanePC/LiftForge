import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

const navItems = [
  { path: '/', label: 'Дашборд', icon: '📊', color: 'from-blue-500 to-cyan-500' },
  { path: '/new-workout', label: 'Новая тренировка', icon: '➕', color: 'from-green-500 to-emerald-500' },
  { path: '/history', label: 'История', icon: '📜', color: 'from-purple-500 to-pink-500' },
  { path: '/progress', label: 'Прогресс', icon: '📈', color: 'from-orange-500 to-red-500' },
  { path: '/exercises', label: 'Упражнения', icon: '💪', color: 'from-indigo-500 to-blue-500' },
  { path: '/profile', label: 'Профиль', icon: '👤', color: 'from-teal-500 to-cyan-500' },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useUIStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Декоративный фон */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-pulse delay-1000"></div>
      </div>

      {/* Кнопка темы */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Мобильная кнопка меню */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
        >
          ☰
        </button>
      </div>

      {/* Боковое меню */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl transform transition-all duration-300 z-40 border-r border-gray-200/50 dark:border-gray-700/50
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 pt-20">
          <div className="text-center mb-8">
            <div className="text-5xl mb-2 animate-bounce">🏋️</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LiftForge
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">кузнец прогресса</p>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-8 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Оверлей */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Основной контент */}
      <main className="lg:ml-72 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}