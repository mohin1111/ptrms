import type { UsernameWiseReportRow, ExchangeCode } from '@/types'
import {
  generateId,
  randomFloat,
  randomInt,
  calculateRiskLevel,
  setSeed
} from '../generators/base'
import { USERNAMES } from '../data/masterData'
import { RISK_THRESHOLDS } from '@/constants'

export function generateUsernameWiseReport(
  exchange: ExchangeCode,
  count?: number
): UsernameWiseReportRow[] {
  // Use exchange-specific seed
  const seedMap: Record<ExchangeCode, number> = {
    NSEEQ: 1200,
    NSECD: 2200,
    NSEFO: 3200,
    MCX: 4200,
  }
  setSeed(seedMap[exchange])

  const usersToGenerate = count ? USERNAMES.slice(0, count) : USERNAMES
  const rows: UsernameWiseReportRow[] = []

  for (const user of usersToGenerate) {
    const clientsManaged = randomInt(5, 150)
    const marginLimit = randomFloat(10000000, 500000000, 0)
    const marginUtilized = randomFloat(marginLimit * 0.4, marginLimit * 0.95, 0)
    const marginUtilizedPerc = (marginUtilized / marginLimit) * 100

    const collateralLimit = marginLimit * randomFloat(0.9, 1.2, 2)
    const netCollateralLimit = collateralLimit * 0.95
    const availableCollateral = Math.max(0, netCollateralLimit - marginUtilized)
    const pledgeCollateral = collateralLimit * randomFloat(0.3, 0.5, 2)

    const mtm = randomFloat(-5000000, 10000000, 2)
    const realisedMTM = randomFloat(-2000000, 5000000, 2)
    const unRealisedMTM = mtm - realisedMTM
    const dayRealisedMTM = randomFloat(-500000, 1000000, 2)
    const dayUnRealisedMTM = randomFloat(-300000, 500000, 2)
    const dayMTM = dayRealisedMTM + dayUnRealisedMTM

    const row: UsernameWiseReportRow = {
      id: generateId('USR'),
      exchange,
      timestamp: new Date(),
      riskLevel: calculateRiskLevel(marginUtilizedPerc, RISK_THRESHOLDS),

      userName: user.name,
      userId: user.id,
      role: user.role,
      clientsManaged,

      // Greeks
      delta: randomFloat(-5000, 5000, 2),
      futDelta: randomFloat(-3000, 3000, 2),
      optDelta: randomFloat(-2000, 2000, 2),
      vega: randomFloat(0, 200000, 2),
      gamma: randomFloat(0, 500, 4),
      theta: randomFloat(-50000, 0, 2),

      // P&L
      mtm,
      icmtm: randomFloat(-1000000, 2000000, 2),
      realisedMTM,
      unRealisedMTM,
      dayRealisedMTM,
      dayUnRealisedMTM,
      dayMTM,

      // Collateral & Margins
      collateralLimit,
      concentrationMargin: randomFloat(0, marginUtilized * 0.08, 0),
      netCollateralLimit,
      marginUtilized,
      marginUtilizedPerc,
      availableCollateral,
      totalClientLedger: randomFloat(-10000000, 50000000, 2),
      pledgeCollateral,
      initialMargin: marginUtilized * 0.6,
      exposureMargin: marginUtilized * 0.3,
      spreadBenefit: randomFloat(0, marginUtilized * 0.12, 0),
      varMargin: marginUtilized * 0.5,
      dayPayIn: randomFloat(0, 5000000, 0),
      dayPayOut: randomFloat(0, 3000000, 0),
      adSurMargin: randomFloat(0, marginUtilized * 0.05, 0),
      minMargin: marginUtilized * 0.4,
      exrcAssgndValue: randomFloat(0, 500000, 0),
      tenderMargin: 0,
      additionalMargin: randomFloat(0, marginUtilized * 0.02, 0),
      specialMargin: 0,
      fullMrgnExcldSprdBenft: marginUtilized * 1.1,
      nxtTenderDayRqrdMargin: 0,
      netPremium: randomFloat(-1000000, 2000000, 2),
    }

    rows.push(row)
  }

  return rows.sort((a, b) => {
    const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
  })
}
