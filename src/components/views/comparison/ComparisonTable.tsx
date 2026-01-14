import { cn } from '@/lib/cn'
import { EXCHANGES, EXCHANGE_LIST } from '@/constants'
import { formatCurrency, formatPercent } from '@/utils'
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

interface ComparisonTableProps {
  data: ExchangeMetrics[]
}

export function ComparisonTable({ data }: ComparisonTableProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50">
      <div className="border-b border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-200">Detailed Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs text-slate-400">
              <th className="p-4">Metric</th>
              {EXCHANGE_LIST.map((code) => (
                <th key={code} className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: EXCHANGES[code].color }}
                    />
                    {code}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-medium text-slate-300">Active Clients</td>
              {data.map((d) => (
                <td key={d.exchange} className="p-4 text-right tabular-nums text-slate-300">
                  {d.clients.toLocaleString()}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-medium text-slate-300">Position Value</td>
              {data.map((d) => (
                <td key={d.exchange} className="p-4 text-right tabular-nums text-slate-300">
                  {formatCurrency(d.positionValue)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-medium text-slate-300">Margin Utilized</td>
              {data.map((d) => (
                <td key={d.exchange} className="p-4 text-right tabular-nums text-slate-300">
                  {formatCurrency(d.margin)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-medium text-slate-300">Utilization %</td>
              {data.map((d) => (
                <td
                  key={d.exchange}
                  className={cn(
                    'p-4 text-right tabular-nums',
                    d.utilization > 80
                      ? 'text-red-500'
                      : d.utilization > 60
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  )}
                >
                  {formatPercent(d.utilization)}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-medium text-slate-300">High Risk Clients</td>
              {data.map((d) => (
                <td key={d.exchange} className="p-4 text-right tabular-nums text-red-400">
                  {d.highRisk}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-medium text-slate-300">Mark to Market</td>
              {data.map((d) => (
                <td
                  key={d.exchange}
                  className={cn(
                    'p-4 text-right tabular-nums',
                    d.mtm >= 0 ? 'text-green-500' : 'text-red-500'
                  )}
                >
                  {formatCurrency(d.mtm)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
