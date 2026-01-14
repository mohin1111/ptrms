import type { ExchangeCode, ReportType } from '@/types'
import { EXCHANGES } from '@/constants'

interface ExportOptions {
  exchange: ExchangeCode
  reportType: ReportType
  data: Record<string, unknown>[]
  columns?: { header: string; key: string; format?: (val: unknown) => string }[]
}

// Export to Excel using xlsx library
export async function exportToExcel(options: ExportOptions): Promise<void> {
  const { exchange, reportType, data, columns } = options
  const xlsx = await import('xlsx')

  let sheetData: Record<string, unknown>[]

  if (columns) {
    // Format data according to column definitions
    sheetData = data.map((row) => {
      const formattedRow: Record<string, unknown> = {}
      columns.forEach((col) => {
        const value = row[col.key]
        formattedRow[col.header] = col.format ? col.format(value) : value
      })
      return formattedRow
    })
  } else {
    sheetData = data
  }

  const ws = xlsx.utils.json_to_sheet(sheetData)

  // Auto-size columns
  const colWidths = Object.keys(sheetData[0] || {}).map((key) => ({
    wch: Math.max(
      key.length,
      ...sheetData.slice(0, 100).map((row) => String(row[key] ?? '').length)
    ),
  }))
  ws['!cols'] = colWidths

  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, ws, reportType)

  // Add metadata sheet
  const meta = [
    { Field: 'Exchange', Value: EXCHANGES[exchange].name },
    { Field: 'Report Type', Value: reportType },
    { Field: 'Generated', Value: new Date().toLocaleString() },
    { Field: 'Total Records', Value: data.length },
  ]
  const metaWs = xlsx.utils.json_to_sheet(meta)
  xlsx.utils.book_append_sheet(wb, metaWs, 'Metadata')

  const filename = `${exchange}_${reportType}_${new Date().toISOString().split('T')[0]}.xlsx`
  xlsx.writeFile(wb, filename)
}

// Export to PDF using jspdf library
export async function exportToPDF(options: ExportOptions): Promise<void> {
  const { exchange, reportType, data, columns } = options
  const { default: jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF('landscape', 'mm', 'a4')

  // Header
  doc.setFontSize(18)
  doc.setTextColor(30, 64, 175)
  doc.text(`${EXCHANGES[exchange].name}`, 14, 15)

  doc.setFontSize(12)
  doc.setTextColor(100)
  doc.text(`${reportType.replace(/([A-Z])/g, ' $1').trim()} Report`, 14, 23)

  doc.setFontSize(9)
  doc.setTextColor(150)
  doc.text(`Generated: ${new Date().toLocaleString()} | Total Records: ${data.length}`, 14, 30)

  // Table
  if (columns && columns.length > 0) {
    autoTable(doc, {
      startY: 35,
      head: [columns.map((c) => c.header)],
      body: data.slice(0, 200).map((row) =>
        columns.map((col) => {
          const value = row[col.key]
          return col.format ? col.format(value) : String(value ?? '')
        })
      ),
      theme: 'striped',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'left',
      },
      bodyStyles: {
        textColor: 50,
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      margin: { left: 14, right: 14 },
    })
  } else {
    // Auto-generate columns from data
    const keys = Object.keys(data[0] || {})
    autoTable(doc, {
      startY: 35,
      head: [keys],
      body: data.slice(0, 200).map((row) => keys.map((k) => String(row[k] ?? ''))),
      theme: 'striped',
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 7,
        cellPadding: 1.5,
      },
      margin: { left: 14, right: 14 },
    })
  }

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    )
  }

  const filename = `${exchange}_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}

// Export pivot table results
export async function exportPivotToExcel(
  pivotData: { headers: string[]; rows: (string | number)[][] },
  exchange: ExchangeCode
): Promise<void> {
  const xlsx = await import('xlsx')

  const data = pivotData.rows.map((row) => {
    const obj: Record<string, string | number> = {}
    pivotData.headers.forEach((header, idx) => {
      obj[header] = row[idx]
    })
    return obj
  })

  const ws = xlsx.utils.json_to_sheet(data)

  // Style header row
  const colWidths = pivotData.headers.map((h) => ({
    wch: Math.max(h.length + 2, 12),
  }))
  ws['!cols'] = colWidths

  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, ws, 'Pivot Results')

  const filename = `${exchange}_pivot_${new Date().toISOString().split('T')[0]}.xlsx`
  xlsx.writeFile(wb, filename)
}
