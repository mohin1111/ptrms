import { EXCHANGES } from '@/constants'
import { formatCurrency, formatPercent } from '@/utils'
import type { ExchangeCode } from '@/types'

interface ExchangeData {
  exchange: ExchangeCode
  clients: number
  positionValue: number
  margin: number
  utilization: number
  highRisk: number
  mtm: number
}

interface ExchangeSummaryTableProps {
  data: ExchangeData[]
}

export function ExchangeSummaryTable({ data }: ExchangeSummaryTableProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/50">
      <div className="border-b border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-200">Exchange Summary</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-left text-xs text-slate-400">
              <th className="p-4">Exchange</th>
              <th className="p-4 text-right">Clients</th>
              <th className="p-4 text-right">Position Value</th>
              <th className="p-4 text-right">Margin</th>
              <th className="p-4 text-right">Utilization</th>
              <th className="p-4 text-right">High Risk</th>
              <th className="p-4 text-right">MTM</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const exchange = EXCHANGES[row.exchange]
              return (
                <tr
                  key={row.exchange}
                  className="border-b border-slate-700/50 hover:bg-slate-800"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: exchange.color }}
                      />
                      <span className="font-medium text-slate-200">
                        {exchange.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right tabular-nums text-slate-300">
                    {row.clients.toLocaleString()}
                  </td>
                  <td className="p-4 text-right tabular-nums text-slate-300">
                    {formatCurrency(row.positionValue)}
                  </td>
                  <td className="p-4 text-right tabular-nums text-slate-300">
                    {formatCurrency(row.margin)}
                  </td>
                  <td className="p-4 text-right">
                    <span
                      className={`tabular-nums ${
                        row.utilization > 80
                          ? 'text-red-500'
                          : row.utilization > 60
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                    >
                      {formatPercent(row.utilization)}
                    </span>
                  </td>
                  <td className="p-4 text-right tabular-nums text-red-400">
                    {row.highRisk}
                  </td>
                  <td
                    className={`p-4 text-right tabular-nums ${
                      row.mtm >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {formatCurrency(row.mtm)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
