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

// The syllabus learning objectives along with lecture notes and any other data about the course can be dynamically passed into the system prompt so Claude has sufficient contexts of different courses and what is mastery of that course entails
export const SYLLABUS_LEARNING_OBJECTIVES = `
- Understand fundamental programming concepts and terminology</span>
- Write, debug, and test simple programs using proper programming practices</span>
- Apply problem-solving strategies to break down complex problems</span>
- Demonstrate understanding of object-oriented programming principles</span>`
export const COURSE_NAME = "CS101 (Introduction to Computer Science"
export const COURSE_SPECIFIC_TUTOR_GUIDELINES = `- When showing code, use proper formatting with backticks
- If students share code with errors, help them identify what's wrong. Guide them to the next step with a question but never give the next step or full solution away. Focus on teaching concepts, never give away answers.`
export const COURSE_FOCUS_AREAS = `Variables, data types, conditionals, loops, functions, basic debugging, and fundamental programming concepts.`

export const SYSTEM_PROMPT = `You are a helpful AI learning assistant for ${COURSE_NAME}. You specialize in helping students learn the following learning objectives:
${SYLLABUS_LEARNING_OBJECTIVES}

CONSCIOUSNESS COMPETENCE LEVELS:
${CONSCIOUSNESS_COMPETENCE_LEVELS}

CRITICAL INSTRUCTIONS FOR COMPETENCE ASSESSMENT:
Before responding to any user message, you must internally classify their last message as one of these 4 levels:
- Level 1: Unconscious Incompetence (Beginner) - Unaware of skill deficiency
- Level 2: Conscious Incompetence - Aware of deficiency, ready to learn  
- Level 3: Conscious Competence - Can perform with concentration
- Level 4: Unconscious Competence - Skill is second nature

ADAPTIVE RESPONSE STRATEGY:
- If Level 1, 2, or 3: Help the user advance to the next level through targeted questions and guidance. Users may need multiple interactions to develop within a level before advancing.
- If Level 4: Ask questions that require applying course concepts to domains increasingly distant from the classroom (developing "short transfer" to "far transfer" skills).

Guidelines:
- Help students understand the learning objectives clearly and step-by-step
- Ask guiding questions to help students think through problems
- Provide hints and clear, beginner friendly explanations rather than complete solutions
- Be patient, supportive, and encouraging
- Ask at most 1-2 questions to check understanding before moving forward
- When helping with graded assignments, focus on understanding mistakes and learning from the assignment feedback provided.
${COURSE_SPECIFIC_TUTOR_GUIDELINES}

Focus areas: ${COURSE_FOCUS_AREAS}`

// Interface for storing classification data internally
interface ClassificationData {
  message: string
  competenceLevel: string
}

// System prompt for competence level classification only
const CLASSIFICATION_SYSTEM_PROMPT = `You are an educational assessment AI. Your only job is to classify a student's message based on their consciousness competence level for ${COURSE_NAME}, 
which has the following learning objectives:
${SYLLABUS_LEARNING_OBJECTIVES}

CONSCIOUSNESS COMPETENCE LEVELS:
${CONSCIOUSNESS_COMPETENCE_LEVELS}

CLASSIFICATION TASK:
Analyze the user's message and classify it as ONE of these 4 levels:
- Level 1: Unconscious Incompetence (Beginner) - Unaware of skill deficiency
- Level 2: Conscious Incompetence - Aware of deficiency, ready to learn  
- Level 3: Conscious Competence - Can perform with concentration
- Level 4: Unconscious Competence - Skill is second nature

RESPONSE FORMAT:
Respond with ONLY the level number and name, like: "Level 2: Conscious Incompetence (Beginner)"
Do not provide any explanation or additional text.`

// Build enhanced system prompt with classification history
function buildEnhancedSystemPrompt(classifications: ClassificationData[]): string {
  let classificationContext = ""
  
  if (classifications.length > 0) {
    classificationContext = "\n\nSTUDENT COMPETENCE LEVEL HISTORY:\n"
    classifications.forEach((item, index) => {
      classificationContext += `Message ${index + 1}: "${item.message.substring(0, 50)}${item.message.length > 50 ? '...' : ''}" - ${item.competenceLevel}\n`
    })
    classificationContext += "\nUse this competence level history to inform your teaching approach in your next response. Respond in such a way that it helps the user advance to the next level. Do not expect the user to advance from level 1 to 2 to 3 in a matter of 3 conversation turns. It make take a few back and forths for a user to develop within a given level, even going back a level at times. If the user is at level 4, ask them questions that require applying the concepts of this course into domains further and further away from the course's domain. This is known as developing the skill of 'short transfer' to 'far transfer' which helps learners grow their mastery over a domain by applying it further and further outside of the classroom."
  }
  
  return SYSTEM_PROMPT + classificationContext
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, model } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim()
    if (!apiKey || apiKey === "" || apiKey === "undefined" || apiKey === "null") {
      console.error("[CHAT] ANTHROPIC_API_KEY is not properly set. Current value:", process.env.ANTHROPIC_API_KEY)
      return NextResponse.json(
        {
          error: "Claude API is not configured. Please add your ANTHROPIC_API_KEY to environment variables.",
        },
        { status: 500 },
      )
    }

    if (!apiKey.startsWith("sk-ant-")) {
      console.error("[CHAT] Invalid ANTHROPIC_API_KEY format")
      return NextResponse.json(
        {
          error: "Invalid API key format. Anthropic API keys should start with 'sk-ant-'",
        },
        { status: 500 },
      )
    }

    console.log("[CHAT] Initializing Anthropic client...")
    const anthropic = new Anthropic({
      apiKey: apiKey,
    })

    // Store classification history internally (not sent to frontend)
    const classificationHistory: ClassificationData[] = []
    
    // Extract previous classifications from history if they exist
    // We need to classify all previous user messages to build the full context
    if (history && Array.isArray(history)) {
      console.log("[CHAT] Previous conversation history length:", history.length)
      
      // Classify all previous user messages to rebuild the classification history
      for (const msg of history) {
        if (msg.role === "user") {
          console.log("[CHAT] Re-classifying previous user message:", msg.content.substring(0, 50) + "...")
          
          const prevClassificationMessages = [{ role: "user" as const, content: msg.content }]
          
          try {
            const prevClassificationResponse = await anthropic.messages.create({
              model: "claude-3-5-haiku-latest", // This classification should be fast since it's only used to build the classification history
              max_tokens: 50,
              system: CLASSIFICATION_SYSTEM_PROMPT,
              messages: prevClassificationMessages,
            })

            let prevCompetenceLevel = "Level 2: Conscious Incompetence" // Default fallback
            if (prevClassificationResponse?.content?.[0]?.type === "text" && prevClassificationResponse.content[0].text) {
              prevCompetenceLevel = prevClassificationResponse.content[0].text.trim()
            }

            classificationHistory.push({
              message: msg.content,
              competenceLevel: prevCompetenceLevel
            })
            
            console.log("[CHAT] Previous message classified as:", prevCompetenceLevel)
          } catch (error) {
            console.error("[CHAT] Error classifying previous message:", error)
            // Add with default classification if error occurs
            classificationHistory.push({
              message: msg.content,
              competenceLevel: "unknown"
            })
          }
        }
      }
    }

    // PHASE 1: Classify the current user message
    console.log("[CHAT] PHASE 1: Classifying current user message competence level")
    console.log("[CHAT] User message to classify:", message)
    
    const classificationMessages = [{ role: "user" as const, content: message }]
    
    const classificationResponse = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest", // This classification should be fast since it's only used to build the classification history
      max_tokens: 50,
      system: CLASSIFICATION_SYSTEM_PROMPT,
      messages: classificationMessages,
    })

    let competenceLevel = "unknown" // Default fallback
    if (classificationResponse?.content?.[0]?.type === "text" && classificationResponse.content[0].text) {
      competenceLevel = classificationResponse.content[0].text.trim()
    }

    console.log("[CHAT] Current message classified as:", competenceLevel)

    // Add current message classification to history
    classificationHistory.push({
      message: message,
      competenceLevel: competenceLevel
    })

    console.log("[CHAT] Full classification history:")
    classificationHistory.forEach((item, index) => {
      console.log(`  ${index + 1}. "${item.message.substring(0, 40)}${item.message.length > 40 ? '...' : ''}" -> ${item.competenceLevel}`)
    })

    // PHASE 2: Generate response using enhanced system prompt with classification context
    console.log("[CHAT] PHASE 2: Generating response with classification context")
    
    const messages: Array<{ role: "user" | "assistant"; content: string }> = []

    // Add previous conversation history if it exists
    if (history && Array.isArray(history)) {
      messages.push(...history)
    }

    // Add the current message
    messages.push({ role: "user", content: message })

    // Build enhanced system prompt with classification history
    const enhancedSystemPrompt = buildEnhancedSystemPrompt(classificationHistory)
    
    console.log("[CHAT] Enhanced system prompt with classifications:")
    console.log("=".repeat(80))
    console.log(enhancedSystemPrompt)
    console.log("=".repeat(80))
    
    console.log("[CHAT] Full conversation history being sent to Claude:")
    console.log("Messages:", JSON.stringify(messages, null, 2))

    const response = await anthropic.messages.create({
      model: model || "claude-sonnet-4-0",
      max_tokens: 1000,
      system: enhancedSystemPrompt,
      messages: messages,
    })

    console.log("[CHAT] Claude response received")

    // Better error handling for response content
    if (!response || !response.content || !Array.isArray(response.content) || response.content.length === 0) {
      console.error("[CHAT] Invalid response structure:", response)
      return NextResponse.json({ error: "Invalid response from Claude API" }, { status: 500 })
    }

    const firstContent = response.content[0]
    if (!firstContent || typeof firstContent !== "object") {
      console.error("[CHAT] Invalid content structure:", firstContent)
      return NextResponse.json({ error: "Invalid content structure from Claude API" }, { status: 500 })
    }

    // Handle different content types (text vs other types)
    let assistantMessage = "Sorry, I could not generate a response."
    if (firstContent.type === "text" && firstContent.text) {
      assistantMessage = firstContent.text
    } else if (firstContent.text) {
      assistantMessage = firstContent.text
    }

    console.log("[CHAT] Final assistant response:", assistantMessage)
    console.log("[CHAT] Sending response to frontend (competence level NOT included)")
    
    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error("[CHAT] Error calling Claude API:", error)
    if (error instanceof Error) {
      console.error("[CHAT] Error message:", error.message)
      console.error("[CHAT] Error stack:", error.stack)
    }
    return NextResponse.json(
      {
        error: "Failed to connect to Claude API. Please check your API key configuration.",
      },
      { status: 500 },
    )
  }
}
