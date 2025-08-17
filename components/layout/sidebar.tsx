"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, GraduationCap, Bot, Menu, X } from "lucide-react"

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
    icon: Bot,
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
          "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          "md:translate-x-0",
          isCollapsed ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6">
            <h1 className="font-serif text-xl font-bold text-sidebar-foreground">CS101</h1>
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
                    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsCollapsed(true) // Close mobile menu after selection
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs opacity-70">{item.description}</span>
                  </div>
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="text-center text-xs text-sidebar-primary">
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
