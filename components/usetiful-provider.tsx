"use client"

import { useEffect } from "react"
import { loadUsetifulScript } from "usetiful-sdk"

export function UsetifulProvider() {
  useEffect(() => {
    // Initialize Usetiful script with your unique token
    loadUsetifulScript("436865c0327c01c76448075df7f57eec")
  }, [])

  return null // This component doesn't render anything
}