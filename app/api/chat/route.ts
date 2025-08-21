import { type NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

export const runtime = "nodejs"

export const CONSCIOUSNESS_COMPETENCE_LEVELS = `
Level 1: Unconscious Incompetence
	•	The person is not aware of the existence or relevance of the skill area
	•	The person is not aware that they have a particular deficiency in the area concerned
	•	The person might deny the relevance or usefulness of the new skill
	•	The person must become conscious of their incompetence before development of the new skill or learning can begin
	•	The aim of the trainee/learner and the trainer/teacher is to move the person into the “conscious incompetence” stage, by demonstrating the skill or ability and the benefit that it will bring to the person's effectiveness

⸻

Level 2: Conscious Incompetence
	•	The person becomes aware of the existence and relevance of the skill
	•	The person is aware of their deficiency in this area, ideally by attempting or trying to use the skill
	•	The person realizes that by improving their skill or ability in this area, their effectiveness will improve
	•	Ideally the person has a measure of the extent of their deficiency in the relevant skill, and a measure of what level of skill is required for their own competence
	•	The person ideally makes a commitment to learn and practice the new skill, and to move to the “conscious competence” stage

⸻

Level 3: Conscious Competence
	•	The person achieves “conscious competence” in a skill when they can perform it reliably at will
	•	The person will need to concentrate and think in order to perform the skill
	•	The person can perform the skill without assistance
	•	The person will not reliably perform the skill unless thinking about it - the skill is not yet “second nature” or “automatic”
	•	The person should be able to demonstrate the skill to another, but is unlikely to be able to teach it well to another person
	•	The person should ideally continue to practice the new skill, and if appropriate commit to becoming “unconsciously competent” at the new skill
	•	Practice is the single most effective way to move from stage 3 to stage 4

⸻

Level 4: Unconscious Competence
	•	The skill becomes so practiced that it enters the unconscious parts of the brain - it becomes “second nature”
	•	Common examples are driving, sports activities, typing, manual dexterity tasks, listening and communicating
	•	It becomes possible for certain skills to be performed while doing something else (e.g., knitting while reading a book)
	•	The person might now be able to teach others in the skill concerned, although after some time of being unconsciously competent the person might actually have difficulty in explaining exactly how they do it - the skill has become largely instinctual
	•	This arguably gives rise to the need for long-standing unconscious competence to be checked periodically against new standards
`

export const syllabus_learning_objectives = `
- Understand fundamental programming concepts and terminology</span>
- Write, debug, and test simple programs using proper programming practices</span>
- Apply problem-solving strategies to break down complex problems</span>
- Demonstrate understanding of object-oriented programming principles</span>
`

export async function POST(request: NextRequest) {
  try {
    const { message, history, model } = await request.json()

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
      model: model || "claude-sonnet-4-0",
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

Focus areas: Variables, data types, conditionals, loops, functions, basic debugging, and fundamental programming concepts.
`,
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
