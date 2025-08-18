"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Eye, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

const currentAssignments = [
  {
    id: 3,
    title: "Assignment 3: Control Structures",
    description: "Implement conditional statements and decision-making logic",
    dueDate: "2024-02-05",
    daysLeft: 3,
    points: 50,
    difficulty: "Medium",
    status: "pending",
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
    daysLeft: 10,
    points: 60,
    difficulty: "Hard",
    status: "not_started",
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

function handleClaudeChat(assignmentId: number, onSectionChange: (section: string, assignmentId?: number) => void) {
  onSectionChange("claude", assignmentId)
}

function AssignmentCard({
  assignment,
  type,
  onSectionChange,
}: { assignment: any; type: "current" | "graded"; onSectionChange: (section: string, assignmentId?: number) => void }) {
  const [showInstructions, setShowInstructions] = useState(false)

  if (type === "current") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="w-fit mt-2 bg-transparent"
                onClick={() => handleClaudeChat(assignment.id, onSectionChange)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Claude
              </Button>
              <CardDescription>{assignment.description}</CardDescription>
            </div>
            <Badge
              variant={
                assignment.difficulty === "Hard"
                  ? "destructive"
                  : assignment.difficulty === "Medium"
                    ? "secondary"
                    : "default"
              }
            >
              {assignment.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className={assignment.daysLeft <= 3 ? "text-destructive font-medium" : ""}>
                  {assignment.daysLeft} days left
                </span>
              </div>
            </div>
            <span className="font-medium">{assignment.points} points</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Grading Rubric:</h4>
            <div className="space-y-1">
              {assignment.rubric.criteria.map((criterion: any, index: number) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{criterion.name}</span>
                  <span>{criterion.points} pts</span>
                </div>
              ))}
            </div>
          </div>

          {showInstructions && (
            <div className="space-y-2 p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-sm">Assignment Instructions:</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{assignment.instructions}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={() => setShowInstructions(!showInstructions)}>
              <FileText className="h-4 w-4 mr-2" />
              {showInstructions ? "Hide Instructions" : "View Assignment Instructions"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <Button
              size="sm"
              variant="outline"
              className="w-fit mt-2 bg-transparent"
              onClick={() => handleClaudeChat(assignment.id, onSectionChange)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Claude
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Graded</Badge>
              <span className="text-sm text-muted-foreground">
                Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">{assignment.grade}</div>
            <div className="text-sm text-muted-foreground">
              {assignment.score}/{assignment.totalPoints}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-sm">{Math.round((assignment.score / assignment.totalPoints) * 100)}%</span>
          </div>
          <Progress value={(assignment.score / assignment.totalPoints) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Detailed Feedback:</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{assignment.feedback.overall}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Rubric Breakdown:</h4>
          <div className="space-y-1">
            {assignment.feedback.criteria.map((criterion: any, index: number) => (
              <div key={index} className="flex justify-between items-start text-xs">
                <div className="flex-1">
                  <span className="font-medium">{criterion.name}</span>
                  <p className="text-muted-foreground mt-1">{criterion.feedback}</p>
                </div>
                <span className="ml-2 font-medium">
                  {criterion.earned}/{criterion.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {assignment.codeExample && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Your Solution:</h4>
            <div className="code-block">
              <pre className="text-xs overflow-x-auto">
                <code>{assignment.codeExample}</code>
              </pre>
            </div>
          </div>
        )}

        {showInstructions && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <h4 className="font-medium text-sm">Assignment Instructions:</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{assignment.instructions}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => setShowInstructions(!showInstructions)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {showInstructions ? "Hide Instructions" : "View Assignment Instructions"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AssignmentsPage({
  onSectionChange,
}: { onSectionChange?: (section: string, assignmentId?: number) => void }) {
  const [activeTab, setActiveTab] = useState("current")

  useEffect(() => {
    if (window.location.hash === "#graded") {
      setActiveTab("graded")
    }
  }, [])

  const completedCount = gradedAssignments.length
  const totalAssignments = currentAssignments.length + gradedAssignments.length
  const averageScore =
    gradedAssignments.reduce((sum, assignment) => sum + (assignment.score / assignment.totalPoints) * 100, 0) /
    gradedAssignments.length

  return (
    <div className="space-y-6">
      {/* Assignment Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Assignments Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount}/{totalAssignments}
            </div>
            <Progress value={(completedCount / totalAssignments) * 100} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(averageScore)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Based on graded assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {currentAssignments.filter((a) => a.daysLeft <= 7).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Due within 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Current Assignments ({currentAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="graded" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Graded Assignments ({gradedAssignments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4">
            {currentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                type="current"
                onSectionChange={onSectionChange || (() => {})}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4" id="graded">
          <div className="grid gap-4">
            {gradedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                type="graded"
                onSectionChange={onSectionChange || (() => {})}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
