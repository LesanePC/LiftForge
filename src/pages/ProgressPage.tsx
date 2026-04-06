import { useState, useMemo } from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { useExerciseStore } from '../store/exerciseStore';
import { StreakCounter } from '../components/progress/StreakCounter';
import { HeatmapCalendar } from '../components/progress/HeatmapCalendar';
import { PersonalRecords } from '../components/progress/PersonalRecords';
import { ExerciseProgressChart } from '../components/progress/ExerciseProgressChart';

export default function ProgressPage() {
  const { workouts } = useWorkoutStore();
  const { exercises } = useExerciseStore();
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  // Получаем список упражнений, которые выполнялись
  const performedExercises = useMemo(() => {
    const exerciseSet = new Set<string>();
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exerciseSet.add(exercise.exerciseName);
      });
    });
    return Array.from(exerciseSet).sort();
  }, [workouts]);

  const totalVolume = workouts.reduce((sum, w) => sum + (w.totalVolume || 0), 0);
  const averageVolume = workouts.length > 0 ? Math.round(totalVolume / workouts.length) : 0;

  // Если нет тренировок, показываем сообщение
  if (workouts.length === 0) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">📈 Прогресс и статистика</h1>
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Нет данных для отображения
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Добавьте тренировки, чтобы увидеть прогресс
          </p>
          <button
            onClick={() => window.location.href = '/new-workout'}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Создать тренировку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📈 Прогресс и статистика</h1>
      
      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Общая статистика</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Всего тренировок:</span>
              <span className="font-bold">{workouts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Общий объём:</span>
              <span className="font-bold">{totalVolume} кг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Средний объём:</span>
              <span className="font-bold">{averageVolume} кг</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Всего упражнений:</span>
              <span className="font-bold">{exercises.length}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 Достижения</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span>Разных упражнений: {performedExercises.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Серия тренировок */}
      <div className="mb-8">
        <StreakCounter />
      </div>
      
      {/* Тепловая карта */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">📅 Календарь тренировок</h2>
        <HeatmapCalendar />
      </div>
      
      {/* Личные рекорды */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🏆 Личные рекорды</h2>
        <PersonalRecords />
      </div>
      
      {/* График прогресса по упражнению */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📈 Детальный прогресс</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Выберите упражнение
          </label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full max-w-md px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Выберите упражнение</option>
            {performedExercises.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>
        
        {selectedExercise && (
          <ExerciseProgressChart exerciseName={selectedExercise} />
        )}
        
        {!selectedExercise && performedExercises.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Выберите упражнение для просмотра детальной статистики
          </div>
        )}
      </div>
    </div>
  );
}