'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  authentication?: boolean // true = protected page, false = guest-only page
}

export default function ProtectedRoute({
  children,
  authentication = true,
}: ProtectedRouteProps) {
  const router = useRouter()
  const { status, userData } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // If page requires authentication but user is not logged in → redirect to login
    if (authentication && !status) {
      router.replace('/sign-in')
    }

    // If page is guest-only but user *is* logged in → redirect to dashboard
    if (!authentication && status) {
      router.replace('/dashboard')
    }
  }, [authentication, status, router])

  // prevent flashing unauthorized content during redirect
  if (authentication && !status) {
    return null // could show a loader/spinner here
  }

  return <>{children}</>
}
