// Currency formatting for Indian Rupees
export function formatCurrency(value: number | undefined | null, compact = true): string {
  if (value == null || isNaN(value)) return '₹0.00'

  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (compact) {
    if (absValue >= 10000000) {
      return `${sign}₹${(absValue / 10000000).toFixed(2)}Cr`
    } else if (absValue >= 100000) {
      return `${sign}₹${(absValue / 100000).toFixed(2)}L`
    } else if (absValue >= 1000) {
      return `${sign}₹${(absValue / 1000).toFixed(2)}K`
    }
  }

  return `${sign}₹${absValue.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Full currency format
export function formatCurrencyFull(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Percentage formatting
export function formatPercent(value: number | undefined | null, decimals = 2): string {
  if (value == null || isNaN(value)) return '0.00%'
  return `${value.toFixed(decimals)}%`
}

// Number formatting with Indian locale
export function formatNumber(value: number | undefined | null, decimals = 2): string {
  if (value == null || isNaN(value)) return '0'
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// Compact number formatting
export function formatCompact(value: number): string {
  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (absValue >= 10000000) {
    return `${sign}${(absValue / 10000000).toFixed(2)}Cr`
  } else if (absValue >= 100000) {
    return `${sign}${(absValue / 100000).toFixed(2)}L`
  } else if (absValue >= 1000) {
    return `${sign}${(absValue / 1000).toFixed(2)}K`
  }

  return `${sign}${absValue.toFixed(2)}`
}

// Date formatting
export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  switch (format) {
    case 'short':
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    case 'long':
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    case 'time':
      return d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    default:
      return d.toLocaleDateString('en-IN')
  }
}

// Relative time formatting
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return formatDate(d, 'short')
}

// Format change with sign
export function formatChange(value: number, format: 'currency' | 'percent' | 'number' = 'number'): string {
  const sign = value > 0 ? '+' : ''

  switch (format) {
    case 'currency':
      return `${sign}${formatCurrency(value)}`
    case 'percent':
      return `${sign}${formatPercent(value)}`
    default:
      return `${sign}${formatNumber(value)}`
  }
}

// Greeks formatting
export function formatGreek(value: number, type: 'delta' | 'gamma' | 'theta' | 'vega'): string {
  switch (type) {
    case 'delta':
      return value.toFixed(4)
    case 'gamma':
      return value.toFixed(6)
    case 'theta':
      return formatCurrency(value)
    case 'vega':
      return formatCurrency(value)
    default:
      return value.toFixed(4)
  }
}

// Quantity formatting
export function formatQuantity(value: number): string {
  const sign = value >= 0 ? '' : ''
  return `${sign}${value.toLocaleString('en-IN')}`
}
