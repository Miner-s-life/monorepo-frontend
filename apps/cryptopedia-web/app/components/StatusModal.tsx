"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, AlertCircle, X } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface StatusModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: React.ReactNode
  buttonText?: string
  type?: "success" | "error"
}

export default function StatusModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  buttonText = "Got it",
  type = "success"
}: StatusModalProps) {
  const isSuccess = type === "success"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-deep-space/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-panel w-full max-w-sm p-8 rounded-[2.5rem] border border-white/10 relative z-10 text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
              isSuccess ? "bg-green-500/20" : "bg-red-500/20"
            )}>
              {isSuccess ? (
                <ShieldCheck className="w-8 h-8 text-green-400" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-400" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h2>
            <div className="text-white/60 text-sm leading-relaxed mb-8">
              {description}
            </div>
            
            <button
              onClick={onClose}
              className={cn(
                "w-full font-bold py-3 rounded-xl transition-all border",
                isSuccess 
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/10" 
                  : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
              )}
            >
              {buttonText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
