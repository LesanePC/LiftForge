import { useState } from 'react';
import { X } from 'lucide-react';
import type { Exercise } from '../../store/exerciseStore';

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (exercise: Omit<Exercise, 'id' | 'createdAt'>) => void;
}

export default function AddExerciseModal({ isOpen, onClose, onAdd }: AddExerciseModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Exercise['category']>('bench');

  const categories = [
    { value: 'bench', label: 'Жимовые' },
    { value: 'squat', label: 'Приседания' },
    { value: 'deadlift', label: 'Тяговые' },
    { value: 'accessory', label: 'Подсобные' },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      category,
      isCustom: true,
    });

    // Сброс формы
    setName('');
    setCategory('bench');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div 
        className="bg-zinc-900 rounded-3xl w-full max-w-md mx-4 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-700">
          <h2 className="text-xl font-semibold text-white">Добавить упражнение</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Название */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Название упражнения
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например: Жим гантелей на наклонной скамье"
              className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-accent-color text-white placeholder-zinc-500"
              autoFocus
              required
            />
          </div>

          {/* Категория */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Категория
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`py-4 px-5 rounded-2xl font-medium transition-all ${
                    category === cat.value
                      ? 'bg-accent-color text-black shadow-md'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 border border-zinc-700 hover:bg-zinc-800 rounded-2xl transition-colors font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-accent-color hover:bg-blue-500 text-black font-semibold rounded-2xl transition-colors"
            >
              Добавить упражнение
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}