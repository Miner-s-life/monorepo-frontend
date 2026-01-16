"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { TrendingUp, Mail, Lock, Loader2, ArrowRight, ShieldCheck, Coins, Database, Phone, MessageSquare, X } from "lucide-react"
import { cn } from "@/app/lib/utils"
import toast, { Toaster } from "react-hot-toast"
import { authApi } from "@/app/lib/api"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import CyberMascot from "@/app/components/CyberMascot"
import StatusModal from "@/app/components/StatusModal"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const signupRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^010-?\d{4}-?\d{4}$/, "Invalid phone format").optional().or(z.literal("")),
  comment: z.string().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>
type SignupRequestFormValues = z.infer<typeof signupRequestSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorInfo, setErrorInfo] = useState<{ title: string; message: string } | null>(null)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const signupRequestForm = useForm<SignupRequestFormValues>({
    resolver: zodResolver(signupRequestSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const response = await authApi.post("/api/v1/auth/login", data)
      const { accessToken, refreshToken } = response.data.data
      
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      
      toast.success("Successfully logged in!")
      router.push("/")
    } catch (error: any) {
      const data = error.response?.data
      const errorMessage = data?.error?.message || data?.message || "An unexpected error occurred."
      setErrorInfo({
        title: "Login Failed",
        message: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupRequestSubmit = async (data: SignupRequestFormValues) => {
    setIsLoading(true)
    try {
      await authApi.post("/api/v1/auth/signup-request", data)
      setIsSignupModalOpen(false)
      setIsSuccessModalOpen(true)
      signupRequestForm.reset()
    } catch (error: any) {
      const data = error.response?.data
      const errorMessage = data?.error?.message || data?.message || "Failed to submit signup request."
      setErrorInfo({
        title: "Request Failed",
        message: errorMessage
      })
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
                  autoComplete="email"
                  placeholder="name@example.com"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all",
                    errors.email && "border-red-500/50 focus:ring-red-500/50"
                  )}
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-400 mt-1 ml-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  {...register("password")}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={cn(
                    "w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all",
                    errors.password && "border-red-500/50 focus:ring-red-500/50"
                  )}
                />
              </div>
              {errors.password && <p className="text-[10px] text-red-400 mt-1 ml-1">{errors.password.message}</p>}
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

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <button 
              onClick={() => setIsSignupModalOpen(true)}
              className="text-sm font-semibold text-electric-blue/80 hover:text-electric-blue transition-all flex items-center gap-1.5"
            >
              Request Access
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a 
              href="mailto:cryptopedia.labs@gmail.com"
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5 font-mono"
            >
              <Mail className="w-3 h-3" />
              cryptopedia.labs@gmail.com
            </a>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-white/30 tracking-wide">
          &copy; 2026 Cryptopedia Labs. All rights reserved.
        </p>
      </motion.div>

      {/* Signup Request Modal */}
      <AnimatePresence>
        {isSignupModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSignupModalOpen(false)}
              className="absolute inset-0 bg-deep-space/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel w-full max-w-md p-8 rounded-[2.5rem] border border-white/10 relative z-10 overflow-hidden"
            >
              <button 
                onClick={() => setIsSignupModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Request Access</h2>
                <p className="text-white/40 text-sm font-medium">Join our exclusive market intelligence network.</p>
              </div>

              <form onSubmit={signupRequestForm.handleSubmit(onSignupRequestSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      {...signupRequestForm.register("email")}
                      type="email"
                      autoComplete="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-electric-blue/50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input
                      {...signupRequestForm.register("phoneNumber")}
                      autoComplete="tel"
                      className={cn(
                        "w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-electric-blue/50",
                        signupRequestForm.formState.errors.phoneNumber && "border-red-500/50"
                      )}
                      placeholder="010-XXXX-XXXX"
                    />
                  </div>
                  {signupRequestForm.formState.errors.phoneNumber && (
                    <p className="text-[10px] text-red-400 mt-1 ml-1">{signupRequestForm.formState.errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest ml-1">Comment</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                    <textarea
                      {...signupRequestForm.register("comment")}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-electric-blue/50 resize-none"
                      placeholder="Tell us about your trading experience..."
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-electric-blue hover:bg-electric-blue/90 text-deep-space font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Request"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StatusModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Request Received"
        description={
          <>
            Your application is being reviewed.<br />
            We will contact you at your email address shortly.
          </>
        }
      />

      <StatusModal 
        isOpen={!!errorInfo}
        onClose={() => setErrorInfo(null)}
        type="error"
        title={errorInfo?.title || "Error"}
        description={errorInfo?.message || ""}
        buttonText="Try Again"
      />
    </div>
  )
}
