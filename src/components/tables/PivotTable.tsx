import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { usePivotDragDrop } from '@/hooks/usePivotDragDrop'
import { AvailableFieldsArea } from './pivot/AvailableFieldsArea'
import { DropZoneArea } from './pivot/DropZoneArea'
import type { PivotField } from '@/types'

interface PivotTableProps {
  availableFields: PivotField[]
  onConfigChange?: (config: {
    rows: PivotField[]
    columns: PivotField[]
    values: PivotField[]
  }) => void
}

export function PivotTable({ availableFields, onConfigChange }: PivotTableProps) {
  const {
    available,
    rows,
    columns,
    values,
    activeField,
    handleDragStart,
    handleDragEnd,
    handleFieldRemove,
    handleAggregationChange,
    resetAll,
  } = usePivotDragDrop({ initialFields: availableFields, onConfigChange })

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-3 rounded-lg border border-slate-700 bg-slate-800/50 p-3 sm:space-y-4 sm:rounded-xl sm:p-4">
        {/* Available Fields */}
        <AvailableFieldsArea fields={available} />

        {/* Drop Zones */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DropZoneArea
            id="rows"
            title="Rows"
            fields={rows}
            onFieldRemove={(id) => handleFieldRemove('rows', id)}
          />
          <DropZoneArea
            id="columns"
            title="Columns"
            fields={columns}
            onFieldRemove={(id) => handleFieldRemove('columns', id)}
          />
          <DropZoneArea
            id="values"
            title="Values"
            fields={values}
            onFieldRemove={(id) => handleFieldRemove('values', id)}
            onAggregationChange={handleAggregationChange}
          />
        </div>

        {/* Clear Button */}
        <div className="flex justify-end">
          <button
            onClick={resetAll}
            className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeField && (
          <div className="rounded border border-blue-500 bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400 shadow-lg">
            {activeField.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
