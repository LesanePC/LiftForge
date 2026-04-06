import { useMemo } from 'react';
import { useWorkoutStore } from '../../store/workoutStore';

export function HeatmapCalendar() {
  const { workouts } = useWorkoutStore();

  const heatmapData = useMemo(() => {
    const workoutDates = new Map<string, number>();
    
    workouts.forEach(workout => {
      const date = workout.date.split('T')[0];
      workoutDates.set(date, (workoutDates.get(date) || 0) + 1);
    });
    
    // Генерируем последние 365 дней
    const today = new Date();
    const days = [];
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = workoutDates.get(dateStr) || 0;
      
      days.push({
        date: dateStr,
        count,
        intensity: count > 0 ? Math.min(count / 3, 1) : 0,
      });
    }
    
    return days;
  }, [workouts]);

  const getColor = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (intensity < 0.33) return 'bg-green-200 dark:bg-green-900';
    if (intensity < 0.66) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-600 dark:bg-green-500';
  };

  const weeks = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="flex gap-1 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex-1 space-y-1">
              {week.map((day, dayIdx) => (
                <div
                  key={`${weekIdx}-${dayIdx}`}
                  className={`aspect-square rounded-sm ${getColor(day.intensity)} transition-colors group relative`}
                  title={`${day.date}: ${day.count} тренировок`}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-10">
                    {new Date(day.date).toLocaleDateString('ru-RU')}: {day.count} тренир.
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}