import type { ClientWiseReportRow, ExchangeCode, ClientType } from '@/types'
import {
  generateId,
  randomFloat,
  randomElement,
  calculateRiskLevel,
  generatePAN,
  generateCPCode,
  setSeed
} from '../generators/base'
import { CLIENT_NAMES, USERNAMES } from '../data/masterData'
import { RISK_THRESHOLDS } from '@/constants'

const CLIENT_TYPES: ClientType[] = ['RETAIL', 'INSTITUTIONAL', 'PROPRIETARY']

export function generateClientWiseReport(
  exchange: ExchangeCode,
  count = 100
): ClientWiseReportRow[] {
  // Use exchange-specific seed
  const seedMap: Record<ExchangeCode, number> = {
    NSEEQ: 1100,
    NSECD: 2100,
    NSEFO: 3100,
    MCX: 4100,
  }
  setSeed(seedMap[exchange])

  const rows: ClientWiseReportRow[] = []

  for (let i = 0; i < count; i++) {
    const marginLimit = randomFloat(100000, 50000000, 0)
    const marginUtilized = randomFloat(marginLimit * 0.2, marginLimit * 1.3, 0)
    const marginUtilizedPerc = (marginUtilized / marginLimit) * 100

    const collateralLimit = marginLimit * randomFloat(0.8, 1.2, 2)
    const pledgeCollateral = collateralLimit * randomFloat(0.2, 0.6, 2)
    const collateralForExposure = collateralLimit * 0.9
    const collateralAvailable = Math.max(0, collateralLimit - marginUtilized)
    const collateralMarginUtilPerc = (marginUtilized / collateralLimit) * 100

    const mtm = randomFloat(-1000000, 2000000, 2)
    const realisedMTM = randomFloat(-500000, 1000000, 2)
    const unRealisedMTM = mtm - realisedMTM
    const dayRealisedMTM = randomFloat(-100000, 200000, 2)
    const dayUnRealisedMTM = randomFloat(-50000, 100000, 2)
    const dayMTM = dayRealisedMTM + dayUnRealisedMTM

    const brokerage = randomFloat(0, 50000, 2)
    const expenses = randomFloat(0, 10000, 2)
    const orgLedger = randomFloat(-500000, 2000000, 2)
    const netLedger = orgLedger - brokerage - expenses

    const user = randomElement(USERNAMES)

    const row: ClientWiseReportRow = {
      id: generateId('CLT'),
      exchange,
      timestamp: new Date(),
      riskLevel: calculateRiskLevel(marginUtilizedPerc, RISK_THRESHOLDS),

      clientId: `CLT${String(i + 1).padStart(6, '0')}`,
      clientName: randomElement(CLIENT_NAMES),
      clientType: randomElement(CLIENT_TYPES),
      cpCode: generateCPCode(),
      pan: generatePAN(),
      userName: user.name,
      netValue: netLedger + collateralAvailable + mtm,

      // Greeks
      delta: randomFloat(-500, 500, 4),
      futDelta: randomFloat(-300, 300, 4),
      optDelta: randomFloat(-200, 200, 4),
      vega: randomFloat(0, 50000, 2),
      gamma: randomFloat(0, 100, 6),
      theta: randomFloat(-10000, 0, 2),

      // P&L
      mtm,
      icmtm: randomFloat(-200000, 400000, 2),
      realisedMTM,
      unRealisedMTM,
      dayRealisedMTM,
      dayUnRealisedMTM,
      dayMTM,

      // Margins & Collateral
      concentrationMargin: randomFloat(0, marginUtilized * 0.1, 0),
      marginUtilized,
      pledgeCollateral,
      collateralForExposure,
      collateralAvailable,
      collateralMarginUtilPerc,
      initialMargin: marginUtilized * 0.6,
      exposureMargin: marginUtilized * 0.3,
      spreadBenefit: randomFloat(0, marginUtilized * 0.1, 0),
      varMargin: marginUtilized * 0.5,
      dayPayIn: randomFloat(0, 500000, 0),
      dayPayOut: randomFloat(0, 300000, 0),
      adSurMargin: randomFloat(0, marginUtilized * 0.05, 0),
      minMargin: marginUtilized * 0.4,
      exrcAssgndValue: randomFloat(0, 100000, 0),
      netPremium: randomFloat(-100000, 200000, 2),
      brokerage,
      expenses,
      orgLedger,
      netLedger,
      availableExposure: Math.max(0, marginLimit - marginUtilized),
      ledgerMarginUtilizedPerc: marginUtilizedPerc,
    }

    rows.push(row)
  }

  // Sort by risk level (CRITICAL first)
  return rows.sort((a, b) => {
    const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
  })
}
