"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

const currentAssignments = [
  {
    id: 1,
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
    id: 2,
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
  // First check current assignments
  const currentAssignment = currentAssignments.find((a) => a.id === assignmentId)
  if (currentAssignment) {
    return `Help me with ${currentAssignment.title}

Assignment Instructions: ${currentAssignment.instructions}

Rubric:
${currentAssignment.rubric.criteria
  .map((criterion: any) => `- ${criterion.name} (${criterion.points} points): ${criterion.description}`)
  .join("\n")}

Due Date: ${currentAssignment.dueDate}
Points: ${currentAssignment.points}

Please help me understand the requirements and guide me through the implementation step by step. Ask me questions to help me think through the problem rather than giving me the complete solution.`
  }

  // Then check graded assignments
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

Please help me understand my mistakes and how to improve for future assignments. Focus on the specific issues mentioned in the feedback and ask me questions to help me learn from these errors.`
  }

  return `Help me with Assignment ${assignmentId}

I need assistance with this assignment. Please ask me questions to understand what I'm working on and guide me through the problem-solving process.`
}

export default function ClaudePage() {
  const searchParams = useSearchParams()
  const assignmentId = searchParams.get("assignment_id")
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (assignmentId) {
      const initialPrompt = buildClaudePrompt(Number.parseInt(assignmentId))
      setPrompt(initialPrompt)
    }
  }, [assignmentId])

  const handleSendMessage = async () => {
    if (!prompt.trim()) return

    const userMessage = { role: "user" as const, content: prompt }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, history: messages }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again." },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please try again." },
      ])
    }

    setPrompt("")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with Claude
              {assignmentId && (
                <Badge variant="outline" className="ml-2">
                  Assignment {assignmentId}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start a conversation with Claude about your assignment!</p>
                </div>
              )}

              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-sm">{message.content}</pre>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      Claude is thinking...
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask Claude about your assignment..."
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !prompt.trim()} size="lg">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
