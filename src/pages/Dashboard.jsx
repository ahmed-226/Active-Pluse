import { useFitness } from '../context/FitnessContext'
import StatsCard from '../components/StatsCard'
import RecentActivities from '../components/RecentActivities'
import GoalProgress from '../components/GoalProgress'

const Dashboard = () => {
  const { workouts, meals, profile } = useFitness()
  
  const currentWeek = new Date()
  const weekStart = new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay()))
  
  const thisWeekWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date)
    return workoutDate >= weekStart
  }).length

  const todayMeals = meals.filter(meal => {
    const today = new Date().toISOString().split('T')[0]
    return meal.date === today
  })

  const todayCalories = todayMeals.reduce((total, meal) => total + (meal.calories || 0), 0)

  const weeklyProgress = Math.round((thisWeekWorkouts / 5) * 100) 

  const totalActiveMinutes = workouts.reduce((total, workout) => total + (workout.duration || 0), 0)

  return (
    <div className="px-4 sm:px-6 lg:px-8 animate-slideInUp">
      {/* Welcome Header */}
      <div className="mb-8 mt-8 text-center lg:text-left">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl border border-blue-200 dark:border-blue-800">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, Champion! 🏆
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to crush your fitness goals today?
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Workouts This Week"
          value={thisWeekWorkouts}
          icon="🏃‍♂️"
          color="bg-blue-500"
        />
        <StatsCard
          title="Calories Today"
          value={todayCalories}
          icon="🔥"
          color="bg-red-500"
        />
        <StatsCard
          title="Weekly Progress"
          value={`${weeklyProgress}%`}
          icon="📈"
          color="bg-green-500"
        />
        <StatsCard
          title="Active Minutes"
          value={totalActiveMinutes}
          icon="⏱️"
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="card card-hover animate-slideInUp">
          <RecentActivities workouts={workouts} meals={meals} />
        </div>
        
        {/* Goal Progress */}
        <div className="card card-hover animate-slideInUp">
          <GoalProgress goals={profile.goals || []} />
        </div>
      </div>

      {/* Motivational Footer */}
      {(workouts.length > 0 || meals.length > 0) && (
        <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-6 text-center shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-2">
            Great job! 🎉
          </h3>
          <p className="text-green-100">
            You're making excellent progress on your fitness journey!
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard