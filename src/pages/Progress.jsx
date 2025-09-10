import { useFitness } from '../context/FitnessContext'
import SimpleChart from '../components/SimpleChart'

const Progress = () => {
  const { workouts, meals, profile } = useFitness()

  // Calculate workout data for the last 14 days (broader range to show data)
  const getWorkoutData = () => {
    const daysToShow = 14
    const dailyData = {}
    const today = new Date()
    
    // Initialize with the last 14 days
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      dailyData[dateStr] = 0
    }

    // Count workouts for each day
    workouts.forEach(workout => {
      if (dailyData.hasOwnProperty(workout.date)) {
        dailyData[workout.date]++
      }
    })

    return Object.entries(dailyData).map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: count
    }))
  }

  // Enhanced workout timeline - shows actual workout activities
  const getWorkoutTimeline = () => {
    if (workouts.length === 0) return []
    
    // Get last 10 workouts with details
    const recentWorkouts = [...workouts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8) // Show last 8 workouts
      .reverse() // Show chronologically
    
    return recentWorkouts.map(workout => ({
      date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      activity: workout.activityType,
      duration: workout.duration,
      intensity: workout.intensity,
      calories: workout.caloriesBurned || 0,
      fullDate: workout.date
    }))
  }

  // Calculate calorie data for the last 14 days
  const getCalorieData = () => {
    const daysToShow = 14
    const dailyData = {}
    const today = new Date()
    
    // Initialize with the last 14 days
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      dailyData[dateStr] = { consumed: 0, burned: 0 }
    }

    // Add meal calories
    meals.forEach(meal => {
      if (dailyData.hasOwnProperty(meal.date)) {
        dailyData[meal.date].consumed += meal.calories || 0
      }
    })

    // Add workout calories burned
    workouts.forEach(workout => {
      if (dailyData.hasOwnProperty(workout.date)) {
        dailyData[workout.date].burned += workout.caloriesBurned || 0
      }
    })

    return Object.entries(dailyData).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      consumed: data.consumed,
      burned: data.burned
    }))
  }

  // Alternative: Show recent data based on actual workout/meal dates
  const getRecentWorkoutData = () => {
    if (workouts.length === 0) return []
    
    // Get all unique workout dates, sorted by most recent
    const workoutDates = [...new Set(workouts.map(w => w.date))].sort().slice(-10)
    
    const dateCountMap = {}
    workouts.forEach(workout => {
      if (workoutDates.includes(workout.date)) {
        dateCountMap[workout.date] = (dateCountMap[workout.date] || 0) + 1
      }
    })

    return workoutDates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: dateCountMap[date] || 0
    }))
  }

  const getRecentCalorieData = () => {
    if (workouts.length === 0 && meals.length === 0) return []
    
    // Get all unique dates from both workouts and meals
    const allDates = [...new Set([
      ...workouts.map(w => w.date),
      ...meals.map(m => m.date)
    ])].sort().slice(-10)
    
    const dateDataMap = {}
    
    // Initialize dates
    allDates.forEach(date => {
      dateDataMap[date] = { consumed: 0, burned: 0 }
    })
    
    // Add meal calories
    meals.forEach(meal => {
      if (dateDataMap[meal.date]) {
        dateDataMap[meal.date].consumed += meal.calories || 0
      }
    })
    
    // Add workout calories
    workouts.forEach(workout => {
      if (dateDataMap[workout.date]) {
        dateDataMap[workout.date].burned += workout.caloriesBurned || 0
      }
    })

    return allDates.map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      consumed: dateDataMap[date].consumed,
      burned: dateDataMap[date].burned
    }))
  }

  // Calculate workout type distribution
  const getWorkoutTypeDistribution = () => {
    if (workouts.length === 0) return []
    
    const distribution = {}
    workouts.forEach(workout => {
      distribution[workout.activityType] = (distribution[workout.activityType] || 0) + 1
    })
    
    return Object.entries(distribution).map(([type, count]) => ({
      name: type,
      value: count,
      percentage: Math.round((count / workouts.length) * 100)
    }))
  }

  // Use recent data if we have workouts/meals, otherwise use the 14-day range
  const workoutChartData = workouts.length > 0 ? getRecentWorkoutData() : getWorkoutData()
  const calorieChartData = (workouts.length > 0 || meals.length > 0) ? getRecentCalorieData() : getCalorieData()
  const workoutDistribution = getWorkoutTypeDistribution()
  const workoutTimeline = getWorkoutTimeline()

  // Helper functions for workout timeline
  const getActivityIcon = (activity) => {
    switch (activity) {
      case 'Running': return '🏃‍♂️'
      case 'Weightlifting': return '🏋️‍♂️'
      case 'Yoga': return '🧘‍♀️'
      case 'Cycling': return '🚴‍♂️'
      default: return '💪'
    }
  }

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'from-red-500 to-red-600'
      case 'medium': return 'from-yellow-500 to-orange-500'
      case 'low': return 'from-green-500 to-green-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slideInUp">
      {/* Enhanced Header */}
      <div className="mb-8 mt-8">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Progress Reports</h1>
          <p className="text-indigo-100 text-lg">Track your fitness journey with detailed analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Workout Timeline */}
        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🏃‍♂️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Workout Timeline
                {workouts.length > 0 && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    (Last {workoutTimeline.length} workouts)
                  </span>
                )}
              </h3>
            </div>
            {workoutTimeline.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📈</span>
                  </div>
                  <p className="text-lg font-medium">No workout data available</p>
                  <p className="text-sm mt-2">Start adding workouts to see your progress!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                {workoutTimeline.map((workout, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${getIntensityColor(workout.intensity)} rounded-lg flex items-center justify-center shadow-md`}>
                          <span className="text-xl">{getActivityIcon(workout.activity)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {workout.activity}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {workout.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {workout.duration}min
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                          </div>
                          {workout.calories > 0 && (
                            <div className="text-center">
                              <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                {workout.calories}cal
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Burned</p>
                            </div>
                          )}
                          <div className="text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              workout.intensity === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                              workout.intensity === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            }`}>
                              {workout.intensity.charAt(0).toUpperCase() + workout.intensity.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-2xl"></div>
        </div>

        {/* Calorie Tracking Chart */}
        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Calories: Consumed vs Burned
                {(workouts.length > 0 || meals.length > 0) && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                    ({calorieChartData.length} days)
                  </span>
                )}
              </h3>
            </div>
            {calorieChartData.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <p className="text-lg font-medium">No calorie data available</p>
                  <p className="text-sm mt-2">Add meals and workouts to track calories!</p>
                </div>
              </div>
            ) : (
              <>
                <SimpleChart
                  data={calorieChartData}
                  type="bar"
                  xKey="date"
                  yKey={["consumed", "burned"]}
                  colors={["#EF4444", "#10B981"]}
                />
                <div className="mt-4 flex justify-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full mr-2 shadow-lg"></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Consumed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-2 shadow-lg"></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Burned</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-b-2xl"></div>
        </div>

        {/* Workout Type Distribution */}
        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Workout Type Distribution</h3>
            </div>
            {workoutDistribution.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">No workout data available</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Start adding workouts to see your progress!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {workoutDistribution.map((item, index) => {
                  const gradientColors = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-emerald-500',
                    'from-yellow-500 to-orange-500',
                    'from-red-500 to-rose-500'
                  ]
                  return (
                    <div key={item.name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 bg-gradient-to-r ${gradientColors[index % gradientColors.length]} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {item.value} workout{item.value !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-2xl"></div>
        </div>

        {/* Statistics Summary */}
        <div className="card card-hover">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Summary Statistics</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Workouts:</span>
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">{workouts.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Meals Logged:</span>
                <span className="font-bold text-xl text-green-600 dark:text-green-400">{meals.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Average Workout Duration:</span>
                <span className="font-bold text-xl text-purple-600 dark:text-purple-400">
                  {workouts.length > 0 
                    ? Math.round(workouts.reduce((acc, w) => acc + (w.duration || 0), 0) / workouts.length)
                    : 0
                  } min
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Calories Burned:</span>
                <span className="font-bold text-xl text-orange-600 dark:text-orange-400">
                  {workouts.reduce((total, workout) => total + (workout.caloriesBurned || 0), 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Total Calories Consumed:</span>
                <span className="font-bold text-xl text-pink-600 dark:text-pink-400">
                  {meals.reduce((total, meal) => total + (meal.calories || 0), 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Most Common Activity:</span>
                <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                  {workoutDistribution.length > 0 
                    ? workoutDistribution.reduce((prev, current) => prev.value > current.value ? prev : current).name
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-2xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Progress