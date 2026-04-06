import type { Category } from '../types';

export const EXERCISE_CATEGORIES: Record<Category, string> = {
  bench: 'Жимовые',
  squat: 'Приседания',
  deadlift: 'Тяговые',
  accessory: 'Подсобные',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  bench: '🏋️',
  squat: '🦵',
  deadlift: '🏋️‍♂️',
  accessory: '💪',
};

export const DEFAULT_EXERCISES = [
  { id: '1', name: 'Жим лёжа', category: 'bench' as const, isCustom: false },
  { id: '2', name: 'Приседания', category: 'squat' as const, isCustom: false },
  { id: '3', name: 'Становая тяга', category: 'deadlift' as const, isCustom: false },
  { id: '4', name: 'Жим стоя', category: 'accessory' as const, isCustom: false },
  { id: '5', name: 'Тяга штанги', category: 'accessory' as const, isCustom: false },
  { id: '6', name: 'Подтягивания', category: 'accessory' as const, isCustom: false },
];

export const APP_NAME = 'LiftForge';
export const APP_SLOGAN = 'Твой личный кузнец прогресса в зале';
export const STORAGE_KEYS = {
  WORKOUTS: 'liftforge-workouts',
  EXERCISES: 'liftforge-exercises',
  SETTINGS: 'liftforge-settings',
} as const;