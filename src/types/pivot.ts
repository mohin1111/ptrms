// Pivot Table Types

export type AggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max'

export interface PivotField {
  id: string
  name: string
  label: string
  type: 'string' | 'number' | 'date' | 'dimension' | 'measure'
  aggregation?: AggregationType
}

export interface PivotConfig {
  rows: PivotField[]
  columns: PivotField[]
  values: PivotField[]
  filters: PivotField[]
}

export interface PivotCell {
  rowKey: string
  columnKey: string
  value: number | string
  aggregation: AggregationType
  count: number
}

export interface PivotRow {
  key: string
  label: string
  depth: number
  isExpanded: boolean
  children?: PivotRow[]
  cells: Record<string, PivotCell>
  totals: Record<string, number>
}

export interface PivotData {
  rows: PivotRow[]
  columns: string[]
  grandTotals: Record<string, number>
  rowTotals: Record<string, Record<string, number>>
  columnTotals: Record<string, number>
}

// Drag and Drop
export type DropZone = 'rows' | 'columns' | 'values' | 'filters' | 'available'

export interface DragItem {
  field: PivotField
  sourceZone: DropZone
}

export interface DropResult {
  field: PivotField
  targetZone: DropZone
  index: number
}

// Saved Pivot Configuration
export interface SavedPivotConfig {
  id: string
  name: string
  description?: string
  config: PivotConfig
  createdAt: Date
  updatedAt: Date
}
