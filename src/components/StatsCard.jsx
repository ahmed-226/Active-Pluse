const StatsCard = ({ title, value, icon, color }) => {
  const getGradient = (color) => {
    switch (color) {
      case 'bg-blue-500':
        return 'from-blue-500 to-blue-600'
      case 'bg-red-500':
        return 'from-red-500 to-red-600'
      case 'bg-green-500':
        return 'from-green-500 to-green-600'
      case 'bg-purple-500':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`bg-gradient-to-r ${getGradient(color)} p-4 rounded-2xl shadow-lg`}>
              <span className="text-3xl">{icon}</span>
            </div>
          </div>
          <div className="ml-6 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate mb-1">{title}</dt>
              <dd className="text-2xl font-bold text-gray-900 dark:text-white">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className={`h-2 bg-gradient-to-r ${getGradient(color)} opacity-20`}></div>
    </div>
  )
}

export default StatsCard