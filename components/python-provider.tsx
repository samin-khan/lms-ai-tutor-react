"use client"

import { useEffect } from "react"
import { PythonProvider } from "react-py"

interface PythonProviderWrapperProps {
  children: React.ReactNode
}

export function PythonProviderWrapper({ children }: PythonProviderWrapperProps) {
  useEffect(() => {
    // Register the service worker for react-py
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/react-py-sw.js')
        .then((registration) =>
          console.log(
            'React-py Service Worker registration successful with scope: ',
            registration.scope
          )
        )
        .catch((err) => console.log('React-py Service Worker registration failed: ', err))
    }
  }, [])

  return (
    <PythonProvider
      lazy={true}
      terminateOnCompletion={false}
    >
      {children}
    </PythonProvider>
  )
}
