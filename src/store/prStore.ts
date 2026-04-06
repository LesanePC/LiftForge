import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workout, WorkoutExercise, Set } from './workoutStore';

export type PersonalRecord = {
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
  workoutId: string;
};

type PRStore = {
  personalRecords: PersonalRecord[];
  updatePRs: (workouts: Workout[]) => void;
  getPRForExercise: (exerciseName: string) => PersonalRecord | undefined;
};

export const usePRStore = create<PRStore>()(
  persist(
    (setState, getState) => ({
      personalRecords: [],

      updatePRs: (workouts) => {
        workouts.forEach((workout) => {
          workout.exercises.forEach((exercise: WorkoutExercise) => {
            exercise.sets.forEach((exerciseSet: Set) => {
              const currentPR = getState().getPRForExercise(exercise.exerciseName);
              
              if (!currentPR || 
                  exerciseSet.weight > currentPR.weight || 
                  (exerciseSet.weight === currentPR.weight && exerciseSet.reps > currentPR.reps)) {
                
                const otherPRs = getState().personalRecords.filter(
                  pr => pr.exerciseName !== exercise.exerciseName
                );
                
                setState({
                  personalRecords: [...otherPRs, {
                    exerciseName: exercise.exerciseName,
                    weight: exerciseSet.weight,
                    reps: exerciseSet.reps,
                    date: workout.date,
                    workoutId: workout.id,
                  }]
                });
              }
            });
          });
        });
      },

      getPRForExercise: (exerciseName) => {
        return getState().personalRecords.find(pr => pr.exerciseName === exerciseName);
      },
    }),
    {
      name: 'liftforge-personal-records',
    }
  )
);