import type { ExchangeCode, RiskLevel, ClientType, UserRole, InstrumentType, OptionType } from './common'

// Base Report Row (common fields)
export interface BaseReportRow {
  id: string
  exchange: ExchangeCode
  timestamp: Date
  riskLevel: RiskLevel
}

// ============================================
// SUMMARY REPORT
// ============================================
export interface SummaryReportRow extends BaseReportRow {
  // Greeks
  delta: number
  futDelta: number
  optDelta: number
  vega: number
  gamma: number
  theta: number
  // P&L
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
  // Margins
  marginLimit: number
  concentrationMargin: number
  netCollateralLimit: number
  marginUtilized: number
  marginUtilizedPerc: number
  availableCollateral: number
  initialMargin: number
  exposureMargin: number
  spreadBenefit: number
  varMargin: number
  dayPayIn: number
  dayPayOut: number
  adSurMargin: number
  minMargin: number
  tenderMargin: number
  additionalMargin: number
  specialMargin: number
  fullMrgnExcldSprdBenft: number
  nxtTenderDayRqrdMargin: number
  netPremium: number
}

// ============================================
// USERNAME WISE REPORT
// ============================================
export interface UsernameWiseReportRow extends BaseReportRow {
  userName: string
  userId: string
  role: UserRole
  clientsManaged: number
  // Greeks
  delta: number
  futDelta: number
  optDelta: number
  vega: number
  gamma: number
  theta: number
  // P&L
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
  // Collateral & Margins
  collateralLimit: number
  concentrationMargin: number
  netCollateralLimit: number
  marginUtilized: number
  marginUtilizedPerc: number
  availableCollateral: number
  totalClientLedger: number
  pledgeCollateral: number
  initialMargin: number
  exposureMargin: number
  spreadBenefit: number
  varMargin: number
  dayPayIn: number
  dayPayOut: number
  adSurMargin: number
  minMargin: number
  exrcAssgndValue: number
  tenderMargin: number
  additionalMargin: number
  specialMargin: number
  fullMrgnExcldSprdBenft: number
  nxtTenderDayRqrdMargin: number
  netPremium: number
}

// ============================================
// CLIENT WISE REPORT
// ============================================
export interface ClientWiseReportRow extends BaseReportRow {
  clientId: string
  clientName: string
  clientType: ClientType
  cpCode: string
  pan: string
  userName: string
  netValue: number
  // Greeks
  delta: number
  futDelta: number
  optDelta: number
  vega: number
  gamma: number
  theta: number
  // P&L
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
  // Margins & Collateral
  concentrationMargin: number
  marginUtilized: number
  pledgeCollateral: number
  collateralForExposure: number
  collateralAvailable: number
  collateralMarginUtilPerc: number
  initialMargin: number
  exposureMargin: number
  spreadBenefit: number
  varMargin: number
  dayPayIn: number
  dayPayOut: number
  adSurMargin: number
  minMargin: number
  exrcAssgndValue: number
  netPremium: number
  brokerage: number
  expenses: number
  orgLedger: number
  netLedger: number
  availableExposure: number
  ledgerMarginUtilizedPerc: number
}

// ============================================
// SYMBOL WISE REPORT
// ============================================
export interface SymbolWiseReportRow extends BaseReportRow {
  symbol: string
  symbolName: string
  instrumentType: InstrumentType
  expiry: Date | null
  netQty: number
  netValue: number
  // Greeks
  delta: number
  futDelta: number
  optDelta: number
  vega: number
  gamma: number
  theta: number
  // P&L
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
  // Other
  iv: number
  concentrationMargin: number
  totalMargin: number
  initialMargin: number
  exposureMargin: number
  spreadBenefit: number
  varMargin: number
  dayPayIn: number
  dayPayOut: number
  minMargin: number
  exrcAssgndValue: number
  tenderMargin: number
  additionalMargin: number
  specialMargin: number
  fullMrgnExcldSprdBenft: number
  nxtTenderDayRqrdMargin: number
  brokerage: number
  expenses: number
  clientCount: number
}

// ============================================
// SCRIP WISE REPORT
// ============================================
export interface ScripWiseReportRow extends BaseReportRow {
  scrip: string
  scripName: string
  isin: string
  series: string
  sector: string
  // Position
  netQty: number
  dayBuyQty: number
  daySellQty: number
  bfNetQty: number
  dayNetQty: number
  ltp: number
  netPrice: number
  strikePrice: number
  optionType: OptionType
  netValue: number
  // Greeks
  delta: number
  futDelta: number
  optDelta: number
  vega: number
  gamma: number
  theta: number
  // P&L
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
  // Margins
  exposureMargin: number
  spreadBenefit: number
  varMargin: number
  minMargin: number
  dayPayIn: number
  dayPayOut: number
  potentialLossUp: number
  potentialLossDown: number
  exrcAssgndValue: number
  iv: number
  netPremium: number
  brokerage: number
  expenses: number
  tenderMargin: number
}

// ============================================
// REPORT CONFIGURATIONS
// ============================================
export interface ColumnConfig {
  id: string
  header: string
  accessor: string
  type: 'string' | 'number' | 'currency' | 'percent' | 'date' | 'status' | 'sparkline'
  width?: number
  sortable?: boolean
  filterable?: boolean
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max'
  format?: string
  visible?: boolean
  group?: string
}

export interface ReportConfig {
  type: string
  exchange: ExchangeCode
  columns: ColumnConfig[]
  defaultSort: { field: string; direction: 'asc' | 'desc' }
  drillDownFields: string[]
}

// Union type for all report rows
export type ReportRow =
  | SummaryReportRow
  | UsernameWiseReportRow
  | ClientWiseReportRow
  | SymbolWiseReportRow
  | ScripWiseReportRow
