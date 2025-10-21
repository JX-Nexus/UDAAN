'use client'

import { Inter } from 'next/font/google'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect, useState } from 'react'
import authService from '@/services/auth.service'
import { useAppDispatch } from '@/lib/hooks'
import { login, logout } from '@/lib/slice/auth/authSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1️⃣ Try to get current user with access token
        const userData = await authService.getCurrentUser()

        if (userData?.success && userData.data) {
          dispatch(login({ userData: userData.data }))
        } else {
          dispatch(logout())
        }
      } catch (error: any) {
        console.warn('⚠️ Access token may be expired. Trying refresh...')

        try {
          // 2️⃣ Try refreshing access token
          const refreshRes = await authService.refreshAccessToken()
          if (refreshRes?.success) {
            console.log('✅ Access token refreshed successfully.')
            // 3️⃣ Re-fetch user after successful refresh
            const newUserData = await authService.getCurrentUser()
            if (newUserData?.success && newUserData.data) {
              dispatch(login({ userData: newUserData.data }))
            } else {
              dispatch(logout())
            }
          } else {
            console.error('❌ Refresh token invalid or expired.')
            dispatch(logout())
          }
        } catch (refreshError) {
          console.error('❌ Failed to refresh token:', refreshError)
          dispatch(logout())
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Checking authentication...
      </div>
    )
  }

  return (
    <div className={inter.className}>
      <ProtectedRoute authentication={true}>
        {children}
      </ProtectedRoute>
    </div>
  )
}
