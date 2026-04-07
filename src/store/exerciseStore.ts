import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Exercise = {
  id: string;
  name: string;
  category: 'bench' | 'squat' | 'deadlift' | 'accessory';
  isCustom: boolean;
  createdAt?: string;
  bestWeight?: number;
  bestReps?: number;
  updatedAt?: string;
};

type ExerciseStore = {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id' | 'createdAt'>) => void;
  deleteExercise: (id: string) => void;
  updateExercise: (id: string, updates: Partial<Exercise>) => void;
  getExercisesByCategory: (category: Exercise['category'] | 'all') => Exercise[];
};

const defaultExercises: Exercise[] = [
  { id: '1', name: 'Жим лёжа', category: 'bench', isCustom: false, bestWeight: 100, bestReps: 8 },
  { id: '2', name: 'Жим лёжа узким хватом', category: 'bench', isCustom: false, bestWeight: 80, bestReps: 10 },
  { id: '3', name: 'Жим под углом', category: 'bench', isCustom: false },
  { id: '4', name: 'Приседания со штангой', category: 'squat', isCustom: false, bestWeight: 140, bestReps: 6 },
  { id: '5', name: 'Приседания в ножницы', category: 'squat', isCustom: false },
  { id: '6', name: 'Фронтальные приседания', category: 'squat', isCustom: false },
  { id: '7', name: 'Становая тяга', category: 'deadlift', isCustom: false, bestWeight: 160, bestReps: 5 },
  { id: '8', name: 'Румынская тяга', category: 'deadlift', isCustom: false },
  { id: '9', name: 'Тяга штанги в наклоне', category: 'deadlift', isCustom: false },
  { id: '10', name: 'Подтягивания', category: 'accessory', isCustom: false, bestWeight: 0, bestReps: 12 },
  { id: '11', name: 'Отжимания на брусьях', category: 'accessory', isCustom: false },
  { id: '12', name: 'Тяга гантели в наклоне', category: 'accessory', isCustom: false },
  { id: '13', name: 'Жим гантелей стоя', category: 'accessory', isCustom: false },
  { id: '14', name: 'Сгибания рук с штангой', category: 'accessory', isCustom: false },
];

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: defaultExercises,

      addExercise: (exerciseData) => {
        const newExercise: Exercise = {
          ...exerciseData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isCustom: true,
        };
        set((state) => ({
          exercises: [...state.exercises, newExercise],
        }));
      },

      deleteExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((e) => e.id !== id),
        })),

      updateExercise: (id, updates) =>
        set((state) => ({
          exercises: state.exercises.map((e) =>
            e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
          ),
        })),

      getExercisesByCategory: (category) => {
        if (category === 'all') return get().exercises;
        return get().exercises.filter((e) => e.category === category);
      },
    }),
    {
      name: 'liftforge-exercises',
    }
  )
);