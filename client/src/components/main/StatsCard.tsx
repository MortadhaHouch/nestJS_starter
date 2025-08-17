import * as React from 'react'
import { motion } from "motion/react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function StatsCard({
  title,
  value,
  icon,
  extra,
  progress,
  trend,
  trendValue,
  color = "blue"
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  extra?: string;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
}) {
  // Color system
  const colorClasses = {
    blue: {
      gradient: "from-blue-500 via-blue-600 to-blue-700",
      bg: "from-blue-500/20 to-blue-600/30",
      hover: "from-blue-500/30 to-blue-600/40",
      text: "text-blue-600",
      progress: "from-blue-500 via-blue-600 to-blue-700",
      glow: "from-blue-400/50 to-blue-500/50",
      border: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/40"
    },
    green: {
      gradient: "from-green-500 via-green-600 to-green-700",
      bg: "from-green-500/20 to-green-600/30",
      hover: "from-green-500/30 to-green-600/40",
      text: "text-green-600",
      progress: "from-green-500 via-green-600 to-green-700",
      glow: "from-green-400/50 to-green-500/50",
      border: "border-green-500/20",
      hoverBorder: "hover:border-green-500/40"
    },
    purple: {
      gradient: "from-purple-500 via-purple-600 to-purple-700",
      bg: "from-purple-500/20 to-purple-600/30",
      hover: "from-purple-500/30 to-purple-600/40",
      text: "text-purple-600",
      progress: "from-purple-500 via-purple-600 to-purple-700",
      glow: "from-purple-400/50 to-purple-500/50",
      border: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/40"
    },
    orange: {
      gradient: "from-orange-500 via-orange-600 to-orange-700",
      bg: "from-orange-500/20 to-orange-600/30",
      hover: "from-orange-500/30 to-orange-600/40",
      text: "text-orange-600",
      progress: "from-orange-500 via-orange-600 to-orange-700",
      glow: "from-orange-400/50 to-orange-500/50",
      border: "border-orange-500/20",
      hoverBorder: "hover:border-orange-500/40"
    },
    red: {
      gradient: "from-red-500 via-red-600 to-red-700",
      bg: "from-red-500/20 to-red-600/30",
      hover: "from-red-500/30 to-red-600/40",
      text: "text-red-600",
      progress: "from-red-500 via-red-600 to-red-700",
      glow: "from-red-400/50 to-red-500/50",
      border: "border-red-500/20",
      hoverBorder: "hover:border-red-500/40"
    }
  };

  const currentColor = colorClasses[color];
  const trendColor = trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative flex-1 group"
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 blur-xl transition-all duration-700 ${currentColor.gradient.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-').replace('500', '500/10').replace('600', '600/5').replace('700', '700/10')} group-hover:opacity-100`} />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br via-transparent rounded-xl opacity-0 transition-opacity duration-700 ${currentColor.gradient.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-').replace('500', '500/20').replace('600', '600/20').replace('700', '700/20')} group-hover:opacity-100`} />
      
      {/* Main card */}
      <Card className={`relative transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${currentColor.border} ${currentColor.hoverBorder} min-h-[200px] overflow-hidden`}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            {/* Enhanced icon container */}
            <div className={`flex-shrink-0 p-3 bg-gradient-to-br rounded-xl shadow-lg transition-all duration-500 ${currentColor.bg} group-hover:${currentColor.hover} group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-${color}-500/30`}>
              <div className={`text-xl transition-colors duration-500 ${currentColor.text} group-hover:${currentColor.text}/90`}>
                {icon}
              </div>
            </div>
            
            {/* Title and trend */}
            <div className="flex-1">
              <CardTitle className={`text-lg font-bold tracking-wider leading-none uppercase transition-colors duration-500 group-hover:${currentColor.text} text-foreground/80 group-hover:text-foreground`}>
                {title}
              </CardTitle>
              {extra && (
                <CardDescription className="text-sm font-semibold leading-snug transition-colors duration-500 text-muted-foreground/70 group-hover:text-muted-foreground/90">
                  {extra}
                </CardDescription>
              )}
            </div>
            
            {/* Trend indicator */}
            {trend && (
              <div className={`flex gap-1 items-center px-2 py-1 bg-opacity-10 rounded-lg ${trendColor}`}>
                {trend === "up" && <TrendingUp className="w-4 h-4" />}
                {trend === "down" && <TrendingDown className="w-4 h-4" />}
                {trend === "neutral" && <Minus className="w-4 h-4" />}
                {trendValue && (
                  <span className="text-xs font-semibold">{trendValue}</span>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Value section */}
          <div className="flex flex-col justify-center flex-1">
            <p className="mb-4 text-4xl font-black leading-none transition-all duration-500 text-foreground group-hover:text-primary/90">
              {value}
            </p>
            
            {/* Progress bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold transition-colors duration-500 text-muted-foreground/80 group-hover:text-muted-foreground">
                  Progress
                </span>
                <span className={`text-sm font-bold transition-colors duration-500 ${currentColor.text} group-hover:${currentColor.text}/90`}>
                  {progress}%
                </span>
              </div>
              <div className="w-full h-3 overflow-hidden bg-gray-200 border border-gray-300 rounded-full shadow-inner dark:bg-gray-700 dark:border-gray-600">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                  className={`overflow-hidden relative h-full bg-gradient-to-r ${currentColor.progress} rounded-full`}
                >
                  {/* Enhanced shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent via-white/40"
                    animate={{ 
                      x: ["-100%", "100%"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r blur-sm ${currentColor.glow}`} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </CardContent>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-12 h-12 transition-all duration-700 opacity-0 bg-gradient-to-br to-transparent rounded-bl-xl from-primary/30 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-8 h-8 transition-all duration-700 delay-100 opacity-0 bg-gradient-to-tr to-transparent rounded-tr-xl from-primary/20 group-hover:opacity-100" />
      </Card>
    </motion.div>
  )
}
