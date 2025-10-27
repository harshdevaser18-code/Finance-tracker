import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Lightbulb, Target } from 'lucide-react'

interface AIInsightsProps {
  savingsPercentage: number
}

export default function AIInsights({ savingsPercentage }: AIInsightsProps) {
  const getInsight = () => {
    if (savingsPercentage >= 30) {
      return {
        icon: Target,
        title: 'Excellent Savings Rate!',
        message: "You're saving more than 30% of your income. Consider investing some of it for long-term growth.",
        color: 'green',
      }
    } else if (savingsPercentage >= 20) {
      return {
        icon: TrendingUp,
        title: 'Good Progress',
        message: "You're on track! Consider automating your savings to reach your goals faster.",
        color: 'blue',
      }
    } else if (savingsPercentage >= 10) {
      return {
        icon: Lightbulb,
        title: 'Room for Improvement',
        message: 'Try to save at least 20% of your income. Review your subscriptions and cut unnecessary expenses.',
        color: 'yellow',
      }
    } else {
      return {
        icon: Sparkles,
        title: 'Need to Save More',
        message: 'Your savings rate is low. Create a budget and track your spending to improve your financial health.',
        color: 'red',
      }
    }
  }

  const insight = getInsight()
  const Icon = insight.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="card bg-gradient-to-br from-purple-500 to-pink-600 text-white"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-lg">AI Insight</h3>
          </div>
          <h4 className="font-semibold mb-2">{insight.title}</h4>
          <p className="text-white/90 text-sm">{insight.message}</p>
        </div>
      </div>
    </motion.div>
  )
}

