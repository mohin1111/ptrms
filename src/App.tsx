import { useEffect } from 'react'
import { MainLayout, ViewTabs } from './components/layout'
import { ExecutiveOverview, AnalyticalWorkspace, ExchangeComparison } from './components/views'
import { useDashboardStore, useThemeStore } from './stores'

function App() {
  const { viewMode } = useDashboardStore()
  const { setTheme } = useThemeStore()

  // Initialize theme on mount
  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  const renderView = () => {
    switch (viewMode) {
      case 'executive':
        return <ExecutiveOverview />
      case 'analytical':
        return <AnalyticalWorkspace />
      case 'comparison':
        return <ExchangeComparison />
      default:
        return <ExecutiveOverview />
    }
  }

  return (
    <MainLayout>
      <ViewTabs />
      {renderView()}
    </MainLayout>
  )
}

export default App
