'use client'

import React from 'react'
import { useAppSelector } from '@/lib/hooks'

export default function UserAvatar() {
  const user = useAppSelector((state) => state.auth.userData)
  const name = user?.name || 'User'
  const firstLetter = name.charAt(0).toUpperCase()
    console.log(user)
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-semibold shadow-md select-none"
      title={name}
    >
      {firstLetter}
    </div>
  )
}
