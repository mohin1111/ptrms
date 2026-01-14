import { useState, useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { AlertPanel } from '../alerts/AlertPanel'
import { useDashboardStore } from '@/stores'
import { cn } from '@/lib/cn'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { sidebarCollapsed, setSidebarCollapsed, alertPanelOpen } = useDashboardStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auto-collapse sidebar on medium screens, expand on large
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1536) {
        // 2xl: full sidebar
        setSidebarCollapsed(false)
      } else if (width >= 1280) {
        // xl: collapsed sidebar
        setSidebarCollapsed(true)
      } else if (width >= 1024) {
        // lg: collapsed sidebar
        setSidebarCollapsed(true)
      }
      // Close mobile menu on resize to desktop
      if (width >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarCollapsed])

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100">
      <Header
        onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar - Hidden on mobile, visible on lg+ */}
        <div className="hidden flex-shrink-0 lg:block">
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Sidebar Drawer */}
        <div
          className={cn(
            'fixed inset-y-0 left-0 top-14 z-50 w-64 transform bg-slate-900 transition-transform duration-300 ease-in-out lg:hidden',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <Sidebar collapsed={false} onNavClick={closeMobileMenu} />
        </div>

        {/* Main Content - Centered container for ultrawide screens */}
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="mx-auto h-full w-full max-w-[2400px] p-3 sm:p-4 lg:p-6 2xl:p-8">
            {children}
          </div>
        </main>

        {/* Alert Panel - Hidden on mobile/tablet, visible on xl+ */}
        {alertPanelOpen && (
          <aside className="hidden w-72 flex-shrink-0 border-l border-slate-700 bg-slate-900 xl:block 2xl:w-80">
            <AlertPanel />
          </aside>
        )}
      </div>
    </div>
  )
}
