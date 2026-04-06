import { useState } from 'react';
import { useExerciseStore } from '../../store/exerciseStore';
import type { Exercise } from '../../store/exerciseStore';

interface ExerciseSelectorProps {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
}

export function ExerciseSelector({ onSelect, onClose }: ExerciseSelectorProps) {
  const { exercises } = useExerciseStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'bench', 'squat', 'deadlift', 'accessory'];
  const categoryLabels = {
    all: 'Все',
    bench: '🏋️ Жимовые',
    squat: '🦵 Приседания',
    deadlift: '🏋️‍♂️ Тяговые',
    accessory: '💪 Подсобные',
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Выберите упражнение
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Поиск упражнений..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        </div>
        
        <div className="p-4 border-b dark:border-gray-700 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {categoryLabels[cat as keyof typeof categoryLabels]}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-2">
            {filteredExercises.map(exercise => (
              <button
                key={exercise.id}
                onClick={() => onSelect(exercise)}
                className="text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="font-medium text-gray-900 dark:text-white">
                  {exercise.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {exercise.isCustom ? '📝 Своё' : '📚 Стандартное'}
                </div>
              </button>
            ))}
          </div>
          
          {filteredExercises.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Упражнения не найдены
            </div>
          )}
        </div>
      </div>
    </div>
  );
}