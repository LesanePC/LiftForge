import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Set = {
  id: string;
  reps: number;
  weight: number;
};

export type WorkoutExercise = {
  id: string;
  exerciseName: string;
  sets: Set[];
};

export type Workout = {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  notes?: string;
  totalVolume: number;
};

type WorkoutStore = {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
};

// Вспомогательная функция для обновления рекордов
const updatePersonalRecords = (workout: Workout) => {
  // Динамический импорт, чтобы избежать циклических зависимостей
  import('./exerciseStore').then(({ useExerciseStore }) => {
    const exerciseStore = useExerciseStore.getState();

    workout.exercises.forEach((workoutEx) => {
      const existingExercise = exerciseStore.exercises.find(
        (ex) => ex.name.toLowerCase() === workoutEx.exerciseName.toLowerCase()
      );

      if (!existingExercise) return;

      const bestSetInWorkout = workoutEx.sets.reduce((best, current) => {
        return current.weight > (best?.weight || 0) ? current : best;
      }, workoutEx.sets[0]);

      if (!bestSetInWorkout) return;

      const currentBest = existingExercise.bestWeight || 0;

      if (bestSetInWorkout.weight > currentBest) {
        exerciseStore.updateExercise(existingExercise.id, {
          bestWeight: bestSetInWorkout.weight,
          bestReps: bestSetInWorkout.reps,
        });
      }
    });
  });
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workouts: [],

      addWorkout: (workout) => {
        // Добавляем тренировку
        set((state) => ({
          workouts: [workout, ...state.workouts],
        }));

        // Обновляем личные рекорды
        updatePersonalRecords(workout);
      },

      deleteWorkout: (id) =>
        set((state) => ({
          workouts: state.workouts.filter((w) => w.id !== id),
        })),

      updateWorkout: (id, updatedWorkout) =>
        set((state) => ({
          workouts: state.workouts.map((w) =>
            w.id === id ? { ...w, ...updatedWorkout } : w
          ),
        })),
    }),
    {
      name: 'liftforge-workouts',
    }
  )
);