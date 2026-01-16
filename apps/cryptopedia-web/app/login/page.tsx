"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { TrendingUp, Mail, Lock, Loader2, ArrowRight, ShieldCheck, Coins, Database } from "lucide-react"
import { cn } from "@/app/lib/utils"
import toast, { Toaster } from "react-hot-toast"
import { authApi } from "@/app/lib/api"
import { useRouter } from "next/navigation"
import CyberMascot from "@/app/components/CyberMascot"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const response = await authApi.post("/auth/login", data)
      const { accessToken, refreshToken } = response.data
      
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      
      toast.success("Successfully logged in!")
      router.push("/")
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to login. Please check your credentials."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden mesh-gradient">
      <div className="absolute inset-0 noise-bg opacity-30" />
      <div className="absolute inset-0 crypto-grid opacity-10" />
      <div className="scanline" />
      
      {/* Matrix Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="data-stream left-[10%]" style={{ animationDelay: '0s', animationDuration: '12s' }} />
        <div className="data-stream left-[30%]" style={{ animationDelay: '2s', animationDuration: '15s' }} />
        <div className="data-stream left-[50%]" style={{ animationDelay: '5s', animationDuration: '10s' }} />
        <div className="data-stream left-[70%]" style={{ animationDelay: '1s', animationDuration: '18s' }} />
        <div className="data-stream left-[90%]" style={{ animationDelay: '4s', animationDuration: '13s' }} />
      </div>

      <Toaster position="top-right" />
      
      {/* Floating Crypto Assets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] animate-float-eth opacity-15">
          <Coins className="w-16 h-16 text-electric-blue" />
        </div>
        <div className="absolute bottom-[15%] right-[5%] animate-float-btc opacity-10">
          <Database className="w-24 h-24 text-neon-magenta" />
        </div>
        <div className="absolute top-[65%] left-[8%] animate-float-btc opacity-10 blur-[1px]">
          <TrendingUp className="w-12 h-12 text-electric-blue" />
        </div>
      </div>

      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-magenta/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 w-full max-w-md px-6"
      >
        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl relative overflow-hidden group">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-transparent shadow-[0_0_15px_rgba(88,166,255,0.5)]" />
          
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-electric-blue/5 rounded-full blur-3xl group-hover:bg-electric-blue/10 transition-all duration-700" />

          <CyberMascot />

          <div className="text-center mb-10 relative">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2 glitch-text">
              CRYPTOPEDIA <span className="text-electric-blue italic lowercase">intelligent</span>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/20" />
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black whitespace-nowrap">
                Real-time Market Insights
              </p>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@example.com"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all",
                    errors.email && "border-neon-magenta/50 focus:ring-neon-magenta/50"
                  )}
                />
              </div>
              {errors.email && <p className="text-xs text-neon-magenta mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-white/70 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all",
                    errors.password && "border-neon-magenta/50 focus:ring-neon-magenta/50"
                  )}
                />
              </div>
              {errors.password && <p className="text-xs text-neon-magenta mt-1 ml-1">{errors.password.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-electric-blue hover:bg-electric-blue/90 text-deep-space font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Connect Intelligence <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-white/30 tracking-wide">
          &copy; 2026 Cryptopedia Labs. All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}
