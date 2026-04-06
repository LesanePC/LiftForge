import { useWorkoutStore } from '../store/workoutStore';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { workouts } = useWorkoutStore();
  
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, w) => sum + (w.totalVolume || 0), 0);
  const averageVolume = totalWorkouts > 0 ? Math.round(totalVolume / totalWorkouts) : 0;
  const lastWorkout = workouts[workouts.length - 1];

  const stats = [
    { icon: '🏋️', label: 'Всего тренировок', value: totalWorkouts, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30' },
    { icon: '📊', label: 'Общий объём', value: `${totalVolume} кг`, color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30' },
    { icon: '⚡', label: 'Средний объём', value: `${averageVolume} кг`, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30' },
  ];

  return (
    <div>
      {/* Приветствие */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          Добро пожаловать! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Готов к новым достижениям?
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bg} rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group`}
          >
            <div className={`absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Последняя тренировка */}
      {lastWorkout && (
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10"></div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>🔥</span> Последняя тренировка
          </h2>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(lastWorkout.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {lastWorkout.totalVolume} кг
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {lastWorkout.exercises.length} упражнений •{' '}
                {lastWorkout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)} подходов
              </p>
            </div>
            <Link
              to="/history"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Подробнее →
            </Link>
          </div>
        </div>
      )}

      {/* Быстрый старт */}
      {workouts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Начните свой путь
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Добавьте первую тренировку и отслеживайте прогресс
          </p>
          <Link
            to="/new-workout"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <span>➕</span> Создать тренировку
          </Link>
        </div>
      )}
    </div>
  );
}