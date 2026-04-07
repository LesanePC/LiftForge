import { Trash2, Edit2 } from 'lucide-react';
import type { Exercise } from '../../store/exerciseStore';

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete?: (id: string) => void;
  onEdit?: (exercise: Exercise) => void;
}

export function ExerciseCard({ exercise, onDelete, onEdit }: ExerciseCardProps) {
  const categoryIcons: Record<string, string> = {
    bench: '🏋️',
    squat: '🦵',
    deadlift: '🏋️‍♂️',
    accessory: '💪',
  };

  const categoryLabels: Record<string, string> = {
    bench: 'Жимовые',
    squat: 'Приседания',
    deadlift: 'Тяговые',
    accessory: 'Подсобные',
  };

  return (
    <div className="group bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-2xl p-5 transition-all duration-200 hover:shadow-2xl">
      <div className="flex items-start justify-between">
        {/* Левая часть */}
        <div className="flex items-center gap-4 flex-1">
          <div className="text-4xl transition-transform group-hover:scale-110">
            {categoryIcons[exercise.category] || '🏋️'}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight text-white">
              {exercise.name}
            </h3>
            <span className="text-xs px-3 py-1 mt-2 inline-block bg-zinc-800 text-zinc-400 rounded-full">
              {categoryLabels[exercise.category] || exercise.category}
            </span>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flex flex-col items-end gap-2">
          {exercise.isCustom && (
            <span className="text-[10px] font-medium bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full">
              Своё
            </span>
          )}

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(exercise);
                }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <Edit2 size={18} />
              </button>
            )}

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Удалить упражнение «${exercise.name}»?`)) {
                    onDelete(exercise.id);
                  }
                }}
                className="p-2 text-red-400 hover:text-red-500 hover:bg-zinc-800 rounded-xl transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Личный рекорд — безопасно через optional chaining */}
      {(exercise.bestWeight !== undefined || exercise.bestReps !== undefined) && (
        <div className="mt-6 pt-4 border-t border-zinc-700 text-xs flex justify-between items-center text-zinc-400">
          <span>Личный рекорд</span>
          <span className="font-semibold text-emerald-400">
            {exercise.bestWeight || 0} кг × {exercise.bestReps || 0}
          </span>
        </div>
      )}
    </div>
  );
}