import type { RiskLevel } from './common'

// Greeks
export interface Greeks {
  delta: number
  futDelta: number
  optDelta: number
  gamma: number
  theta: number
  vega: number
}

// P&L Fields
export interface PnL {
  mtm: number
  icmtm: number
  realisedMTM: number
  unRealisedMTM: number
  dayRealisedMTM: number
  dayUnRealisedMTM: number
  dayMTM: number
}

// Margin Fields
export interface MarginData {
  marginLimit: number
  marginUtilized: number
  marginUtilizedPerc: number
  initialMargin: number
  exposureMargin: number
  varMargin: number
  additionalMargin: number
  adSurMargin: number
  minMargin: number
  specialMargin: number
  tenderMargin: number
  concentrationMargin: number
  spanMargin: number
  spreadBenefit: number
  fullMrgnExcldSprdBenft: number
  nxtTenderDayRqrdMargin: number
}

// Collateral Fields
export interface CollateralData {
  collateralLimit: number
  netCollateralLimit: number
  availableCollateral: number
  pledgeCollateral: number
  collateralForExposure: number
  collateralAvailable: number
  collateralMarginUtilPerc: number
}

// Position Fields
export interface PositionData {
  netQty: number
  buyQty: number
  sellQty: number
  dayBuyQty: number
  daySellQty: number
  bfNetQty: number
  dayNetQty: number
  netValue: number
  buyValue: number
  sellValue: number
  ltp: number
  netPrice: number
  strikePrice: number
  optionType: 'CE' | 'PE' | null
  expiryDate: Date | null
  iv: number
  potentialLossUp: number
  potentialLossDown: number
}

// Ledger Fields
export interface LedgerData {
  totalClientLedger: number
  orgLedger: number
  netLedger: number
  ledgerMarginUtilizedPerc: number
  dayPayIn: number
  dayPayOut: number
  netPremium: number
  brokerage: number
  expenses: number
}

// Combined Risk Metrics
export interface RiskMetrics extends Greeks, PnL {
  margin: MarginData
  collateral: CollateralData
  riskLevel: RiskLevel
  riskScore: number
  alertCount: number
}

// Exercise/Assignment
export interface ExerciseData {
  exrcAssgndValue: number
}
