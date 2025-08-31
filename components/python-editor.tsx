"use client"

import type React from "react"
import { useRef } from "react"

interface PythonEditorProps {
  code: string
  onChange: (code: string) => void
}

export function PythonEditor({ code, onChange }: PythonEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
    <div className="relative h-full overflow-hidden">
      {/* Line numbers */}
      <div className="absolute left-0 top-0 w-12 h-full bg-gray-100 border-r border-gray-200 text-xs text-gray-500 font-mono overflow-hidden">
        <div className="overflow-y-auto h-full">
          {code.split("\n").map((_, index) => (
            <div key={index} className="px-2 py-0.5 text-right leading-5">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Code editor */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full pl-14 pr-4 py-2 font-mono text-sm leading-5 bg-white border-none outline-none resize-none overflow-y-auto"
        spellCheck={false}
        placeholder="Write your Python code here..."
      />
    </div>
  )
}
