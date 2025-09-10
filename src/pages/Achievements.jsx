import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'
import { useAuth } from '../context/AuthContext'

const Achievements = () => {
  const { achievements, removeAchievement, clearAllAchievements } = useFitness()
  const { user } = useAuth()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [showClearDialog, setShowClearDialog] = useState(false)

  const getAchievementTypeIcon = (goalType) => {
    switch (goalType) {
      case 'weight_loss': return '📉'
      case 'weight_gain': return '📈'
      case 'workouts': return '💪'
      case 'distance': return '🏃‍♂️'
      case 'time': return '⏱️'
      default: return '🎯'
    }
  }

  const getAchievementTypeLabel = (goalType) => {
    switch (goalType) {
      case 'weight_loss': return 'Weight Loss'
      case 'weight_gain': return 'Weight Gain'
      case 'workouts': return 'Workouts'
      case 'distance': return 'Distance'
      case 'time': return 'Time'
      default: return 'Custom'
    }
  }

  const formatCompletionDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAchievementGradient = (index) => {
    const gradients = [
      'from-yellow-400 to-orange-500',
      'from-green-400 to-emerald-500',
      'from-blue-400 to-indigo-500',
      'from-purple-400 to-pink-500',
      'from-red-400 to-rose-500',
      'from-cyan-400 to-teal-500'
    ]
    return gradients[index % gradients.length]
  }

  const handleRemoveAchievement = (achievement) => {
    setSelectedAchievement(achievement)
    setShowConfirmDialog(true)
  }

  const confirmRemove = () => {
    if (selectedAchievement) {
      removeAchievement(selectedAchievement.id)
      setSelectedAchievement(null)
      setShowConfirmDialog(false)
    }
  }

  const handleClearAll = () => {
    setShowClearDialog(true)
  }

  const confirmClearAll = () => {
    clearAllAchievements()
    setShowClearDialog(false)
  }

  const getAchievementStats = () => {
    if (!achievements || achievements.length === 0) return null

    const totalAchievements = achievements.length
    const thisMonthAchievements = achievements.filter(achievement => {
      const achievementDate = new Date(achievement.completedAt)
      const now = new Date()
      return achievementDate.getMonth() === now.getMonth() && 
             achievementDate.getFullYear() === now.getFullYear()
    }).length

    const typeStats = achievements.reduce((acc, achievement) => {
      acc[achievement.goalType] = (acc[achievement.goalType] || 0) + 1
      return acc
    }, {})

    const mostCommonType = Object.entries(typeStats).reduce((a, b) => 
      typeStats[a[0]] > typeStats[b[0]] ? a : b
    )[0]

    return {
      total: totalAchievements,
      thisMonth: thisMonthAchievements,
      mostCommon: mostCommonType
    }
  }

  const stats = getAchievementStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-orange-900/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8 animate-slideInUp">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">🏆</div>
                <div className="absolute top-8 right-8 text-4xl">🥇</div>
                <div className="absolute bottom-4 left-1/4 text-5xl">🎯</div>
                <div className="absolute bottom-8 right-1/3 text-3xl">⭐</div>
              </div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6 backdrop-blur-sm">
                    <span className="text-4xl">🏆</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      Achievements
                    </h1>
                    <p className="text-orange-100 text-lg">
                      Celebrate your completed fitness goals
                    </p>
                  </div>
                </div>
                {achievements && achievements.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
                  >
                    🗑️ Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-200 dark:border-yellow-700">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Total Achievements</p>
                      <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-200">{stats.total}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-700">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">📅</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800 dark:text-green-300">This Month</p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-200">{stats.thisMonth}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">{getAchievementTypeIcon(stats.mostCommon)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-800 dark:text-purple-300">Most Common</p>
                      <p className="text-xl font-bold text-purple-900 dark:text-purple-200">
                        {getAchievementTypeLabel(stats.mostCommon)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!achievements || achievements.length === 0 ? (
              <div className="col-span-full">
                <div className="card card-hover">
                  <div className="p-12 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl">🏆</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      No Achievements Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                      Complete your fitness goals to earn achievements!
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        💡 Tip: Set goals in your profile and complete them to see your achievements here!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              achievements.map((achievement, index) => (
                <div key={achievement.id} className="card card-hover group">
                  <div className="p-6 relative overflow-hidden">
                    {/* Achievement Ribbon */}
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getAchievementGradient(index)}`}></div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveAchievement(achievement)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      title="Remove Achievement"
                    >
                      <span className="text-lg">🗑️</span>
                    </button>

                    {/* Achievement Content */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${getAchievementGradient(index)} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <span className="text-3xl">{getAchievementTypeIcon(achievement.goalType)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                          {achievement.title}
                        </h3>
                        <span className={`text-xs px-3 py-1 bg-gradient-to-r ${getAchievementGradient(index)} text-white rounded-full font-medium`}>
                          {getAchievementTypeLabel(achievement.goalType)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Achievement Details */}
                    <div className="space-y-3 mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Target Achieved</div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {achievement.targetValue} {achievement.unit}
                        </div>
                      </div>
                      
                      {achievement.goalType === 'weight_loss' || achievement.goalType === 'weight_gain' ? (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Journey</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {achievement.startingValue}{achievement.unit} → {achievement.currentValue}{achievement.unit}
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Final Result</div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {achievement.currentValue} {achievement.unit}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Completion Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2">🗓️</span>
                        Completed: {formatCompletionDate(achievement.completedAt)}
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">🏆</span>
                        <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">100%</span>
                      </div>
                    </div>

                    {/* Celebration Badge */}
                    <div className={`mt-4 p-3 bg-gradient-to-r ${getAchievementGradient(index)} bg-opacity-10 dark:bg-opacity-20 rounded-xl border-2 border-opacity-20`}>
                      <div className="flex items-center justify-center">
                        <span className="text-lg mr-2">🎉</span>
                        <span className="font-bold text-sm">Goal Achieved!</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Remove Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Remove Achievement?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to remove "{selectedAchievement?.title}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Dialog */}
      {showClearDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🗑️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Clear All Achievements?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This will permanently remove all {achievements?.length || 0} achievements. This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearDialog(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements