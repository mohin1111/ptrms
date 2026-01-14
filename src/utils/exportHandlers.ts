import { formatCurrency, formatPercent } from '@/utils/formatters'

export interface ExportColumn {
  header: string
  accessor: string | ((row: Record<string, unknown>) => string | number)
  format?: 'currency' | 'percent' | 'number' | 'string'
}

// Export data to Excel file
export async function exportToExcel(
  data: Record<string, unknown>[],
  columns: ExportColumn[],
  filename: string,
  sheetName = 'Data'
): Promise<void> {
  const xlsx = await import('xlsx')

  const exportData = data.map(row => {
    const exportRow: Record<string, string | number> = {}
    columns.forEach(col => {
      const value = typeof col.accessor === 'function'
        ? col.accessor(row)
        : row[col.accessor]
      exportRow[col.header] = formatExportValue(value, col.format)
    })
    return exportRow
  })

  const ws = xlsx.utils.json_to_sheet(exportData)
  const wb = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(wb, ws, sheetName)
  xlsx.writeFile(wb, `${filename}_${getDateSuffix()}.xlsx`)
}

// Export data to Excel with multiple sheets
export async function exportToExcelMultiSheet(
  sheets: { name: string; data: Record<string, unknown>[]; columns: ExportColumn[] }[],
  filename: string
): Promise<void> {
  const xlsx = await import('xlsx')
  const wb = xlsx.utils.book_new()

  sheets.forEach(sheet => {
    const exportData = sheet.data.map(row => {
      const exportRow: Record<string, string | number> = {}
      sheet.columns.forEach(col => {
        const value = typeof col.accessor === 'function'
          ? col.accessor(row)
          : row[col.accessor]
        exportRow[col.header] = formatExportValue(value, col.format)
      })
      return exportRow
    })
    xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(exportData), sheet.name)
  })

  xlsx.writeFile(wb, `${filename}_${getDateSuffix()}.xlsx`)
}

// Export data to PDF file
export async function exportToPDF(
  data: Record<string, unknown>[],
  columns: ExportColumn[],
  filename: string,
  title: string,
  orientation: 'portrait' | 'landscape' = 'landscape'
): Promise<void> {
  const { default: jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF(orientation)
  doc.setFontSize(18)
  doc.text(title, 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22)

  autoTable(doc, {
    startY: 28,
    head: [columns.map(c => c.header)],
    body: data.map(row =>
      columns.map(col => {
        const value = typeof col.accessor === 'function'
          ? col.accessor(row)
          : row[col.accessor]
        return formatExportValue(value, col.format)
      })
    ),
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
    styles: { fontSize: 8 },
  })

  doc.save(`${filename}_${getDateSuffix()}.pdf`)
}

// Format value for export based on format type
function formatExportValue(
  value: unknown,
  format?: 'currency' | 'percent' | 'number' | 'string'
): string | number {
  if (value == null) return '-'

  switch (format) {
    case 'currency':
      return formatCurrency(Number(value))
    case 'percent':
      return formatPercent(Number(value))
    case 'number':
      return Number(value).toLocaleString()
    default:
      return String(value)
  }
}

// Get date suffix for filenames
function getDateSuffix(): string {
  return new Date().toISOString().split('T')[0]
}
