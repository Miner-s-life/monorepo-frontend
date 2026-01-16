"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  accessToken: string | null
  refreshToken: string | null
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const at = localStorage.getItem('accessToken')
    const rt = localStorage.getItem('refreshToken')
    if (at && rt) {
      setAccessToken(at)
      setRefreshToken(rt)
    }
    setIsInitialized(true)
  }, [])

  const setTokens = (at: string, rt: string) => {
    localStorage.setItem('accessToken', at)
    localStorage.setItem('refreshToken', rt)
    setAccessToken(at)
    setRefreshToken(rt)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setAccessToken(null)
    setRefreshToken(null)
    router.push('/login')
  }

  const isAuthenticated = !!accessToken

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, setTokens, logout, isAuthenticated }}>
      {isInitialized ? children : <div className="min-h-screen bg-background flex items-center justify-center text-electric-blue">Initializing...</div>}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
