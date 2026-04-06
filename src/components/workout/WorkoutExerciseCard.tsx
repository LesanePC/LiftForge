import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { WorkoutExercise, Set } from '../../store/workoutStore';
import { SetInput } from './SetInput';
import { generateId } from '../../utils/workoutHelpers';

interface WorkoutExerciseCardProps {
  exercise: WorkoutExercise;
  index: number;
  onUpdate: (updatedExercise: WorkoutExercise) => void;
  onDelete: () => void;
}

export function WorkoutExerciseCard({ exercise, onUpdate, onDelete }: WorkoutExerciseCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const addSet = () => {
    const newSet: Set = {
      id: generateId(),
      reps: 0,
      weight: 0,
    };
    onUpdate({
      ...exercise,
      sets: [...exercise.sets, newSet],
    });
  };

  const updateSet = (updatedSet: Set) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.map(s => s.id === updatedSet.id ? updatedSet : s),
    });
  };

  const deleteSet = (setId: string) => {
    onUpdate({
      ...exercise,
      sets: exercise.sets.filter(s => s.id !== setId),
    });
  };

  const totalVolume = exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      {/* Заголовок с drag handle */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ⋮⋮
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 text-left"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {exercise.exerciseName}
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {exercise.sets.length} подходов • {totalVolume} кг
          </div>
        </button>
        
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          🗑️
        </button>
      </div>
      
      {/* Тело с подходами */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-[50px,1fr,1fr,auto] gap-3 text-sm font-medium text-gray-600 dark:text-gray-400 px-3">
            <div>Подход</div>
            <div>Повторения</div>
            <div>Вес (кг)</div>
            <div></div>
          </div>
          
          {exercise.sets.map((set, idx) => (
            <SetInput
              key={set.id}
              set={set}
              setNumber={idx + 1}
              onUpdate={updateSet}
              onDelete={() => deleteSet(set.id)}
            />
          ))}
          
          <button
            onClick={addSet}
            className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            + Добавить подход
          </button>
        </div>
      )}
    </div>
  );
}