import { useState, useEffect } from 'react'

// Only import seedData in development
let loadSeedData, clearAllData, getDataStats

if (import.meta.env.DEV) {
  try {
    const seedModule = await import('../utils/seedData')
    loadSeedData = seedModule.loadSeedData
    clearAllData = seedModule.clearAllData
    getDataStats = seedModule.getDataStats
  } catch (error) {
    console.warn('DevHelper: seedData not available in production')
    loadSeedData = () => false
    clearAllData = () => false
    getDataStats = () => ({ workouts: 0, meals: 0, goals: 0, hasProfile: false })
  }
} else {
  // Production fallbacks
  loadSeedData = () => false
  clearAllData = () => false
  getDataStats = () => ({ workouts: 0, meals: 0, goals: 0, hasProfile: false })
}

const DevHelper = () => {
  const [stats, setStats] = useState({ workouts: 0, meals: 0, goals: 0, hasProfile: false })
  const [showHelper, setShowHelper] = useState(false)

  // Hide DevHelper in production
  if (import.meta.env.PROD) {
    return null
  }

  useEffect(() => {
    updateStats()
  }, [])

  const updateStats = () => {
    setStats(getDataStats())
  }

  const handleLoadSeedData = () => {
    console.log('Loading seed data...')
    if (loadSeedData()) {
      updateStats()
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      console.warn('Seed data not available')
    }
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      console.log('Clearing data...')
      if (clearAllData()) {
        updateStats()
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    }
  }

  // Rest of your component remains the same...
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      {/* Environment indicator */}
      <div className="mb-2 text-right">
        <span className="inline-block px-3 py-1 bg-yellow-500 text-yellow-900 text-xs font-bold rounded-full">
          DEV MODE
        </span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => {
          console.log('DevHelper button clicked!')
          setShowHelper(!showHelper)
        }}
        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-lg font-bold"
        title="Development Helper"
        style={{ zIndex: 10000 }}
      >
        🛠️
      </button>

      {/* Helper Panel */}
      {showHelper && (
        <div 
          className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
          style={{ zIndex: 10001 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">🛠️ Dev Helper</h3>
            <button
              onClick={() => setShowHelper(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Current Stats */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Current Data:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.workouts}</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Workouts</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.meals}</div>
                <div className="text-xs text-green-700 dark:text-green-300">Meals</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.goals}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">Goals</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <div className="text-2xl">{stats.hasProfile ? '✅' : '❌'}</div>
                <div className="text-xs text-orange-700 dark:text-orange-300">Profile</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleLoadSeedData}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg"
            >
              📊 Load Sample Data
            </button>
            
            <button
              onClick={handleClearData}
              className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-lg"
            >
              🗑️ Clear All Data
            </button>

            <button
              onClick={updateStats}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg"
            >
              🔄 Refresh Stats
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              💡 This helper loads sample data for testing. Check browser console for logs.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Environment: {import.meta.env.DEV ? 'Development' : 'Production'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DevHelper