import type { ExchangeCode, RiskLevel, DateRange } from './common'

// Filter Operators
export type FilterOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'between'
  | 'in'
  | 'notIn'
  | 'isEmpty'
  | 'isNotEmpty'

// Single Filter Condition
export interface FilterCondition {
  id: string
  field: string
  operator: FilterOperator
  value: string | number | string[] | number[] | [number, number]
  dataType: 'string' | 'number' | 'date' | 'boolean'
}

// Filter Group (AND/OR logic)
export interface FilterGroup {
  id: string
  logic: 'AND' | 'OR'
  conditions: (FilterCondition | FilterGroup)[]
}

// Global Filters
export interface GlobalFilters {
  exchanges: ExchangeCode[]
  dateRange: DateRange
  clients: string[]
  riskLevels: RiskLevel[]
  segments: string[]
  searchQuery: string
}

// Quick Filter Presets
export interface QuickFilter {
  id: string
  label: string
  icon: string
  description: string
  filter: Partial<GlobalFilters> & { advanced?: FilterGroup }
}

// Saved View
export interface SavedView {
  id: string
  name: string
  description?: string
  globalFilters: GlobalFilters
  advancedFilter?: FilterGroup
  columnConfig: string[] // visible column IDs
  sortConfig?: { field: string; direction: 'asc' | 'desc' }
  createdAt: Date
  updatedAt: Date
  isDefault?: boolean
}

// Active Filter State
export interface FilterState {
  global: GlobalFilters
  advanced: FilterGroup | null
  activeQuickFilter: string | null
  savedViews: SavedView[]
  currentViewId: string | null
}
