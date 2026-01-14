import type { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/cn'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { formatCurrency, formatPercent } from '@/utils'
import type { ClientWiseReportRow } from '@/types'

export const analyticalTableColumns: ColumnDef<ClientWiseReportRow>[] = [
  {
    accessorKey: 'clientId',
    header: 'Client ID',
    cell: ({ getValue }) => (
      <span className="font-medium text-blue-400">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'clientName',
    header: 'Client Name',
    cell: ({ getValue }) => (
      <span className="max-w-[200px] truncate">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'riskLevel',
    header: 'Risk',
    cell: ({ getValue }) => <StatusBadge status={getValue() as 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'} size="sm" />,
  },
  {
    accessorKey: 'marginUtilized',
    header: 'Margin Utilized',
    cell: ({ getValue }) => (
      <span className="tabular-nums">{formatCurrency(getValue() as number)}</span>
    ),
  },
  {
    accessorKey: 'collateralMarginUtilPerc',
    header: 'Util %',
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span
          className={cn(
            'tabular-nums',
            val > 100 ? 'text-red-500' : val > 80 ? 'text-yellow-500' : 'text-green-500'
          )}
        >
          {formatPercent(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'mtm',
    header: 'MTM',
    cell: ({ getValue }) => {
      const val = getValue() as number
      return (
        <span className={cn('tabular-nums', val >= 0 ? 'text-green-500' : 'text-red-500')}>
          {formatCurrency(val)}
        </span>
      )
    },
  },
  {
    accessorKey: 'delta',
    header: 'Delta',
    cell: ({ getValue }) => {
      const val = getValue() as number | undefined
      return <span className="tabular-nums">{val?.toFixed(4) ?? '-'}</span>
    },
  },
  {
    accessorKey: 'collateralAvailable',
    header: 'Available Collateral',
    cell: ({ getValue }) => (
      <span className="tabular-nums">{formatCurrency(getValue() as number)}</span>
    ),
  },
]
