const RecentActivities = ({ workouts, meals }) => {
  // Combine and sort recent activities
  const activities = [
    ...workouts.map(w => ({ ...w, type: 'workout' })),
    ...meals.map(m => ({ ...m, type: 'meal' }))
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10)

  const getActivityIcon = (type, activity) => {
    if (type === 'workout') {
      switch (activity.activityType) {
        case 'Running': return '🏃‍♂️'
        case 'Weightlifting': return '🏋️‍♂️'
        case 'Yoga': return '🧘‍♀️'
        case 'Cycling': return '🚴‍♂️'
        default: return '💪'
      }
    }
    return '🍽️'
  }

  const getActivityText = (activity) => {
    if (activity.type === 'workout') {
      return `${activity.activityType} for ${activity.duration} minutes`
    }
    return `${activity.mealType} - ${activity.calories} calories`
  }

  const getActivityColor = (type) => {
    return type === 'workout' 
      ? 'from-blue-500 to-purple-500' 
      : 'from-green-500 to-emerald-500'
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Activities
        </h3>
      </div>
      
      <div className="space-y-3 max-h-[32rem] overflow-y-auto custom-scrollbar">
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No activities yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Start by adding a workout or meal!</p>
          </div>
        ) : (
          activities.map((activity, idx) => (
            <div
              key={activity.id}
              className="activity-item"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-xl">{getActivityIcon(activity.type, activity)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {getActivityText(activity)}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                    {activity.type === 'workout' && activity.intensity && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.intensity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        activity.intensity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {activity.intensity.charAt(0).toUpperCase() + activity.intensity.slice(1)} intensity
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentActivities