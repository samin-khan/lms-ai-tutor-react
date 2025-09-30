"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, Code, BookOpen, Zap, ChevronDown, Check, Play, X, BrainCircuit } from "lucide-react"
import Image from "next/image"
import { InteractiveLearning } from "@/components/interactive-learning"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  topic?: string
  competenceLevel?: string
}

const quickActions = [
  {
    id: "variables",
    label: "Variables & Data Types",
    icon: Code,
    prompt: "Can you explain variables and data types in Python with examples?",
  },
  {
    id: "functions",
    label: "Functions",
    icon: BookOpen,
    prompt: "Can you explain how to create and use functions in Python?",
  },
  {
    id: "loops",
    label: "Loops",
    icon: Zap,
    prompt: "How do for loops and while loops work in Python?",
  },
]

const currentAssignments = [
  {
    id: 3,
    title: "Assignment 3: Control Structures",
    description: "Implement conditional statements and decision-making logic",
    dueDate: "2024-02-05",
    points: 50,
    instructions:
      "Create a Python program that uses nested conditional statements to build a simple decision-making system. Implement a student course recommendation system that takes student GPA, preferred difficulty level, and available time as inputs. Use nested if/elif/else statements to recommend appropriate courses. Include input validation and comprehensive testing.",
    rubric: {
      criteria: [
        { name: "Code Functionality", points: 20, description: "Program runs correctly and produces expected output" },
        { name: "Code Style", points: 10, description: "Proper indentation, naming conventions, and comments" },
        {
          name: "Logic Implementation",
          points: 15,
          description: "Correct use of if/else statements and boolean logic",
        },
        { name: "Testing", points: 5, description: "Adequate test cases provided" },
      ],
    },
  },
  {
    id: 4,
    title: "Assignment 4: Loop Exercises",
    description: "Practice with for loops, while loops, and nested iterations",
    dueDate: "2024-02-12",
    points: 60,
    instructions:
      "Implement three different programs demonstrating mastery of loop structures: 1) A multiplication table generator using nested for loops, 2) A number guessing game using while loops with proper input validation, 3) A pattern printer that creates various ASCII art patterns using nested loops. Each program should include error handling and user-friendly interfaces.",
    rubric: {
      criteria: [
        { name: "Loop Implementation", points: 25, description: "Correct use of different loop types" },
        { name: "Efficiency", points: 15, description: "Optimal loop design and performance" },
        { name: "Code Quality", points: 15, description: "Clean, readable, and well-documented code" },
        { name: "Problem Solving", points: 5, description: "Creative solutions to complex problems" },
      ],
    },
  },
]

const gradedAssignments = [
  {
    id: 1,
    title: "Assignment 1: Basic Variables",
    submittedDate: "2024-01-22",
    gradedDate: "2024-01-24",
    score: 38,
    totalPoints: 50,
    grade: "B-",
    instructions:
      "Create a Python program that demonstrates proper variable declaration, data type usage, and basic operations. Include variables for personal information (name, age, student ID, GPA) and perform calculations to show understanding of numeric operations and string formatting.",
    rubric: {
      criteria: [
        { name: "Code Functionality", points: 20, description: "Program runs correctly and produces expected output" },
        { name: "Code Style", points: 10, description: "Proper indentation, naming conventions, and comments" },
        { name: "Variable Usage", points: 15, description: "Correct declaration and use of different data types" },
        { name: "Documentation", points: 5, description: "Adequate comments and code documentation" },
      ],
    },
    feedback: {
      overall:
        "Your variable declarations show basic understanding, but there are several areas needing improvement. The main issues are inconsistent variable naming, missing error handling, and insufficient documentation.",
      criteria: [
        {
          name: "Code Functionality",
          earned: 16,
          total: 20,
          feedback: "Code runs but has logic errors in GPA calculation. Missing validation for negative values.",
        },
        {
          name: "Code Style",
          earned: 6,
          total: 10,
          feedback:
            "Inconsistent naming conventions (mix of camelCase and snake_case). Poor indentation in some areas.",
        },
        {
          name: "Variable Usage",
          earned: 12,
          total: 15,
          feedback:
            "Good understanding of basic types, but incorrect use of integer division instead of float division.",
        },
        {
          name: "Documentation",
          earned: 4,
          total: 5,
          feedback: "Basic comments present but lack explanation of calculation logic.",
        },
      ],
    },
    codeExample: `# Student Solution - Assignment 1
# Variable declarations and basic operations

# Personal information variables
name = "John Doe"
age = 19
studentID = 12345  # Inconsistent naming convention
gpa = 3.75

# Calculate years until graduation - Logic error here
years_to_graduate = 4 - 1
print(f"Hello {name}, you have {years_to_graduate} years until graduation!")

# GPA calculation - Missing validation
total_credits = 15
quality_points = gpa * total_credits  # Should validate GPA range
print(f"Your current quality points: {quality_points}")

# Missing: Error handling for invalid inputs`,
  },
  {
    id: 2,
    title: "Assignment 2: Conditionals",
    submittedDate: "2024-01-29",
    gradedDate: "2024-01-31",
    score: 33,
    totalPoints: 50,
    grade: "C+",
    instructions:
      "Implement a grade calculator using conditional statements (if/elif/else). The program should accept numeric scores and return letter grades. Include proper error handling for invalid inputs and test with multiple score values to demonstrate understanding of conditional logic.",
    rubric: {
      criteria: [
        { name: "Code Functionality", points: 20, description: "Program runs correctly and produces expected output" },
        { name: "Code Style", points: 10, description: "Proper indentation, naming conventions, and comments" },
        {
          name: "Logic Implementation",
          points: 15,
          description: "Correct use of if/else statements and boolean logic",
        },
        { name: "Testing", points: 5, description: "Adequate test cases provided" },
      ],
    },
    feedback: {
      overall:
        "Basic understanding of conditionals is evident, but the implementation has significant flaws. Major issues include missing edge case handling, incorrect boundary conditions, and inadequate testing coverage.",
      criteria: [
        {
          name: "Code Functionality",
          earned: 12,
          total: 20,
          feedback:
            "Function works for basic cases but fails on boundary values (exactly 90, 80, etc.). No input validation for non-numeric values.",
        },
        {
          name: "Code Style",
          earned: 7,
          total: 10,
          feedback: "Generally clean code but missing docstring and some variable names could be more descriptive.",
        },
        {
          name: "Logic Implementation",
          earned: 9,
          total: 15,
          feedback:
            "Basic conditional structure correct, but boundary conditions are wrong (should use >= not >). Missing handling for scores above 100 or below 0.",
        },
        { name: "Testing", earned: 5, total: 5, feedback: "Good variety of test cases provided." },
      ],
    },
    codeExample: `# Student Solution - Assignment 2
# Grade calculator with conditional logic

def calculate_grade(score):
    # Missing input validation and docstring
    if score > 90:  # Should be >= 90
        return "A"
    elif score > 80:  # Should be >= 80
        return "B"
    elif score > 70:  # Should be >= 70
        return "C"
    elif score > 60:  # Should be >= 60
        return "D"
    else:
        return "F"
    # Missing: handling for scores > 100 or < 0

# Test the function
test_scores = [95, 87, 73, 65, 45]
for score in test_scores:
    grade = calculate_grade(score)
    print(f"Score: {score} -> Grade: {grade}")
    
# Missing: test cases for boundary values (90, 80, 70, 60)`,
  },
]

function buildClaudePrompt(assignmentId: number): string {
  const currentAssignment = currentAssignments.find((a) => a.id === assignmentId)
  if (currentAssignment) {
    return `Help me with ${currentAssignment.title}

Assignment Instructions: ${currentAssignment.instructions}

Rubric:
${currentAssignment.rubric.criteria
  .map((criterion: any) => `- ${criterion.name} (${criterion.points} points): ${criterion.description}`)
  .join("\n")}

Please help me understand the requirements. You can ask me a question to help me get to the next step but never provide the next step directly for me and never provide the answer directly. Keep your responses short and ask one question at a time.`
  }

  const gradedAssignment = gradedAssignments.find((a) => a.id === assignmentId)
  if (gradedAssignment) {
    return `Help me with ${gradedAssignment.title}

Assignment Details:
- Title: ${gradedAssignment.title}
- Instructions: ${gradedAssignment.instructions}
- My Score: ${gradedAssignment.score}/${gradedAssignment.totalPoints} (${gradedAssignment.grade})
- Submission Date: ${gradedAssignment.submittedDate}

Rubric Breakdown:
${gradedAssignment.feedback.criteria
  .map((criterion: any) => `- ${criterion.name}: ${criterion.earned}/${criterion.total} - ${criterion.feedback}`)
  .join("\n")}

Overall Instructor Feedback: ${gradedAssignment.feedback.overall}

My Code:
${gradedAssignment.codeExample}

Please help me understand my mistakes and how to improve for future assignments. Focus on the specific issues mentioned in the feedback and ask me questions to help me learn from these errors. Never provide the answer directly. Keep your responses short and ask one question at a time.`
  }

  return `Help me with Assignment ${assignmentId}

I need assistance with this assignment. Please ask me questions to understand what I'm working on and guide me through the problem-solving process.`
}

export function ClaudePage({ assignmentId }: { assignmentId?: number }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: assignmentId
        ? `Hello! I'm your CS101 AI tutor. I see you need help with an assignment. I'm here to guide you through understanding the concepts and requirements. Let me know what specific questions you have!`
        : `Hello! I'm your CS101 AI tutor. I'm here to help you with programming concepts, debug your code, and answer any questions about the course material.

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
  const hasInitializedRef = useRef<number | null>(null)

  const [showInteractiveLearning, setShowInteractiveLearning] = useState(false)
  const [currentCode, setCurrentCode] = useState("")
  const [consoleOutput, setConsoleOutput] = useState("")
  const [testResults, setTestResults] = useState<Array<{ name: string; passed: boolean; message?: string }>>([])
  const [runAttempts, setRunAttempts] = useState(0)

  useEffect(() => {
    if (assignmentId && hasInitializedRef.current !== assignmentId) {
      hasInitializedRef.current = assignmentId
      const prompt = buildClaudePrompt(assignmentId)
      handleSendMessage(prompt)
    }
  }, [assignmentId])

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

  const callClaudeAPI = async (message: string): Promise<{ response: string; competenceLevel?: string }> => {
    try {
      // Convert messages to API format, excluding welcome message
      const history = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
          content: msg.content,
          competenceLevel: msg.competenceLevel, // Include competence level for user messages
        }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history, model: "claude-sonnet-4-5" }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      return {
        response: data.response,
        competenceLevel: data.competenceLevel,
      }
    } catch (error) {
      console.error("Error calling Claude API:", error)
      throw error
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    let enhancedContent = content.trim()
    if (showInteractiveLearning) {
      enhancedContent = `${content.trim()}

[STUDENT_CODE]
${currentCode || "No code written yet"}

[CONSOLE_OUTPUT]
${consoleOutput || "No output yet"}

[TEST_RESULTS]
${testResults.length > 0 ? testResults.map((test) => `- ${test.name}: ${test.passed ? "✅ Passed" : "❌ Failed" + (test.message ? ` - ${test.message}` : "")}`).join("\n") : "No tests run yet"}

[INTERACTION_HISTORY]
- Run attempts: ${runAttempts}
- Current assignment: Grade Calculator with conditional statements`
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(), // Store original content for display
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setError(null)

    try {
      const { response, competenceLevel } = await callClaudeAPI(enhancedContent)

      // Update the user message with the competence level
      setMessages((prev) =>
        prev.map((msg) => (msg.id === userMessage.id ? { ...msg, competenceLevel: competenceLevel } : msg)),
      )

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

  const handleInteractiveLearningUpdate = (
    code: string,
    output: string,
    tests: Array<{ name: string; passed: boolean; message?: string }>,
    attempts: number,
  ) => {
    setCurrentCode(code)
    setConsoleOutput(output)
    setTestResults(tests)
    setRunAttempts(attempts)
  }

  return (
    <div className="w-full max-w-none space-y-4">
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-3xl font-medium text-gray-800">Good afternoon, Student</h1>
        </div>
        <p className="text-gray-600 text-lg">How can I help you today?</p>
      </div>

      <div className={`flex gap-4 transition-all duration-300 ${showInteractiveLearning ? "h-[700px]" : ""} w-full`}>
        {/* Chat Card */}
        <Card
          className={`flex flex-col bg-stone-50 border-stone-200 transition-all duration-300 ${showInteractiveLearning ? "w-1/2" : "w-full"} min-w-0`}
        >
          <CardContent className="flex flex-col gap-4 p-0 bg-stone-50">
            <div className="h-[500px] flex flex-col px-6">
              <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3 items-start">
                      {message.type === "user" ? (
                        <>
                          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-medium">SK</span>
                          </div>
                          <div className="bg-stone-200 text-gray-800 rounded-2xl px-4 py-2 max-w-[70%]">
                            <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <BrainCircuit className="h-5 w-5 flex-shrink-0" />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line max-w-none">
                              {message.content}
                            </div>
                            {message.type === "assistant" && message.id !== "welcome" && (
                              <div className="mt-4">
                                <BrainCircuit className="h-5 w-5 flex-shrink-0" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 items-start">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <BrainCircuit className="h-5 w-5 flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="flex gap-2 px-6 pb-4 flex-shrink-0">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about CS101..."
                className="flex-1 bg-white border-stone-300"
                disabled={isTyping}
              />
              <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setShowInteractiveLearning(!showInteractiveLearning)}
                variant={showInteractiveLearning ? "default" : "outline"}
                className={showInteractiveLearning ? "bg-accent text-accent-foreground" : "bg-white border-stone-300"}
              >
                {showInteractiveLearning ? <X className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span className="ml-2">{showInteractiveLearning ? "Close" : "Open Interactive Learning"}</span>
              </Button>
            </div>

            <div className="flex gap-2 px-6 pb-6 flex-shrink-0">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="flex items-center gap-2 bg-white border-stone-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleQuickAction(action)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {showInteractiveLearning && (
          <Card className="w-1/2 bg-white border-stone-200 animate-in slide-in-from-right duration-300 min-w-0 gap-0 pt-0">
            <CardHeader className="pb-1 pt-3">
              <CardTitle className="text-xl font-medium text-gray-800">Interactive Learning (Beta)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <InteractiveLearning onUpdate={handleInteractiveLearningUpdate} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
