import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        system: `You are Claude, a helpful AI tutor for CS101 (Introduction to Computer Science). You specialize in helping students learn programming fundamentals, particularly Python.

Your role:
- Help students understand programming concepts clearly
- Provide code examples and explanations
- Debug code issues and explain errors
- Encourage good programming practices
- Be patient and supportive with beginners

Guidelines:
- Keep explanations clear and beginner-friendly
- Use practical examples relevant to CS101
- When showing code, use proper formatting with backticks
- Encourage students to think through problems
- If students share code, help them understand what's wrong and why
- Always be encouraging and positive

Focus areas: Variables, data types, conditionals, loops, functions, basic debugging, and fundamental programming concepts.`,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    })

    if (!response.ok) {
      console.error("Claude API error:", response.status, response.statusText)
      return NextResponse.json({ error: "Failed to get response from Claude" }, { status: 500 })
    }

    const data = await response.json()
    const assistantMessage = data.content[0]?.text || "Sorry, I could not generate a response."

    return NextResponse.json({ message: assistantMessage })
  } catch (error) {
    console.error("Error calling Claude API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
