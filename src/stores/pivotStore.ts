import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PivotField, PivotConfig, SavedPivotConfig, DropZone } from '@/types'

interface PivotStore {
  // Current Configuration
  config: PivotConfig

  // Available Fields
  availableFields: PivotField[]

  // Saved Configurations
  savedConfigs: SavedPivotConfig[]

  // Actions
  setAvailableFields: (fields: PivotField[]) => void
  addToZone: (field: PivotField, zone: DropZone, index?: number) => void
  removeFromZone: (fieldId: string, zone: DropZone) => void
  moveField: (fieldId: string, fromZone: DropZone, toZone: DropZone, index?: number) => void
  reorderInZone: (zone: DropZone, fromIndex: number, toIndex: number) => void
  setAggregation: (fieldId: string, aggregation: PivotField['aggregation']) => void
  clearConfig: () => void
  loadConfig: (configId: string) => void
  saveConfig: (name: string, description?: string) => void
  deleteConfig: (configId: string) => void
}

const initialConfig: PivotConfig = {
  rows: [],
  columns: [],
  values: [],
  filters: [],
}

export const usePivotStore = create<PivotStore>()(
  persist(
    (set, get) => ({
      config: initialConfig,
      availableFields: [],
      savedConfigs: [],

      setAvailableFields: (fields) => set({ availableFields: fields }),

      addToZone: (field, zone, index) => {
        if (zone === 'available') return

        set((state) => {
          // Remove from available fields
          const availableFields = state.availableFields.filter((f) => f.id !== field.id)

          // Add to target zone
          const zoneFields = [...state.config[zone]]
          const insertIndex = index ?? zoneFields.length
          zoneFields.splice(insertIndex, 0, field)

          return {
            availableFields,
            config: {
              ...state.config,
              [zone]: zoneFields,
            },
          }
        })
      },

      removeFromZone: (fieldId, zone) => {
        if (zone === 'available') return

        set((state) => {
          const field = state.config[zone].find((f) => f.id === fieldId)
          if (!field) return state

          return {
            availableFields: [...state.availableFields, field],
            config: {
              ...state.config,
              [zone]: state.config[zone].filter((f) => f.id !== fieldId),
            },
          }
        })
      },

      moveField: (fieldId, fromZone, toZone, index) => {
        if (fromZone === toZone) return

        set((state) => {
          let field: PivotField | undefined

          // Find and remove from source
          if (fromZone === 'available') {
            field = state.availableFields.find((f) => f.id === fieldId)
            if (!field) return state
          } else {
            field = state.config[fromZone].find((f) => f.id === fieldId)
            if (!field) return state
          }

          // Build new state
          const newAvailable =
            fromZone === 'available'
              ? state.availableFields.filter((f) => f.id !== fieldId)
              : toZone === 'available'
              ? [...state.availableFields, field]
              : state.availableFields

          const newConfig = { ...state.config }

          if (fromZone !== 'available') {
            newConfig[fromZone] = state.config[fromZone].filter((f) => f.id !== fieldId)
          }

          if (toZone !== 'available') {
            const zoneFields = [...newConfig[toZone]]
            const insertIndex = index ?? zoneFields.length
            zoneFields.splice(insertIndex, 0, field)
            newConfig[toZone] = zoneFields
          }

          return {
            availableFields: newAvailable,
            config: newConfig,
          }
        })
      },

      reorderInZone: (zone, fromIndex, toIndex) => {
        if (zone === 'available') return

        set((state) => {
          const zoneFields = [...state.config[zone]]
          const [moved] = zoneFields.splice(fromIndex, 1)
          zoneFields.splice(toIndex, 0, moved)

          return {
            config: {
              ...state.config,
              [zone]: zoneFields,
            },
          }
        })
      },

      setAggregation: (fieldId, aggregation) => {
        set((state) => {
          const updateField = (fields: PivotField[]) =>
            fields.map((f) => (f.id === fieldId ? { ...f, aggregation } : f))

          return {
            config: {
              ...state.config,
              values: updateField(state.config.values),
            },
          }
        })
      },

      clearConfig: () => {
        set((state) => ({
          availableFields: [
            ...state.availableFields,
            ...state.config.rows,
            ...state.config.columns,
            ...state.config.values,
            ...state.config.filters,
          ],
          config: initialConfig,
        }))
      },

      loadConfig: (configId) => {
        const saved = get().savedConfigs.find((c) => c.id === configId)
        if (saved) {
          set({ config: saved.config })
        }
      },

      saveConfig: (name, description) => {
        const id = crypto.randomUUID()
        const now = new Date()
        set((state) => ({
          savedConfigs: [
            ...state.savedConfigs,
            {
              id,
              name,
              description,
              config: state.config,
              createdAt: now,
              updatedAt: now,
            },
          ],
        }))
      },

      deleteConfig: (configId) => {
        set((state) => ({
          savedConfigs: state.savedConfigs.filter((c) => c.id !== configId),
        }))
      },
    }),
    {
      name: 'ptrms-pivot',
      partialize: (state) => ({
        savedConfigs: state.savedConfigs,
      }),
    }
  )
)
