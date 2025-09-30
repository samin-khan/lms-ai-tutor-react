"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface MainLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const sectionTitles = {
  syllabus: { title: "Course Syllabus", subtitle: "Schedule, grading, and policies" },
  assignments: { title: "Assignments", subtitle: "Current and graded assignments" },
  lectures: { title: "Lecture Notes", subtitle: "Week-by-week course content" },
  claude: { title: "Claude AI Tutor", subtitle: "Get help with your coursework" },
}

export function MainLayout({ children, activeSection, onSectionChange }: MainLayoutProps) {
  const currentSection = sectionTitles[activeSection as keyof typeof sectionTitles]

  return (
    <>
      <Sidebar activeSection={activeSection} onSectionChange={onSectionChange} />

      <main className="flex-1 flex flex-col md:ml-64">
        <Header title={currentSection.title} subtitle={currentSection.subtitle} />

        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl w-full">{children}</div>
        </div>
      </main>
    </>
  )
}
