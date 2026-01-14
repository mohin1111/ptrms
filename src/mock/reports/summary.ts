import type { SummaryReportRow, ExchangeCode } from '@/types'
import { generateId, randomFloat, calculateRiskLevel, setSeed } from '../generators/base'
import { RISK_THRESHOLDS } from '@/constants'

export function generateSummaryReport(exchange: ExchangeCode): SummaryReportRow[] {
  // Use exchange-specific seed for consistency
  const seedMap: Record<ExchangeCode, number> = {
    NSEEQ: 1001,
    NSECD: 2001,
    NSEFO: 3001,
    MCX: 4001,
  }
  setSeed(seedMap[exchange])

  const marginLimit = randomFloat(500000000, 2000000000, 0)
  const marginUtilized = randomFloat(marginLimit * 0.5, marginLimit * 0.9, 0)
  const marginUtilizedPerc = (marginUtilized / marginLimit) * 100

  const mtm = randomFloat(-50000000, 100000000, 2)
  const realisedMTM = randomFloat(-20000000, 50000000, 2)
  const unRealisedMTM = mtm - realisedMTM
  const dayRealisedMTM = randomFloat(-5000000, 10000000, 2)
  const dayUnRealisedMTM = randomFloat(-3000000, 5000000, 2)
  const dayMTM = dayRealisedMTM + dayUnRealisedMTM

  const row: SummaryReportRow = {
    id: generateId('SUM'),
    exchange,
    timestamp: new Date(),
    riskLevel: calculateRiskLevel(marginUtilizedPerc, RISK_THRESHOLDS),

    // Greeks
    delta: randomFloat(-10000, 10000, 2),
    futDelta: randomFloat(-5000, 5000, 2),
    optDelta: randomFloat(-5000, 5000, 2),
    vega: randomFloat(0, 500000, 2),
    gamma: randomFloat(0, 1000, 4),
    theta: randomFloat(-100000, 0, 2),

    // P&L
    mtm,
    icmtm: randomFloat(-10000000, 20000000, 2),
    realisedMTM,
    unRealisedMTM,
    dayRealisedMTM,
    dayUnRealisedMTM,
    dayMTM,

    // Margins
    marginLimit,
    concentrationMargin: randomFloat(0, marginUtilized * 0.1, 0),
    netCollateralLimit: marginLimit * randomFloat(0.9, 1.1, 2),
    marginUtilized,
    marginUtilizedPerc,
    availableCollateral: marginLimit - marginUtilized,
    initialMargin: marginUtilized * 0.6,
    exposureMargin: marginUtilized * 0.3,
    spreadBenefit: randomFloat(0, marginUtilized * 0.15, 0),
    varMargin: marginUtilized * 0.5,
    dayPayIn: randomFloat(0, 50000000, 0),
    dayPayOut: randomFloat(0, 30000000, 0),
    adSurMargin: randomFloat(0, marginUtilized * 0.05, 0),
    minMargin: marginUtilized * 0.4,
    tenderMargin: 0,
    additionalMargin: randomFloat(0, marginUtilized * 0.02, 0),
    specialMargin: 0,
    fullMrgnExcldSprdBenft: marginUtilized * 1.1,
    nxtTenderDayRqrdMargin: 0,
    netPremium: randomFloat(-10000000, 20000000, 2),
  }

  return [row]
}
