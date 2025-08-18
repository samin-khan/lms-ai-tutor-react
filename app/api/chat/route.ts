import { type NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
    if (!apiKey || apiKey === "" || apiKey === "undefined" || apiKey === "null") {
      console.error("[v0] ANTHROPIC_API_KEY is not properly set. Current value:", process.env.ANTHROPIC_API_KEY)
      return NextResponse.json(
        {
          error: "Claude API is not configured. Please add your ANTHROPIC_API_KEY to environment variables.",
        },
        { status: 500 },
      )
    }

    if (!apiKey.startsWith("sk-ant-")) {
      console.error("[v0] Invalid ANTHROPIC_API_KEY format")
      return NextResponse.json(
        {
          error: "Invalid API key format. Anthropic API keys should start with 'sk-ant-'",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Initializing Anthropic client...")
    const anthropic = new Anthropic({
      apiKey: apiKey,
    })

    const messages: Array<{ role: "user" | "assistant"; content: string }> = []

    // Add previous conversation history if it exists
    if (history && Array.isArray(history)) {
      messages.push(...history)
    }

    // Add the current message
    messages.push({ role: "user", content: message })

    console.log("[v0] Sending conversation to Claude:", messages)
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      system: `You are Claude, a helpful AI tutor for CS101 (Introduction to Computer Science). You specialize in helping students learn programming fundamentals, particularly Python.

Your role:
- Help students understand programming concepts clearly and step-by-step
- Ask guiding questions to help students think through problems
- Provide hints and explanations rather than complete solutions
- Debug code issues and explain errors in detail
- Encourage good programming practices
- Be patient, supportive, and encouraging with beginners

Guidelines:
- Keep explanations clear and beginner-friendly
- Use practical examples relevant to CS101
- When showing code, use proper formatting with backticks
- Ask questions to check understanding before moving forward
- If students share code with errors, help them identify what's wrong and guide them to the solution
- Focus on teaching concepts, not just giving answers
- Always be encouraging and positive
- When helping with graded assignments, focus on understanding mistakes and learning from feedback

Focus areas: Variables, data types, conditionals, loops, functions, basic debugging, and fundamental programming concepts.`,
      messages: messages,
    })

    console.log("[v0] Claude response received")

    // Better error handling for response content
    if (!response || !response.content || !Array.isArray(response.content) || response.content.length === 0) {
      console.error("[v0] Invalid response structure:", response)
      return NextResponse.json({ error: "Invalid response from Claude API" }, { status: 500 })
    }

    const firstContent = response.content[0]
    if (!firstContent || typeof firstContent !== "object") {
      console.error("[v0] Invalid content structure:", firstContent)
      return NextResponse.json({ error: "Invalid content structure from Claude API" }, { status: 500 })
    }

    // Handle different content types (text vs other types)
    let assistantMessage = "Sorry, I could not generate a response."
    if (firstContent.type === "text" && firstContent.text) {
      assistantMessage = firstContent.text
    } else if (firstContent.text) {
      assistantMessage = firstContent.text
    }

    console.log("[v0] Sending response")
    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error("[v0] Error calling Claude API:", error)
    if (error instanceof Error) {
      console.error("[v0] Error message:", error.message)
      console.error("[v0] Error stack:", error.stack)
    }
    return NextResponse.json(
      {
        error: "Failed to connect to Claude API. Please check your API key configuration.",
      },
      { status: 500 },
    )
  }
}
