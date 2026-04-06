import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="h-14 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🏋️</span>
        <h1 className="text-xl font-semibold tracking-tight">LiftForge</h1>
      </div>
      
      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="hover:text-accent-color transition-colors">Главная</Link>
        <Link to="/new-workout" className="hover:text-accent-color transition-colors">Новая тренировка</Link>
        <Link to="/history" className="hover:text-accent-color transition-colors">История</Link>
        <Link to="/progress" className="hover:text-accent-color transition-colors">Прогресс</Link>
      </div>

      <div className="flex items-center gap-3">
        <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-lg">
          👤
        </button>
      </div>
    </header>
  );
}