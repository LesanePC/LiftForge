import { useState } from 'react';
import type { Workout } from '../../store/workoutStore';
import { formatDate } from '../../utils/workoutHelpers';

interface EditWorkoutModalProps {
  workout: Workout | null;
  onClose: () => void;
  onSave: (updatedWorkout: Workout) => void;
}

export function EditWorkoutModal({ workout, onClose, onSave }: EditWorkoutModalProps) {
  const [notes, setNotes] = useState(workout?.notes || '');

  if (!workout) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...workout,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-lg">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Редактирование тренировки
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(workout.date)}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Заметки
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ваши заметки, ощущения, выводы..."
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            />
          </div>
          
          <div className="p-4 border-t dark:border-gray-700 flex gap-3">
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
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}