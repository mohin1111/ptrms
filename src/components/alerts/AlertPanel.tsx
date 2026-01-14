import { useEffect } from 'react'
import {
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  Info,
  Check,
  X,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAlertStore } from '@/stores'
import { mockApi } from '@/mock'
import { formatRelativeTime } from '@/utils'
import type { RiskLevel, RiskAlert } from '@/types'

const SEVERITY_CONFIG: Record<
  RiskLevel,
  { icon: React.ElementType; bgColor: string; textColor: string; borderColor: string }
> = {
  CRITICAL: {
    icon: AlertOctagon,
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
  },
  HIGH: {
    icon: AlertTriangle,
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/30',
  },
  MEDIUM: {
    icon: AlertCircle,
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/30',
  },
  LOW: {
    icon: Info,
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/30',
  },
}

function AlertItem({ alert }: { alert: RiskAlert }) {
  const { acknowledgeAlert, resolveAlert } = useAlertStore()
  const config = SEVERITY_CONFIG[alert.severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'rounded-lg border p-3',
        config.bgColor,
        config.borderColor
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('mt-0.5', config.textColor)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn('text-xs font-semibold uppercase', config.textColor)}>
              {alert.severity}
            </span>
            <span className="text-xs text-slate-500">
              {formatRelativeTime(alert.timestamp)}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-200">{alert.message}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded bg-slate-800 px-1.5 py-0.5">
              {alert.clientId}
            </span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5">
              {alert.exchange}
            </span>
            {alert.symbol && (
              <span className="rounded bg-slate-800 px-1.5 py-0.5">
                {alert.symbol}
              </span>
            )}
          </div>

          {/* Actions */}
          {alert.status === 'NEW' && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => acknowledgeAlert(alert.id, 'current_user')}
                className="flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-600"
              >
                <Check className="h-3 w-3" />
                Acknowledge
              </button>
              <button
                onClick={() => resolveAlert(alert.id)}
                className="flex items-center gap-1 rounded bg-green-600/20 px-2 py-1 text-xs text-green-400 hover:bg-green-600/30"
              >
                <X className="h-3 w-3" />
                Resolve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AlertPanel() {
  const { setAlerts, filteredAlerts, alertCounts } = useAlertStore()

  useEffect(() => {
    // Load initial alerts
    mockApi.getAlerts().then(setAlerts)
  }, [setAlerts])

  const displayAlerts = filteredAlerts()
  const counts = alertCounts()

  const handleRefresh = async () => {
    const newAlerts = await mockApi.getAlerts()
    setAlerts(newAlerts)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 p-4">
        <div>
          <h2 className="font-semibold text-white">Risk Alerts</h2>
          <p className="text-xs text-slate-400">{counts.total} total alerts</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleRefresh}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2 border-b border-slate-700 p-4">
        <div className="rounded-lg bg-red-500/10 p-2 text-center">
          <div className="text-lg font-bold text-red-500">{counts.critical}</div>
          <div className="text-xs text-slate-400">Critical</div>
        </div>
        <div className="rounded-lg bg-orange-500/10 p-2 text-center">
          <div className="text-lg font-bold text-orange-500">{counts.high}</div>
          <div className="text-xs text-slate-400">High</div>
        </div>
        <div className="rounded-lg bg-blue-500/10 p-2 text-center">
          <div className="text-lg font-bold text-blue-500">{counts.new}</div>
          <div className="text-xs text-slate-400">New</div>
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {displayAlerts.length === 0 ? (
            <div className="text-center text-sm text-slate-500">
              No alerts to display
            </div>
          ) : (
            displayAlerts.slice(0, 20).map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
