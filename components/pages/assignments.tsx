import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, CheckCircle, AlertCircle, Download, Eye } from "lucide-react"

const currentAssignments = [
  {
    id: 1,
    title: "Assignment 3: Control Structures",
    description: "Implement conditional statements and decision-making logic",
    dueDate: "2024-02-05",
    daysLeft: 3,
    points: 50,
    difficulty: "Medium",
    status: "pending",
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
    daysLeft: 10,
    points: 60,
    difficulty: "Hard",
    status: "not_started",
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
    score: 45,
    totalPoints: 50,
    grade: "A-",
    feedback: {
      overall:
        "Excellent work! Your variable declarations and basic operations are well-implemented. Minor improvements needed in code documentation.",
      criteria: [
        { name: "Code Functionality", earned: 20, total: 20, feedback: "Perfect execution, all test cases passed" },
        { name: "Code Style", earned: 8, total: 10, feedback: "Good style, but add more descriptive comments" },
        { name: "Variable Usage", earned: 15, total: 15, feedback: "Excellent understanding of data types" },
        { name: "Documentation", earned: 2, total: 5, feedback: "Needs more comprehensive documentation" },
      ],
    },
    codeExample: `# Student Solution - Assignment 1
# Variable declarations and basic operations

# Personal information variables
name = "John Doe"
age = 19
student_id = 12345
gpa = 3.75

# Calculate years until graduation
years_to_graduate = 4 - 1  # Currently in year 1
print(f"Hello {name}, you have {years_to_graduate} years until graduation!")

# GPA calculation
total_credits = 15
quality_points = gpa * total_credits
print(f"Your current quality points: {quality_points}")`,
  },
  {
    id: 2,
    title: "Assignment 2: Conditionals",
    submittedDate: "2024-01-29",
    gradedDate: "2024-01-31",
    score: 42,
    totalPoints: 50,
    grade: "B+",
    feedback: {
      overall: "Good understanding of conditional logic. Some edge cases not handled properly, but overall solid work.",
      criteria: [
        {
          name: "Code Functionality",
          earned: 18,
          total: 20,
          feedback: "Most test cases passed, minor edge case issues",
        },
        { name: "Code Style", earned: 9, total: 10, feedback: "Clean and readable code structure" },
        {
          name: "Logic Implementation",
          earned: 12,
          total: 15,
          feedback: "Good use of conditionals, some complex cases missed",
        },
        {
          name: "Testing",
          earned: 3,
          total: 5,
          feedback: "Basic test cases provided, needs more comprehensive testing",
        },
      ],
    },
    codeExample: `# Student Solution - Assignment 2
# Grade calculator with conditional logic

def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Test the function
test_scores = [95, 87, 73, 65, 45]
for score in test_scores:
    grade = calculate_grade(score)
    print(f"Score: {score} -> Grade: {grade}")`,
  },
]

function AssignmentCard({ assignment, type }: { assignment: any; type: "current" | "graded" }) {
  if (type === "current") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
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

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
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

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            View Full Feedback
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function AssignmentsPage() {
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
      <Tabs defaultValue="current" className="space-y-4">
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
              <AssignmentCard key={assignment.id} assignment={assignment} type="current" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <div className="grid gap-4">
            {gradedAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} type="graded" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
