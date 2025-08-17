"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function ClaudeChatContent() {
  const searchParams = useSearchParams()
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    const urlPrompt = searchParams.get("prompt")
    if (urlPrompt) {
      setPrompt(decodeURIComponent(urlPrompt))
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Chat with Claude AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Pre-filled Prompt:</h4>
                <p className="text-sm whitespace-pre-wrap">{prompt}</p>
              </div>

              <div className="border rounded-lg overflow-hidden" style={{ height: "600px" }}>
                <iframe
                  src={`https://claude.ai/chat?q=${encodeURIComponent(prompt)}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Claude AI Chat"
                  className="w-full h-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ClaudeChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClaudeChatContent />
    </Suspense>
  )
}
