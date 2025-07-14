import * as React from 'react'
import { motion } from "motion/react"
import StatsCard from './StatsCard'
import { 
  Users, 
  DollarSign, 
  Target, 
  ShoppingCart,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react"

// Sample data for demonstration
const sampleStats = [
  {
    title: "Total Revenue",
    value: "$125,430",
    icon: <DollarSign />,
    extra: "This month",
    progress: 85,
    trend: "up" as const,
    trendValue: "+12.5%",
    color: "green" as const
  },
  {
    title: "Active Users",
    value: "2,847",
    icon: <Users />,
    extra: "Daily average",
    progress: 65,
    trend: "down" as const,
    trendValue: "-3.2%",
    color: "blue" as const
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    icon: <Target />,
    extra: "Last 30 days",
    progress: 45,
    trend: "neutral" as const,
    color: "purple" as const
  },
  {
    title: "Orders",
    value: "1,234",
    icon: <ShoppingCart />,
    extra: "This week",
    progress: 92,
    trend: "up" as const,
    trendValue: "+8.1%",
    color: "orange" as const
  },
  {
    title: "Page Views",
    value: "45.2K",
    icon: <Eye />,
    extra: "Today",
    progress: 78,
    trend: "up" as const,
    trendValue: "+15.3%",
    color: "blue" as const
  },
  {
    title: "Response Time",
    value: "2.4s",
    icon: <Clock />,
    extra: "Average",
    progress: 88,
    trend: "up" as const,
    trendValue: "-12%",
    color: "green" as const
  },
  {
    title: "Tasks Completed",
    value: "156",
    icon: <CheckCircle />,
    extra: "This week",
    progress: 73,
    trend: "up" as const,
    trendValue: "+5.7%",
    color: "purple" as const
  },
  {
    title: "Error Rate",
    value: "0.8%",
    icon: <AlertCircle />,
    extra: "Last 24h",
    progress: 95,
    trend: "down" as const,
    trendValue: "-2.1%",
    color: "red" as const
  }
]

interface StatsGridProps {
  stats?: typeof sampleStats
  columns?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  className?: string
}

export default function StatsGrid({ 
  stats = sampleStats, 
  columns = 4, 
  gap = "md",
  className = "" 
}: StatsGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  }

  const gapSizes = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8"
  }

  return (
    <div className={`p-8 w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl dark:bg-transparent ${className}`}>
      {/* Grid Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h2 className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
          Dashboard Overview
        </h2>
        <p className="text-lg text-muted-foreground">
          Key metrics and performance indicators
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className={`grid w-full ${gridCols[columns]} ${gapSizes[gap]}`}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Grid Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex gap-2 items-center px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>
    </div>
  )
}

// Export sample data for external use
export { sampleStats } 