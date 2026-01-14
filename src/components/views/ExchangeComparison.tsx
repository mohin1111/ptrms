import { useEffect, useState, useCallback } from 'react'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { mockApi } from '@/mock'
import { EXCHANGES } from '@/constants'
import { LoadingOverlay } from '../shared/LoadingSpinner'
import { ExchangeCard } from './comparison/ExchangeCard'
import { ComparisonCharts } from './comparison/ComparisonCharts'
import { ComparisonTable } from './comparison/ComparisonTable'
import { exportToExcel, exportToPDF, type ExportColumn } from '@/utils/exportHandlers'
import type { ExchangeCode } from '@/types'

interface ExchangeMetrics {
  exchange: ExchangeCode
  clients: number
  positionValue: number
  margin: number
  utilization: number
  highRisk: number
  mtm: number
}

const EXPORT_COLUMNS: ExportColumn[] = [
  { header: 'Exchange', accessor: (row) => EXCHANGES[row.exchange as ExchangeCode].name },
  { header: 'Active Clients', accessor: 'clients' },
  { header: 'Position Value', accessor: 'positionValue', format: 'currency' },
  { header: 'Margin Utilized', accessor: 'margin', format: 'currency' },
  { header: 'Utilization %', accessor: 'utilization', format: 'percent' },
  { header: 'High Risk Clients', accessor: 'highRisk' },
  { header: 'Mark to Market', accessor: 'mtm', format: 'currency' },
]

export function ExchangeComparison() {
  const [data, setData] = useState<ExchangeMetrics[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const comparisonData = await mockApi.getExchangeComparison()
        setData(comparisonData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleExportExcel = useCallback(async () => {
    setExporting(true)
    try {
      await exportToExcel(
        data as unknown as Record<string, unknown>[],
        EXPORT_COLUMNS,
        'exchange_comparison',
        'Exchange Comparison'
      )
    } finally {
      setExporting(false)
    }
  }, [data])

  const handleExportPDF = useCallback(async () => {
    setExporting(true)
    try {
      await exportToPDF(
        data as unknown as Record<string, unknown>[],
        EXPORT_COLUMNS,
        'exchange_comparison',
        'Exchange Comparison Report'
      )
    } finally {
      setExporting(false)
    }
  }, [data])

  if (loading) {
    return <LoadingOverlay message="Loading comparison data..." />
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">Multi-Exchange Comparison</h2>
          <p className="text-xs text-slate-400 sm:text-sm">Compare metrics across all 4 exchanges</p>
        </div>
        <div className="relative group">
          <button
            disabled={exporting}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-50 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{exporting ? 'Exporting...' : 'Export'}</span>
          </button>
          <div className="absolute right-0 top-full mt-1 hidden w-36 rounded-lg border border-slate-700 bg-slate-800 py-1 shadow-xl group-hover:block z-10">
            <button
              onClick={handleExportExcel}
              disabled={exporting}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
            >
              <FileSpreadsheet className="h-4 w-4 text-green-500" />
              Excel (.xlsx)
            </button>
            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
            >
              <FileText className="h-4 w-4 text-red-500" />
              PDF (.pdf)
            </button>
          </div>
        </div>
      </div>

      {/* Exchange Cards Grid */}
      <div className="grid gap-3 grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {data.map((exchange) => (
          <ExchangeCard key={exchange.exchange} data={exchange} />
        ))}
      </div>

      {/* Comparison Charts */}
      <ComparisonCharts data={data} />

      {/* Detailed Comparison Table */}
      <ComparisonTable data={data} />
    </div>
  )
}
