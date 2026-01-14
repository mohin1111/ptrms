import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatCurrency, formatPercent, formatNumber } from '@/utils'
import type { KPIData, RiskLevel } from '@/types'

interface KPICardProps {
  data: KPIData
  className?: string
}

const RISK_COLORS: Record<RiskLevel, string> = {
  CRITICAL: 'border-red-500/50 bg-red-500/5',
  HIGH: 'border-orange-500/50 bg-orange-500/5',
  MEDIUM: 'border-yellow-500/50 bg-yellow-500/5',
  LOW: 'border-green-500/50 bg-green-500/5',
}

export function KPICard({ data, className }: KPICardProps) {
  const formatValue = (value: number) => {
    switch (data.format) {
      case 'currency':
        return formatCurrency(value)
      case 'percent':
        return formatPercent(value)
      case 'number':
        return formatNumber(value, 0)
      default:
        return value.toString()
    }
  }

  const change = data.previousValue && data.value != null
    ? ((data.value - data.previousValue) / Math.abs(data.previousValue)) * 100
    : (data.change ?? 0)

  const trend = data.trend || (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral')

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor =
    trend === 'up'
      ? 'text-green-500'
      : trend === 'down'
      ? 'text-red-500'
      : 'text-slate-500'

  return (
    <div
      className={cn(
        'rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all hover:border-slate-600 hover:bg-slate-800 sm:rounded-xl sm:p-4',
        data.riskLevel && RISK_COLORS[data.riskLevel],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-slate-400 sm:text-sm">{data.label}</p>
          <p className="mt-0.5 text-lg font-bold text-white tabular-nums sm:mt-1 sm:text-2xl">
            {formatValue(data.value)}
          </p>
        </div>
        {change !== 0 && !isNaN(change) && (
          <div className={cn('flex flex-shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 sm:gap-1 sm:px-2 sm:py-1', trendColor)}>
            <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[10px] font-medium sm:text-xs">{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Sparkline placeholder */}
      {data.sparklineData && data.sparklineData.length > 0 && (
        <div className="mt-2 flex h-6 items-end gap-0.5 sm:mt-3 sm:h-8">
          {data.sparklineData.slice(-20).map((value, i, arr) => {
            const max = Math.max(...arr)
            const min = Math.min(...arr)
            const range = max - min || 1
            const height = ((value - min) / range) * 100

            return (
              <div
                key={i}
                className="flex-1 rounded-sm bg-slate-600"
                style={{ height: `${Math.max(10, height)}%` }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
