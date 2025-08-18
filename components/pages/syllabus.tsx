import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Mail, BookOpen, Award } from "lucide-react"

const courseSchedule = [
  {
    week: 1,
    date: "Jan 15-19",
    topic: "Introduction to Programming",
    assignments: ["Setup Development Environment"],
    status: "completed",
  },
  {
    week: 2,
    date: "Jan 22-26",
    topic: "Variables and Data Types",
    assignments: ["Assignment 1: Basic Variables"],
    status: "completed",
  },
  {
    week: 3,
    date: "Jan 29 - Feb 2",
    topic: "Control Structures",
    assignments: ["Assignment 2: Conditionals"],
    status: "current",
  },
  {
    week: 4,
    date: "Feb 5-9",
    topic: "Loops and Iteration",
    assignments: ["Assignment 3: Loop Exercises"],
    status: "upcoming",
  },
  {
    week: 5,
    date: "Feb 12-16",
    topic: "Functions and Methods",
    assignments: ["Assignment 4: Function Design"],
    status: "upcoming",
  },
  {
    week: 6,
    date: "Feb 19-23",
    topic: "Arrays and Lists",
    assignments: ["Assignment 5: Data Structures"],
    status: "upcoming",
  },
  {
    week: 7,
    date: "Feb 26 - Mar 2",
    topic: "Object-Oriented Programming",
    assignments: ["Midterm Project"],
    status: "upcoming",
  },
  {
    week: 8,
    date: "Mar 5-9",
    topic: "File I/O and Error Handling",
    assignments: ["Assignment 6: File Processing"],
    status: "upcoming",
  },
]

const gradingBreakdown = [
  { category: "Assignments (8)", percentage: 40, points: 400 },
  { category: "Midterm Project", percentage: 20, points: 200 },
  { category: "Final Project", percentage: 25, points: 250 },
  { category: "Participation & Quizzes", percentage: 15, points: 150 },
]

const gradingScale = [
  { grade: "A", range: "90-100%", description: "Excellent" },
  { grade: "B", range: "80-89%", description: "Good" },
  { grade: "C", range: "70-79%", description: "Satisfactory" },
  { grade: "D", range: "60-69%", description: "Below Average" },
  { grade: "F", range: "0-59%", description: "Failing" },
]

export function SyllabusPage() {
  return (
    <div className="space-y-6">
      {/* Course Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">CS101: Introduction to Computer Science</CardTitle>
          <CardDescription>Spring 2025 • 3 Credit Hours</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Instructor:</strong> Dr. Sarah Johnson
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Email:</strong> s.johnson@university.edu
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Class Time:</strong> MWF 10:00-10:50 AM
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Location:</strong> Computer Lab 205
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Office Hours:</strong> Tue/Thu 2:00-4:00 PM
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Description */}
      <Card>
        <CardHeader>
          <CardTitle>Course Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            This course provides an introduction to computer science and programming fundamentals. Students will learn
            basic programming concepts including variables, control structures, functions, and object-oriented
            programming principles. The course emphasizes problem-solving skills and algorithmic thinking through
            hands-on programming exercises and projects.
          </p>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Understand fundamental programming concepts and terminology</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Write, debug, and test simple programs using proper programming practices</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Apply problem-solving strategies to break down complex problems</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
              <span>Demonstrate understanding of object-oriented programming principles</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Course Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Course Schedule</CardTitle>
          <CardDescription>Weekly topics and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courseSchedule.map((week) => (
              <div key={week.week} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Badge
                      variant={
                        week.status === "completed" ? "default" : week.status === "current" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      Week {week.week}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{week.date}</span>
                  </div>
                  <h4 className="font-medium">{week.topic}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{week.assignments.join(", ")}</p>
                </div>
                <div className="flex items-center">
                  {week.status === "completed" && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
                  {week.status === "current" && <div className="h-2 w-2 rounded-full bg-accent animate-pulse"></div>}
                  {week.status === "upcoming" && <div className="h-2 w-2 rounded-full bg-muted"></div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Grading Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gradingBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.percentage}%</span>
                    <span className="text-xs text-muted-foreground">({item.points} pts)</span>
                  </div>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-3">
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>100% (1000 pts)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grading Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gradingScale.map((grade, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="w-8 justify-center">
                      {grade.grade}
                    </Badge>
                    <span className="text-sm">{grade.description}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{grade.range}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Course Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Attendance Policy</h4>
            <p className="text-sm text-muted-foreground">
              Regular attendance is expected. More than 3 unexcused absences may result in a reduction of your final
              grade. Please notify the instructor in advance if you must miss class.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Late Assignment Policy</h4>
            <p className="text-sm text-muted-foreground">
              Late assignments will be penalized 10% per day late. Assignments more than one week late will not be
              accepted without prior arrangement with the instructor.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Academic Integrity</h4>
            <p className="text-sm text-muted-foreground">
              All work submitted must be your own. Collaboration on assignments is encouraged for learning, but
              submitted work must be individual. Plagiarism will result in course failure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
