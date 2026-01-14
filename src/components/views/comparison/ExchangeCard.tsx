import { cn } from '@/lib/cn'
import { EXCHANGES } from '@/constants'
import { formatCurrency, formatPercent } from '@/utils'
import type { ExchangeCode } from '@/types'

interface ExchangeMetrics {
  exchange: ExchangeCode
  clients: number
  positionValue: number
  margin: number
  utilization: number
  highRisk: number
  mtm: number
}

interface ExchangeCardProps {
  data: ExchangeMetrics
}

export function ExchangeCard({ data }: ExchangeCardProps) {
  const config = EXCHANGES[data.exchange]

  return (
    <div
      className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 sm:rounded-xl sm:p-4"
      style={{ borderTopColor: config.color, borderTopWidth: '3px' }}
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-4">
        <div
          className="h-3 w-3 rounded-full sm:h-4 sm:w-4"
          style={{ backgroundColor: config.color }}
        />
        <span className="text-sm font-semibold text-white sm:text-base">{config.name}</span>
      </div>

      <div className="space-y-1.5 sm:space-y-3">
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">Clients</span>
          <span className="text-xs font-medium text-white sm:text-sm">{data.clients.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">Position</span>
          <span className="text-xs font-medium text-white sm:text-sm">{formatCurrency(data.positionValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">Margin</span>
          <span className="text-xs font-medium text-white sm:text-sm">{formatCurrency(data.margin)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">Utilization</span>
          <span
            className={cn(
              'text-xs font-medium sm:text-sm',
              data.utilization > 80
                ? 'text-red-500'
                : data.utilization > 60
                ? 'text-yellow-500'
                : 'text-green-500'
            )}
          >
            {formatPercent(data.utilization)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">High Risk</span>
          <span className="text-xs font-medium text-red-400 sm:text-sm">{data.highRisk}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-slate-400 sm:text-sm">MTM</span>
          <span
            className={cn(
              'text-xs font-medium sm:text-sm',
              data.mtm >= 0 ? 'text-green-500' : 'text-red-500'
            )}
          >
            {formatCurrency(data.mtm)}
          </span>
        </div>
      </div>
    </div>
  )
}
