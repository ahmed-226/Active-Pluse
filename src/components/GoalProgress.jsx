import { useFitness } from '../context/FitnessContext'

const GoalProgress = ({ goals }) => {
  const { calculateGoalProgress } = useFitness()

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-green-500 to-emerald-500'
    if (progress >= 80) return 'from-green-400 to-green-500'
    if (progress >= 50) return 'from-yellow-400 to-orange-500'
    return 'from-red-400 to-red-500'
  }

  const getGoalProgress = (goal) => {
    return calculateGoalProgress(goal)
  }

  const getProgressDescription = (goal) => {
    switch (goal.goalType) {
      case 'weight_loss':
        return `Current: ${goal.currentValue}${goal.unit} → Target: ${goal.targetValue}${goal.unit} (Started: ${goal.startingValue}${goal.unit})`
      case 'weight_gain':
        return `Current: ${goal.currentValue}${goal.unit} → Target: ${goal.targetValue}${goal.unit} (Started: ${goal.startingValue}${goal.unit})`
      default:
        return `Progress: ${goal.currentValue || 0} / ${goal.targetValue} ${goal.unit || ''}`
    }
  }

  const getGoalTypeLabel = (goalType) => {
    switch (goalType) {
      case 'weight_loss': return 'Weight Loss'
      case 'weight_gain': return 'Weight Gain'
      case 'workouts': return 'Workouts'
      case 'distance': return 'Distance'
      case 'time': return 'Time'
      default: return 'Custom'
    }
  }

  const getGoalTypeIcon = (goalType) => {
    switch (goalType) {
      case 'weight_loss': return '📉'
      case 'weight_gain': return '📈'
      case 'workouts': return '💪'
      case 'distance': return '🏃‍♂️'
      case 'time': return '⏱️'
      default: return '🎯'
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Goal Progress
        </h3>
      </div>
      
      <div className="space-y-4 max-h-[32rem] overflow-y-auto custom-scrollbar">
        {goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No goals set yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Visit your profile to add some fitness goals!</p>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = getGoalProgress(goal)
            return (
              <div key={goal.id} className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 ">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <span className="text-xl">{getGoalTypeIcon(goal.goalType)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{goal.title}</h4>
                      <span className="text-xs px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-medium">
                        {getGoalTypeLabel(goal.goalType)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{progress}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {progress >= 100 ? 'Complete!' : 'In Progress'}
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4 overflow-hidden">
                  <div
                    className={`h-3 bg-gradient-to-r ${getProgressColor(progress)} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-medium">{goal.description}</p>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 p-3 bg-gray-100 dark:bg-gray-700/30 rounded-lg">
                  {getProgressDescription(goal)}
                  {goal.targetDate && (
                    <div className="mt-1 flex items-center">
                      <span className="mr-1">🗓️</span>
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                {progress >= 100 ? (
                  <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl text-green-800 dark:text-green-300 text-sm font-bold border border-green-200 dark:border-green-700">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🏆</span>
                      Congratulations! Goal achieved!
                    </div>
                  </div>
                ) : progress >= 80 ? (
                  <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl text-yellow-800 dark:text-yellow-300 text-sm font-bold border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎉</span>
                      Almost there! You're {progress}% complete!
                    </div>
                  </div>
                ) : progress >= 50 ? (
                  <div className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl text-blue-800 dark:text-blue-300 text-sm font-bold border border-blue-200 dark:border-blue-700">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">💪</span>
                      Great progress! Keep it up!
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl text-purple-800 dark:text-purple-300 text-sm font-bold border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🚀</span>
                      You've got this! Every step counts!
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default GoalProgress