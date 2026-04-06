import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useWorkoutStore } from '../../store/workoutStore';
import { formatDateShort } from '../../utils/workoutHelpers';

interface ExerciseProgressChartProps {
  exerciseName: string;
}

export function ExerciseProgressChart({ exerciseName }: ExerciseProgressChartProps) {
  const { workouts } = useWorkoutStore();

  const data = useMemo(() => {
    const exerciseWorkouts = workouts
      .filter(workout => 
        workout.exercises.some(ex => ex.exerciseName === exerciseName)
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(workout => {
        const exercise = workout.exercises.find(ex => ex.exerciseName === exerciseName);
        if (!exercise) return null;
        
        const maxWeight = Math.max(...exercise.sets.map(set => set.weight));
        const maxReps = Math.max(...exercise.sets.map(set => set.reps));
        const totalVolume = exercise.sets.reduce((sum, set) => sum + (set.reps * set.weight), 0);
        const bestSet = exercise.sets.reduce((best, set) => 
          (set.weight > best.weight || (set.weight === best.weight && set.reps > best.reps)) 
            ? set 
            : best
        , exercise.sets[0]);
        
        return {
          date: formatDateShort(workout.date),
          fullDate: workout.date,
          maxWeight: maxWeight,
          maxReps: maxReps,
          volume: totalVolume,
          bestSet: `${bestSet.weight}кг x ${bestSet.reps}`,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return exerciseWorkouts;
  }, [workouts, exerciseName]);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Нет данных по упражнению "{exerciseName}"
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* График максимального веса */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📈 Прогресс максимального веса
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Вес (кг)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="maxWeight"
              stroke="#3b82f6"
              name="Макс. вес"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* График объёма */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📊 Прогресс объёма (тоннажа)
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Объём (кг)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#10b981"
              name="Объём"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Таблица с данными */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          📋 Детализация по тренировкам
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Дата</th>
                <th className="px-4 py-2 text-left">Макс. вес</th>
                <th className="px-4 py-2 text-left">Макс. повторения</th>
                <th className="px-4 py-2 text-left">Лучший подход</th>
                <th className="px-4 py-2 text-left">Объём</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-t dark:border-gray-700">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2 font-medium">{item.maxWeight} кг</td>
                  <td className="px-4 py-2">{item.maxReps}</td>
                  <td className="px-4 py-2">{item.bestSet}</td>
                  <td className="px-4 py-2">{item.volume} кг</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}