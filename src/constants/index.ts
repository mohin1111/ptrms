import type { Exchange, ExchangeCode, RiskLevel, QuickFilter } from '@/types'

// Exchange Definitions
export const EXCHANGES: Record<ExchangeCode, Exchange> = {
  NSEEQ: {
    code: 'NSEEQ',
    name: 'NSE Equity',
    fullName: 'National Stock Exchange - Equity',
    color: '#3b82f6',
  },
  NSECD: {
    code: 'NSECD',
    name: 'NSE CD',
    fullName: 'National Stock Exchange - Currency Derivatives',
    color: '#10b981',
  },
  NSEFO: {
    code: 'NSEFO',
    name: 'NSE F&O',
    fullName: 'National Stock Exchange - Futures & Options',
    color: '#f59e0b',
  },
  MCX: {
    code: 'MCX',
    name: 'MCX',
    fullName: 'Multi Commodity Exchange',
    color: '#ef4444',
  },
}

export const EXCHANGE_LIST: ExchangeCode[] = ['NSEEQ', 'NSECD', 'NSEFO', 'MCX']

// Risk Level Colors
export const RISK_COLORS: Record<RiskLevel, string> = {
  CRITICAL: '#dc2626',
  HIGH: '#f97316',
  MEDIUM: '#eab308',
  LOW: '#22c55e',
}

export const RISK_BG_COLORS: Record<RiskLevel, string> = {
  CRITICAL: 'bg-red-600',
  HIGH: 'bg-orange-500',
  MEDIUM: 'bg-yellow-500',
  LOW: 'bg-green-500',
}

export const RISK_TEXT_COLORS: Record<RiskLevel, string> = {
  CRITICAL: 'text-red-500',
  HIGH: 'text-orange-500',
  MEDIUM: 'text-yellow-500',
  LOW: 'text-green-500',
}

// Risk Thresholds (for margin utilization %)
export const RISK_THRESHOLDS = {
  critical: 100,
  high: 80,
  medium: 60,
}

// Quick Filters
export const QUICK_FILTERS: QuickFilter[] = [
  {
    id: 'critical-alerts',
    label: 'Critical Alerts',
    icon: 'AlertTriangle',
    description: 'Show only critical risk clients',
    filter: {
      riskLevels: ['CRITICAL'],
    },
  },
  {
    id: 'high-risk',
    label: 'High Risk',
    icon: 'TrendingUp',
    description: 'Show high and critical risk clients',
    filter: {
      riskLevels: ['CRITICAL', 'HIGH'],
    },
  },
  {
    id: 'margin-breach',
    label: 'Margin Breach',
    icon: 'AlertCircle',
    description: 'Clients with margin utilization > 100%',
    filter: {
      advanced: {
        id: 'margin-breach',
        logic: 'AND',
        conditions: [
          {
            id: 'margin-util',
            field: 'marginUtilizedPerc',
            operator: 'greaterThan',
            value: 100,
            dataType: 'number',
          },
        ],
      },
    },
  },
  {
    id: 'large-exposure',
    label: 'Large Exposure',
    icon: 'DollarSign',
    description: 'Clients with exposure > ₹1 Crore',
    filter: {
      advanced: {
        id: 'large-exposure',
        logic: 'AND',
        conditions: [
          {
            id: 'exposure',
            field: 'marginUtilized',
            operator: 'greaterThan',
            value: 10000000,
            dataType: 'number',
          },
        ],
      },
    },
  },
  {
    id: 'negative-mtm',
    label: 'Negative MTM',
    icon: 'TrendingDown',
    description: 'Clients with negative MTM',
    filter: {
      advanced: {
        id: 'negative-mtm',
        logic: 'AND',
        conditions: [
          {
            id: 'mtm',
            field: 'mtm',
            operator: 'lessThan',
            value: 0,
            dataType: 'number',
          },
        ],
      },
    },
  },
]

// Report Types
export const REPORT_TYPES = [
  { id: 'summary', name: 'Summary', icon: 'LayoutDashboard' },
  { id: 'usernameWise', name: 'Username Wise', icon: 'Users' },
  { id: 'clientWise', name: 'Client Wise', icon: 'User' },
  { id: 'symbolWise', name: 'Symbol Wise', icon: 'TrendingUp' },
  { id: 'scripWise', name: 'Scrip Wise', icon: 'FileText' },
] as const

// View Modes
export const VIEW_MODES = [
  { id: 'executive', name: 'Executive Overview', icon: 'LayoutDashboard' },
  { id: 'analytical', name: 'Analytical Workspace', icon: 'Table2' },
  { id: 'comparison', name: 'Exchange Comparison', icon: 'GitCompare' },
] as const

// Pagination Options
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 250]

// Chart Colors
export const CHART_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
]

// Currency Formatter
export const formatCurrency = (value: number): string => {
  const absValue = Math.abs(value)
  if (absValue >= 10000000) {
    return `${(value / 10000000).toFixed(2)}Cr`
  } else if (absValue >= 100000) {
    return `${(value / 100000).toFixed(2)}L`
  } else if (absValue >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  }
  return value.toFixed(2)
}

// Percent Formatter
export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`
}

// Number Formatter
export const formatNumber = (value: number, decimals = 2): string => {
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
