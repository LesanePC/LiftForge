import { useMemo } from 'react';
import { useWorkoutStore } from '../../store/workoutStore';
import { calculateStreak } from '../../utils/workoutHelpers';

export function StreakCounter() {
  const { workouts } = useWorkoutStore();

  const streakData = useMemo(() => {
    const workoutDates = workouts.map(w => w.date.split('T')[0]);
    const currentStreak = calculateStreak(workoutDates);
    
    // Находим лучшую серию
    let bestStreak = 0;
    let currentBest = 1;
    const sortedDates = [...workoutDates].sort();
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentBest++;
      } else {
        bestStreak = Math.max(bestStreak, currentBest);
        currentBest = 1;
      }
    }
    bestStreak = Math.max(bestStreak, currentBest);
    
    return { currentStreak, bestStreak, totalWorkouts: workouts.length };
  }, [workouts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white text-center">
        <div className="text-4xl mb-2">🔥</div>
        <div className="text-3xl font-bold">{streakData.currentStreak}</div>
        <div className="text-sm opacity-90">Текущая серия</div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white text-center">
        <div className="text-4xl mb-2">🏆</div>
        <div className="text-3xl font-bold">{streakData.bestStreak}</div>
        <div className="text-sm opacity-90">Лучшая серия</div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-6 text-white text-center">
        <div className="text-4xl mb-2">📅</div>
        <div className="text-3xl font-bold">{streakData.totalWorkouts}</div>
        <div className="text-sm opacity-90">Всего тренировок</div>
      </div>
    </div>
  );
}