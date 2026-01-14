import { FileX, Search, Filter, Database } from 'lucide-react'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  icon?: 'file' | 'search' | 'filter' | 'database'
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

const ICONS = {
  file: FileX,
  search: Search,
  filter: Filter,
  database: Database,
}

export function EmptyState({
  icon = 'file',
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const Icon = ICONS[icon]

  return (
    <div
      className={cn(
        'flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-slate-800 p-4">
        <Icon className="h-8 w-8 text-slate-500" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-slate-200">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
