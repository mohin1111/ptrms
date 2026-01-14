import type { PivotField, ClientWiseReportRow } from '@/types'

// Available fields for the pivot table based on report data
export function getAvailablePivotFields(): PivotField[] {
  return [
    { id: 'exchange', name: 'exchange', label: 'Exchange', type: 'dimension' },
    { id: 'clientId', name: 'clientId', label: 'Client ID', type: 'dimension' },
    { id: 'clientName', name: 'clientName', label: 'Client Name', type: 'dimension' },
    { id: 'symbol', name: 'symbol', label: 'Symbol', type: 'dimension' },
    { id: 'riskLevel', name: 'riskLevel', label: 'Risk Level', type: 'dimension' },
    { id: 'mtm', name: 'mtm', label: 'MTM', type: 'measure' },
    { id: 'marginUtilized', name: 'marginUtilized', label: 'Margin Utilized', type: 'measure' },
    { id: 'collateralAvailable', name: 'collateralAvailable', label: 'Collateral Available', type: 'measure' },
    { id: 'collateralMarginUtilPerc', name: 'collateralMarginUtilPerc', label: 'Utilization %', type: 'measure' },
    { id: 'delta', name: 'delta', label: 'Delta', type: 'measure' },
    { id: 'gamma', name: 'gamma', label: 'Gamma', type: 'measure' },
    { id: 'theta', name: 'theta', label: 'Theta', type: 'measure' },
    { id: 'vega', name: 'vega', label: 'Vega', type: 'measure' },
  ]
}

export interface PivotResult {
  headers: string[]
  rows: (string | number)[][]
}

// Calculate pivot table results from data
export function calculatePivotResult(
  data: ClientWiseReportRow[],
  rows: PivotField[],
  columns: PivotField[],
  values: PivotField[]
): PivotResult {
  if (rows.length === 0 || values.length === 0) {
    return { headers: [], rows: [] }
  }

  // Get unique column values
  const columnValues: string[] = columns.length > 0
    ? [...new Set(data.map(item => String((item as unknown as Record<string, unknown>)[columns[0].name])))]
    : ['Total']

  // Build headers
  const headers = [
    ...rows.map(r => r.label),
    ...columnValues.flatMap(col =>
      values.map(v => columns.length > 0 ? `${col} - ${v.aggregation || 'sum'}(${v.label})` : `${v.aggregation || 'sum'}(${v.label})`)
    ),
  ]

  // Group data by row keys
  const groups = new Map<string, ClientWiseReportRow[]>()
  data.forEach(item => {
    const key = rows.map(r => String((item as unknown as Record<string, unknown>)[r.name])).join('|')
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(item)
  })

  // Calculate aggregations
  const resultRows: (string | number)[][] = []
  groups.forEach((groupData, key) => {
    const rowValues = key.split('|')
    const aggregations: number[] = []

    columnValues.forEach(colVal => {
      const filteredData = columns.length > 0
        ? groupData.filter(item => String((item as unknown as Record<string, unknown>)[columns[0].name]) === colVal)
        : groupData

      values.forEach(valueField => {
        const nums = filteredData.map(item => Number((item as unknown as Record<string, unknown>)[valueField.name]) || 0)
        let result = 0
        switch (valueField.aggregation || 'sum') {
          case 'sum':
            result = nums.reduce((a, b) => a + b, 0)
            break
          case 'avg':
            result = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0
            break
          case 'count':
            result = nums.length
            break
          case 'min':
            result = nums.length ? Math.min(...nums) : 0
            break
          case 'max':
            result = nums.length ? Math.max(...nums) : 0
            break
        }
        aggregations.push(result)
      })
    })

    resultRows.push([...rowValues, ...aggregations])
  })

  return { headers, rows: resultRows }
}
