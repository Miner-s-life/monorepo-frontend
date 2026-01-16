"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface TickerData {
  symbol: string
  price: string
  change: number
  isUp: boolean
}

export default function LiveTickerBanner() {
  const [tickers, setTickers] = useState<TickerData[]>([
    { symbol: "BTC/USDT", price: "96,240.50", change: 2.4, isUp: true },
    { symbol: "ETH/USDT", price: "2,450.12", change: -1.2, isUp: false },
    { symbol: "SOL/USDT", price: "142.85", change: 5.7, isUp: true },
    { symbol: "XRP/USDT", price: "1.12", change: 0.8, isUp: true },
    { symbol: "ADA/USDT", price: "0.58", change: -2.1, isUp: false },
    { symbol: "DOGE/USDT", price: "0.38", change: 12.4, isUp: true },
  ])

  // Placeholder for real-time update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers(prev => prev.map(t => ({
        ...t,
        price: (parseFloat(t.price.replace(',', '')) * (1 + (Math.random() * 0.001 - 0.0005))).toFixed(2)
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-deep-space/80 border-y border-white/5 backdrop-blur-sm overflow-hidden h-10 flex items-center">
      <div className="flex items-center gap-2 px-4 border-r border-white/10 h-full bg-electric-blue/5">
        <Activity size={14} className="text-electric-blue animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-electric-blue/80">Live Stream</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap px-4"
        >
          {[...tickers, ...tickers].map((ticker, idx) => (
            <div key={`${ticker.symbol}-${idx}`} className="flex items-center gap-2 group cursor-pointer">
              <span className="text-xs font-bold text-white group-hover:text-electric-blue transition-colors">
                {ticker.symbol}
              </span>
              <span className="text-xs font-mono text-white/70">
                ${ticker.price}
              </span>
              <span className={cn(
                "text-[10px] font-mono flex items-center gap-0.5",
                ticker.isUp ? "text-green-400" : "text-red-400"
              )}>
                {ticker.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {ticker.change > 0 ? "+" : ""}{ticker.change}%
              </span>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-deep-space to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-deep-space to-transparent z-10" />
      </div>
    </div>
  )
}
