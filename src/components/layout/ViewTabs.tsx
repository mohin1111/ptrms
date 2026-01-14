import { LayoutDashboard, Table2, GitCompare } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDashboardStore } from '@/stores'
import type { ViewMode } from '@/types'

const TABS: { id: ViewMode; name: string; icon: React.ElementType }[] = [
  { id: 'executive', name: 'Executive Overview', icon: LayoutDashboard },
  { id: 'analytical', name: 'Analytical Workspace', icon: Table2 },
  { id: 'comparison', name: 'Exchange Comparison', icon: GitCompare },
]

export function ViewTabs() {
  const { viewMode, setViewMode } = useDashboardStore()

  return (
    <div className="mb-6 flex items-center gap-1 rounded-lg bg-slate-800/50 p-1">
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = viewMode === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all',
              isActive
                ? 'bg-slate-700 text-white shadow-sm'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.name}</span>
          </button>
        )
      })}
    </div>
  )
}
