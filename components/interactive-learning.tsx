"use client"

import { useState, useEffect, useCallback } from "react"
import { usePython } from "react-py"
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
            {/* <Button size="sm" variant="outline" onClick={onDecreaseFontSize} className="text-xs bg-transparent">
              <Minus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={onIncreaseFontSize} className="text-xs bg-transparent">
              <Plus className="h-3 w-3" />
            </Button> */}
            <Button size="sm" variant="outline" onClick={onReset} className="text-xs bg-transparent">
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={onRun}
              disabled={isRunning}
              className="text-xs"
            >
              {isRunning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />}
              {isRunning ? "Running..." : "Run"}
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
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [runAttempts, setRunAttempts] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [waitingForResults, setWaitingForResults] = useState(false)

  // Use the usePython hook from react-py
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

  // Combine stdout and stderr for output display
  const [output, setOutput] = useState("")

  // Add this useEffect to monitor stdout changes
  useEffect(() => {
    console.log('🔍 stdout changed:', {
      length: stdout.length,
      content: stdout.slice(-100), // Last 100 chars
      timestamp: new Date().toISOString(),
      waitingForResults
    })
  }, [stdout])

  // Add this useEffect to handle stdout updates when we're waiting for results
  useEffect(() => {
    if (waitingForResults && stdout.length > 0 && stdout.includes('TEST_RESULTS_END')) {
      console.log('🎯 Found test results in stdout, processing...')
      
      setOutput(stdout + (stderr ? `\nError: ${stderr}` : ""))
      parseTestResultsFromOutput()
      setWaitingForResults(false)
    }
  }, [stdout, stderr, waitingForResults])

  useEffect(() => {
    onUpdate(code, output, testResults, runAttempts)
  }, [code, output, testResults, runAttempts, onUpdate])

  const runPythonCode = async () => {
    console.log('🚀 Starting runPythonCode')
    console.log('📊 Initial stdout length:', stdout.length)
    
    setRunAttempts((prev) => prev + 1)

    try {
      setOutput("Running...")
      setTestResults([])
      setWaitingForResults(true)
      
      console.log('📝 About to run unit tests')
      await runUnitTests(code)
      
      console.log('✅ Unit tests completed')
      console.log('📊 Final stdout length:', stdout.length)
      console.log('📄 Final stdout content (last 200 chars):', stdout.slice(-200))
      
      // Don't set output here - let the useEffect handle it when stdout updates
      
    } catch (error) {
      console.error('Error running Python code:', error)
      setWaitingForResults(false)
    }
  }

  // const runUnitTests = async () => {

  const runUnitTests = async (code: string) => {    
    console.log('🧪 Starting runUnitTests')
    // Create a comprehensive test script that stores all results
    const testScript = `
# Initialize test results storage
test_results = {}

# Check if function exists
try:
    calculate_grade
    function_exists = True
except NameError:
    function_exists = False
    print("Function calculate_grade not found")

if function_exists:
    # Define test cases
    test_cases = [
        ("test_perfect_score", 100, "A"),
        ("test_a_grade", 95, "A"),
        ("test_b_grade", 85, "B"),
        ("test_c_grade", 75, "C"),
        ("test_d_grade", 65, "D"),
        ("test_f_grade", 45, "F"),
        ("test_boundary_90", 90, "A"),
        ("test_boundary_80", 80, "B"),
        ("test_invalid_negative", -10, "ERROR"),
        ("test_invalid_over_100", 110, "ERROR")
    ]
    
    # Run each test
    for test_name, input_score, expected in test_cases:
        try:
            result = calculate_grade(input_score)
            test_results[test_name] = {
                'result': str(result),
                'expected': expected,
                'error': False
            }
        except Exception as e:
            test_results[test_name] = {
                'result': str(e),
                'expected': expected,
                'error': True
            }

    # Print results in a format we can easily parse
    print("=== TEST_RESULTS_START ===")
    for test_name, data in test_results.items():
        status = "ERROR" if data['error'] else "SUCCESS"
        print(f"{test_name}|{status}|{data['result']}|{data['expected']}")
    print("=== TEST_RESULTS_END ===")

else:
    print("Cannot run tests - function not implemented")
`

    try {
      console.log('🐍 About to call runPython')
      console.log('📊 Pre-runPython stdout length:', stdout.length)
      
      await runPython(code + `\n` + testScript)
      
      console.log('🐍 runPython completed')
      console.log('📊 Post-runPython stdout length:', stdout.length)
      console.log('📄 Post-runPython stdout (last 200 chars):', stdout.slice(-200))
      
      // Don't parse results here - let the useEffect handle it
      
    } catch (error) {
      console.error('Error running unit tests:', error)
      setWaitingForResults(false)
    }
  }

  const parseTestResultsFromOutput = () => {
    console.log('🔍 Starting parseTestResultsFromOutput')
    console.log('📊 Current stdout length:', stdout.length)
    console.log('📄 Current stdout (first 500 chars):', stdout.slice(0, 500))
    console.log('📄 Current stdout (last 500 chars):', stdout.slice(-500))
    
    const newTestResults: TestResult[] = []
    const lines = stdout.split('\n')
    
    console.log('📝 Total lines in stdout:', lines.length)
    console.log('🔍 Looking for TEST_RESULTS_START and TEST_RESULTS_END')
    
    // Find the test results section
    const startIndex = lines.findIndex(line => line.trim().includes('TEST_RESULTS_START'))
    const endIndex = lines.findIndex(line => line.trim().includes('TEST_RESULTS_END'))
    
    console.log(`📍 Found start index: ${startIndex}, end index: ${endIndex}`)
    
    if (startIndex !== -1 && endIndex !== -1) {
      console.log('✅ Found test result delimiters')
      // Parse each test result line
      for (let i = startIndex + 1; i < endIndex; i++) {
        const line = lines[i].trim()
        console.log(`Processing line ${i}: "${line}"`)
        
        if (line && line.includes('|')) {
          const parts = line.split('|')
          console.log(`Split parts:`, parts)
          
          if (parts.length >= 4) {
            const [testName, status, result, expected] = parts
            
            let passed = false
            let message = undefined
            
            if (status === 'ERROR') {
              passed = expected === 'ERROR'
              message = passed ? undefined : `Expected '${expected}', got error: ${result}`
            } else {
              passed = result === expected
              message = passed ? undefined : `Expected '${expected}', got '${result}'`
            }
            
            newTestResults.push({
              name: testName,
              passed,
              message
            })
            
            console.log(`✓ Test ${testName}: expected '${expected}', got '${result}', passed: ${passed}`)
          }
        }
      }
    } else {
      console.log('❌ Could not find test result delimiters')
      console.log('🔍 Searching for lines containing TEST_RESULTS:')
      lines.forEach((line, index) => {
        if (line.includes('TEST_RESULTS')) {
          console.log(`Line ${index}: "${line}"`)
        }
      })
      
      // Still try to find individual test result lines without delimiters
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed.includes('|') && (trimmed.includes('SUCCESS') || trimmed.includes('ERROR'))) {
          const parts = trimmed.split('|')
          if (parts.length >= 4) {
            const [testName, status, result, expected] = parts
            
            let passed = false
            let message = undefined
            
            if (status === 'ERROR') {
              passed = expected === 'ERROR'
              message = passed ? undefined : `Expected '${expected}', got error: ${result}`
            } else {
              passed = result === expected
              message = passed ? undefined : `Expected '${expected}', got '${result}'`
            }
            
            newTestResults.push({
              name: testName,
              passed,
              message
            })
            
            console.log(`✓ Fallback Test ${testName}: expected '${expected}', got '${result}', passed: ${passed}`)
          }
        }
      }
      
      // Final fallback if no tests found
      if (newTestResults.length === 0) {
        UNIT_TESTS.forEach(test => {
          newTestResults.push({
            name: test.name,
            passed: false,
            message: "Test execution failed - check console for errors"
          })
        })
      }
    }
    
    console.log('📊 Final parsed results count:', newTestResults.length)
    setTestResults(newTestResults)
  }

  const clearConsole = () => {
    // Clear Python console output
    runPython("")  // Clear the Python environment
    setTestResults([])
  }

  const resetCode = () => {
    setCode(STARTER_CODE)
    runPython("")  // Clear the Python environment
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
              {/* <Button size="sm" variant="outline" onClick={decreaseFontSize} className="text-xs bg-transparent">
                <Minus className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={increaseFontSize} className="text-xs bg-transparent">
                <Plus className="h-3 w-3" />
              </Button> */}
              <Button size="sm" variant="outline" onClick={toggleModal} className="text-xs bg-transparent">
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={resetCode} className="text-xs bg-transparent">
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
                          <Button size="sm" onClick={runPythonCode} disabled={isLoading || isRunning} className="text-xs">
              {isLoading || isRunning ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Play className="h-3 w-3 mr-1" />}
              {isLoading ? "Loading..." : isRunning ? "Running..." : "Run"}
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




