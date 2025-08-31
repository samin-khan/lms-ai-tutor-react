"use client"

import type React from "react"
import { useRef, useEffect } from "react"

interface PythonEditorProps {
  code: string
  onChange: (code: string) => void
}

export function PythonEditor({ code, onChange }: PythonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [code])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newValue = code.substring(0, start) + "    " + code.substring(end)
      onChange(newValue)

      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
      }, 0)
    }
  }

  return (
    <div className="relative h-full">
      {/* Line numbers */}
      <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r border-gray-200 text-xs text-gray-500 font-mono">
        {code.split("\n").map((_, index) => (
          <div key={index} className="px-2 py-0.5 text-right leading-5">
            {index + 1}
          </div>
        ))}
      </div>

      {/* Code editor */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full pl-14 pr-4 py-2 font-mono text-sm leading-5 bg-white border-none outline-none resize-none"
        style={{ minHeight: "200px" }}
        spellCheck={false}
        placeholder="Write your Python code here..."
      />

      {/* Syntax highlighting overlay (simplified) */}
      <div className="absolute inset-0 pl-14 pr-4 py-2 pointer-events-none font-mono text-sm leading-5 whitespace-pre-wrap">
        <div
          dangerouslySetInnerHTML={{
            __html: highlightPython(code),
          }}
          className="text-transparent"
        />
      </div>
    </div>
  )
}

// Simple Python syntax highlighting
function highlightPython(code: string): string {
  return code
    .replace(
      /\b(def|if|elif|else|for|while|return|import|from|class|try|except|finally|with|as|pass|break|continue|and|or|not|in|is|None|True|False)\b/g,
      '<span class="syntax-keyword">$1</span>',
    )
    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="syntax-string">$1$2$1</span>')
    .replace(/(#.*$)/gm, '<span class="syntax-comment">$1</span>')
}
