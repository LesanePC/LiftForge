import { useState } from 'react';
import type { Exercise } from '../../store/exerciseStore';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercise: Omit<Exercise, 'id'>) => void;
}

export function AddExerciseModal({ isOpen, onClose, onAdd }: AddExerciseModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Exercise['category']>('accessory');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({
      name: name.trim(),
      category,
      isCustom: true,
      createdAt: new Date().toISOString(),
    });
    
    setName('');
    setCategory('accessory');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Добавить упражнение
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Название упражнения
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Например: Жим гантелей лёжа"
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Категория
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Exercise['category'])}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="bench">Жимовые</option>
              <option value="squat">Приседания</option>
              <option value="deadlift">Тяговые</option>
              <option value="accessory">Подсобные</option>
            </select>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}