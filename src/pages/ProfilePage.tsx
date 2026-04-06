import { useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { useWorkoutStore } from '../store/workoutStore';
import { DataManager } from '../components/settings/DataManager';

export default function ProfilePage() {
  const { theme, setTheme } = useUIStore();
  const { workouts } = useWorkoutStore();
  const [notifications, setNotifications] = useState(false);

  const totalWorkouts = workouts.length;
  const firstWorkout = workouts[workouts.length - 1];
  const lastWorkout = workouts[0];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">👤 Профиль и настройки</h1>

      <div className="space-y-6">
        {/* Статистика профиля */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Ваша статистика</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Всего тренировок:</span>
              <span className="font-bold">{totalWorkouts}</span>
            </div>
            {firstWorkout && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Первая тренировка:</span>
                <span className="font-bold">
                  {new Date(firstWorkout.date).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}
            {lastWorkout && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Последняя тренировка:</span>
                <span className="font-bold">
                  {new Date(lastWorkout.date).toLocaleDateString('ru-RU')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Настройки темы */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎨 Внешний вид</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Тема оформления
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  ☀️ Светлая
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  🌙 Тёмная
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Уведомления (заглушка) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🔔 Уведомления</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300">Напоминания о тренировках</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Будет доступно в следующей версии
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                disabled
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 opacity-50"></div>
            </label>
          </div>
        </div>

        {/* Управление данными */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">💾 Управление данными</h2>
          <DataManager />
        </div>

        {/* О приложении */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">🏋️ LiftForge</h2>
          <p className="text-gray-600 dark:text-gray-400">Версия 1.0.0</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Твой личный кузнец прогресса в зале
          </p>
        </div>
      </div>
    </div>
  );
}