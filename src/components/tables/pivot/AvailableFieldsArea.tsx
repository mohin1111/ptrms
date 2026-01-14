import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cn } from '@/lib/cn'
import { DraggableField } from './DraggableField'
import type { PivotField } from '@/types'

interface AvailableFieldsAreaProps {
  fields: PivotField[]
}

export function AvailableFieldsArea({ fields }: AvailableFieldsAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'available',
    data: { zone: 'available' },
  })

  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
        Available Fields (Drag to zones below)
      </label>
      <SortableContext
        items={fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'flex flex-wrap gap-2 rounded-lg border border-slate-600 bg-slate-800 p-3 transition-colors',
            isOver && 'border-blue-500 bg-blue-500/10'
          )}
        >
          {fields.map((field) => (
            <DraggableField key={field.id} field={field} zone="available" />
          ))}
          {fields.length === 0 && (
            <span className="text-xs text-slate-500">All fields assigned</span>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
