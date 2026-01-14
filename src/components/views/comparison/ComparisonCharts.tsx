import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts'
import { EXCHANGES, EXCHANGE_LIST } from '@/constants'
import { formatCurrency } from '@/utils'
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

interface ComparisonChartsProps {
  data: ExchangeMetrics[]
}

const TOOLTIP_STYLE = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '8px',
}

// Prepare radar chart data from exchange metrics
function prepareRadarData(data: ExchangeMetrics[]) {
  return [
    {
      metric: 'Clients',
      ...Object.fromEntries(
        data.map((d) => [d.exchange, (d.clients / Math.max(...data.map((x) => x.clients))) * 100])
      ),
    },
    {
      metric: 'Position',
      ...Object.fromEntries(
        data.map((d) => [d.exchange, (d.positionValue / Math.max(...data.map((x) => x.positionValue))) * 100])
      ),
    },
    {
      metric: 'Margin',
      ...Object.fromEntries(
        data.map((d) => [d.exchange, (d.margin / Math.max(...data.map((x) => x.margin))) * 100])
      ),
    },
    {
      metric: 'Utilization',
      ...Object.fromEntries(data.map((d) => [d.exchange, d.utilization])),
    },
    {
      metric: 'Risk Score',
      ...Object.fromEntries(
        data.map((d) => [d.exchange, (d.highRisk / Math.max(...data.map((x) => x.highRisk))) * 100])
      ),
    },
  ]
}

export function ComparisonCharts({ data }: ComparisonChartsProps) {
  const radarData = prepareRadarData(data)

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* Position Value Comparison */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200 sm:mb-4">Position Value Comparison</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="exchange" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={TOOLTIP_STYLE}
              />
              <Bar dataKey="positionValue" radius={[4, 4, 0, 0]} fill="#3b82f6">
                {data.map((entry) => (
                  <Cell key={entry.exchange} fill={EXCHANGES[entry.exchange].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Comparison */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 sm:p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-200 sm:mb-4">Multi-Metric Comparison</h3>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              {EXCHANGE_LIST.map((code) => (
                <Radar
                  key={code}
                  name={code}
                  dataKey={code}
                  stroke={EXCHANGES[code].color}
                  fill={EXCHANGES[code].color}
                  fillOpacity={0.2}
                />
              ))}
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-4">
          {EXCHANGE_LIST.map((code) => (
            <div key={code} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: EXCHANGES[code].color }}
              />
              <span className="text-xs text-slate-400">{code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
