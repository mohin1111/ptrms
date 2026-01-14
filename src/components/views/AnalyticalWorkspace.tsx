import { useEffect, useState, useMemo, useCallback } from 'react'
import type { SortingState } from '@tanstack/react-table'
import { Download, Columns, Table2, LayoutGrid, FileSpreadsheet, FileText } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useDashboardStore } from '@/stores'
import { mockApi } from '@/mock'
import { LoadingOverlay } from '../shared/LoadingSpinner'
import { PivotTable } from '../tables/PivotTable'
import { DataTableView } from './analytical/DataTableView'
import { PivotResultsView } from './analytical/PivotResultsView'
import { getAvailablePivotFields, calculatePivotResult } from '@/utils/pivotUtils'
import { exportToExcel, exportToPDF, type ExportColumn } from '@/utils/exportHandlers'
import { EXCHANGES } from '@/constants'
import type { ClientWiseReportRow, PivotField } from '@/types'

type ViewTab = 'table' | 'pivot'

const EXPORT_COLUMNS: ExportColumn[] = [
  { header: 'Client ID', accessor: 'clientId' },
  { header: 'Client Name', accessor: 'clientName' },
  { header: 'Risk Level', accessor: 'riskLevel' },
  { header: 'Margin Utilized', accessor: 'marginUtilized', format: 'currency' },
  { header: 'Utilization %', accessor: 'collateralMarginUtilPerc', format: 'percent' },
  { header: 'MTM', accessor: 'mtm', format: 'currency' },
  { header: 'Delta', accessor: (row) => (row.delta as number)?.toFixed(4) ?? '-' },
  { header: 'Collateral Available', accessor: 'collateralAvailable', format: 'currency' },
]

export function AnalyticalWorkspace() {
  const { selectedExchange, selectedReportType, pageSize } = useDashboardStore()
  const [data, setData] = useState<ClientWiseReportRow[]>([])
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewTab, setViewTab] = useState<ViewTab>('table')
  const [pivotConfig, setPivotConfig] = useState<{
    rows: PivotField[]
    columns: PivotField[]
    values: PivotField[]
  }>({ rows: [], columns: [], values: [] })
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const reportData = await mockApi.getReport(selectedExchange, selectedReportType)
        setData(reportData as ClientWiseReportRow[])
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [selectedExchange, selectedReportType])

  const pivotResult = useMemo(() => {
    if (viewTab !== 'pivot') return { headers: [], rows: [] }
    return calculatePivotResult(data, pivotConfig.rows, pivotConfig.columns, pivotConfig.values)
  }, [data, pivotConfig, viewTab])

  const handleExportExcel = useCallback(async () => {
    setExporting(true)
    try {
      await exportToExcel(
        data as unknown as Record<string, unknown>[],
        EXPORT_COLUMNS,
        `${selectedExchange}_${selectedReportType}`,
        'Report'
      )
    } finally {
      setExporting(false)
    }
  }, [data, selectedExchange, selectedReportType])

  const handleExportPDF = useCallback(async () => {
    setExporting(true)
    try {
      await exportToPDF(
        data.slice(0, 100) as unknown as Record<string, unknown>[],
        EXPORT_COLUMNS,
        `${selectedExchange}_${selectedReportType}`,
        `${EXCHANGES[selectedExchange].name} - ${selectedReportType}`
      )
    } finally {
      setExporting(false)
    }
  }, [data, selectedExchange, selectedReportType])

  const handlePivotConfigChange = useCallback((config: typeof pivotConfig) => {
    setPivotConfig(config)
  }, [])

  if (loading) {
    return <LoadingOverlay message="Loading report data..." />
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">
            {EXCHANGES[selectedExchange].name} - {selectedReportType.replace(/([A-Z])/g, ' $1').trim()}
          </h2>
          <p className="text-xs text-slate-400 sm:text-sm">{data.length} records</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-0.5">
            <button
              onClick={() => setViewTab('table')}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1.5 text-xs transition-colors sm:gap-1.5 sm:px-3 sm:text-sm',
                viewTab === 'table' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              <Table2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Table</span>
            </button>
            <button
              onClick={() => setViewTab('pivot')}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1.5 text-xs transition-colors sm:gap-1.5 sm:px-3 sm:text-sm',
                viewTab === 'pivot' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Pivot</span>
            </button>
          </div>

          {/* Search (table view only) */}
          {viewTab === 'table' && (
            <input
              type="text"
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-24 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none sm:w-auto sm:px-3 sm:py-2 sm:text-sm"
            />
          )}

          {/* Export Dropdown */}
          <div className="relative group">
            <button
              disabled={exporting}
              className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-700 disabled:opacity-50 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
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

          {/* Column Toggle (table view only) */}
          {viewTab === 'table' && (
            <button className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 sm:flex">
              <Columns className="h-4 w-4" />
              Columns
            </button>
          )}
        </div>
      </div>

      {/* Pivot Mode */}
      {viewTab === 'pivot' && (
        <div className="space-y-4">
          <PivotTable
            availableFields={getAvailablePivotFields()}
            onConfigChange={handlePivotConfigChange}
          />
          <PivotResultsView
            pivotResult={pivotResult}
            rowFieldCount={pivotConfig.rows.length}
          />
        </div>
      )}

      {/* Table View */}
      {viewTab === 'table' && (
        <DataTableView
          data={data}
          sorting={sorting}
          onSortingChange={setSorting}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          pageSize={pageSize}
        />
      )}
    </div>
  )
}
