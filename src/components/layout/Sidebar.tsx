import {
  LayoutDashboard,
  Table2,
  GitCompare,
  Users,
  User,
  TrendingUp,
  FileText,
  ChevronRight,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDashboardStore } from '@/stores'
import { EXCHANGES, EXCHANGE_LIST, REPORT_TYPES, VIEW_MODES } from '@/constants'
import type { ExchangeCode, ReportType, ViewMode } from '@/types'
import { useState } from 'react'

const VIEW_ICONS = {
  executive: LayoutDashboard,
  analytical: Table2,
  comparison: GitCompare,
}

const REPORT_ICONS = {
  summary: LayoutDashboard,
  usernameWise: Users,
  clientWise: User,
  symbolWise: TrendingUp,
  scripWise: FileText,
}

interface SidebarProps {
  collapsed: boolean
  onNavClick?: () => void
}

export function Sidebar({ collapsed, onNavClick }: SidebarProps) {
  const {
    viewMode,
    setViewMode,
    selectedExchange,
    setSelectedExchange,
    selectedReportType,
    setSelectedReportType,
  } = useDashboardStore()

  const [expandedExchange, setExpandedExchange] = useState<ExchangeCode | null>(
    selectedExchange
  )

  const handleExchangeClick = (exchange: ExchangeCode) => {
    if (expandedExchange === exchange) {
      setExpandedExchange(null)
    } else {
      setExpandedExchange(exchange)
      setSelectedExchange(exchange)
    }
  }

  const handleReportClick = (exchange: ExchangeCode, report: ReportType) => {
    setSelectedExchange(exchange)
    setSelectedReportType(report)
  }

  if (collapsed) {
    return (
      <aside className="h-full w-16 flex-shrink-0 border-r border-slate-700 bg-slate-900">
        <nav className="flex flex-col items-center gap-2 p-2">
          {/* View Mode Icons */}
          {VIEW_MODES.map((mode) => {
            const Icon = VIEW_ICONS[mode.id]
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as ViewMode)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  viewMode === mode.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )}
                title={mode.name}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}

          <div className="my-2 h-px w-8 bg-slate-700" />

          {/* Exchange Icons */}
          {EXCHANGE_LIST.map((code) => {
            const exchange = EXCHANGES[code]
            return (
              <button
                key={code}
                onClick={() => setSelectedExchange(code)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold',
                  selectedExchange === code
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                )}
                style={{
                  backgroundColor:
                    selectedExchange === code ? exchange.color : 'transparent',
                }}
                title={exchange.name}
              >
                {code.slice(0, 2)}
              </button>
            )
          })}
        </nav>
      </aside>
    )
  }

  return (
    <aside className="h-full w-64 flex-shrink-0 overflow-y-auto border-r border-slate-700 bg-slate-900">
      <nav className="p-4">
        {/* View Modes */}
        <div className="mb-6">
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            View Mode
          </h3>
          <div className="space-y-1">
            {VIEW_MODES.map((mode) => {
              const Icon = VIEW_ICONS[mode.id]
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setViewMode(mode.id as ViewMode)
                    onNavClick?.()
                  }}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    viewMode === mode.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{mode.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Exchanges & Reports */}
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Exchanges
          </h3>
          <div className="space-y-1">
            {EXCHANGE_LIST.map((code) => {
              const exchange = EXCHANGES[code]
              const isExpanded = expandedExchange === code
              const isSelected = selectedExchange === code

              return (
                <div key={code}>
                  <button
                    onClick={() => handleExchangeClick(code)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      isSelected
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    )}
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: exchange.color }}
                    />
                    <span className="flex-1 text-left">{exchange.name}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>

                  {/* Report Types */}
                  {isExpanded && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-3">
                      {REPORT_TYPES.map((report) => {
                        const ReportIcon = REPORT_ICONS[report.id]
                        const isReportSelected =
                          isSelected && selectedReportType === report.id

                        return (
                          <button
                            key={report.id}
                            onClick={() => {
                              handleReportClick(code, report.id as ReportType)
                              onNavClick?.()
                            }}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                              isReportSelected
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                            )}
                          >
                            <ReportIcon className="h-3.5 w-3.5" />
                            <span>{report.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </nav>
    </aside>
  )
}
