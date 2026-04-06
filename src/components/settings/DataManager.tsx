import { useState } from 'react';
import { useWorkoutStore } from '../../store/workoutStore';
import { useExerciseStore } from '../../store/exerciseStore';

export function DataManager() {
  const { workouts } = useWorkoutStore();
  const { exercises } = useExerciseStore();
  const [importStatus, setImportStatus] = useState<string>('');

  // Экспорт данных в JSON
  const exportData = () => {
    const data = {
      workouts,
      exercises,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liftforge-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Импорт данных из JSON
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        
        // Валидация данных
        if (data.workouts && data.exercises) {
          localStorage.setItem('liftforge-workouts', JSON.stringify(data.workouts));
          localStorage.setItem('liftforge-exercises', JSON.stringify(data.exercises));
          
          setImportStatus('✅ Данные успешно импортированы! Перезагрузите страницу.');
          setTimeout(() => setImportStatus(''), 3000);
          
          // Предлагаем перезагрузить страницу
          setTimeout(() => {
            if (confirm('Данные импортированы. Перезагрузить страницу?')) {
              window.location.reload();
            }
          }, 500);
        } else {
          setImportStatus('❌ Неверный формат файла');
        }
      } catch (error) {
        setImportStatus('❌ Ошибка при импорте данных');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  // Очистка всех данных
  const clearAllData = () => {
    if (confirm('ВНИМАНИЕ! Это удалит ВСЕ тренировки и упражнения. Продолжить?')) {
      localStorage.removeItem('liftforge-workouts');
      localStorage.removeItem('liftforge-exercises');
      localStorage.removeItem('liftforge-ui');
      setImportStatus('🗑️ Все данные удалены. Перезагрузите страницу.');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  // Статистика данных
  const storageSize = () => {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('liftforge-')) {
        const value = localStorage.getItem(key);
        if (value) total += value.length;
      }
    }
    return (total / 1024).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💾 Размер данных в localStorage: {storageSize()} KB
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Экспорт */}
        <div className="border dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">📤 Экспорт данных</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Сохраните все тренировки и упражнения в JSON файл
          </p>
          <button
            onClick={exportData}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
          >
            Скачать бэкап
          </button>
        </div>

        {/* Импорт */}
        <div className="border dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">📥 Импорт данных</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Восстановите данные из ранее сохранённого файла
          </p>
          <label className="block">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
            />
          </label>
        </div>
      </div>

      {/* Очистка данных */}
      <div className="border border-red-300 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-400">
          ⚠️ Опасная зона
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Удалить все данные приложения. Это действие нельзя отменить!
        </p>
        <button
          onClick={clearAllData}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
        >
          Удалить все данные
        </button>
      </div>

      {/* Статус импорта */}
      {importStatus && (
        <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {importStatus}
        </div>
      )}
    </div>
  );
}