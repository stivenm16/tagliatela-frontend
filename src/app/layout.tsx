import { ReactQueryClientProvider } from '@/lib/ReactQueryClientProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Menu Tagliatela',
  description: 'Menu Tagliatela',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full antialiased bg-surface-2 text-accent-2 `}>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
