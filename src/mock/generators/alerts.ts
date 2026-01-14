import type { RiskAlert, AlertType, ExchangeCode, RiskLevel } from '@/types'
import { generateId, randomElement, randomInt, randomFloat, randomDate } from './base'
import { CLIENT_NAMES, SYMBOLS, ALERT_MESSAGES } from '../data/masterData'

const ALERT_TYPES: AlertType[] = [
  'MARGIN_BREACH',
  'MTM_LOSS',
  'POSITION_LIMIT',
  'COLLATERAL_SHORTFALL',
  'GREEK_THRESHOLD',
  'EXPOSURE_LIMIT',
  'SQUARE_OFF_PENDING',
  'CONCENTRATION_LIMIT',
]

const EXCHANGES: ExchangeCode[] = ['NSEEQ', 'NSECD', 'NSEFO', 'MCX']

function getSeverityForType(_type: AlertType, breachPercent: number): RiskLevel {
  if (breachPercent > 50) return 'CRITICAL'
  if (breachPercent > 25) return 'HIGH'
  if (breachPercent > 10) return 'MEDIUM'
  return 'LOW'
}

function generateAlertMessage(type: AlertType, details: Record<string, string | number>): string {
  const templates = ALERT_MESSAGES[type] || ['Alert triggered']
  let message = randomElement(templates)

  Object.entries(details).forEach(([key, value]) => {
    message = message.replace(`{${key}}`, String(value))
  })

  return message
}

export function generateAlert(exchange?: ExchangeCode): RiskAlert {
  const type = randomElement(ALERT_TYPES)
  const selectedExchange = exchange || randomElement(EXCHANGES)
  const symbols = SYMBOLS[selectedExchange]
  const symbol = symbols.length > 0 ? randomElement(symbols).symbol : undefined

  const threshold = randomInt(70, 100)
  const currentValue = randomFloat(threshold * 0.8, threshold * 1.5, 2)
  const breachPercent = ((currentValue - threshold) / threshold) * 100

  const details: Record<string, string | number> = {
    threshold,
    value: currentValue,
    symbol: symbol || 'N/A',
  }

  const clientId = `CLT${String(randomInt(1, 500)).padStart(6, '0')}`

  return {
    id: generateId('ALT'),
    type,
    severity: getSeverityForType(type, breachPercent),
    status: 'NEW',
    exchange: selectedExchange,
    clientId,
    clientName: randomElement(CLIENT_NAMES),
    symbol,
    message: generateAlertMessage(type, details),
    details,
    threshold,
    currentValue,
    breachPercent: Number(breachPercent.toFixed(2)),
    timestamp: randomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
  }
}

export function generateAlerts(exchanges?: ExchangeCode[], count = 50): RiskAlert[] {
  const alerts: RiskAlert[] = []

  for (let i = 0; i < count; i++) {
    const exchange = exchanges && exchanges.length > 0
      ? randomElement(exchanges)
      : undefined
    alerts.push(generateAlert(exchange))
  }

  // Sort by timestamp (most recent first) then by severity
  return alerts.sort((a, b) => {
    const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity]
    }
    return b.timestamp.getTime() - a.timestamp.getTime()
  })
}
