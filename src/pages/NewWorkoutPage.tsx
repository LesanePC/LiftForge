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
    setWorkoutExercises([...workoutExercises, newExercise]);
  };

  const updateExercise = (updatedExercise: WorkoutExercise) => {
    setWorkoutExercises(
      workoutExercises.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
    );
  };

  const deleteExercise = (exerciseId: string) => {
    if (confirm('Удалить упражнение?')) {
      setWorkoutExercises(workoutExercises.filter(ex => ex.id !== exerciseId));
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
    alert('Тренировка сохранена!');
    navigate('/history');
  };

  const totalVolume = calculateTotalVolume(workoutExercises);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">➕ Новая тренировка</h1>
      
      {/* Информация о тренировке */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Общий объём</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalVolume} кг
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Упражнений</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {workoutExercises.length}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Подходов</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {workoutExercises.reduce((sum, ex) => sum + ex.sets.length, 0)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Список упражнений с Drag & Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={workoutExercises.map(ex => ex.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4 mb-6">
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
      
      {/* Кнопка добавления упражнения */}
      {workoutExercises.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-6">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Нет добавленных упражнений
          </p>
        </div>
      )}
      
      <button
        onClick={() => setIsSelectorOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors mb-6"
      >
        + Добавить упражнение
      </button>
      
      {/* Заметки */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Заметки к тренировке
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ваши заметки, ощущения, выводы..."
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
        />
      </div>
      
      {/* Кнопки сохранения */}
      <div className="flex gap-3">
        <button
          onClick={saveWorkout}
          disabled={workoutExercises.length === 0}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          💾 Сохранить тренировку
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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