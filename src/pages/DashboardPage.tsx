import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Target, Flame } from 'lucide-react';
import { useWorkoutStore } from '../store/workoutStore';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { workouts } = useWorkoutStore();

  // Подсчёт статистики
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, w) => sum + w.totalVolume, 0);
  const thisMonthWorkouts = workouts.filter((w) => {
    const date = new Date(w.date);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const streak = 7; // заглушка (позже можно сделать реальный расчёт)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Добро пожаловать в LiftForge</h1>
        <p className="text-zinc-400 mt-2">
          Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <Flame className="text-orange-400" size={28} />
            <div>
              <p className="text-sm text-zinc-400">Текущий streak</p>
              <p className="text-4xl font-bold text-orange-400">{streak} дней</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <Target className="text-emerald-400" size={28} />
            <div>
              <p className="text-sm text-zinc-400">Тренировок всего</p>
              <p className="text-4xl font-bold text-emerald-400">{totalWorkouts}</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-400" size={28} />
            <div>
              <p className="text-sm text-zinc-400">Общий тоннаж</p>
              <p className="text-4xl font-bold text-blue-400">{Math.round(totalVolume / 1000)} т</p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <Calendar className="text-purple-400" size={28} />
            <div>
              <p className="text-sm text-zinc-400">В этом месяце</p>
              <p className="text-4xl font-bold text-purple-400">{thisMonthWorkouts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/new-workout')}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-6 rounded-3xl flex items-center justify-center gap-4 text-xl transition-colors"
          >
            <span className="text-3xl">🏋️</span>
            Начать новую тренировку
          </button>

          <button
            onClick={() => navigate('/history')}
            className="bg-zinc-800 hover:bg-zinc-700 font-semibold py-6 rounded-3xl flex items-center justify-center gap-4 text-xl transition-colors"
          >
            <span className="text-3xl">📖</span>
            Посмотреть историю
          </button>
        </div>
      </div>

      {/* Последние тренировки */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Последние тренировки</h2>
          <button
            onClick={() => navigate('/history')}
            className="text-accent-color text-sm font-medium hover:underline"
          >
            Все тренировки →
          </button>
        </div>

        {workouts.length > 0 ? (
          <div className="space-y-3">
            {workouts.slice(0, 3).map((workout) => (
              <div
                key={workout.id}
                className="bg-zinc-900 rounded-2xl p-5 flex justify-between items-center hover:bg-zinc-800 transition-colors cursor-pointer"
                onClick={() => navigate('/history')}
              >
                <div>
                  <p className="font-medium">
                    {new Date(workout.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-sm text-zinc-400">{workout.exercises.length} упражнений</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-400">{workout.totalVolume} кг</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-3xl p-12 text-center">
            <p className="text-zinc-400">Пока нет тренировок</p>
            <button
              onClick={() => navigate('/new-workout')}
              className="mt-4 text-accent-color hover:underline"
            >
              Создать первую тренировку →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}