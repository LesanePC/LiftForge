import { useMemo } from 'react';
import { useWorkoutStore } from '../../store/workoutStore';

interface PR {
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
  volume: number;
}

export function PersonalRecords() {
  const { workouts } = useWorkoutStore();

  const records = useMemo(() => {
    const prMap = new Map<string, PR>();
    
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
          const currentPR = prMap.get(exercise.exerciseName);
          const currentValue = set.weight;
          
          if (!currentPR || currentValue > currentPR.weight || 
              (currentValue === currentPR.weight && set.reps > currentPR.reps)) {
            prMap.set(exercise.exerciseName, {
              exerciseName: exercise.exerciseName,
              weight: set.weight,
              reps: set.reps,
              date: workout.date,
              volume: set.weight * set.reps,
            });
          }
        });
      });
    });
    
    return Array.from(prMap.values()).sort((a, b) => b.weight - a.weight);
  }, [workouts]);

  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Нет личных рекордов. Добавьте тренировки!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div
          key={record.exerciseName}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {record.exerciseName}
                </h3>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {record.weight} кг
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {" × "}{record.reps} = {record.volume} кг
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                🗓️ {new Date(record.date).toLocaleDateString('ru-RU')}
              </div>
            </div>
            <div className="text-4xl">💪</div>
          </div>
        </div>
      ))}
    </div>
  );
}