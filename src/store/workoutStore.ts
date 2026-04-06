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

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workouts: [],

      addWorkout: (workout) =>
        set((state) => ({
          workouts: [...state.workouts, workout],
        })),

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