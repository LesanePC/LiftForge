import type { WorkoutExercise } from '../store/workoutStore';

export const calculateExerciseVolume = (exercise: WorkoutExercise): number => {
  return exercise.sets.reduce((total, set) => {
    return total + (set.reps * set.weight);
  }, 0);
};

export const calculateTotalVolume = (exercises: WorkoutExercise[]): number => {
  return exercises.reduce((total, exercise) => {
    return total + calculateExerciseVolume(exercise);
  }, 0);
};

// Создание ID (исправлен deprecated метод substr)
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
};

// Создание короткого ID
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Форматирование даты
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Форматирование даты для отображения (короткий вариант)
export const formatDateShort = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
};

// Получение текущей даты в ISO формате
export const getTodayISOString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Форматирование веса (убираем .0 если целое число)
export const formatWeight = (weight: number): string => {
  return weight % 1 === 0 ? weight.toString() : weight.toFixed(1);
};

// Форматирование повторений
export const formatReps = (reps: number): string => {
  return reps.toString();
};

// Получение максимального веса в упражнении
export const getMaxWeightInExercise = (exercise: WorkoutExercise): number => {
  return Math.max(...exercise.sets.map(set => set.weight));
};

// Получение максимального количества повторений в упражнении
export const getMaxRepsInExercise = (exercise: WorkoutExercise): number => {
  return Math.max(...exercise.sets.map(set => set.reps));
};

// Проверка, является ли подход лучшим (для PR)
export const isBestSet = (
  currentWeight: number, 
  currentReps: number, 
  bestWeight: number, 
  bestReps: number
): boolean => {
  return currentWeight > bestWeight || 
         (currentWeight === bestWeight && currentReps > bestReps);
};

// Группировка тренировок по месяцам
export const groupWorkoutsByMonth = (workouts: any[]) => {
  return workouts.reduce((groups, workout) => {
    const date = new Date(workout.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(workout);
    return groups;
  }, {} as Record<string, any[]>);
};

// Подсчёт недельной серии (streak)
export const calculateStreak = (workoutDates: string[]): number => {
  if (workoutDates.length === 0) return 0;
  
  const sortedDates = [...workoutDates].sort().reverse();
  let streak = 1;
  let currentDate = new Date(sortedDates[0]);
  
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else if (diffDays > 1) {
      break;
    }
  }
  
  return streak;
};

// Валидация сета
export const isValidSet = (reps: number, weight: number): boolean => {
  return reps > 0 && weight >= 0;
};

// Копирование объекта тренировки (для глубокого копирования)
export const deepCopyWorkout = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};