import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { useExerciseStore } from '../store/exerciseStore';
import { ExerciseCard } from '../components/exercises/ExerciseCard';
import AddExerciseModal from '../components/exercises/AddExerciseModal';
import type { Exercise } from '../store/exerciseStore';

export default function ExercisesPage() {
  const { exercises, deleteExercise } = useExerciseStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Exercise['category'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Все упражнения', icon: '📚' },
    { value: 'bench', label: 'Жимовые', icon: '🏋️' },
    { value: 'squat', label: 'Приседания', icon: '🦵' },
    { value: 'deadlift', label: 'Тяговые', icon: '🏋️‍♂️' },
    { value: 'accessory', label: 'Подсобные', icon: '💪' },
  ];

  // Фильтрация
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Библиотека упражнений</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent-color hover:bg-blue-500 text-black font-semibold px-5 py-3 rounded-2xl transition-colors"
        >
          <Plus size={20} />
          Добавить упражнение
        </button>
      </div>

      {/* Поиск */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Поиск упражнений..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-accent-color text-lg"
        />
      </div>

      {/* Фильтры по категориям */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value as any)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all ${
              selectedCategory === cat.value
                ? 'bg-accent-color text-black shadow-md'
                : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700'
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className="font-medium">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Счётчик */}
      <div className="text-sm text-gray-400 mb-4">
        Найдено упражнений: <span className="font-semibold text-white">{filteredExercises.length}</span>
      </div>

      {/* Список упражнений */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onDelete={deleteExercise}
            />
          ))}
        </div>
      ) : (
        /* Пустое состояние */
        <div className="text-center py-20 bg-zinc-900 rounded-3xl">
          <p className="text-4xl mb-4">😕</p>
          <p className="text-xl font-medium text-gray-300">Упражнений не найдено</p>
          <p className="text-gray-500 mt-2">
            {searchTerm ? 'Попробуйте изменить запрос поиска' : 'В этой категории пока ничего нет'}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 text-accent-color hover:text-blue-400 font-medium"
          >
            + Добавить новое упражнение
          </button>
        </div>
      )}

      {/* Модальное окно */}
      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newExercise) => {
          console.log('Добавлено упражнение:', newExercise);
        }}
      />
    </div>
  );
}