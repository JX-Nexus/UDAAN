import { Inter } from 'next/font/google'
import ProtectedRoute from '@/components/ProtectedRoute'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute authentication={true}>
            {children}
        </ProtectedRoute>
        
          
        </body>
    </html>
  )
}