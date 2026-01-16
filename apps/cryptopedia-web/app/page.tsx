"use client"

import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Shield, 
  Search, 
  BarChart3, 
  Bell, 
  LayoutDashboard,
  User,
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useAuth } from "./context/AuthContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/app/lib/api"
import LiveTickerBanner from "./components/LiveTickerBanner"
import RvolHeatmap from "./components/RvolHeatmap"

export default function Home() {
  const { isAuthenticated, logout, accessToken } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [symbols, setSymbols] = useState<any[]>([])
  const [tickers, setTickers] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated) {
      router.push("/login")
    } else {
      fetchMarketData()
    }
  }, [isAuthenticated, router])

  const fetchMarketData = async () => {
    try {
      const [symbolsRes, tickersRes] = await Promise.all([
        authApi.get("/market/symbols"),
        authApi.get("/market/tickers")
      ])
      setSymbols(symbolsRes.data)
      setTickers(tickersRes.data)
    } catch (error) {
      console.error("Failed to fetch market data:", error)
    }
  }

  if (!mounted || !isAuthenticated) return null

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden mesh-gradient relative">
      <div className="absolute inset-0 noise-bg opacity-20 pointer-events-none" />
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center shadow-sm shadow-electric-blue/5">
            <TrendingUp className="w-5 h-5 text-electric-blue" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-bold text-lg tracking-tight text-white">
              Cryptopedia
            </span>
            <span className="text-[10px] font-bold text-electric-blue/80 tracking-widest uppercase">
              Intelligent
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-white/60">
          <button className="px-4 py-2 text-white hover:text-electric-blue transition-colors rounded-lg hover:bg-white/5">Market</button>
          <button className="px-4 py-2 hover:text-electric-blue transition-colors rounded-lg hover:bg-white/5">Analysis</button>
          <button className="px-4 py-2 hover:text-electric-blue transition-colors rounded-lg hover:bg-white/5">Portfolio</button>
          <button className="px-4 py-2 hover:text-electric-blue transition-colors rounded-lg hover:bg-white/5">Alerts</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search symbols..." 
              className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-electric-blue/50 w-48 transition-all focus:w-64"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-[1px] bg-white/10 mx-1" />
          <button 
            onClick={logout}
            className="p-2 rounded-lg hover:bg-neon-magenta/10 text-white/60 hover:text-neon-magenta transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <LiveTickerBanner />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 border-r border-white/5 bg-background/30 hidden sm:flex flex-col py-6">
          <div className="px-4 space-y-2">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
            <SidebarItem icon={<Activity size={20} />} label="Live Tickers" />
            <SidebarItem icon={<BarChart3 size={20} />} label="RVOL Analysis" />
            <SidebarItem icon={<Zap size={20} />} label="Volume Surges" />
          </div>
          
          <div className="mt-auto px-4 space-y-2">
            <SidebarItem icon={<User size={20} />} label="Account" />
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-electric-blue/5 blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-neon-magenta/5 blur-[120px] -z-10" />

          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Market Intelligence</h2>
                <p className="text-white/40 text-sm mt-1">Real-time data stream from global exchanges</p>
              </div>
              <div className="flex gap-3">
                <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-white/70">Binance Connected</span>
                </div>
                <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-white/70">Upbit Connected</span>
                </div>
              </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Active Symbols" value="1,248" change="+12" icon={<TrendingUp className="text-electric-blue" />} />
              <StatCard title="24h Volume" value="$42.5B" change="+8.4%" icon={<Activity className="text-electric-blue" />} />
              <StatCard title="High RVOL" value="24" change="-3" icon={<Zap className="text-neon-magenta" />} />
              <StatCard title="System Health" value="Optimal" change="99.9%" icon={<Shield className="text-electric-blue" />} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* RVOL Heatmap Placeholder */}
              <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <BarChart3 size={18} className="text-electric-blue" />
                    RVOL Analysis Heatmap
                  </h3>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none">
                    <option>Top 20 by Volume</option>
                    <option>High RVOL Only</option>
                  </select>
                </div>
                <RvolHeatmap />
              </div>

              {/* Side Ticker / Alerts */}
              <div className="glass-panel rounded-2xl p-6 flex flex-col">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Bell size={18} className="text-neon-magenta" />
                  Live Surge Alerts
                </h3>
                <div className="space-y-4">
                  <AlertItem symbol="BTC/USDT" message="Volume surge detected (RVOL 2.4)" time="Just now" type="surge" />
                  <AlertItem symbol="ETH/USDT" message="New 24h high reached" time="2m ago" type="info" />
                  <AlertItem symbol="SOL/USDT" message="Significant bid wall at $124.50" time="5m ago" type="info" />
                  <AlertItem symbol="DOGE/USDT" message="Volume surge detected (RVOL 3.1)" time="12m ago" type="surge" />
                </div>
                <button className="mt-auto w-full py-2 text-xs text-white/30 hover:text-white transition-colors border-t border-white/5 pt-4">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={cn(
      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
      active ? "bg-electric-blue/10 text-electric-blue shadow-sm shadow-electric-blue/5" : "text-white/40 hover:text-white hover:bg-white/5"
    )}>
      <span className={cn("transition-transform duration-300", active ? "scale-110" : "group-hover:scale-110")}>
        {icon}
      </span>
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </button>
  )
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-5 rounded-2xl space-y-3 relative overflow-hidden group hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/10">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
        <span className={cn(
          "text-xs font-mono mb-1 px-2 py-0.5 rounded-full",
          change.startsWith('+') ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
        )}>
          {change}
        </span>
      </div>
    </div>
  )
}

function AlertItem({ symbol, message, time, type }: { symbol: string, message: string, time: string, type: 'surge' | 'info' }) {
  return (
    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-bold text-white group-hover:text-electric-blue transition-colors">{symbol}</span>
        <span className="text-[10px] text-white/30">{time}</span>
      </div>
      <p className={cn(
        "text-xs leading-relaxed",
        type === 'surge' ? "text-neon-magenta/80" : "text-white/50"
      )}>
        {message}
      </p>
    </div>
  )
}
