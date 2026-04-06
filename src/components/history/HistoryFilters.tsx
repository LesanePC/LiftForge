interface HistoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'date' | 'volume';
  onSortChange: (value: 'date' | 'volume') => void;
}

export function HistoryFilters({ searchTerm, onSearchChange, sortBy, onSortChange }: HistoryFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Поиск */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Поиск по упражнениям или заметкам..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        {/* Сортировка */}
        <div className="flex gap-2">
          <button
            onClick={() => onSortChange('date')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'date'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📅 По дате
          </button>
          <button
            onClick={() => onSortChange('volume')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === 'volume'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📊 По объёму
          </button>
        </div>
      </div>
    </div>
  );
}