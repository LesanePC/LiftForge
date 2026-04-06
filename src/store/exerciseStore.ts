import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Exercise = {
  id: string;
  name: string;
  category: 'bench' | 'squat' | 'deadlift' | 'accessory';
  isCustom: boolean;
  createdAt?: string;
};

type ExerciseStore = {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  deleteExercise: (id: string) => void;
  getExercisesByCategory: (category: Exercise['category']) => Exercise[];
};

const defaultExercises: Exercise[] = [
  { id: '1', name: 'Жим лёжа', category: 'bench', isCustom: false },
  { id: '2', name: 'Жим лёжа узким хватом', category: 'bench', isCustom: false },
  { id: '3', name: 'Жим под углом', category: 'bench', isCustom: false },
  { id: '4', name: 'Приседания со штангой', category: 'squat', isCustom: false },
  { id: '5', name: 'Приседания в ножницы', category: 'squat', isCustom: false },
  { id: '6', name: 'Фронтальные приседания', category: 'squat', isCustom: false },
  { id: '7', name: 'Становая тяга', category: 'deadlift', isCustom: false },
  { id: '8', name: 'Румынская тяга', category: 'deadlift', isCustom: false },
  { id: '9', name: 'Тяга штанги в наклоне', category: 'deadlift', isCustom: false },
  { id: '10', name: 'Подтягивания', category: 'accessory', isCustom: false },
  { id: '11', name: 'Отжимания на брусьях', category: 'accessory', isCustom: false },
  { id: '12', name: 'Тяга гантели в наклоне', category: 'accessory', isCustom: false },
  { id: '13', name: 'Жим гантелей стоя', category: 'accessory', isCustom: false },
  { id: '14', name: 'Сгибания рук с штангой', category: 'accessory', isCustom: false },
];

export const useExerciseStore = create<ExerciseStore>()(
  persist(
    (set, get) => ({
      exercises: defaultExercises,

      addExercise: (exercise) =>
        set((state) => ({
          exercises: [...state.exercises, exercise],
        })),

      deleteExercise: (id) =>
        set((state) => ({
          exercises: state.exercises.filter((e) => e.id !== id),
        })),

      getExercisesByCategory: (category) => {
        return get().exercises.filter((e) => e.category === category);
      },
    }),
    {
      name: 'liftforge-exercises',
    }
  )
);