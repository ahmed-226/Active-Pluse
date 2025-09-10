# 🏋️‍♂️ ActivePulse - Fitness Tracker

<p align="center">
  <img src="./public/logo.png" alt="ActivePulse Logo" width="148" height="180"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React 18"/>
  <img src="https://img.shields.io/badge/Vite-Fast-blueviolet?logo=vite" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-Utility--First-38b2ac?logo=tailwindcss" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ed?logo=docker" alt="Docker"/>
  <img src="https://img.shields.io/badge/Nginx-Production-green?logo=nginx" alt="Nginx"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"/>
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Project Status"/>
</p>

A comprehensive fitness tracking application built with React and Vite, featuring workout logging, meal tracking, progress analytics, and goal management.

![ActivePulse Dashboard](./public/dashboard.png)

## ✨ Features

### 🎯 Comprehensive Tracking
- **Workout Logging** - Track different activity types, duration, intensity, and calories burned
- **Meal Tracking** - Log meals with detailed nutrition information including macros
- **Progress Analytics** - Visual charts and statistics to monitor your fitness journey
- **Goal Management** - Set and track custom fitness goals with progress indicators

### 📊 Dashboard & Analytics
![Progress Analytics](./public/progress.png)

- Real-time fitness statistics
- Weekly progress tracking
- Calorie consumption vs burn analysis
- Workout type distribution charts
- Recent activity timeline

### 🍽️ Nutrition Management
![Add Meal Interface](./public/add-meal.png)

- Detailed meal logging with macro tracking
- Calorie counting and nutrition guidelines
- Sample meal suggestions
- Macro calculator (Protein, Carbs, Fats)

### 💪 Workout Management
![Add Workout Interface](./public/add-workout.png)

- Multiple activity types (Running, Weightlifting, Yoga, Cycling)
- Intensity levels (Low, Medium, High)
- Duration and calorie burn tracking
- Workout tips and calorie guides

### 🏆 Achievement System
![Achievements Page](./public/achievements.png)

- Goal completion tracking
- Achievement badges and rewards
- Progress celebration
- Achievement statistics

### 👤 Profile & Goals
![Profile Management](./public/profile.png)

- Personal information management
- BMI calculation
- Custom goal creation and tracking
- Progress monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

### Deployment
- **Docker** - Containerization with multi-stage builds
- **Nginx** - Production web server
- **Alpine Linux** - Lightweight container base

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for containerized deployment)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/activepulse.git
cd activepulse
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```


## 🐳 With Docker

1. **Pull the image**
```bash
docker pull ahmed218/activepluse
```

2. **Run the container**
```bash
docker run -d -p 3000:80 --name activepulse ahmed218/activepulse:latest
```

3. **Access the application**
Open `http://localhost:3000`



## 🎨 Key Features in Detail

### Data Persistence
- **Local Storage** - All data persists locally in browser storage
- **Context State Management** - Centralized state using React Context
- **Automatic Saving** - Data saves immediately on form submission

### Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Tablet & Desktop** - Scales beautifully across all screen sizes
- **Dark Mode** - Consistent dark theme throughout the application

### User Experience
- **Intuitive Navigation** - Easy-to-use sidebar navigation
- **Form Validation** - Real-time form validation and error handling
- **Visual Feedback** - Loading states, animations, and hover effects
- **Progress Tracking** - Visual progress bars and achievement celebrations




## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

<div align="center">
  <p>Built with ❤️ for fitness enthusiasts</p>
  <p>Start your fitness journey with ActivePulse today! 🏋️‍♂️</p>
</div>