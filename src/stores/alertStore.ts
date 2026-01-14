import { create } from 'zustand'
import type { RiskAlert, AlertFilters, AlertStatus } from '@/types'

interface AlertStore {
  // Alerts
  alerts: RiskAlert[]
  setAlerts: (alerts: RiskAlert[]) => void
  addAlert: (alert: RiskAlert) => void

  // Filters
  filters: AlertFilters
  setFilters: (filters: Partial<AlertFilters>) => void
  resetFilters: () => void

  // Actions
  acknowledgeAlert: (alertId: string, userId: string) => void
  resolveAlert: (alertId: string) => void
  escalateAlert: (alertId: string) => void

  // Computed
  filteredAlerts: () => RiskAlert[]
  alertCounts: () => {
    total: number
    critical: number
    high: number
    new: number
  }
}

const initialFilters: AlertFilters = {
  severities: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
  types: [],
  statuses: ['NEW', 'ACKNOWLEDGED', 'ESCALATED'],
  exchanges: ['NSEEQ', 'NSECD', 'NSEFO', 'MCX'],
  searchQuery: '',
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],

  setAlerts: (alerts) => set({ alerts }),

  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),

  filters: initialFilters,

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  acknowledgeAlert: (alertId, userId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: 'ACKNOWLEDGED' as AlertStatus,
              acknowledgedBy: userId,
              acknowledgedAt: new Date(),
            }
          : alert
      ),
    })),

  resolveAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: 'RESOLVED' as AlertStatus,
              resolvedAt: new Date(),
            }
          : alert
      ),
    })),

  escalateAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: 'ESCALATED' as AlertStatus,
            }
          : alert
      ),
    })),

  filteredAlerts: () => {
    const { alerts, filters } = get()

    return alerts.filter((alert) => {
      // Severity filter
      if (filters.severities.length > 0 && !filters.severities.includes(alert.severity)) {
        return false
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(alert.type)) {
        return false
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(alert.status)) {
        return false
      }

      // Exchange filter
      if (filters.exchanges.length > 0 && !filters.exchanges.includes(alert.exchange)) {
        return false
      }

      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        return (
          alert.clientId.toLowerCase().includes(query) ||
          alert.clientName.toLowerCase().includes(query) ||
          alert.message.toLowerCase().includes(query) ||
          (alert.symbol && alert.symbol.toLowerCase().includes(query))
        )
      }

      return true
    })
  },

  alertCounts: () => {
    const alerts = get().alerts

    return {
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length,
      high: alerts.filter((a) => a.severity === 'HIGH' && a.status !== 'RESOLVED').length,
      new: alerts.filter((a) => a.status === 'NEW').length,
    }
  },
}))
