import { useState } from 'react';
import type { Workout } from '../../store/workoutStore';
import { formatDate } from '../../utils/workoutHelpers';

interface WorkoutCardProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

export function WorkoutCard({ workout, onEdit, onDelete }: WorkoutCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Заголовок */}
      <div className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <div className="flex justify-between items-start">
          <div className="flex-1" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🏋️</span>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {formatDate(workout.date)}
              </h3>
            </div>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>📊 {workout.totalVolume} кг</span>
              <span>💪 {workout.exercises.length} упр.</span>
              <span>🔄 {workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)} подходов</span>
            </div>
            {workout.notes && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                📝 {workout.notes}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(workout)}
              className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(workout.id)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      
      {/* Детали (разворачиваются) */}
      {isExpanded && (
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
          {workout.exercises.map((exercise) => (
            <div key={exercise.id} className="mb-4 last:mb-0">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {exercise.exerciseName}
              </h4>
              <div className="space-y-1 pl-4">
                {exercise.sets.map((set, idx) => (
                  <div key={set.id} className="text-sm text-gray-600 dark:text-gray-400">
                    Подход {idx + 1}: {set.reps} × {set.weight} кг = {set.reps * set.weight} кг
                  </div>
                ))}
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                  Объём: {exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0)} кг
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}