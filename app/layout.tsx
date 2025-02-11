import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/nav-bar"
import { SuggestedMealsSidebar } from "@/components/suggested-meals-sidebar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weit - Track Your Nutrition",
  description: "Smart nutrition tracking and meal planning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark min-h-screen`}>
        <div className="relative flex min-h-screen flex-col">
          <NavBar />
          <div className="flex flex-1">
            <main className="flex-1">{children}</main>
            <SuggestedMealsSidebar />
          </div>
        </div>
      </body>
    </html>
  )
}

