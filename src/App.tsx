import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          🏋️ LiftForge
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
          Твой личный кузнец прогресса в зале
        </p>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition">
            Новая тренировка
          </button>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="font-semibold">Всего тренировок</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="font-semibold">Общий объём</h3>
            <p className="text-2xl font-bold">0 кг</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="font-semibold">Текущая серия</h3>
            <p className="text-2xl font-bold">0 дней</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App