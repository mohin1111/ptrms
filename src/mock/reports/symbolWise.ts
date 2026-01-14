import type { SymbolWiseReportRow, ExchangeCode, InstrumentType } from '@/types'
import {
  generateId,
  randomFloat,
  randomInt,
  randomDate,
  calculateRiskLevel,
  setSeed
} from '../generators/base'
import { SYMBOLS, LTP_RANGES } from '../data/masterData'
import { RISK_THRESHOLDS } from '@/constants'

function getInstrumentType(exchange: ExchangeCode): InstrumentType {
  switch (exchange) {
    case 'NSEEQ': return 'EQ'
    case 'NSEFO': return 'FUT'
    case 'NSECD': return 'CDS'
    case 'MCX': return 'COM'
    default: return 'EQ'
  }
}

export function generateSymbolWiseReport(
  exchange: ExchangeCode,
  count?: number
): SymbolWiseReportRow[] {
  // Use exchange-specific seed
  const seedMap: Record<ExchangeCode, number> = {
    NSEEQ: 1300,
    NSECD: 2300,
    NSEFO: 3300,
    MCX: 4300,
  }
  setSeed(seedMap[exchange])

  const symbolsForExchange = SYMBOLS[exchange]
  const symbolsToGenerate = count
    ? symbolsForExchange.slice(0, Math.min(count, symbolsForExchange.length))
    : symbolsForExchange

  const rows: SymbolWiseReportRow[] = []
  const instrumentType = getInstrumentType(exchange)

  for (const sym of symbolsToGenerate) {
    const ltpRange = LTP_RANGES[sym.symbol] || { min: 100, max: 5000 }
    const ltp = randomFloat(ltpRange.min, ltpRange.max, 2)

    const netQty = randomInt(-10000, 10000)
    const netValue = netQty * ltp
    const clientCount = randomInt(5, 100)

    const totalMargin = Math.abs(netValue) * randomFloat(0.1, 0.3, 2)
    const marginUtilizedPerc = randomFloat(30, 120, 2)

    const mtm = randomFloat(-500000, 1000000, 2)
    const realisedMTM = randomFloat(-200000, 500000, 2)
    const unRealisedMTM = mtm - realisedMTM
    const dayRealisedMTM = randomFloat(-50000, 100000, 2)
    const dayUnRealisedMTM = randomFloat(-30000, 50000, 2)
    const dayMTM = dayRealisedMTM + dayUnRealisedMTM

    // Generate expiry for derivatives
    const expiry = exchange !== 'NSEEQ'
      ? randomDate(new Date(), new Date(Date.now() + 90 * 24 * 60 * 60 * 1000))
      : null

    const row: SymbolWiseReportRow = {
      id: generateId('SYM'),
      exchange,
      timestamp: new Date(),
      riskLevel: calculateRiskLevel(marginUtilizedPerc, RISK_THRESHOLDS),

      symbol: sym.symbol,
      symbolName: sym.name,
      instrumentType,
      expiry,
      netQty,
      netValue,

      // Greeks
      delta: randomFloat(-1000, 1000, 4),
      futDelta: randomFloat(-600, 600, 4),
      optDelta: randomFloat(-400, 400, 4),
      vega: randomFloat(0, 100000, 2),
      gamma: randomFloat(0, 200, 6),
      theta: randomFloat(-20000, 0, 2),

      // P&L
      mtm,
      icmtm: randomFloat(-100000, 200000, 2),
      realisedMTM,
      unRealisedMTM,
      dayRealisedMTM,
      dayUnRealisedMTM,
      dayMTM,

      // Other
      iv: randomFloat(10, 50, 2),
      concentrationMargin: randomFloat(0, totalMargin * 0.1, 0),
      totalMargin,
      initialMargin: totalMargin * 0.6,
      exposureMargin: totalMargin * 0.3,
      spreadBenefit: randomFloat(0, totalMargin * 0.1, 0),
      varMargin: totalMargin * 0.5,
      dayPayIn: randomFloat(0, 100000, 0),
      dayPayOut: randomFloat(0, 80000, 0),
      minMargin: totalMargin * 0.4,
      exrcAssgndValue: 0,
      tenderMargin: 0,
      additionalMargin: 0,
      specialMargin: 0,
      fullMrgnExcldSprdBenft: totalMargin * 1.1,
      nxtTenderDayRqrdMargin: 0,
      brokerage: randomFloat(0, 20000, 2),
      expenses: randomFloat(0, 5000, 2),
      clientCount,
    }

    rows.push(row)
  }

  return rows.sort((a, b) => Math.abs(b.netValue) - Math.abs(a.netValue))
}
