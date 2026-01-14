// Exchange Types
export type ExchangeCode = 'NSEEQ' | 'NSECD' | 'NSEFO' | 'MCX'

export interface Exchange {
  code: ExchangeCode
  name: string
  fullName: string
  color: string
}

// Date Range
export interface DateRange {
  from: Date
  to: Date
}

// Risk Levels
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export interface RiskThresholds {
  critical: number
  high: number
  medium: number
}

// View Modes
export type ViewMode = 'executive' | 'analytical' | 'comparison'

// Report Types
export type ReportType =
  | 'summary'
  | 'usernameWise'
  | 'clientWise'
  | 'symbolWise'
  | 'scripWise'

// Sort Direction
export type SortDirection = 'asc' | 'desc' | null

// Pagination
export interface PaginationState {
  pageIndex: number
  pageSize: number
  totalRows: number
}

// Option Type for derivatives
export type OptionType = 'CE' | 'PE' | null

// Instrument Type
export type InstrumentType = 'EQ' | 'FUT' | 'OPT' | 'CDS' | 'COM'

// Client Type
export type ClientType = 'RETAIL' | 'INSTITUTIONAL' | 'PROPRIETARY'

// User Role
export type UserRole = 'DEALER' | 'RMS' | 'ADMIN' | 'SUPPORT'
