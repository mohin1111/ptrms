import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/cn'
import { DraggableField } from './DraggableField'
import type { PivotField, DropZone, AggregationType } from '@/types'

interface DropZoneAreaProps {
  id: DropZone
  title: string
  fields: PivotField[]
  onFieldRemove: (fieldId: string) => void
  onAggregationChange?: (fieldId: string, agg: AggregationType) => void
}

export function DropZoneArea({
  id,
  title,
  fields,
  onFieldRemove,
  onAggregationChange,
}: DropZoneAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: { zone: id },
  })

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
        {title}
      </label>
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'flex min-h-[80px] flex-wrap gap-2 rounded-lg border-2 border-dashed p-2 transition-colors',
            fields.length === 0
              ? 'border-slate-600 bg-slate-800/30'
              : 'border-slate-500 bg-slate-800/50',
            isOver && 'border-blue-500 bg-blue-500/10'
          )}
        >
          {fields.length === 0 ? (
            <span className="flex h-full w-full items-center justify-center text-xs text-slate-500">
              Drop fields here
            </span>
          ) : (
            fields.map((field) => (
              <DraggableField
                key={field.id}
                field={field}
                zone={id}
                onRemove={() => onFieldRemove(field.id)}
                onAggregationChange={
                  id === 'values'
                    ? (agg) => onAggregationChange?.(field.id, agg)
                    : undefined
                }
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}
