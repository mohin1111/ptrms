import { create } from 'zustand'
import type { ViewMode, ReportType, ExchangeCode } from '@/types'

interface DrillDownLevel {
  level: string
  value: string
  label: string
}

interface DashboardStore {
  // View State
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void

  // Report Selection
  selectedExchange: ExchangeCode
  selectedReportType: ReportType
  setSelectedExchange: (exchange: ExchangeCode) => void
  setSelectedReportType: (type: ReportType) => void

  // Drill-down State
  drillDownPath: DrillDownLevel[]
  pushDrillDown: (level: string, value: string, label: string) => void
  popDrillDown: () => void
  clearDrillDown: () => void

  // Table State
  sortConfig: { field: string; direction: 'asc' | 'desc' } | null
  setSortConfig: (config: { field: string; direction: 'asc' | 'desc' } | null) => void
  visibleColumns: string[]
  setVisibleColumns: (columns: string[]) => void
  toggleColumn: (columnId: string) => void

  // Pagination
  pageIndex: number
  pageSize: number
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void

  // Alert Panel
  alertPanelOpen: boolean
  toggleAlertPanel: () => void
  setAlertPanelOpen: (open: boolean) => void

  // Sidebar
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void

  // Loading States
  isLoading: boolean
  setIsLoading: (loading: boolean) => void

  // Selected Rows
  selectedRows: string[]
  setSelectedRows: (rows: string[]) => void
  toggleRowSelection: (rowId: string) => void
  clearSelectedRows: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // View Mode
  viewMode: 'executive',
  setViewMode: (mode) => set({ viewMode: mode, drillDownPath: [] }),

  // Report Selection
  selectedExchange: 'NSEEQ',
  selectedReportType: 'summary',
  setSelectedExchange: (exchange) => set({ selectedExchange: exchange, drillDownPath: [], pageIndex: 0 }),
  setSelectedReportType: (type) => set({ selectedReportType: type, drillDownPath: [], pageIndex: 0 }),

  // Drill-down
  drillDownPath: [],
  pushDrillDown: (level, value, label) =>
    set((state) => ({
      drillDownPath: [...state.drillDownPath, { level, value, label }],
      pageIndex: 0,
    })),
  popDrillDown: () =>
    set((state) => ({
      drillDownPath: state.drillDownPath.slice(0, -1),
      pageIndex: 0,
    })),
  clearDrillDown: () => set({ drillDownPath: [], pageIndex: 0 }),

  // Table State
  sortConfig: null,
  setSortConfig: (config) => set({ sortConfig: config }),
  visibleColumns: [],
  setVisibleColumns: (columns) => set({ visibleColumns: columns }),
  toggleColumn: (columnId) =>
    set((state) => {
      const isVisible = state.visibleColumns.includes(columnId)
      return {
        visibleColumns: isVisible
          ? state.visibleColumns.filter((id) => id !== columnId)
          : [...state.visibleColumns, columnId],
      }
    }),

  // Pagination
  pageIndex: 0,
  pageSize: 25,
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size, pageIndex: 0 }),

  // Alert Panel
  alertPanelOpen: true,
  toggleAlertPanel: () => set((state) => ({ alertPanelOpen: !state.alertPanelOpen })),
  setAlertPanelOpen: (open) => set({ alertPanelOpen: open }),

  // Sidebar
  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  // Loading
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Selected Rows
  selectedRows: [],
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  toggleRowSelection: (rowId) =>
    set((state) => {
      const isSelected = state.selectedRows.includes(rowId)
      return {
        selectedRows: isSelected
          ? state.selectedRows.filter((id) => id !== rowId)
          : [...state.selectedRows, rowId],
      }
    }),
  clearSelectedRows: () => set({ selectedRows: [] }),
}))
