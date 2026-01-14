import { useState } from 'react'
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  ChevronDown,
  Filter,
  Calendar,
  PanelLeftClose,
  PanelLeft,
  X,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { useThemeStore, useDashboardStore, useFilterStore, useAlertStore } from '@/stores'
import { EXCHANGES, EXCHANGE_LIST } from '@/constants'
import type { ExchangeCode } from '@/types'

interface HeaderProps {
  onMenuClick: () => void
  onSidebarToggle?: () => void
}

export function Header({ onMenuClick, onSidebarToggle }: HeaderProps) {
  const { resolvedTheme, toggleTheme } = useThemeStore()
  const { alertPanelOpen, toggleAlertPanel, sidebarCollapsed } = useDashboardStore()
  const { global, setExchanges, setSearchQuery } = useFilterStore()
  const alerts = useAlertStore((state) => state.alerts)

  const alertCounts = {
    total: alerts.length,
    critical: alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length,
    high: alerts.filter((a) => a.severity === 'HIGH' && a.status !== 'RESOLVED').length,
    new: alerts.filter((a) => a.status === 'NEW').length,
  }

  const [exchangeDropdownOpen, setExchangeDropdownOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleExchangeToggle = (exchange: ExchangeCode) => {
    const newExchanges = global.exchanges.includes(exchange)
      ? global.exchanges.filter((e) => e !== exchange)
      : [...global.exchanges, exchange]

    if (newExchanges.length > 0) {
      setExchanges(newExchanges)
    }
  }

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-slate-700 bg-slate-900/95 px-2 backdrop-blur sm:h-16 sm:px-4">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Sidebar Toggle - Desktop only */}
        {onSidebarToggle && (
          <button
            onClick={onSidebarToggle}
            className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:block"
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
            PT
          </div>
          <span className="hidden text-sm font-semibold text-white sm:block sm:text-base">
            PTRMS
          </span>
        </div>

        {/* Exchange Filter - Hidden on mobile */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setExchangeDropdownOpen(!exchangeDropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs hover:bg-slate-700 sm:gap-2 sm:px-3 sm:text-sm"
          >
            <span>Exchanges ({global.exchanges.length})</span>
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>

          {exchangeDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setExchangeDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-lg border border-slate-700 bg-slate-800 p-2 shadow-xl sm:w-56">
                {EXCHANGE_LIST.map((code) => {
                  const exchange = EXCHANGES[code]
                  const isSelected = global.exchanges.includes(code)
                  return (
                    <button
                      key={code}
                      onClick={() => handleExchangeToggle(code)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs sm:px-3 sm:py-2 sm:text-sm',
                        isSelected
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                      )}
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                        style={{ backgroundColor: exchange.color }}
                      />
                      <span className="flex-1">{exchange.name}</span>
                      {isSelected && <span className="text-blue-400">✓</span>}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Date Display - Hidden on smaller screens */}
        <div className="hidden items-center gap-1.5 text-xs text-slate-400 xl:flex sm:gap-2 sm:text-sm">
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Center - Search (Desktop) */}
      <div className="hidden flex-1 justify-center px-4 md:flex lg:px-8">
        <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients, symbols..."
            value={global.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-1.5 pl-9 pr-4 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:py-2 sm:pl-10"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 flex h-14 items-center gap-2 bg-slate-900 px-2 md:hidden">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={global.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-9 pr-4 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Button */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Quick Filters - Hidden on mobile */}
        <button className="hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white sm:block">
          <Filter className="h-5 w-5" />
        </button>

        {/* Alerts Button */}
        <button
          onClick={toggleAlertPanel}
          className={cn(
            'relative rounded-lg p-2 hover:bg-slate-800',
            alertPanelOpen ? 'bg-slate-800 text-white' : 'text-slate-400'
          )}
        >
          <Bell className="h-5 w-5" />
          {alertCounts.critical > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-xs">
              {alertCounts.critical}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* User Avatar */}
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-medium text-white sm:h-8 sm:w-8 sm:text-sm">
          RM
        </button>
      </div>
    </header>
  )
}
