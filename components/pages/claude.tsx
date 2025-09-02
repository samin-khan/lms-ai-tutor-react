"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, Code, BookOpen, Zap, ChevronDown, Check, GraduationCap, X, Loader2, TestTube } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  topic?: string
}

interface ModelOption {
  id: string
  name: string
  description: string
}

const modelOptions: ModelOption[] = [
  {
    id: "claude-sonnet-4-0",
    name: "Claude Sonnet 4",
    description: "Smart, efficient model for everyday use",
  },
  {
    id: "claude-opus-4-1",
    name: "Claude Opus 4.1",
    description: "Powerful, large model for complex challenges",
  },
  {
    id: "claude-3-5-haiku-latest",
    name: "Claude Haiku 3.5",
    description: "Fastest model for daily tasks",
  },
]

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

const INTERACTION_SYSTEM_PROMPT = `You are an interactive learning experience generator for CS 101 students. Create engaging, gamified activities that help students learn programming concepts through hands-on interaction.

Your response should be a complete HTML page with embedded CSS and JavaScript that creates an interactive learning experience. The experience should:

1. Be aligned to CS 101 course content (variables, data types, conditionals, loops, functions, basic algorithms)
2. Include interactive elements like buttons, input fields, drag-and-drop, or clickable areas
3. Provide immediate feedback and encouragement
4. Have a gamified element (points, progress bars, levels, or achievements)
5. Be educational and help students practice specific programming concepts
6. Be visually appealing with good UX design
7. Work entirely within a single HTML file (no external dependencies)

The HTML should be complete and ready to display in an iframe. Include proper styling and make it responsive. Focus on the specific concept the student asked about and create multiple interactive exercises or challenges around that topic.

Remember: This is for CS 101 students, so keep explanations clear and examples beginner-friendly.`

function parseInteractionContent(content: string): string {
  if (!content) return ""
  
  // Check if content is already clean HTML (starts with <!DOCTYPE or <html)
  if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
    return content
  }
  
  // Extract HTML from markdown code blocks
  const htmlMatch = content.match(/```html\s*([\s\S]*?)\s*```/i)
  if (htmlMatch) {
    return htmlMatch[1].trim()
  }
  
  // Extract content from generic code blocks
  const codeMatch = content.match(/```\s*([\s\S]*?)\s*```/)
  if (codeMatch) {
    const extractedContent = codeMatch[1].trim()
    // Check if the extracted content looks like HTML
    if (extractedContent.includes('<html') || extractedContent.includes('<!DOCTYPE')) {
      return extractedContent
    }
  }
  
  // If no code blocks found, check if it's raw HTML
  if (content.includes('<html') || content.includes('<!DOCTYPE')) {
    return content.trim()
  }
  
  // Fallback: return content as-is wrapped in basic HTML structure
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Learning</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
    </style>
</head>
<body>
    <div>${content}</div>
</body>
</html>`
}

const HARDCODED_INTERACTION_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Python Variable Explorer - CS101</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .title {
            color: #4f46e5;
            font-size: 2.2em;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .subtitle {
            color: #6b7280;
            font-size: 1.1em;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            margin: 20px 0;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #34d399);
            border-radius: 4px;
            width: 0%;
            transition: width 0.5s ease;
        }
        
        .stats {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }
        
        .stat {
            text-align: center;
            padding: 15px;
            background: #f8fafc;
            border-radius: 10px;
            min-width: 100px;
        }
        
        .stat-value {
            font-size: 1.8em;
            font-weight: bold;
            color: #4f46e5;
        }
        
        .stat-label {
            color: #6b7280;
            font-size: 0.9em;
        }
        
        .game-area {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 30px 0;
        }
        
        .variables-panel, .types-panel {
            background: #f9fafb;
            border-radius: 15px;
            padding: 20px;
        }
        
        .panel-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .variable-item, .type-slot {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px;
            margin: 10px 0;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
        }
        
        .variable-item:hover {
            border-color: #4f46e5;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(79, 70, 229, 0.2);
        }

        .variable-item.dragging {
            opacity: 0.5;
            transform: rotate(5deg);
        }
        
        /* Add this new CSS for the custom drag image */
        .drag-ghost {
            transform: scale(0.25);
            opacity: 0.8;
            border: 2px solid #4f46e5;
            box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
            background: white;
            border-radius: 10px;
            padding: 15px;
            pointer-events: none;
            position: absolute;
            top: -1000px; /* Hide it off-screen initially */
            left: -1000px;
        }
        
        .type-slot {
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f3f4f6;
            border-style: dashed;
        }
        
        .type-slot.drag-over {
            background: #dbeafe;
            border-color: #3b82f6;
        }
        
        .type-slot.correct {
            background: #d1fae5;
            border-color: #10b981;
        }
        
        .type-slot.incorrect {
            background: #fee2e2;
            border-color: #ef4444;
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .variable-code {
            font-family: 'Courier New', monospace;
            background: #1f2937;
            color: #10b981;
            border-radius: 8px;
            padding: 10px;
            margin: 5px 0;
        }
        
        .feedback {
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .feedback.success {
            background: #d1fae5;
            color: #065f46;
            border: 2px solid #10b981;
        }
        
        .feedback.error {
            background: #fee2e2;
            color: #991b1b;
            border: 2px solid #ef4444;
        }
        
        .reset-btn {
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 12px 24px;
            font-size: 1em;
            cursor: pointer;
            margin: 20px auto;
            display: block;
            transition: all 0.3s ease;
        }
        
        .reset-btn:hover {
            background: #4f46e5;
            transform: translateY(-2px);
        }
        
        .achievement {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fbbf24;
            color: #92400e;
            padding: 15px 20px;
            border-radius: 10px;
            font-weight: bold;
            transform: translateX(100%);
            transition: transform 0.5s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3);
        }
        
        .achievement.show {
            transform: translateX(0);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">🐍 Python Variable Explorer</h1>
            <p class="subtitle">Drag variables to their correct data types!</p>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat">
                <div class="stat-value" id="score">0</div>
                <div class="stat-label">Score</div>
            </div>
            <div class="stat">
                <div class="stat-value" id="level">1</div>
                <div class="stat-label">Level</div>
            </div>
            <div class="stat">
                <div class="stat-value" id="streak">0</div>
                <div class="stat-label">Streak</div>
            </div>
        </div>
        
        <div class="game-area">
            <div class="variables-panel">
                <h3 class="panel-title">Variables</h3>
                <div id="variablesContainer"></div>
            </div>
            
            <div class="types-panel">
                <h3 class="panel-title">Data Types</h3>
                <div class="type-slot" data-type="int">
                    <strong>Integer (int)</strong>
                </div>
                <div class="type-slot" data-type="str">
                    <strong>String (str)</strong>
                </div>
                <div class="type-slot" data-type="float">
                    <strong>Float (float)</strong>
                </div>
                <div class="type-slot" data-type="bool">
                    <strong>Boolean (bool)</strong>
                </div>
            </div>
        </div>
        
        <div class="feedback" id="feedback" style="display: none;"></div>
        
        <button class="reset-btn" onclick="resetGame()">🔄 Reset Game</button>
    </div>
    
    <div class="achievement" id="achievement">
        🎉 Great job! Keep it up!
    </div>
    
    <script>
        const variables = [
            { code: 'age = 25', type: 'int' },
            { code: 'name = "Alice"', type: 'str' },
            { code: 'height = 5.8', type: 'float' },
            { code: 'is_student = True', type: 'bool' },
            { code: 'temperature = -10', type: 'int' },
            { code: 'greeting = "Hello!"', type: 'str' },
            { code: 'pi = 3.14159', type: 'float' },
            { code: 'is_valid = False', type: 'bool' }
        ];
        
        let currentVariables = [];
        let score = 0;
        let level = 1;
        let streak = 0;
        let correctAnswers = 0;

        function handleDragStart(e) {
            e.target.classList.add('dragging');
            
            // Create a custom drag image that's half the size
            const dragGhost = e.target.cloneNode(true);
            dragGhost.classList.remove('dragging');
            dragGhost.classList.add('drag-ghost');
            dragGhost.style.transform = 'scale(0.5)';
            
            // Temporarily add to DOM for drag image
            document.body.appendChild(dragGhost);
            
            // Set the custom drag image
            e.dataTransfer.setDragImage(dragGhost, 
                dragGhost.offsetWidth / 2, 
                dragGhost.offsetHeight / 2
            );
            
            // Clean up the temporary element after a brief delay
            setTimeout(() => {
                if (dragGhost.parentNode) {
                    document.body.removeChild(dragGhost);
                }
            }, 0);
            
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.dataTransfer.setData('application/x-index', e.target.dataset.index);
        }
        
        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
        
        function generateVariables() {
            const numVars = Math.min(4 + level - 1, variables.length);
            currentVariables = shuffleArray(variables).slice(0, numVars);
            const container = document.getElementById('variablesContainer');
            container.innerHTML = '';
            
            currentVariables.forEach((variable, index) => {
                const div = document.createElement('div');
                div.className = 'variable-item';
                div.draggable = true;
                div.dataset.type = variable.type;
                div.dataset.index = index;
                div.innerHTML = '<div class="variable-code">' + variable.code + '</div>';
                
                div.addEventListener('dragstart', handleDragStart);
                div.addEventListener('dragend', handleDragEnd);
                
                container.appendChild(div);
            });
        }
        
        function handleDragStart(e) {
            e.target.classList.add('dragging');
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.dataTransfer.setData('application/x-index', e.target.dataset.index);
        }
        
        function handleDragEnd(e) {
            e.target.classList.remove('dragging');
        }
        
        function setupDropZones() {
            const typeSlots = document.querySelectorAll('.type-slot');
            
            typeSlots.forEach(slot => {
                slot.addEventListener('dragover', handleDragOver);
                slot.addEventListener('drop', handleDrop);
                slot.addEventListener('dragleave', handleDragLeave);
            });
        }
        
        function handleDragOver(e) {
            e.preventDefault();
            e.target.classList.add('drag-over');
        }
        
        function handleDragLeave(e) {
            e.target.classList.remove('drag-over');
        }
        
        function handleDrop(e) {
            e.preventDefault();
            e.target.classList.remove('drag-over');
            
            const draggedType = e.dataTransfer.getData('text/plain');
            const draggedIndex = e.dataTransfer.getData('application/x-index');
            const targetType = e.target.dataset.type;
            
            const draggedElement = document.querySelector('[data-index="' + draggedIndex + '"]');
            
            if (draggedType === targetType) {
                e.target.classList.add('correct');
                draggedElement.style.display = 'none';
                correctAnswers++;
                streak++;
                score += 10 * level;
                
                showFeedback('Correct! ' + currentVariables[draggedIndex].code + ' is indeed a ' + targetType + '!', 'success');
                showAchievement('🎯 Correct!');
                
                updateStats();
                
                if (correctAnswers === currentVariables.length) {
                    setTimeout(() => {
                        level++;
                        correctAnswers = 0;
                        showAchievement('🎉 Level Up! Level ' + level);
                        resetTypeSlots();
                        generateVariables();
                        hideFeedback();
                    }, 1500);
                }
            } else {
                e.target.classList.add('incorrect');
                streak = 0;
                showFeedback('Not quite! ' + currentVariables[draggedIndex].code + ' is not a ' + targetType + '. Try again!', 'error');
                
                setTimeout(() => {
                    e.target.classList.remove('incorrect');
                }, 1000);
            }
        }
        
        function showFeedback(message, type) {
            const feedback = document.getElementById('feedback');
            feedback.textContent = message;
            feedback.className = 'feedback ' + type;
            feedback.style.display = 'block';
        }
        
        function hideFeedback() {
            document.getElementById('feedback').style.display = 'none';
        }
        
        function showAchievement(message) {
            const achievement = document.getElementById('achievement');
            achievement.textContent = message;
            achievement.classList.add('show');
            
            setTimeout(() => {
                achievement.classList.remove('show');
            }, 2000);
        }
        
        function updateStats() {
            document.getElementById('score').textContent = score;
            document.getElementById('level').textContent = level;
            document.getElementById('streak').textContent = streak;
            
            const progress = (correctAnswers / currentVariables.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }
        
        function resetTypeSlots() {
            const typeSlots = document.querySelectorAll('.type-slot');
            typeSlots.forEach(slot => {
                slot.classList.remove('correct', 'incorrect');
            });
        }
        
        function resetGame() {
            score = 0;
            level = 1;
            streak = 0;
            correctAnswers = 0;
            resetTypeSlots();
            generateVariables();
            updateStats();
            hideFeedback();
            showAchievement('🔄 Game Reset!');
        }
        
        // Initialize game
        generateVariables();
        setupDropZones();
        updateStats();
    </script>
</body>
</html>`

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
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4-0")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: assignmentId
        ? `Hello! I'm Claude, your CS101 AI tutor. I see you need help with an assignment. I'm here to guide you through understanding the concepts and requirements. Let me know what specific questions you have!`
        : `Hello! I'm Claude, your CS101 AI tutor. I'm here to help you with programming concepts, debug your code, and answer any questions about the course material.

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
  const [showInteraction, setShowInteraction] = useState(false)
  const [interactionContent, setInteractionContent] = useState("")
  const [isGeneratingInteraction, setIsGeneratingInteraction] = useState(false)

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

  const callClaudeAPI = async (message: string, systemPrompt?: string): Promise<string> => {
    try {
      // Convert messages to API format, excluding welcome message
      const history = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.type === "user" ? ("user" as const) : ("assistant" as const),
          content: msg.content,
        }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history, model: selectedModel, systemPrompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      return data.response
    } catch (error) {
      console.error("Error calling Claude API:", error)
      throw error
    }
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
    setError(null)

    try {
      const response = await callClaudeAPI(content)

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

  const handleCreateInteraction = async () => {
    if (!inputValue.trim()) return

    setIsGeneratingInteraction(true)
    setShowInteraction(true)
    setInteractionContent("")

    try {
      const response = await callClaudeAPI(
        `Create an interactive learning experience for: ${inputValue}`,
        INTERACTION_SYSTEM_PROMPT,
      )

      const parsedContent = parseInteractionContent(response)
      setInteractionContent(parsedContent)
    } catch (error) {
      console.error("Error generating interaction:", error)
      setInteractionContent(
        "<div style='padding: 20px; text-align: center; color: #ef4444;'>Sorry, I couldn't generate the interaction. Please try again.</div>",
      )
    } finally {
      setIsGeneratingInteraction(false)
    }
  }

  const handleCloseInteraction = () => {
    setShowInteraction(false)
    setInteractionContent("")
    setIsGeneratingInteraction(false)
  }

  const handleTestInteraction = () => {
    setShowInteraction(true)
    setIsGeneratingInteraction(false)
    setInteractionContent(HARDCODED_INTERACTION_TEMPLATE)
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
    <div className="w-full max-w-none space-y-4">
      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Image src="/claude-icon.png" alt="Claude AI" width={32} height={32} />
          <h1 className="text-3xl font-medium text-gray-800">Good afternoon, Student</h1>
        </div>
        <p className="text-gray-600 text-lg">How can I help you today?</p>
      </div>

      <div className={`flex gap-4 transition-all duration-300 ${showInteraction ? "h-[700px]" : ""} w-full max-w-full`}>
        <Card
          className={`flex flex-col bg-stone-50 border-stone-200 transition-all duration-300 ${showInteraction ? "flex-1" : "w-full"}`}
        >
          <CardContent className="flex flex-col gap-4 p-0 bg-stone-50">
            <div className={`${showInteraction ? "h-[560px]" : "h-[500px]"} flex flex-col px-6`}>
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
                            <Image src="/claude-icon.png" alt="Claude AI" width={16} height={16} />
                          </div>
                          <div className="flex-1">
                            <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line max-w-none">
                              {message.content}
                            </div>
                            {message.type === "assistant" && message.id !== "welcome" && (
                              <div className="mt-4">
                                <Image
                                  src="/claude-icon.png"
                                  alt="Claude AI"
                                  width={24}
                                  height={24}
                                  className="opacity-60"
                                />
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
                        <Image src="/claude-icon.png" alt="Claude AI" width={16} height={16} />
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white border-stone-300">
                    {modelOptions.find((m) => m.id === selectedModel)?.name || "Claude Sonnet 4"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {modelOptions.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className="flex items-center justify-between p-3 cursor-pointer"
                    >
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-sm text-gray-600">{model.description}</div>
                      </div>
                      {selectedModel === model.id && <Check className="h-4 w-4 text-blue-600" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => handleSendMessage(inputValue)} disabled={isTyping || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => showInteraction ? handleCloseInteraction() : handleTestInteraction()}
                variant="outline"
                className={showInteraction ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100" : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"}
              >
                {showInteraction ? <X className="h-4 w-4 mr-2" /> : <TestTube className="h-4 w-4 mr-2" />}
                {showInteraction ? "Close" : "Open Interactive Learning"}
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

        {showInteraction && (
          <Card className="flex-1 bg-white border-stone-200 animate-in slide-in-from-right duration-300">
            <CardHeader className="pb-1 pt-3">
              <CardTitle className="text-xl font-medium text-gray-800">Interactive Learning (Beta)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[640px]">
                {isGeneratingInteraction ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600 font-medium">Building your interaction...</p>
                    <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : interactionContent ? (
                  <iframe
                    srcDoc={interactionContent}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                    title="Interactive Learning Experience"
                  />
                ) : null}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
