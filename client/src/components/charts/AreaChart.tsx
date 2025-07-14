import { TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart as AreaChartRoot, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface AreaChartProps {
  title: string
  description: string
  data: { xValue: number | string; yValue: number | string }[]
  height?: number
  showYAxis?: boolean
  showGrid?: boolean
  gradientColors?: {
    start: string
    end: string
  }
  strokeColor?: string
  strokeWidth?: number
  fillOpacity?: number
  showTrend?: boolean
  trendValue?: number
  trendPeriod?: string
  className?: string
  colorScheme?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink' | 'indigo'
}

// Predefined color schemes
const colorSchemes = {
  primary: {
    start: "hsl(221, 83%, 53%)",
    end: "hsl(221, 83%, 53% / 0.05)",
    stroke: "hsl(221, 83%, 53%)",
    trend: "text-blue-600"
  },
  success: {
    start: "hsl(142, 76%, 36%)",
    end: "hsl(142, 76%, 36% / 0.05)",
    stroke: "hsl(142, 76%, 36%)",
    trend: "text-green-600"
  },
  warning: {
    start: "hsl(38, 92%, 50%)",
    end: "hsl(38, 92%, 50% / 0.05)",
    stroke: "hsl(38, 92%, 50%)",
    trend: "text-yellow-600"
  },
  danger: {
    start: "hsl(0, 84%, 60%)",
    end: "hsl(0, 84%, 60% / 0.05)",
    stroke: "hsl(0, 84%, 60%)",
    trend: "text-red-600"
  },
  info: {
    start: "hsl(199, 89%, 48%)",
    end: "hsl(199, 89%, 48% / 0.05)",
    stroke: "hsl(199, 89%, 48%)",
    trend: "text-cyan-600"
  },
  purple: {
    start: "hsl(262, 83%, 58%)",
    end: "hsl(262, 83%, 58% / 0.05)",
    stroke: "hsl(262, 83%, 58%)",
    trend: "text-purple-600"
  },
  pink: {
    start: "hsl(330, 81%, 60%)",
    end: "hsl(330, 81%, 60% / 0.05)",
    stroke: "hsl(330, 81%, 60%)",
    trend: "text-pink-600"
  },
  indigo: {
    start: "hsl(239, 84%, 67%)",
    end: "hsl(239, 84%, 67% / 0.05)",
    stroke: "hsl(239, 84%, 67%)",
    trend: "text-indigo-600"
  }
}

export function AreaChart({
  title,
  description,
  data,
  height = 300,
  showYAxis = true,
  showGrid = true,
  gradientColors,
  strokeColor,
  strokeWidth = 2,
  fillOpacity = 0.4,
  showTrend = true,
  trendValue = 5.2,
  trendPeriod = "January - June 2024",
  className,
  colorScheme = 'primary'
}: AreaChartProps) {
  // Calculate trend direction
  const isTrendingUp = trendValue >= 0
  const TrendIcon = isTrendingUp ? TrendingUp : TrendingDown
  
  // Use color scheme or custom colors
  const colors = gradientColors ? {
    start: gradientColors.start,
    end: gradientColors.end,
    stroke: strokeColor || gradientColors.start,
    trend: isTrendingUp ? "text-green-600" : "text-red-600"
  } : colorSchemes[colorScheme]

  // Generate unique gradient ID
  const gradientId = `area-gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer 
          config={{
            desktop: {
              label: "Desktop",
              color: colors.stroke,
            },
          }}
          className="w-full"
        >
          <ResponsiveContainer width="100%" height={height}>
            <AreaChartRoot
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              {showGrid && (
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke="hsl(var(--border) / 0.2)"
                  strokeOpacity={0.5}
                />
              )}
              <XAxis
                dataKey="xValue"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground) / 0.8)" }}
                tickFormatter={(value) => {
                  if (typeof value === 'string') {
                    return value.length > 3 ? value.slice(0, 3) : value
                  }
                  return value.toString()
                }}
              />
              {showYAxis && (
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground) / 0.8)" }}
                  tickFormatter={(value) => {
                    if (value >= 1000) {
                      return `${(value / 1000).toFixed(1)}k`
                    }
                    return value.toString()
                  }}
                />
              )}
              <ChartTooltip 
                cursor={{ 
                  stroke: colors.stroke, 
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                  strokeOpacity: 0.5
                }} 
                content={<ChartTooltipContent />} 
              />
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={colors.start}
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="50%"
                    stopColor={colors.start}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={colors.end}
                    stopOpacity={0.05}
                  />
                </linearGradient>
                <filter id={`glow-${gradientId}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <Area
                dataKey="yValue"
                type="monotone"
                fill={`url(#${gradientId})`}
                fillOpacity={fillOpacity}
                stroke={colors.stroke}
                strokeWidth={strokeWidth}
                filter={`url(#glow-${gradientId})`}
                dot={{
                  fill: colors.stroke,
                  strokeWidth: 2,
                  r: 4,
                  stroke: "hsl(var(--background))",
                  filter: `url(#glow-${gradientId})`
                }}
                activeDot={{
                  r: 6,
                  stroke: colors.stroke,
                  strokeWidth: 3,
                  fill: "hsl(var(--background))",
                  filter: `url(#glow-${gradientId})`
                }}
              />
            </AreaChartRoot>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {showTrend && (
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className={`flex items-center gap-2 leading-none font-medium ${colors.trend}`}>
                Trending {isTrendingUp ? 'up' : 'down'} by {Math.abs(trendValue)}% this period
                <TrendIcon className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                {trendPeriod}
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
