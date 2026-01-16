"use client"

import { motion } from "framer-motion"
import { TrendingUp, Cpu, Sparkles } from "lucide-react"

export default function CyberMascot() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center mx-auto mb-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-electric-blue/20 rounded-full blur-[40px] animate-pulse" />
      
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        {/* Mascot Body (Orb Style) */}
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-electric-blue/40 to-deep-space border border-electric-blue/30 backdrop-blur-xl flex items-center justify-center relative overflow-hidden group shadow-[0_0_30px_rgba(88,166,255,0.2)]">
          
          {/* Animated Internal Circuits */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-electric-blue animate-scan shadow-[0_0_10px_#58A6FF]" />
          </div>

          {/* Eyes / Face */}
          <div className="flex gap-4 items-center justify-center">
            <motion.div 
              animate={{ 
                scaleY: [1, 1, 0.1, 1],
                boxShadow: ["0 0 15px #58A6FF", "0 0 25px #58A6FF", "0 0 15px #58A6FF"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.55, 1]
              }}
              className="w-3 h-6 bg-electric-blue rounded-full" 
            />
            <motion.div 
              animate={{ 
                scaleY: [1, 1, 0.1, 1],
                boxShadow: ["0 0 15px #58A6FF", "0 0 25px #58A6FF", "0 0 15px #58A6FF"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.55, 1]
              }}
              className="w-3 h-6 bg-electric-blue rounded-full" 
            />
          </div>

          {/* Core Sparkle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-2 -right-2 p-2 bg-background border border-electric-blue/20 rounded-xl"
          >
            <Cpu className="w-4 h-4 text-electric-blue" />
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute -top-4 -left-4">
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-electric-blue" />
          </motion.div>
        </div>
        <div className="absolute -bottom-2 -right-6">
          <motion.div
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <TrendingUp className="w-4 h-4 text-neon-magenta" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
