import type { ID, BaseEntity } from './common';

export interface Set {
  id: ID;
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  id: ID;
  exerciseName: string;
  sets: Set[];
}

export interface Workout extends BaseEntity {
  id: ID;
  date: string;
  exercises: WorkoutExercise[];
  notes?: string;
  totalVolume: number;
}