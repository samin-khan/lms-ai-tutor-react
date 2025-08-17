"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Lightbulb, Code, HelpCircle, BookOpen, Zap, AlertCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  topic?: string
}

const quickActions = [
  {
    id: "variables",
    label: "Variables & Data Types",
    icon: Code,
    prompt: "Can you explain variables and data types in Python with examples?",
  },
  {
    id: "conditionals",
    label: "If Statements",
    icon: HelpCircle,
    prompt: "I'm having trouble with if/else statements. Can you help me understand them?",
  },
  {
    id: "loops",
    label: "Loops",
    icon: Zap,
    prompt: "How do for loops and while loops work in Python?",
  },
  {
    id: "functions",
    label: "Functions",
    icon: BookOpen,
    prompt: "Can you explain how to create and use functions in Python?",
  },
  {
    id: "debugging",
    label: "Debugging Help",
    icon: Lightbulb,
    prompt: "My code isn't working. Can you help me debug it?",
  },
]

export function ClaudePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: `Hello! I'm Claude, your CS101 AI tutor. I'm here to help you with programming concepts, debug your code, and answer any questions about the course material.

I can help you with:
• Variables and data types
• Control structures (if statements, loops)
• Functions and methods
• Debugging code issues
• Assignment questions
• General programming concepts

Feel free to ask me anything or use the quick action buttons below to get started!`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callClaudeAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      return data.message
    } catch (error) {
      console.error("Error calling Claude API:", error)
      throw error
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setError(null)

    try {
      const response = await callClaudeAPI(content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting Claude response:", error)
      setError("Sorry, I encountered an error. Please try again.")

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I'm sorry, but I'm having trouble connecting right now. Please make sure the Claude API key is configured in your Vercel project settings and try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: any) => {
    handleSendMessage(action.prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
              <Bot className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="font-serif">Claude AI Tutor</CardTitle>
              <CardDescription>Your personal CS101 programming assistant</CardDescription>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {process.env.NEXT_PUBLIC_VERCEL_ENV ? "Online" : "Demo Mode"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Error Alert */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Help Topics</CardTitle>
          <CardDescription>Click on a topic to get instant help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="justify-start h-auto p-3 bg-transparent"
                  onClick={() => handleQuickAction(action)}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <CardTitle className="text-lg">Chat with Claude</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0">
          <div className="h-[500px] flex flex-col px-6">
            <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-accent-foreground" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {message.type === "user" && (
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-3">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="h-2 w-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="flex gap-2 px-6 pb-6 flex-shrink-0">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about CS101..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
