import type { ExchangeCode, RiskLevel } from './common'

export type AlertType =
  | 'MARGIN_BREACH'
  | 'MTM_LOSS'
  | 'POSITION_LIMIT'
  | 'COLLATERAL_SHORTFALL'
  | 'GREEK_THRESHOLD'
  | 'EXPOSURE_LIMIT'
  | 'SQUARE_OFF_PENDING'
  | 'PRICE_ALERT'
  | 'CONCENTRATION_LIMIT'

export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED' | 'ESCALATED'

export interface RiskAlert {
  id: string
  type: AlertType
  severity: RiskLevel
  status: AlertStatus
  exchange: ExchangeCode
  clientId: string
  clientName: string
  symbol?: string
  message: string
  details: Record<string, string | number>
  threshold: number
  currentValue: number
  breachPercent: number
  timestamp: Date
  acknowledgedBy?: string
  acknowledgedAt?: Date
  resolvedAt?: Date
}

export interface AlertSummary {
  total: number
  bySeverity: Record<RiskLevel, number>
  byType: Record<AlertType, number>
  byExchange: Record<ExchangeCode, number>
  newCount: number
  criticalCount: number
}

export interface AlertFilters {
  severities: RiskLevel[]
  types: AlertType[]
  statuses: AlertStatus[]
  exchanges: ExchangeCode[]
  searchQuery: string
}
