import type { ScripWiseReportRow, ExchangeCode, OptionType } from '@/types'
import {
  generateId,
  randomFloat,
  randomInt,
  randomElement,
  randomBoolean,
  calculateRiskLevel,
  setSeed
} from '../generators/base'
import { SYMBOLS, LTP_RANGES, STRIKE_RANGES, SECTORS } from '../data/masterData'
import { RISK_THRESHOLDS } from '@/constants'

export function generateScripWiseReport(
  exchange: ExchangeCode,
  count = 100
): ScripWiseReportRow[] {
  // Use exchange-specific seed
  const seedMap: Record<ExchangeCode, number> = {
    NSEEQ: 1400,
    NSECD: 2400,
    NSEFO: 3400,
    MCX: 4400,
  }
  setSeed(seedMap[exchange])

  const symbolsForExchange = SYMBOLS[exchange]
  const rows: ScripWiseReportRow[] = []

  for (let i = 0; i < count; i++) {
    const sym = randomElement(symbolsForExchange)
    const ltpRange = LTP_RANGES[sym.symbol] || { min: 100, max: 5000 }
    const ltp = randomFloat(ltpRange.min, ltpRange.max, 2)

    // Generate option-specific fields for F&O
    let optionType: OptionType = null
    let strikePrice = 0

    if (exchange === 'NSEFO') {
      if (randomBoolean(0.6)) { // 60% options, 40% futures
        optionType = randomBoolean() ? 'CE' : 'PE'
        const strikeRange = STRIKE_RANGES[sym.symbol] || { min: 100, max: 5000, step: 10 }
        const steps = Math.floor((strikeRange.max - strikeRange.min) / strikeRange.step)
        strikePrice = strikeRange.min + (randomInt(0, steps) * strikeRange.step)
      }
    }

    const bfNetQty = randomInt(-500, 500)
    const dayBuyQty = randomInt(0, 200)
    const daySellQty = randomInt(0, 200)
    const dayNetQty = dayBuyQty - daySellQty
    const netQty = bfNetQty + dayNetQty
    const netPrice = randomFloat(ltp * 0.95, ltp * 1.05, 2)
    const netValue = netQty * ltp

    const marginUtilizedPerc = randomFloat(20, 130, 2)

    const mtm = randomFloat(-100000, 200000, 2)
    const realisedMTM = randomFloat(-50000, 100000, 2)
    const unRealisedMTM = mtm - realisedMTM
    const dayRealisedMTM = randomFloat(-10000, 20000, 2)
    const dayUnRealisedMTM = randomFloat(-5000, 10000, 2)
    const dayMTM = dayRealisedMTM + dayUnRealisedMTM

    const series = exchange === 'NSEEQ' ? randomElement(['EQ', 'BE', 'BZ']) : ''

    const row: ScripWiseReportRow = {
      id: generateId('SCR'),
      exchange,
      timestamp: new Date(),
      riskLevel: calculateRiskLevel(marginUtilizedPerc, RISK_THRESHOLDS),

      scrip: `${sym.symbol}${optionType ? `-${strikePrice}${optionType}` : ''}`,
      scripName: sym.name,
      isin: `INE${randomInt(100000, 999999)}`,
      series,
      sector: sym.sector || randomElement(SECTORS),

      // Position
      netQty,
      dayBuyQty,
      daySellQty,
      bfNetQty,
      dayNetQty,
      ltp,
      netPrice,
      strikePrice,
      optionType,
      netValue,

      // Greeks
      delta: optionType ? randomFloat(-1, 1, 4) : (netQty > 0 ? 1 : -1),
      futDelta: optionType ? 0 : (netQty > 0 ? netQty : netQty),
      optDelta: optionType ? randomFloat(-1, 1, 4) * Math.abs(netQty) : 0,
      vega: optionType ? randomFloat(0, 5000, 2) : 0,
      gamma: optionType ? randomFloat(0, 10, 6) : 0,
      theta: optionType ? randomFloat(-1000, 0, 2) : 0,

      // P&L
      mtm,
      icmtm: randomFloat(-20000, 40000, 2),
      realisedMTM,
      unRealisedMTM,
      dayRealisedMTM,
      dayUnRealisedMTM,
      dayMTM,

      // Margins
      exposureMargin: Math.abs(netValue) * randomFloat(0.05, 0.15, 2),
      spreadBenefit: randomFloat(0, 10000, 0),
      varMargin: Math.abs(netValue) * randomFloat(0.08, 0.2, 2),
      minMargin: Math.abs(netValue) * randomFloat(0.03, 0.08, 2),
      dayPayIn: randomFloat(0, 50000, 0),
      dayPayOut: randomFloat(0, 30000, 0),
      potentialLossUp: randomFloat(0, Math.abs(netValue) * 0.1, 0),
      potentialLossDown: randomFloat(0, Math.abs(netValue) * 0.1, 0),
      exrcAssgndValue: 0,
      iv: optionType ? randomFloat(10, 60, 2) : 0,
      netPremium: optionType ? randomFloat(-50000, 100000, 2) : 0,
      brokerage: randomFloat(0, 5000, 2),
      expenses: randomFloat(0, 1000, 2),
      tenderMargin: 0,
    }

    rows.push(row)
  }

  return rows.sort((a, b) => Math.abs(b.netValue) - Math.abs(a.netValue))
}
