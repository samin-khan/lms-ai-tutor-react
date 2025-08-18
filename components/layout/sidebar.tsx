"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, Menu, X } from "lucide-react"
import Image from "next/image"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  {
    id: "syllabus",
    label: "Syllabus",
    icon: FileText,
    description: "Course overview and schedule",
  },
  {
    id: "assignments",
    label: "Assignments",
    icon: BookOpen,
    description: "Current and graded assignments",
  },
  {
    id: "lectures",
    label: "Lectures",
    icon: GraduationCap,
    description: "Week-by-week course content",
  },
  {
    id: "claude",
    label: "Claude AI",
    icon: null, // Using custom Claude icon instead of Bot icon
    description: "AI tutoring and Q&A support",
  },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
            <div className="text-center">
              <h1 className="font-serif text-xl font-bold text-gray-800">CS101</h1>
              <p className="text-sm text-gray-600 mt-1">Introduction to Programming</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 px-3 text-left",
                    "text-blue-600 hover:bg-blue-50 hover:text-blue-700",
                    isActive && "bg-blue-100 text-blue-800",
                  )}
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsCollapsed(true) // Close mobile menu after selection
                  }}
                >
                  {item.id === "claude" ? (
                    <Image src="/claude-icon.png" alt="Claude AI" width={20} height={20} className="flex-shrink-0" />
                  ) : (
                    Icon && <Icon className="h-5 w-5 flex-shrink-0" />
                  )}
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-center text-xs text-gray-600">
              <p className="font-medium">Computer Science 101</p>
              <p className="opacity-70">Introduction to Programming</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!isCollapsed && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsCollapsed(true)} />
      )}
    </>
  )
}
