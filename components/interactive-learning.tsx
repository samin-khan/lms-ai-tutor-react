"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, RotateCcw, CheckCircle, XCircle, Loader2, Maximize2, Plus, Minus } from "lucide-react"
import { PythonEditor } from "@/components/python-editor"
import { Console } from "@/components/console"

interface TestResult {
  name: string
  passed: boolean
  message?: string
}

interface InteractiveLearningProps {
  onUpdate: (code: string, output: string, tests: TestResult[], attempts: number) => void
}

const ASSIGNMENT_INSTRUCTIONS = `Implement a grade calculator using conditional statements (if/elif/else). 
The program should accept numeric scores and return letter grades. 
Include proper error handling for invalid inputs and test with multiple 
score values to demonstrate understanding of conditional logic.`

const UNIT_TESTS = [
  { name: "test_perfect_score", input: 100, expected: "A", description: "Should return 'A' for score 100" },
  { name: "test_a_grade", input: 95, expected: "A", description: "Should return 'A' for score 95" },
  { name: "test_b_grade", input: 85, expected: "B", description: "Should return 'B' for score 85" },
  { name: "test_c_grade", input: 75, expected: "C", description: "Should return 'C' for score 75" },
  { name: "test_d_grade", input: 65, expected: "D", description: "Should return 'D' for score 65" },
  { name: "test_f_grade", input: 45, expected: "F", description: "Should return 'F' for score 45" },
  { name: "test_boundary_90", input: 90, expected: "A", description: "Should return 'A' for boundary score 90" },
  { name: "test_boundary_80", input: 80, expected: "B", description: "Should return 'B' for boundary score 80" },
  { name: "test_invalid_negative", input: -10, expected: "ERROR", description: "Should handle negative scores" },
  { name: "test_invalid_over_100", input: 110, expected: "ERROR", description: "Should handle scores over 100" },
]

const STARTER_CODE = `def calculate_grade(score):
    """
    Calculate letter grade based on numeric score
    Args:
        score: numeric score (0-100)
    Returns:
        letter grade (A, B, C, D, F) or error message
    """
    # Your code here
    pass

# Test your function
if __name__ == "__main__":
    test_scores = [95, 87, 73, 65, 45]
    for score in test_scores:
        grade = calculate_grade(score)
        print(f"Score: {score} -> Grade: {grade}")
`

interface ModalContentProps {
  code: string
  onCodeChange: (code: string) => void
  output: string
  testResults: TestResult[]
  isRunning: boolean
  fontSize: number
  onClose: () => void
  onRun: () => void
  onReset: () => void
  onClear: () => void
  onIncreaseFontSize: () => void
  onDecreaseFontSize: () => void
  onBackdropClick: (e: React.MouseEvent) => void
}

const ModalContent = ({ 
  code, 
  onCodeChange, 
  output, 
  testResults, 
  isRunning, 
  fontSize, 
  onClose, 
  onRun, 
  onReset, 
  onClear, 
  onIncreaseFontSize, 
  onDecreaseFontSize,
  onBackdropClick
}: ModalContentProps) => (
  <div className="fixed inset-0 backdrop-blur-md bg-white bg-opacity-5 flex items-center justify-center z-[9999]" onClick={onBackdropClick}>
    <div className="bg-white rounded-lg w-[90%] h-[90%] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="p-4 bg-blue-50 border-b border-blue-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-blue-900">Assignment: Grade Calculator</h3>
          <Button size="sm" variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      <div className="h-96 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Python Editor</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onDecreaseFontSize} className="text-xs bg-transparent">
              <Minus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={onIncreaseFontSize} className="text-xs bg-transparent">
              <Plus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={onReset} className="text-xs bg-transparent">
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            <Button size="sm" onClick={onRun} disabled={isRunning} className="text-xs">
              {isRunning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />}
              Run
            </Button>
          </div>
        </div>
        <div className="h-[calc(100%-48px)]" style={{ fontSize: `${fontSize}px` }}>
          <PythonEditor code={code} onChange={onCodeChange} />
        </div>
      </div>
      <div className="flex-1 flex min-h-0">
        <div className="w-1/2 flex flex-col min-w-0">
          <div className="flex items-center justify-between p-2 bg-gray-50 flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">Console Output</span>
            <Button size="sm" variant="ghost" onClick={onClear} className="text-xs">
              Clear
            </Button>
          </div>
          <div className="h-[calc(100%-40px)] overflow-hidden">
            <Console output={output} />
          </div>
        </div>
        <div className="w-1/2 flex flex-col min-w-0">
          <div className="p-2 bg-gray-50 flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">
              Test Results ({testResults.filter((t) => t.passed).length}/{testResults.length} passed)
            </span>
          </div>
          <div className="h-[calc(100%-40px)] overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {testResults.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">Run your code to see test results...</p>
                ) : (
                  testResults.map((test, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-2 rounded text-xs ${
                        test.passed ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                      }`}
                    >
                      {test.passed ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <XCircle className="h-3 w-3 text-red-600" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{test.name}</div>
                        {test.message && <div className="text-xs opacity-75">{test.message}</div>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export function InteractiveLearning({ onUpdate }: InteractiveLearningProps) {
  const [code, setCode] = useState(STARTER_CODE)
  const [output, setOutput] = useState("")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [runAttempts, setRunAttempts] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fontSize, setFontSize] = useState(14)

  useEffect(() => {
    onUpdate(code, output, testResults, runAttempts)
  }, [code, output, testResults, runAttempts, onUpdate])

  const runPythonCode = async () => {
    setIsRunning(true)
    setRunAttempts((prev) => prev + 1)

    try {
      const results = await simulatePythonExecution(code)
      setOutput(results.output)
      setTestResults(results.testResults)
    } catch (error) {
      setOutput(`Error: ${error}`)
      setTestResults([])
    } finally {
      setIsRunning(false)
    }
  }

  const clearConsole = () => {
    setOutput("")
    setTestResults([])
  }

  const resetCode = () => {
    setCode(STARTER_CODE)
    setOutput("")
    setTestResults([])
    setRunAttempts(0)
  }

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10))
  }

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen)
  }, [isModalOpen])

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  const handleModalBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col overflow-hidden w-full">
        <div className="px-3 py-2 bg-blue-50 border-b border-blue-200 flex-shrink-0">
          <h3 className="font-medium text-blue-900">Assignment: Grade Calculator</h3>
        </div>
        <div className="h-96 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between p-2 bg-gray-50 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Python Editor</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={decreaseFontSize} className="text-xs bg-transparent">
                <Minus className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={increaseFontSize} className="text-xs bg-transparent">
                <Plus className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={toggleModal} className="text-xs bg-transparent">
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={resetCode} className="text-xs bg-transparent">
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              <Button size="sm" onClick={runPythonCode} disabled={isRunning} className="text-xs">
                {isRunning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />}
                Run
              </Button>
            </div>
          </div>
          <div className="h-[calc(100%-48px)]" style={{ fontSize: `${fontSize}px` }}>
            <PythonEditor code={code} onChange={handleCodeChange} />
          </div>
        </div>
        <div className="h-60 flex overflow-hidden">
          <div className="w-1/2 flex flex-col min-w-0">
            <div className="flex items-center justify-between p-2 bg-gray-50 flex-shrink-0">
              <span className="text-sm font-medium text-gray-700">Console Output</span>
              <Button size="sm" variant="ghost" onClick={clearConsole} className="text-xs">
                Clear
              </Button>
            </div>
            <div className="h-[calc(100%-40px)] overflow-hidden">
              <Console output={output} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col min-w-0">
            <div className="p-2 bg-gray-50 flex-shrink-0">
              <span className="text-sm font-medium text-gray-700">
                Test Results ({testResults.filter((t) => t.passed).length}/{testResults.length} passed)
              </span>
            </div>
            <div className="h-[calc(100%-40px)] overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-2 space-y-1">
                  {testResults.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">Run your code to see test results</p>
                  ) : (
                    testResults.map((test, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-2 p-2 rounded text-xs ${
                          test.passed ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                        }`}
                      >
                        {test.passed ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-600" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{test.name}</div>
                          {test.message && <div className="text-xs opacity-75">{test.message}</div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <ModalContent 
          code={code}
          onCodeChange={handleCodeChange}
          output={output}
          testResults={testResults}
          isRunning={isRunning}
          fontSize={fontSize}
          onClose={toggleModal}
          onRun={runPythonCode}
          onReset={resetCode}
          onClear={clearConsole}
          onIncreaseFontSize={increaseFontSize}
          onDecreaseFontSize={decreaseFontSize}
          onBackdropClick={handleModalBackdropClick}
        />, 
        document.body
      )}
    </>
  )
}

async function simulatePythonExecution(code: string): Promise<{
  output: string
  testResults: TestResult[]
}> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  let output = ""
  const testResults: TestResult[] = []

  try {
    const functionMatch = code.match(/def calculate_grade$$score$$:([\s\S]*?)(?=\n\S|\n$|$)/m)
    if (!functionMatch) {
      throw new Error("calculate_grade function not found")
    }

    const mainMatch = code.match(/if __name__ == "__main__":([\s\S]*?)$/m)
    if (mainMatch) {
      output =
        "Score: 95 -> Grade: A\nScore: 87 -> Grade: B\nScore: 73 -> Grade: C\nScore: 65 -> Grade: D\nScore: 45 -> Grade: F\n"
    }

    for (const test of UNIT_TESTS) {
      const result = simulateGradeFunction(test.input, code)
      const passed = result === test.expected || (test.expected === "ERROR" && result.includes("Error"))

      testResults.push({
        name: test.name,
        passed,
        message: passed ? undefined : `Expected '${test.expected}', got '${result}'`,
      })
    }
  } catch (error) {
    output = `Error: ${error}`
  }

  return { output, testResults }
}

function simulateGradeFunction(score: number, code: string): string {
  const hasErrorHandling =
    code.includes("if") &&
    (code.includes("< 0") || code.includes("> 100") || code.includes("invalid") || code.includes("error"))

  if ((score < 0 || score > 100) && hasErrorHandling) {
    return "Error: Invalid score"
  }

  if (score < 0 || score > 100) {
    return "Error: Invalid score"
  }

  if (score >= 90) return "A"
  if (score >= 80) return "B"
  if (score >= 70) return "C"
  if (score >= 60) return "D"
  return "F"
}
