import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { formatCurrency } from '@/utils'
import type { ExchangeCode } from '@/types'

interface PieDataItem {
  name: string
  value: number
  color: string
}

interface BarDataItem {
  name: string
  utilization: number
  color: string
}

interface ExchangeDataItem {
  exchange: ExchangeCode
  highRisk: number
}

interface ExecutiveChartsProps {
  pieData: PieDataItem[]
  barData: BarDataItem[]
  exchangeData: ExchangeDataItem[]
}

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
}

export function ExecutiveCharts({ pieData, barData, exchangeData }: ExecutiveChartsProps) {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Exchange Distribution */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200 sm:mb-4">
          Exchange Distribution
        </h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-slate-400">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Margin Utilization */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200 sm:mb-4">
          Margin Utilization by Exchange
        </h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={60} />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(1)}%`}
                contentStyle={TOOLTIP_STYLE}
              />
              <Bar dataKey="utilization" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.utilization > 80
                        ? '#ef4444'
                        : entry.utilization > 60
                        ? '#f59e0b'
                        : '#22c55e'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 sm:p-4 md:col-span-2 xl:col-span-1">
        <h3 className="mb-3 text-sm font-semibold text-slate-200 sm:mb-4">
          High Risk Clients by Exchange
        </h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={exchangeData}>
              <XAxis dataKey="exchange" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="highRisk" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
