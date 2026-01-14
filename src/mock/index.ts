import type { ExchangeCode, ReportType, KPIData } from '@/types'
import { generateSummaryReport } from './reports/summary'
import { generateUsernameWiseReport } from './reports/usernameWise'
import { generateClientWiseReport } from './reports/clientWise'
import { generateSymbolWiseReport } from './reports/symbolWise'
import { generateScripWiseReport } from './reports/scripWise'
import { generateAlerts } from './generators/alerts'
import { setSeed, generateTimeSeries, generateSparklineData, randomFloat, randomInt } from './generators/base'

// Initialize with consistent seed for demo
setSeed(42)

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  async getReport(exchange: ExchangeCode, reportType: ReportType) {
    await delay(300 + Math.random() * 200) // Simulate network

    switch (reportType) {
      case 'summary':
        return generateSummaryReport(exchange)
      case 'usernameWise':
        return generateUsernameWiseReport(exchange, 12)
      case 'clientWise':
        return generateClientWiseReport(exchange, 150)
      case 'symbolWise':
        return generateSymbolWiseReport(exchange, 50)
      case 'scripWise':
        return generateScripWiseReport(exchange, 100)
      default:
        throw new Error(`Unknown report type: ${reportType}`)
    }
  },

  async getAlerts(exchanges?: ExchangeCode[]) {
    await delay(200)
    return generateAlerts(exchanges, 50)
  },

  async getKPIs(_exchange?: ExchangeCode): Promise<KPIData[]> {
    await delay(150)

    // Generate KPIs
    const totalExposure = randomFloat(1000000000, 3000000000, 0)
    const marginUtilization = randomFloat(55, 85, 2)
    const mtm = randomFloat(-50000000, 100000000, 2)
    const availableMargin = totalExposure * (1 - marginUtilization / 100)

    return [
      {
        id: 'total-exposure',
        label: 'Total Exposure',
        value: totalExposure,
        previousValue: totalExposure * randomFloat(0.95, 1.05, 2),
        format: 'currency',
        sparklineData: generateSparklineData(20, totalExposure, 0.02),
      },
      {
        id: 'margin-utilization',
        label: 'Margin Utilization',
        value: marginUtilization,
        previousValue: marginUtilization * randomFloat(0.95, 1.05, 2),
        format: 'percent',
        riskLevel: marginUtilization > 80 ? 'HIGH' : marginUtilization > 60 ? 'MEDIUM' : 'LOW',
        sparklineData: generateSparklineData(20, marginUtilization, 0.05),
      },
      {
        id: 'mtm',
        label: 'Mark to Market',
        value: mtm,
        previousValue: mtm * randomFloat(0.9, 1.1, 2),
        format: 'currency',
        trend: mtm > 0 ? 'up' : 'down',
        sparklineData: generateSparklineData(20, mtm, 0.1),
      },
      {
        id: 'available-margin',
        label: 'Available Margin',
        value: availableMargin,
        previousValue: availableMargin * randomFloat(0.95, 1.05, 2),
        format: 'currency',
        sparklineData: generateSparklineData(20, availableMargin, 0.03),
      },
      {
        id: 'active-clients',
        label: 'Active Clients',
        value: randomInt(800, 1500),
        previousValue: randomInt(750, 1400),
        format: 'number',
      },
      {
        id: 'critical-alerts',
        label: 'Critical Alerts',
        value: randomInt(2, 15),
        previousValue: randomInt(1, 12),
        format: 'number',
        riskLevel: 'CRITICAL',
      },
      {
        id: 'high-risk-clients',
        label: 'High Risk Clients',
        value: randomInt(10, 50),
        previousValue: randomInt(8, 45),
        format: 'number',
        riskLevel: 'HIGH',
      },
      {
        id: 'day-pnl',
        label: 'Day P&L',
        value: randomFloat(-10000000, 20000000, 2),
        format: 'currency',
        trend: randomFloat(-10000000, 20000000, 2) > 0 ? 'up' : 'down',
      },
    ]
  },

  async getTimeSeriesData(
    _exchange: ExchangeCode,
    metric: string,
    period: 'day' | 'week' | 'month'
  ) {
    await delay(200)

    const points = period === 'day' ? 24 : period === 'week' ? 7 : 30
    const baseValue = metric === 'marginUtilization' ? 70 : 1000000000
    const volatility = metric === 'marginUtilization' ? 0.05 : 0.02

    return generateTimeSeries(points, baseValue, volatility)
  },

  async getExchangeComparison() {
    await delay(250)

    const exchanges: ExchangeCode[] = ['NSEEQ', 'NSECD', 'NSEFO', 'MCX']

    return exchanges.map(exchange => ({
      exchange,
      clients: randomInt(200, 2000),
      positionValue: randomFloat(100000000, 1000000000, 0),
      margin: randomFloat(50000000, 300000000, 0),
      utilization: randomFloat(40, 90, 2),
      highRisk: randomInt(5, 50),
      mtm: randomFloat(-20000000, 50000000, 2),
    }))
  },

  async getPivotData(exchange: ExchangeCode, _config: unknown) {
    await delay(300)
    // Return client-wise data for pivot table
    return generateClientWiseReport(exchange, 200)
  },
}

// Re-export generators for direct use
export { generateAlerts } from './generators/alerts'
export { generateSummaryReport } from './reports/summary'
export { generateUsernameWiseReport } from './reports/usernameWise'
export { generateClientWiseReport } from './reports/clientWise'
export { generateSymbolWiseReport } from './reports/symbolWise'
export { generateScripWiseReport } from './reports/scripWise'
export { setSeed, resetSeed } from './generators/base'
