import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, Play, CheckCircle, Clock, Target } from "lucide-react"

const lectureWeeks = [
  {
    week: 1,
    title: "Introduction to Programming",
    status: "completed",
    date: "Jan 15-19",
    duration: "3 hours",
    objectives: [
      "Understand what programming is and why it's important",
      "Learn about different programming languages",
      "Set up development environment",
      "Write your first program",
    ],
    topics: [
      {
        title: "What is Programming?",
        content: `Programming is the process of creating instructions for computers to follow. These instructions, called code, tell the computer exactly what to do step by step.

Key concepts:
• Algorithms - step-by-step procedures for solving problems
• Programming languages - tools for writing instructions
• Compilers and interpreters - tools that translate code for computers`,
        codeExample: `# Your first Python program
print("Hello, World!")
print("Welcome to CS101!")

# This is a comment - it explains what the code does
name = "Student"
print(f"Hello, {name}!")`,
      },
      {
        title: "Development Environment Setup",
        content: `Setting up your programming environment is crucial for success. We'll use Python and a code editor.

Required tools:
• Python 3.x interpreter
• Code editor (VS Code recommended)
• Terminal/Command prompt access`,
        codeExample: `# Test your Python installation
import sys
print("Python version:", sys.version)
print("Installation successful!")

# Basic calculator
num1 = 10
num2 = 5
result = num1 + num2
print(f"{num1} + {num2} = {result}")`,
      },
    ],
    materials: ["Lecture Slides", "Setup Guide", "Practice Exercises"],
  },
  {
    week: 2,
    title: "Variables and Data Types",
    status: "completed",
    date: "Jan 22-26",
    duration: "3 hours",
    objectives: [
      "Understand different data types in Python",
      "Learn how to declare and use variables",
      "Practice type conversion and operations",
      "Handle user input and output",
    ],
    topics: [
      {
        title: "Understanding Variables",
        content: `Variables are containers that store data values. In Python, you don't need to declare the type of variable explicitly.

Variable naming rules:
• Must start with a letter or underscore
• Can contain letters, numbers, and underscores
• Case-sensitive (age and Age are different)
• Cannot use Python keywords`,
        codeExample: `# Variable declarations
name = "Alice"           # String
age = 20                 # Integer
height = 5.6             # Float
is_student = True        # Boolean

# Variable operations
full_name = name + " Smith"
next_year_age = age + 1
height_in_cm = height * 30.48

print(f"Name: {full_name}")
print(f"Age next year: {next_year_age}")
print(f"Height in cm: {height_in_cm}")`,
      },
      {
        title: "Data Types and Operations",
        content: `Python has several built-in data types. Understanding these is fundamental to programming.

Main data types:
• int - whole numbers (1, 42, -10)
• float - decimal numbers (3.14, -2.5)
• str - text ("hello", 'world')
• bool - True or False values`,
        codeExample: `# Data type examples
integer_num = 42
float_num = 3.14159
text = "Hello, CS101!"
boolean_val = True

# Type checking
print(type(integer_num))    # <class 'int'>
print(type(float_num))      # <class 'float'>
print(type(text))           # <class 'str'>
print(type(boolean_val))    # <class 'bool'>

# Type conversion
str_number = "123"
converted_int = int(str_number)
converted_float = float(str_number)

print(f"Original: {str_number} (type: {type(str_number)})")
print(f"As int: {converted_int} (type: {type(converted_int)})")
print(f"As float: {converted_float} (type: {type(converted_float)})")`,
      },
    ],
    materials: ["Lecture Slides", "Variable Exercises", "Data Type Reference"],
  },
  {
    week: 3,
    title: "Control Structures",
    status: "current",
    date: "Jan 29 - Feb 2",
    duration: "3 hours",
    objectives: [
      "Master conditional statements (if, elif, else)",
      "Understand boolean logic and comparison operators",
      "Learn to create decision-making programs",
      "Practice nested conditionals",
    ],
    topics: [
      {
        title: "Conditional Statements",
        content: `Conditional statements allow programs to make decisions based on different conditions. The if statement is the foundation of program logic.

Basic structure:
• if condition: - executes if condition is True
• elif condition: - alternative condition
• else: - executes if all conditions are False`,
        codeExample: `# Basic if statement
age = 18

if age >= 18:
    print("You are an adult")
    print("You can vote!")
else:
    print("You are a minor")
    print("You cannot vote yet")

# Multiple conditions with elif
grade = 85

if grade >= 90:
    letter_grade = "A"
elif grade >= 80:
    letter_grade = "B"
elif grade >= 70:
    letter_grade = "C"
elif grade >= 60:
    letter_grade = "D"
else:
    letter_grade = "F"

print(f"Grade: {grade} -> Letter: {letter_grade}")`,
      },
      {
        title: "Boolean Logic and Operators",
        content: `Boolean logic helps create complex conditions using logical operators.

Comparison operators:
• == (equal to)
• != (not equal to)
• < (less than)
• > (greater than)
• <= (less than or equal)
• >= (greater than or equal)

Logical operators:
• and - both conditions must be True
• or - at least one condition must be True
• not - reverses the boolean value`,
        codeExample: `# Boolean logic examples
temperature = 75
humidity = 60
is_sunny = True

# Complex conditions
if temperature > 70 and humidity < 70:
    print("Perfect weather for outdoor activities!")
elif temperature > 80 or humidity > 80:
    print("It might be too hot or humid")
else:
    print("Weather conditions are moderate")

# Using 'not' operator
if not is_sunny:
    print("Don't forget your umbrella!")
else:
    print("Great day for a walk!")

# Nested conditionals
score = 92
extra_credit = True

if score >= 90:
    if extra_credit:
        final_grade = "A+"
        print("Excellent work with extra credit!")
    else:
        final_grade = "A"
        print("Excellent work!")
else:
    final_grade = "B"
    print("Good work, keep it up!")

print(f"Final grade: {final_grade}")`,
      },
    ],
    materials: ["Lecture Slides", "Conditional Logic Exercises", "Boolean Practice Problems"],
  },
  {
    week: 4,
    title: "Loops and Iteration",
    status: "upcoming",
    date: "Feb 5-9",
    duration: "3 hours",
    objectives: [
      "Understand the concept of iteration",
      "Master for loops and while loops",
      "Learn about nested loops",
      "Practice loop control statements",
    ],
    topics: [
      {
        title: "Introduction to Loops",
        content: `Loops allow you to repeat code multiple times efficiently. Python has two main types of loops: for loops and while loops.`,
        codeExample: `# Coming soon - Loop examples will be available during the lecture week`,
      },
    ],
    materials: ["Lecture Slides", "Loop Exercises", "Iteration Patterns"],
  },
  {
    week: 5,
    title: "Functions and Methods",
    status: "upcoming",
    date: "Feb 12-16",
    duration: "3 hours",
    objectives: [
      "Understand the purpose of functions",
      "Learn to define and call functions",
      "Master parameter passing and return values",
      "Practice function design principles",
    ],
    topics: [
      {
        title: "Function Basics",
        content: `Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.`,
        codeExample: `# Coming soon - Function examples will be available during the lecture week`,
      },
    ],
    materials: ["Lecture Slides", "Function Exercises", "Design Patterns"],
  },
]

function LectureWeekCard({ week }: { week: any }) {
  const statusColors = {
    completed: "default",
    current: "secondary",
    upcoming: "outline",
  }

  const statusIcons = {
    completed: CheckCircle,
    current: Play,
    upcoming: Clock,
  }

  const StatusIcon = statusIcons[week.status as keyof typeof statusIcons]

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant={statusColors[week.status as keyof typeof statusColors]}>
                <StatusIcon className="h-3 w-3 mr-1" />
                Week {week.week}
              </Badge>
              <span className="text-sm text-muted-foreground">{week.date}</span>
            </div>
            <CardTitle className="text-xl">{week.title}</CardTitle>
            <CardDescription className="flex items-center gap-4">
              <span>Duration: {week.duration}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Learning Objectives */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Target className="h-4 w-4" />
            Learning Objectives
          </h4>
          <ul className="space-y-1">
            {week.objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Topics */}
        {week.status !== "upcoming" && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Topics Covered</h4>
            <Accordion type="single" collapsible className="w-full">
              {week.topics.map((topic: any, index: number) => (
                <AccordionItem key={index} value={`topic-${index}`}>
                  <AccordionTrigger className="text-sm">{topic.title}</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {topic.content}
                    </div>
                    {topic.codeExample && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-xs">Code Example:</h5>
                        <div className="code-block">
                          <pre className="text-xs overflow-x-auto">
                            <code>{topic.codeExample}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Materials */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Course Materials</h4>
          <div className="flex flex-wrap gap-2">
            {week.materials.map((material: string, index: number) => (
              <Button key={index} variant="outline" size="sm" className="h-8 bg-transparent">
                <Download className="h-3 w-3 mr-1" />
                {material}
              </Button>
            ))}
          </div>
        </div>

        {week.status === "upcoming" && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Content will be available during the lecture week. Check back on {week.date}.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function LecturesPage() {
  const completedWeeks = lectureWeeks.filter((week) => week.status === "completed").length
  const currentWeek = lectureWeeks.find((week) => week.status === "current")
  const totalWeeks = lectureWeeks.length

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Weeks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedWeeks}/{totalWeeks}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Course progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentWeek?.week || "N/A"}</div>
            <div className="text-xs text-muted-foreground mt-1">{currentWeek?.title || "No active week"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lectureWeeks.reduce((sum, week) => sum + (week.topics?.length || 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Topics covered</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Weeks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {lectureWeeks.map((week) => (
              <LectureWeekCard key={week.week} week={week} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {lectureWeeks
              .filter((week) => week.status === "completed")
              .map((week) => (
                <LectureWeekCard key={week.week} week={week} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {lectureWeeks
              .filter((week) => week.status === "current")
              .map((week) => (
                <LectureWeekCard key={week.week} week={week} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {lectureWeeks
              .filter((week) => week.status === "upcoming")
              .map((week) => (
                <LectureWeekCard key={week.week} week={week} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
