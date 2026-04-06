import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Страница не найдена</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Извините, такой страницы не существует
      </p>
      <Link to="/" className="mt-6 btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
}