import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { UsetifulProvider } from "../components/usetiful-provider"
import { PythonProviderWrapper } from "../components/python-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "CS101 - Learning Management System",
  description: "CS101 Course Management System with AI Tutoring",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <style>{`
html {
  --font-serif: ${playfair.style.fontFamily};
  --font-sans: ${sourceSans.style.fontFamily};
}
        `}</style>
      </head>
      <body className="antialiased">
        <UsetifulProvider />
        <PythonProviderWrapper>
          {children}
        </PythonProviderWrapper>
      </body>
    </html>
  )
}
