import { useState } from 'react';
import { useExerciseStore } from '../store/exerciseStore';
import { ExerciseCard } from '../components/exercises/ExerciseCard';
import { AddExerciseModal } from '../components/exercises/AddExerciseModal';
import type { Exercise } from '../store/exerciseStore';

export default function ExercisesPage() {
  const { exercises, addExercise, deleteExercise } = useExerciseStore();
  const [selectedCategory, setSelectedCategory] = useState<Exercise['category'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Все', icon: '📚' },
    { value: 'bench', label: 'Жимовые', icon: '🏋️' },
    { value: 'squat', label: 'Приседания', icon: '🦵' },
    { value: 'deadlift', label: 'Тяговые', icon: '🏋️‍♂️' },
    { value: 'accessory', label: 'Подсобные', icon: '💪' },
  ];

  const filteredExercises = selectedCategory === 'all'
    ? exercises
    : exercises.filter(e => e.category === selectedCategory);

  const handleAddExercise = (newExercise: Omit<Exercise, 'id'>) => {
    const exercise: Exercise = {
      ...newExercise,
      id: Date.now().toString(),
    };
    addExercise(exercise);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">💪 Библиотека упражнений</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + Добавить упражнение
        </button>
      </div>

      {/* Категории */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === cat.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Статистика */}
      <div className="mb-6 text-gray-600 dark:text-gray-400">
        Найдено упражнений: {filteredExercises.length}
        {selectedCategory !== 'all' && (
          <span className="ml-2 text-blue-500">
            (Пользовательских: {filteredExercises.filter(e => e.isCustom).length})
          </span>
        )}
      </div>

      {/* Список упражнений */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onDelete={deleteExercise}
          />
        ))}
      </div>

      {/* Пустое состояние */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Нет упражнений в этой категории
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Добавить первое упражнение
          </button>
        </div>
      )}

      {/* Модальное окно */}
      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExercise}
      />
    </div>
  );
}