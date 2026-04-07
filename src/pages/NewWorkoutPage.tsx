import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { useWorkoutStore } from '../store/workoutStore';
import { WorkoutExerciseCard } from '../components/workout/WorkoutExerciseCard';
import { ExerciseSelector } from '../components/workout/ExerciseSelector';
import type { WorkoutExercise } from '../store/workoutStore';
import { generateId, calculateTotalVolume } from '../utils/workoutHelpers';

export default function NewWorkoutPage() {
  const navigate = useNavigate();
  const { addWorkout } = useWorkoutStore();

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [notes, setNotes] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = workoutExercises.findIndex((item) => item.id === active.id);
      const newIndex = workoutExercises.findIndex((item) => item.id === over?.id);

      setWorkoutExercises(arrayMove(workoutExercises, oldIndex, newIndex));
    }
  };

  const addExercise = (exerciseName: string) => {
    const newExercise: WorkoutExercise = {
      id: generateId(),
      exerciseName,
      sets: [],
    };
    setWorkoutExercises((prev) => [...prev, newExercise]);
  };

  const updateExercise = (updatedExercise: WorkoutExercise) => {
    setWorkoutExercises((prev) =>
      prev.map((ex) => (ex.id === updatedExercise.id ? updatedExercise : ex))
    );
  };

  const deleteExercise = (exerciseId: string) => {
    if (confirm('Удалить это упражнение из тренировки?')) {
      setWorkoutExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
    }
  };

  const saveWorkout = () => {
    if (workoutExercises.length === 0) {
      alert('Добавьте хотя бы одно упражнение');
      return;
    }

    const totalVolume = calculateTotalVolume(workoutExercises);

    const workout = {
      id: generateId(),
      date: new Date().toISOString(),
      exercises: workoutExercises,
      notes: notes.trim() || undefined,
      totalVolume,
    };

    addWorkout(workout);
    alert('Тренировка успешно сохранена!');
    navigate('/history');
  };

  const totalVolume = calculateTotalVolume(workoutExercises);
  const totalSets = workoutExercises.reduce((sum, ex) => sum + ex.sets.length, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Новая тренировка</h1>
        <div className="text-right">
          <div className="text-sm text-gray-400">Общий объём</div>
          <div className="text-3xl font-bold text-emerald-400">{totalVolume} кг</div>
        </div>
      </div>

      {/* Инфо-блок */}
      <div className="bg-zinc-900 rounded-2xl p-5 mb-8 flex items-center justify-between text-sm">
        <div>Упражнений: <span className="font-semibold">{workoutExercises.length}</span></div>
        <div>Подходов: <span className="font-semibold">{totalSets}</span></div>
        <div className="text-emerald-400 font-medium">
          {new Date().toLocaleDateString('ru-RU')}
        </div>
      </div>

      {/* Список упражнений с Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={workoutExercises.map((ex) => ex.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 mb-8">
            {workoutExercises.map((exercise, index) => (
              <WorkoutExerciseCard
                key={exercise.id}
                exercise={exercise}
                index={index}
                onUpdate={updateExercise}
                onDelete={() => deleteExercise(exercise.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Пустое состояние */}
      {workoutExercises.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-zinc-700 rounded-3xl mb-8">
          <p className="text-zinc-400 text-lg">Пока нет упражнений</p>
          <p className="text-zinc-500 text-sm mt-1">Нажмите кнопку ниже, чтобы добавить первое</p>
        </div>
      )}

      {/* Кнопка добавления */}
      <button
        onClick={() => setIsSelectorOpen(true)}
        className="w-full py-5 border-2 border-dashed border-zinc-700 hover:border-accent-color hover:text-accent-color transition-colors rounded-3xl flex items-center justify-center gap-3 text-lg font-medium mb-10"
      >
        <Plus size={24} />
        Добавить упражнение
      </button>

      {/* Заметки */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-zinc-400">
          Заметки к тренировке
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Как прошла тренировка? Ощущения, выводы..."
          rows={4}
          className="w-full px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-accent-color resize-none"
        />
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-4">
        <button
          onClick={saveWorkout}
          disabled={workoutExercises.length === 0}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-700 disabled:text-zinc-400 font-semibold py-4 rounded-2xl transition-colors"
        >
          Сохранить тренировку
        </button>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 border border-zinc-700 hover:bg-zinc-900 rounded-2xl transition-colors"
        >
          Отмена
        </button>
      </div>

      {/* Модальное окно выбора упражнения */}
      {isSelectorOpen && (
        <ExerciseSelector
          onSelect={(exercise) => {
            addExercise(exercise.name);
            setIsSelectorOpen(false);
          }}
          onClose={() => setIsSelectorOpen(false)}
        />
      )}
    </div>
  );
}