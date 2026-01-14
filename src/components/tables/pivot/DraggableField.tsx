import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { PivotField, DropZone, AggregationType } from '@/types'

interface DraggableFieldProps {
  field: PivotField
  zone: DropZone
  onRemove?: () => void
  onAggregationChange?: (agg: AggregationType) => void
}

const ZONE_COLORS: Record<DropZone, string> = {
  rows: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  columns: 'bg-green-500/20 text-green-400 border-green-500/30',
  values: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  filters: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  available: 'bg-slate-700/50 text-slate-300 border-slate-600',
}

const AGGREGATION_OPTIONS: AggregationType[] = ['sum', 'avg', 'count', 'min', 'max']

export function DraggableField({ field, zone, onRemove, onAggregationChange }: DraggableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id, data: { field, zone } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const [showAggDropdown, setShowAggDropdown] = useState(false)

  const zoneColor = ZONE_COLORS[zone] || ZONE_COLORS.available

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-1 rounded border px-2 py-1 text-xs font-medium transition-colors',
        zoneColor,
        isDragging && 'opacity-50'
      )}
    >
      <button
        className="cursor-grab touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3 w-3" />
      </button>

      <span className="truncate">
        {zone === 'values' && field.aggregation ? `${field.aggregation}(${field.label})` : field.label}
      </span>

      {zone === 'values' && onAggregationChange && (
        <div className="relative">
          <button
            onClick={() => setShowAggDropdown(!showAggDropdown)}
            className="ml-1 rounded p-0.5 hover:bg-white/10"
          >
            <ChevronDown className="h-3 w-3" />
          </button>

          {showAggDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowAggDropdown(false)}
              />
              <div className="absolute left-0 top-full z-20 mt-1 w-20 rounded-md border border-slate-600 bg-slate-800 py-1 shadow-xl">
                {AGGREGATION_OPTIONS.map((agg) => (
                  <button
                    key={agg}
                    onClick={() => {
                      onAggregationChange(agg)
                      setShowAggDropdown(false)
                    }}
                    className={cn(
                      'w-full px-2 py-1 text-left text-xs hover:bg-slate-700',
                      field.aggregation === agg && 'bg-slate-700'
                    )}
                  >
                    {agg.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-auto rounded p-0.5 hover:bg-white/10"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
