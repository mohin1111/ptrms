import { useEffect, useState, useCallback } from 'react'
import { Download, FileSpreadsheet, FileText } from 'lucide-react'
import { KPICard } from '../shared/KPICard'
import { LoadingOverlay } from '../shared/LoadingSpinner'
import { ExecutiveCharts } from './executive/ExecutiveCharts'
import { ExchangeSummaryTable } from './executive/ExchangeSummaryTable'
import { mockApi } from '@/mock'
import { EXCHANGES } from '@/constants'
import { exportToExcelMultiSheet, exportToPDF, type ExportColumn } from '@/utils/exportHandlers'
import type { KPIData, ExchangeCode } from '@/types'

interface ExchangeData {
  exchange: ExchangeCode
  clients: number
  positionValue: number
  margin: number
  utilization: number
  highRisk: number
  mtm: number
}

const KPI_EXPORT_COLUMNS: ExportColumn[] = [
  { header: 'Metric', accessor: 'label' },
  { header: 'Value', accessor: 'value' },
  { header: 'Change', accessor: (row) => `${(row.change as number ?? 0) >= 0 ? '+' : ''}${row.change ?? 0}%` },
  { header: 'Trend', accessor: 'trend' },
]

const EXCHANGE_EXPORT_COLUMNS: ExportColumn[] = [
  { header: 'Exchange', accessor: (row) => EXCHANGES[row.exchange as ExchangeCode].name },
  { header: 'Active Clients', accessor: 'clients' },
  { header: 'Position Value', accessor: 'positionValue', format: 'currency' },
  { header: 'Margin Utilized', accessor: 'margin', format: 'currency' },
  { header: 'Utilization %', accessor: 'utilization', format: 'percent' },
  { header: 'High Risk Clients', accessor: 'highRisk' },
  { header: 'Mark to Market', accessor: 'mtm', format: 'currency' },
]

export function ExecutiveOverview() {
  const [kpis, setKpis] = useState<KPIData[]>([])
  const [exchangeData, setExchangeData] = useState<ExchangeData[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [kpiData, comparisonData] = await Promise.all([
          mockApi.getKPIs(),
          mockApi.getExchangeComparison(),
        ])
        setKpis(kpiData)
        setExchangeData(comparisonData)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleExportExcel = useCallback(async () => {
    setExporting(true)
    try {
      await exportToExcelMultiSheet(
        [
          { name: 'KPIs', data: kpis as unknown as Record<string, unknown>[], columns: KPI_EXPORT_COLUMNS },
          { name: 'Exchange Summary', data: exchangeData as unknown as Record<string, unknown>[], columns: EXCHANGE_EXPORT_COLUMNS },
        ],
        'executive_overview'
      )
    } finally {
      setExporting(false)
    }
  }, [kpis, exchangeData])

  const handleExportPDF = useCallback(async () => {
    setExporting(true)
    try {
      await exportToPDF(
        exchangeData as unknown as Record<string, unknown>[],
        EXCHANGE_EXPORT_COLUMNS,
        'executive_overview',
        'Executive Overview Report'
      )
    } finally {
      setExporting(false)
    }
  }, [exchangeData])

  if (loading) {
    return <LoadingOverlay message="Loading dashboard..." />
  }

  const pieData = exchangeData.map((d) => ({
    name: d.exchange,
    value: d.positionValue,
    color: EXCHANGES[d.exchange].color,
  }))

  const barData = exchangeData.map((d) => ({
    name: d.exchange,
    utilization: d.utilization,
    color: EXCHANGES[d.exchange].color,
  }))

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">Executive Overview</h2>
          <p className="text-xs text-slate-400 sm:text-sm">Real-time risk management dashboard</p>
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

      {/* KPI Grid */}
      <div className="grid gap-3 grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4">
        {kpis.slice(0, 8).map((kpi) => (
          <KPICard key={kpi.id} data={kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <ExecutiveCharts
        pieData={pieData}
        barData={barData}
        exchangeData={exchangeData}
      />

      {/* Exchange Summary Table */}
      <ExchangeSummaryTable data={exchangeData} />
    </div>
  )
}
