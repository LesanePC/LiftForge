import type { Set } from '../../store/workoutStore';

interface SetInputProps {
  set: Set;
  setNumber: number;
  onUpdate: (updatedSet: Set) => void;
  onDelete: () => void;
}

export function SetInput({ set, setNumber, onUpdate, onDelete }: SetInputProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="w-12 text-center font-semibold text-gray-700 dark:text-gray-300">
        {setNumber}
      </div>
      
      <div className="flex-1">
        <input
          type="number"
          value={set.reps || ''}
          onChange={(e) => onUpdate({ ...set, reps: Number(e.target.value) })}
          placeholder="Повторения"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          min="1"
        />
      </div>
      
      <div className="flex-1">
        <input
          type="number"
          value={set.weight || ''}
          onChange={(e) => onUpdate({ ...set, weight: Number(e.target.value) })}
          placeholder="Вес (кг)"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          min="0"
          step="2.5"
        />
      </div>
      
      <button
        onClick={onDelete}
        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      >
        🗑️
      </button>
    </div>
  );
}