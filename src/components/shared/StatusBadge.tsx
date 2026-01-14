import { cn } from '@/lib/cn'
import type { RiskLevel } from '@/types'

interface StatusBadgeProps {
  status: RiskLevel
  size?: 'sm' | 'md' | 'lg'
  showDot?: boolean
  className?: string
}

const STATUS_CONFIG: Record<RiskLevel, { bg: string; text: string; dot: string }> = {
  CRITICAL: {
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    dot: 'bg-red-500',
  },
  HIGH: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    dot: 'bg-orange-500',
  },
  MEDIUM: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-500',
    dot: 'bg-yellow-500',
  },
  LOW: {
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    dot: 'bg-green-500',
  },
}

const SIZE_CONFIG = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

export function StatusBadge({
  status,
  size = 'md',
  showDot = true,
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bg,
        config.text,
        SIZE_CONFIG[size],
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'rounded-full',
            config.dot,
            size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'
          )}
        />
      )}
      {status}
    </span>
  )
}
