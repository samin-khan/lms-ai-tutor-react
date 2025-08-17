"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User, Send, Lightbulb, Code, HelpCircle, BookOpen, Zap } from "lucide-react"

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

// Mock Claude responses for demonstration
const mockResponses: Record<string, string> = {
  variables: `Great question! Variables in Python are like containers that store data. Here's what you need to know:

**Variable Types:**
• **Strings** - Text data: \`name = "Alice"\`
• **Integers** - Whole numbers: \`age = 20\`
• **Floats** - Decimal numbers: \`height = 5.6\`
• **Booleans** - True/False: \`is_student = True\`

**Example:**
\`\`\`python
# Variable declarations
student_name = "John"
student_age = 19
gpa = 3.75
is_enrolled = True

# Using variables
print(f"Student: {student_name}")
print(f"Age: {student_age}")
print(f"GPA: {gpa}")
\`\`\`

**Key Rules:**
1. Variable names must start with a letter or underscore
2. No spaces in variable names (use underscores)
3. Case-sensitive (\`Age\` and \`age\` are different)

Would you like me to explain any specific data type in more detail?`,

  conditionals: `If statements are fundamental for making decisions in your programs! Let me break this down:

**Basic Structure:**
\`\`\`python
if condition:
    # code to run if condition is True
elif another_condition:
    # code to run if first is False but this is True
else:
    # code to run if all conditions are False
\`\`\`

**Real Example:**
\`\`\`python
grade = 85

if grade >= 90:
    letter = "A"
    print("Excellent work!")
elif grade >= 80:
    letter = "B"
    print("Good job!")
elif grade >= 70:
    letter = "C"
    print("Keep working!")
else:
    letter = "F"
    print("Need to study more")

print(f"Your grade: {letter}")
\`\`\`

**Common Operators:**
• \`==\` equal to
• \`!=\` not equal to
• \`>\` greater than
• \`<\` less than
• \`>=\` greater than or equal
• \`<=\` less than or equal

**Combining Conditions:**
\`\`\`python
temperature = 75
is_sunny = True

if temperature > 70 and is_sunny:
    print("Perfect day for a picnic!")
elif temperature > 70 or is_sunny:
    print("Pretty good day!")
else:
    print("Maybe stay inside")
\`\`\`

What specific part of conditionals would you like me to explain further?`,

  loops: `Loops are powerful tools for repeating code! Python has two main types:

**For Loops** - When you know how many times to repeat:
\`\`\`python
# Loop through a range of numbers
for i in range(5):
    print(f"Count: {i}")
# Output: 0, 1, 2, 3, 4

# Loop through a list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop through a string
for letter in "Hello":
    print(letter)
\`\`\`

**While Loops** - When you repeat until a condition is met:
\`\`\`python
# Count down
count = 5
while count > 0:
    print(f"Countdown: {count}")
    count = count - 1  # Don't forget to update!
print("Blast off!")

# User input loop
password = ""
while password != "secret":
    password = input("Enter password: ")
print("Access granted!")
\`\`\`

**Important Tips:**
1. **For loops** are great for known repetitions
2. **While loops** are perfect for unknown repetitions
3. Always make sure while loops can end (avoid infinite loops!)
4. Use \`break\` to exit a loop early
5. Use \`continue\` to skip to the next iteration

**Nested Loops Example:**
\`\`\`python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print()  # Empty line between tables
\`\`\`

Which type of loop are you working with? I can provide more specific examples!`,

  functions: `Functions are reusable blocks of code that make programming much more organized! Here's everything you need to know:

**Basic Function Structure:**
\`\`\`python
def function_name(parameters):
    # code to execute
    return result  # optional
\`\`\`

**Simple Example:**
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

# Using the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!
\`\`\`

**Function with Multiple Parameters:**
\`\`\`python
def calculate_grade(points_earned, total_points):
    percentage = (points_earned / total_points) * 100
    
    if percentage >= 90:
        return "A"
    elif percentage >= 80:
        return "B"
    elif percentage >= 70:
        return "C"
    else:
        return "F"

# Using the function
grade = calculate_grade(85, 100)
print(f"Your grade: {grade}")  # Output: Your grade: B
\`\`\`

**Functions with Default Parameters:**
\`\`\`python
def introduce_student(name, major="Computer Science", year=1):
    return f"Hi, I'm {name}, a year {year} {major} student."

# Different ways to call it
print(introduce_student("Bob"))
print(introduce_student("Alice", "Mathematics"))
print(introduce_student("Charlie", "Physics", 3))
\`\`\`

**Why Use Functions?**
1. **Reusability** - Write once, use many times
2. **Organization** - Break complex problems into smaller pieces
3. **Testing** - Easier to test small functions
4. **Readability** - Makes code easier to understand

**Best Practices:**
• Give functions descriptive names
• Keep functions focused on one task
• Use comments to explain complex logic
• Return values when possible

What kind of function are you trying to create? I can help you design it!`,

  debugging: `Debugging is a crucial skill! Let me help you become a debugging detective 🕵️

**Common Error Types:**

**1. Syntax Errors** - Python can't understand your code:
\`\`\`python
# Wrong:
if x = 5:  # Should use == for comparison
    print("x is 5")

# Right:
if x == 5:
    print("x is 5")
\`\`\`

**2. Runtime Errors** - Code runs but crashes:
\`\`\`python
# This will crash if user enters non-number
age = int(input("Enter age: "))

# Better approach:
try:
    age = int(input("Enter age: "))
    print(f"You are {age} years old")
except ValueError:
    print("Please enter a valid number")
\`\`\`

**3. Logic Errors** - Code runs but gives wrong results:
\`\`\`python
# Wrong logic:
total = 0
for i in range(1, 6):
    total = i  # This overwrites instead of adding!

# Correct logic:
total = 0
for i in range(1, 6):
    total += i  # This adds to the total
\`\`\`

**Debugging Strategies:**
1. **Read error messages carefully** - They tell you exactly what's wrong
2. **Use print statements** - See what your variables contain
3. **Check your indentation** - Python is picky about spaces
4. **Test with simple inputs** - Start with easy cases
5. **Break complex code into smaller pieces**

**Debugging Example:**
\`\`\`python
def calculate_average(numbers):
    print(f"Input numbers: {numbers}")  # Debug print
    
    total = 0
    for num in numbers:
        print(f"Adding {num}, total now: {total}")  # Debug print
        total += num
    
    average = total / len(numbers)
    print(f"Final average: {average}")  # Debug print
    return average
\`\`\`

**Share your code with me!** Paste the code that's not working, and I'll help you identify the issue. Include:
• The code that's not working
• What you expected to happen
• What actually happened (including any error messages)

What specific problem are you facing?`,
}

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

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for specific topics
    if (lowerMessage.includes("variable") || lowerMessage.includes("data type")) {
      return mockResponses.variables
    }
    if (lowerMessage.includes("if") || lowerMessage.includes("conditional") || lowerMessage.includes("else")) {
      return mockResponses.conditionals
    }
    if (lowerMessage.includes("loop") || lowerMessage.includes("for") || lowerMessage.includes("while")) {
      return mockResponses.loops
    }
    if (lowerMessage.includes("function") || lowerMessage.includes("def")) {
      return mockResponses.functions
    }
    if (lowerMessage.includes("debug") || lowerMessage.includes("error") || lowerMessage.includes("bug")) {
      return mockResponses.debugging
    }

    // Generic responses for other questions
    const genericResponses = [
      `That's a great question! Let me help you understand this concept better. 

Could you provide more specific details about what you're working on? For example:
• What specific part are you struggling with?
• Do you have any code you'd like me to review?
• What have you tried so far?

The more context you give me, the better I can tailor my explanation to help you learn!`,

      `I'd be happy to help you with that! Programming can be challenging, but breaking it down step by step makes it much easier.

Here are some ways I can assist:
• Explain concepts with examples
• Help debug your code
• Provide practice problems
• Review your solutions
• Suggest best practices

What would be most helpful for you right now?`,

      `Excellent question! This is exactly the kind of thinking that will make you a great programmer.

To give you the most helpful answer, could you tell me:
• What you're trying to accomplish
• What you've already learned about this topic
• Any specific examples you'd like me to explain

I'm here to support your learning journey in CS101!`,
    ]

    return genericResponses[Math.floor(Math.random() * genericResponses.length)]
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

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateResponse(content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
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
              Online
            </Badge>
          </div>
        </CardHeader>
      </Card>

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
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Chat with Claude</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4">
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
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
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

          {/* Input */}
          <div className="flex gap-2">
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
