import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FilterState, GlobalFilters, FilterGroup, SavedView, ExchangeCode, RiskLevel } from '@/types'

interface FilterStore extends FilterState {
  // Actions
  setGlobalFilters: (filters: Partial<GlobalFilters>) => void
  setExchanges: (exchanges: ExchangeCode[]) => void
  setRiskLevels: (levels: RiskLevel[]) => void
  setSearchQuery: (query: string) => void
  setAdvancedFilter: (filter: FilterGroup | null) => void
  setQuickFilter: (filterId: string | null) => void
  saveView: (view: Omit<SavedView, 'id' | 'createdAt' | 'updatedAt'>) => void
  loadView: (viewId: string) => void
  deleteView: (viewId: string) => void
  resetFilters: () => void
}

const getDefaultDateRange = () => {
  const today = new Date()
  const startOfDay = new Date(today.setHours(0, 0, 0, 0))
  const endOfDay = new Date(today.setHours(23, 59, 59, 999))
  return { from: startOfDay, to: endOfDay }
}

const initialGlobalFilters: GlobalFilters = {
  exchanges: ['NSEEQ', 'NSECD', 'NSEFO', 'MCX'],
  dateRange: getDefaultDateRange(),
  clients: [],
  riskLevels: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
  segments: [],
  searchQuery: '',
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      global: initialGlobalFilters,
      advanced: null,
      activeQuickFilter: null,
      savedViews: [],
      currentViewId: null,

      setGlobalFilters: (filters) =>
        set((state) => ({
          global: { ...state.global, ...filters },
          activeQuickFilter: null,
        })),

      setExchanges: (exchanges) =>
        set((state) => ({
          global: { ...state.global, exchanges },
          activeQuickFilter: null,
        })),

      setRiskLevels: (riskLevels) =>
        set((state) => ({
          global: { ...state.global, riskLevels },
          activeQuickFilter: null,
        })),

      setSearchQuery: (searchQuery) =>
        set((state) => ({
          global: { ...state.global, searchQuery },
        })),

      setAdvancedFilter: (filter) => set({ advanced: filter }),

      setQuickFilter: (filterId) => set({ activeQuickFilter: filterId }),

      saveView: (view) => {
        const id = crypto.randomUUID()
        const now = new Date()
        set((state) => ({
          savedViews: [
            ...state.savedViews,
            { ...view, id, createdAt: now, updatedAt: now },
          ],
        }))
      },

      loadView: (viewId) => {
        const view = get().savedViews.find((v) => v.id === viewId)
        if (view) {
          set({
            global: view.globalFilters,
            advanced: view.advancedFilter || null,
            currentViewId: viewId,
          })
        }
      },

      deleteView: (viewId) =>
        set((state) => ({
          savedViews: state.savedViews.filter((v) => v.id !== viewId),
          currentViewId: state.currentViewId === viewId ? null : state.currentViewId,
        })),

      resetFilters: () =>
        set({
          global: initialGlobalFilters,
          advanced: null,
          activeQuickFilter: null,
          currentViewId: null,
        }),
    }),
    {
      name: 'ptrms-filters',
      partialize: (state) => ({
        savedViews: state.savedViews,
      }),
    }
  )
)
