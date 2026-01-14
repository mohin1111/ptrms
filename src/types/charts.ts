import type { RiskLevel } from './common'

// Chart Types
export type ChartType =
  | 'line'
  | 'bar'
  | 'donut'
  | 'area'
  | 'heatmap'
  | 'gauge'
  | 'sparkline'

// Chart Data Point
export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

// Time Series Data
export interface TimeSeriesData {
  timestamp: Date
  value: number
  series?: string
}

// Heatmap Cell
export interface HeatmapCell {
  row: string
  column: string
  value: number
  riskLevel?: RiskLevel
}

// Gauge Config
export interface GaugeConfig {
  value: number
  min: number
  max: number
  thresholds: {
    warning: number
    danger: number
  }
  label: string
  unit: string
}

// Chart Configuration
export interface ChartConfig {
  type: ChartType
  title: string
  data: ChartDataPoint[] | TimeSeriesData[] | HeatmapCell[]
  colors?: string[]
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
  height?: number
}

// KPI Card Data
export interface KPIData {
  id: string
  label: string
  value: number
  previousValue?: number
  change?: number
  changePercent?: number
  format: 'currency' | 'number' | 'percent'
  trend?: 'up' | 'down' | 'neutral'
  sparklineData?: number[]
  riskLevel?: RiskLevel
}
