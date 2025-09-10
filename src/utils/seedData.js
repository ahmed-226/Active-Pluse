export const seedData = {
  // Sample workouts with variety of activities, dates, and intensities
  workouts: [
    {
      id: 1,
      activityType: 'Running',
      duration: 30,
      intensity: 'medium',
      date: '2025-01-15',
      caloriesBurned: 320,
      notes: 'Morning run in the park. Felt great!'
    },
    {
      id: 2,
      activityType: 'Weightlifting',
      duration: 45,
      intensity: 'high',
      date: '2025-01-14',
      caloriesBurned: 200,
      notes: 'Upper body workout. Increased weight on bench press.'
    },
    {
      id: 3,
      activityType: 'Yoga',
      duration: 60,
      intensity: 'low',
      date: '2025-01-13',
      caloriesBurned: 150,
      notes: 'Relaxing evening yoga session. Great for flexibility.'
    },
    {
      id: 4,
      activityType: 'Cycling',
      duration: 40,
      intensity: 'medium',
      date: '2025-01-12',
      caloriesBurned: 280,
      notes: 'Bike ride through the city. Nice weather!'
    },
    {
      id: 5,
      activityType: 'Running',
      duration: 25,
      intensity: 'high',
      date: '2025-01-11',
      caloriesBurned: 290,
      notes: 'Sprint intervals at the track. Pushed my limits!'
    },
    {
      id: 6,
      activityType: 'Weightlifting',
      duration: 50,
      intensity: 'medium',
      date: '2025-01-10',
      caloriesBurned: 220,
      notes: 'Leg day! Squats and deadlifts.'
    },
    {
      id: 7,
      activityType: 'Yoga',
      duration: 30,
      intensity: 'low',
      date: '2025-01-09',
      caloriesBurned: 90,
      notes: 'Quick morning yoga routine.'
    },
    {
      id: 8,
      activityType: 'Cycling',
      duration: 55,
      intensity: 'high',
      date: '2025-01-08',
      caloriesBurned: 350,
      notes: 'Long bike ride to the mountains. Challenging but rewarding!'
    }
  ],

  // Sample meals with different types and nutritional info
  meals: [
    {
      id: 101,
      mealType: 'breakfast',
      foodItems: ['Oatmeal with berries', 'Greek yogurt', 'Almonds'],
      calories: 380,
      proteins: 18,
      carbs: 45,
      fats: 12,
      date: '2025-01-15'
    },
    {
      id: 102,
      mealType: 'lunch',
      foodItems: ['Grilled chicken salad', 'Olive oil dressing', 'Avocado'],
      calories: 450,
      proteins: 35,
      carbs: 15,
      fats: 28,
      date: '2025-01-15'
    },
    {
      id: 103,
      mealType: 'dinner',
      foodItems: ['Salmon fillet', 'Quinoa', 'Steamed broccoli'],
      calories: 520,
      proteins: 42,
      carbs: 35,
      fats: 22,
      date: '2025-01-15'
    },
    {
      id: 104,
      mealType: 'snack',
      foodItems: ['Apple', 'Peanut butter'],
      calories: 180,
      proteins: 8,
      carbs: 20,
      fats: 8,
      date: '2025-01-15'
    },
    {
      id: 105,
      mealType: 'breakfast',
      foodItems: ['Scrambled eggs', 'Whole wheat toast', 'Orange juice'],
      calories: 420,
      proteins: 22,
      carbs: 38,
      fats: 18,
      date: '2025-01-14'
    },
    {
      id: 106,
      mealType: 'lunch',
      foodItems: ['Turkey sandwich', 'Side salad', 'Hummus'],
      calories: 480,
      proteins: 28,
      carbs: 42,
      fats: 20,
      date: '2025-01-14'
    },
    {
      id: 107,
      mealType: 'dinner',
      foodItems: ['Pasta with marinara', 'Grilled vegetables', 'Parmesan cheese'],
      calories: 550,
      proteins: 20,
      carbs: 72,
      fats: 18,
      date: '2025-01-14'
    },
    {
      id: 108,
      mealType: 'breakfast',
      foodItems: ['Smoothie bowl', 'Banana', 'Granola', 'Chia seeds'],
      calories: 350,
      proteins: 12,
      carbs: 58,
      fats: 8,
      date: '2025-01-13'
    },
    {
      id: 109,
      mealType: 'lunch',
      foodItems: ['Quinoa bowl', 'Black beans', 'Sweet potato', 'Tahini dressing'],
      calories: 490,
      proteins: 18,
      carbs: 68,
      fats: 16,
      date: '2025-01-13'
    },
    {
      id: 110,
      mealType: 'dinner',
      foodItems: ['Grilled chicken breast', 'Brown rice', 'Green beans'],
      calories: 470,
      proteins: 38,
      carbs: 45,
      fats: 12,
      date: '2025-01-13'
    }
  ],

  // Sample profile with goals
  profile: {
    name: 'Alex Johnson',
    age: 28,
    weight: 72.5,
    height: 175,
    targetWeight: 68,
    dailySteps: 10000,
    goals: [
      {
        id: 201,
        title: 'Lose 5kg for Summer',
        description: 'Want to get in shape for the summer season. Planning to combine cardio and strength training.',
        goalType: 'weight_loss',
        targetValue: 68,
        currentValue: 72.5,
        startingValue: 75,
        targetDate: '2025-06-01',
        unit: 'kg',
        createdAt: '2025-01-01T00:00:00.000Z'
      },
      {
        id: 202,
        title: 'Complete 50 Workouts',
        description: 'Challenge myself to complete 50 workouts in 3 months. Mix of cardio and strength training.',
        goalType: 'workouts',
        targetValue: 50,
        currentValue: 8,
        startingValue: 0,
        targetDate: '2025-04-01',
        unit: 'workouts',
        createdAt: '2025-01-01T00:00:00.000Z'
      },
      {
        id: 203,
        title: 'Run 100km This Month',
        description: 'Monthly running challenge to improve cardiovascular endurance.',
        goalType: 'distance',
        targetValue: 100,
        currentValue: 25.5,
        startingValue: 0,
        targetDate: '2025-01-31',
        unit: 'km',
        createdAt: '2025-01-01T00:00:00.000Z'
      },
      {
        id: 204,
        title: 'Exercise 20 Hours Weekly',
        description: 'Maintain consistent exercise routine by hitting 20 hours of activity per week.',
        goalType: 'time',
        targetValue: 20,
        currentValue: 6.5,
        startingValue: 0,
        targetDate: '2025-01-21',
        unit: 'hours',
        createdAt: '2025-01-15T00:00:00.000Z'
      }
    ]
  }
}

// Function to load seed data into the application
export const loadSeedData = () => {
  try {
    console.log('🚀 Starting to load seed data...')
    
    // Load workouts
    localStorage.setItem('fitnessWorkouts', JSON.stringify(seedData.workouts))
    console.log('✅ Workouts loaded:', seedData.workouts.length)
    
    // Load meals
    localStorage.setItem('fitnessMeals', JSON.stringify(seedData.meals))
    console.log('✅ Meals loaded:', seedData.meals.length)
    
    // Load profile
    localStorage.setItem('fitnessProfile', JSON.stringify(seedData.profile))
    console.log('✅ Profile loaded with goals:', seedData.profile.goals.length)
    
    console.log('✅ Seed data loaded successfully!')
    console.log('📊 Total loaded:', {
      workouts: seedData.workouts.length,
      meals: seedData.meals.length,
      goals: seedData.profile.goals.length
    })
    
    return true
  } catch (error) {
    console.error('❌ Error loading seed data:', error)
    alert('Error loading seed data. Check console for details.')
    return false
  }
}

// Function to clear all data
export const clearAllData = () => {
  try {
    console.log('🗑️ Starting to clear all data...')
    
    // Clear fitness data
    localStorage.removeItem('fitnessWorkouts')
    localStorage.removeItem('fitnessMeals')
    localStorage.removeItem('fitnessProfile')
    localStorage.removeItem('fitnessAchievements')
    
    // Clear user authentication data
    localStorage.removeItem('fitnessUser')
    localStorage.removeItem('fitnessAuthStatus')
    
    console.log('🗑️ All data cleared successfully!')
    return true
  } catch (error) {
    console.error('❌ Error clearing data:', error)
    alert('Error clearing data. Check console for details.')
    return false
  }
}

// Function to get current data stats
export const getDataStats = () => {
  try {
    const workouts = JSON.parse(localStorage.getItem('fitnessWorkouts') || '[]')
    const meals = JSON.parse(localStorage.getItem('fitnessMeals') || '[]')
    const profile = JSON.parse(localStorage.getItem('fitnessProfile') || '{}')
    const user = JSON.parse(localStorage.getItem('fitnessUser') || '{}')
    const achievements = JSON.parse(localStorage.getItem('fitnessAchievements') || '[]')

    return {
      workouts: workouts.length,
      meals: meals.length,
      goals: (profile.goals || []).length,
      achievements: achievements.length,
      hasProfile: Object.keys(profile).length > 0,
      hasUser: Object.keys(user).length > 0,
      userName: user.name || 'No user'
    }
  } catch (error) {
    console.error('Error getting data stats:', error)
    return { workouts: 0, meals: 0, goals: 0, achievements: 0, hasProfile: false, hasUser: false, userName: 'Error' }
  }
}
