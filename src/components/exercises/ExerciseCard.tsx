import type { Exercise } from '../../store/exerciseStore';

const categoryIcons = {
  bench: '🏋️',
  squat: '🦵',
  deadlift: '🏋️‍♂️',
  accessory: '💪',
};

const categoryColors = {
  bench: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  squat: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  deadlift: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  accessory: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
};

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete?: (id: string) => void;
  onSelect?: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onDelete, onSelect }: ExerciseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">{categoryIcons[exercise.category]}</span>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {exercise.name}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[exercise.category]}`}>
              {exercise.category === 'bench' && 'Жимовые'}
              {exercise.category === 'squat' && 'Приседания'}
              {exercise.category === 'deadlift' && 'Тяговые'}
              {exercise.category === 'accessory' && 'Подсобные'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onSelect && (
            <button
              onClick={() => onSelect(exercise)}
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              ➕
            </button>
          )}
          {onDelete && exercise.isCustom && (
            <button
              onClick={() => onDelete(exercise.id)}
              className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}