import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'

import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  title: 'Potluck Planner',
  description: 'Simple potluck planning - track guests and what they bring',
}

export const viewport: Viewport = {
  themeColor: '#d4663a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
