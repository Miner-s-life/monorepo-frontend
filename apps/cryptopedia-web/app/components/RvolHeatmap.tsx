"use client"

import { motion } from "framer-motion"
import { cn } from "@/app/lib/utils"

interface HeatmapData {
  symbol: string
  rvol: number
  change: number
  volume: string
}

const mockData: HeatmapData[] = [
  { symbol: "BTC", rvol: 1.2, change: 2.4, volume: "1.2B" },
  { symbol: "ETH", rvol: 0.8, change: -1.2, volume: "800M" },
  { symbol: "SOL", rvol: 2.5, change: 5.7, volume: "450M" },
  { symbol: "XRP", rvol: 1.1, change: 0.8, volume: "200M" },
  { symbol: "DOGE", rvol: 3.2, change: 12.4, volume: "150M" },
  { symbol: "ADA", rvol: 0.7, change: -2.1, volume: "100M" },
  { symbol: "AVAX", rvol: 1.8, change: 3.2, volume: "90M" },
  { symbol: "DOT", rvol: 0.9, change: 1.5, volume: "80M" },
  { symbol: "LINK", rvol: 1.4, change: -0.5, volume: "75M" },
  { symbol: "MATIC", rvol: 1.0, change: 0.2, volume: "70M" },
  { symbol: "UNI", rvol: 0.6, change: -3.4, volume: "65M" },
  { symbol: "LTC", rvol: 1.3, change: 1.8, volume: "60M" },
]

export default function RvolHeatmap() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {mockData.map((item) => (
        <motion.div
          key={item.symbol}
          whileHover={{ scale: 1.02, translateY: -2 }}
          className="glass-panel p-4 rounded-xl border border-white/5 hover:border-electric-blue/30 transition-all cursor-pointer group relative overflow-hidden"
        >
          {/* Rvol Intensity Background */}
          <div 
            className={cn(
              "absolute inset-0 opacity-10 -z-10",
              item.rvol >= 2 ? "bg-neon-magenta" : item.rvol >= 1.5 ? "bg-electric-blue" : "bg-white/5"
            )} 
          />
          
          <div className="flex justify-between items-start mb-3">
            <span className="font-bold text-lg tracking-tight group-hover:text-electric-blue transition-colors">{item.symbol}</span>
            <span className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded-full font-medium",
              item.change >= 0 ? "text-green-400 bg-green-400/10" : "text-red-400 bg-red-400/10"
            )}>
              {item.change >= 0 ? "+" : ""}{item.change}%
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px] text-white/50">
              <span className="font-medium">RVOL (30d)</span>
              <span className={cn(
                "font-bold",
                item.rvol >= 2 ? "text-neon-magenta" : item.rvol >= 1.5 ? "text-electric-blue" : "text-white/80"
              )}>
                {item.rvol.toFixed(1)}x
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((item.rvol / 3) * 100, 100)}%` }}
                className={cn(
                  "h-full",
                  item.rvol >= 2 ? "bg-neon-magenta shadow-[0_0_8px_rgba(255,0,122,0.6)]" : "bg-electric-blue shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                )}
              />
            </div>
          </div>

          <div className="mt-3 flex justify-between items-center text-[9px] font-mono text-white/20">
            <span>VOL: {item.volume}</span>
            <span className="group-hover:text-electric-blue transition-colors">DETAILS →</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
