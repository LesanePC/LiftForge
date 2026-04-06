import { useState, useMemo } from 'react';
import { useWorkoutStore } from '../store/workoutStore';
import { WorkoutCard } from '../components/history/WorkoutCard';
import { HistoryFilters } from '../components/history/HistoryFilters';
import { EditWorkoutModal } from '../components/history/EditWorkoutModal';
import type { Workout } from '../store/workoutStore';

export default function HistoryPage() {
  const { workouts, updateWorkout, deleteWorkout } = useWorkoutStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'volume'>('date');
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  // Фильтрация и сортировка тренировок
  const filteredWorkouts = useMemo(() => {
    let filtered = workouts;
    
    // Поиск
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(workout =>
        workout.notes?.toLowerCase().includes(term) ||
        workout.exercises.some(ex => ex.exerciseName.toLowerCase().includes(term))
      );
    }
    
    // Сортировка
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.totalVolume - a.totalVolume;
      }
    });
    
    return filtered;
  }, [workouts, searchTerm, sortBy]);

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту тренировку?')) {
      deleteWorkout(id);
    }
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
  };

  const handleSaveEdit = (updatedWorkout: Workout) => {
    updateWorkout(updatedWorkout.id, updatedWorkout);
  };

  // Статистика
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, w) => sum + w.totalVolume, 0);
  const averageVolume = totalWorkouts > 0 ? Math.round(totalVolume / totalWorkouts) : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">📜 История тренировок</h1>
      
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90">Всего тренировок</div>
          <div className="text-2xl font-bold">{totalWorkouts}</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90">Общий объём</div>
          <div className="text-2xl font-bold">{totalVolume} кг</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90">Средний объём</div>
          <div className="text-2xl font-bold">{averageVolume} кг</div>
        </div>
      </div>
      
      {/* Фильтры */}
      <HistoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      {/* Список тренировок */}
      {filteredWorkouts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <div className="text-6xl mb-4">🏋️</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Нет тренировок
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {workouts.length === 0 
              ? 'Добавьте свою первую тренировку!' 
              : 'По вашему запросу ничего не найдено'}
          </p>
          {workouts.length === 0 && (
            <button
              onClick={() => window.location.href = '/new-workout'}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Создать тренировку
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      {/* Модальное окно редактирования */}
      <EditWorkoutModal
        workout={editingWorkout}
        onClose={() => setEditingWorkout(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}