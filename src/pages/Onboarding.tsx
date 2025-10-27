import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, TrendingUp, Target, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState('')
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const navigate = useNavigate()

  const features = [
    {
      icon: TrendingUp,
      title: 'Track Every Expense',
      description: 'Get detailed insights into your spending patterns and find ways to save more.',
    },
    {
      icon: Target,
      title: 'Achieve Your Goals',
      description: 'Set and track savings goals for that dream vacation or emergency fund.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Get smart suggestions to optimize your finances and save automatically.',
    },
  ]

  const handleGetStarted = () => {
    if (name && monthlyIncome) {
      localStorage.setItem('userName', name)
      localStorage.setItem('monthlyIncome', monthlyIncome)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl"
            >
              <Wallet className="w-12 h-12 text-primary-600" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-4"
            >
              Welcome to GenZ Finance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg mb-8"
            >
              Take control of your money with smart tracking and AI insights
            </motion.p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4"
                >
                  <feature.icon className="w-8 h-8 text-white flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">{feature.title}</h3>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setCurrentStep(1)}
              className="w-full bg-white text-primary-600 font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Get to Know You
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your monthly income?
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="Enter amount"
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setCurrentStep(0)}
                className="flex-1 btn-secondary"
              >
                Back
              </button>
              <button
                onClick={handleGetStarted}
                disabled={!name || !monthlyIncome}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finish Setup
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

