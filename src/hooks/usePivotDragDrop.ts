import { useState, useCallback } from 'react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { PivotField, DropZone, AggregationType } from '@/types'

interface UsePivotDragDropOptions {
  initialFields: PivotField[]
  onConfigChange?: (config: {
    rows: PivotField[]
    columns: PivotField[]
    values: PivotField[]
  }) => void
}

export function usePivotDragDrop({ initialFields, onConfigChange }: UsePivotDragDropOptions) {
  const [available, setAvailable] = useState<PivotField[]>(initialFields)
  const [rows, setRows] = useState<PivotField[]>([])
  const [columns, setColumns] = useState<PivotField[]>([])
  const [values, setValues] = useState<PivotField[]>([])
  const [activeField, setActiveField] = useState<PivotField | null>(null)

  const getFieldsForZone = useCallback((zone: DropZone): PivotField[] => {
    switch (zone) {
      case 'available': return available
      case 'rows': return rows
      case 'columns': return columns
      case 'values': return values
      default: return []
    }
  }, [available, rows, columns, values])

  const setFieldsForZone = useCallback((zone: DropZone, fields: PivotField[]) => {
    switch (zone) {
      case 'available': setAvailable(fields); break
      case 'rows': setRows(fields); break
      case 'columns': setColumns(fields); break
      case 'values': setValues(fields); break
    }
  }, [])

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const field = active.data.current?.field as PivotField
    setActiveField(field)
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveField(null)

    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (!activeData) return

    const sourceZone = activeData.zone as DropZone
    const field = activeData.field as PivotField

    // Determine target zone
    let targetZone: DropZone
    if (overData?.zone) {
      targetZone = overData.zone as DropZone
    } else if (typeof over.id === 'string' && ['rows', 'columns', 'values', 'available'].includes(over.id)) {
      targetZone = over.id as DropZone
    } else {
      return
    }

    // Track new state values for callback
    let newRows = rows
    let newColumns = columns
    let newValues = values

    if (sourceZone === targetZone) {
      // Reorder within same zone
      const items = getFieldsForZone(sourceZone)
      const oldIndex = items.findIndex((f) => f.id === active.id)
      const newIndex = items.findIndex((f) => f.id === over.id)

      if (oldIndex !== newIndex && newIndex >= 0) {
        const newItems = [...items]
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)
        setFieldsForZone(sourceZone, newItems)

        if (sourceZone === 'rows') newRows = newItems
        else if (sourceZone === 'columns') newColumns = newItems
        else if (sourceZone === 'values') newValues = newItems
      }
    } else {
      // Move between zones
      const sourceItems = getFieldsForZone(sourceZone).filter((f) => f.id !== field.id)
      setFieldsForZone(sourceZone, sourceItems)

      const targetItems = [...getFieldsForZone(targetZone)]
      const fieldToAdd = targetZone === 'values' && !field.aggregation
        ? { ...field, aggregation: 'sum' as AggregationType }
        : field

      targetItems.push(fieldToAdd)
      setFieldsForZone(targetZone, targetItems)

      if (sourceZone === 'rows') newRows = sourceItems
      else if (sourceZone === 'columns') newColumns = sourceItems
      else if (sourceZone === 'values') newValues = sourceItems

      if (targetZone === 'rows') newRows = targetItems
      else if (targetZone === 'columns') newColumns = targetItems
      else if (targetZone === 'values') newValues = targetItems
    }

    onConfigChange?.({ rows: newRows, columns: newColumns, values: newValues })
  }, [rows, columns, values, getFieldsForZone, setFieldsForZone, onConfigChange])

  const handleFieldRemove = useCallback((zone: DropZone, fieldId: string) => {
    const items = getFieldsForZone(zone)
    const field = items.find((f) => f.id === fieldId)
    if (!field) return

    const newItems = items.filter((f) => f.id !== fieldId)
    setFieldsForZone(zone, newItems)
    setAvailable((prev) => [...prev, { ...field, aggregation: undefined }])

    const newRows = zone === 'rows' ? newItems : rows
    const newColumns = zone === 'columns' ? newItems : columns
    const newValues = zone === 'values' ? newItems : values
    onConfigChange?.({ rows: newRows, columns: newColumns, values: newValues })
  }, [rows, columns, values, getFieldsForZone, setFieldsForZone, onConfigChange])

  const handleAggregationChange = useCallback((fieldId: string, aggregation: AggregationType) => {
    const newValues = values.map((f) => (f.id === fieldId ? { ...f, aggregation } : f))
    setValues(newValues)
    onConfigChange?.({ rows, columns, values: newValues })
  }, [rows, columns, values, onConfigChange])

  const resetAll = useCallback(() => {
    setAvailable([...initialFields])
    setRows([])
    setColumns([])
    setValues([])
    onConfigChange?.({ rows: [], columns: [], values: [] })
  }, [initialFields, onConfigChange])

  return {
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
  }
}
