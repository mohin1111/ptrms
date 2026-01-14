import type { RiskLevel } from '@/types'

// Seeded random for reproducibility
let seed = 12345

export function seededRandom(): number {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

export function setSeed(newSeed: number): void {
  seed = newSeed
}

export function resetSeed(): void {
  seed = 12345
}

// Random utilities
export function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min
}

export function randomFloat(min: number, max: number, decimals = 2): number {
  return Number((seededRandom() * (max - min) + min).toFixed(decimals))
}

export function randomElement<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

export function randomElements<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => seededRandom() - 0.5)
  return shuffled.slice(0, Math.min(count, arr.length))
}

export function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + seededRandom() * (end.getTime() - start.getTime())
  )
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${randomInt(1000, 9999)}`
}

export function randomBoolean(probability = 0.5): boolean {
  return seededRandom() < probability
}

// Risk level based on value thresholds
export function calculateRiskLevel(
  value: number,
  thresholds: { critical: number; high: number; medium: number }
): RiskLevel {
  if (value >= thresholds.critical) return 'CRITICAL'
  if (value >= thresholds.high) return 'HIGH'
  if (value >= thresholds.medium) return 'MEDIUM'
  return 'LOW'
}

// Generate array of numbers for sparkline
export function generateSparklineData(length: number, baseValue: number, volatility: number): number[] {
  const data: number[] = []
  let current = baseValue

  for (let i = 0; i < length; i++) {
    const change = (seededRandom() - 0.5) * 2 * volatility * baseValue
    current = Math.max(0, current + change)
    data.push(Number(current.toFixed(2)))
  }

  return data
}

// Generate time series data
export function generateTimeSeries(
  points: number,
  baseValue: number,
  volatility: number,
  startDate: Date = new Date()
): { timestamp: Date; value: number }[] {
  const data: { timestamp: Date; value: number }[] = []
  let current = baseValue

  for (let i = 0; i < points; i++) {
    const timestamp = new Date(startDate.getTime() - (points - i - 1) * 3600000)
    const change = (seededRandom() - 0.5) * 2 * volatility * baseValue
    current = current + change
    data.push({ timestamp, value: Number(current.toFixed(2)) })
  }

  return data
}

// Generate PAN number
export function generatePAN(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let pan = ''
  for (let i = 0; i < 5; i++) {
    pan += randomElement([...letters])
  }
  for (let i = 0; i < 4; i++) {
    pan += randomInt(0, 9)
  }
  pan += randomElement([...letters])
  return pan
}

// Generate CP Code
export function generateCPCode(): string {
  return `CP${randomInt(10000, 99999)}`
}
