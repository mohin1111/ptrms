import { LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/cn'
import { formatCurrency } from '@/utils'
import type { PivotResult } from '@/utils/pivotUtils'

interface PivotResultsViewProps {
  pivotResult: PivotResult
  rowFieldCount: number
}

export function PivotResultsView({ pivotResult, rowFieldCount }: PivotResultsViewProps) {
  if (pivotResult.headers.length === 0 || pivotResult.rows.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800/30">
        <div className="text-center">
          <LayoutGrid className="mx-auto h-8 w-8 text-slate-500" />
          <p className="mt-2 text-sm text-slate-400">
            Drag fields to Rows and Values to generate pivot table
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              {pivotResult.headers.map((header, idx) => (
                <th
                  key={idx}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {pivotResult.rows.slice(0, 50).map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-800/50">
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className={cn(
                      'whitespace-nowrap px-4 py-3 text-sm',
                      cellIdx < rowFieldCount
                        ? 'font-medium text-white'
                        : 'tabular-nums text-slate-300'
                    )}
                  >
                    {typeof cell === 'number' && !isNaN(cell)
                      ? cell > 1000 || cell < -1000
                        ? formatCurrency(cell)
                        : cell.toFixed(2)
                      : String(cell ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pivotResult.rows.length > 50 && (
        <div className="border-t border-slate-700 bg-slate-800 px-4 py-2 text-center text-xs text-slate-400">
          Showing 50 of {pivotResult.rows.length} rows
        </div>
      )}
    </div>
  )
}
