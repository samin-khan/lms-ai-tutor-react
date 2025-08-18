"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { SyllabusPage } from "@/components/pages/syllabus"
import { AssignmentsPage } from "@/components/pages/assignments"
import { LecturesPage } from "@/components/pages/lectures"
import { ClaudePage } from "@/components/pages/claude"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("syllabus")
  const [claudeAssignmentId, setClaudeAssignmentId] = useState<number | undefined>(undefined)

  const handleSectionChange = (section: string, assignmentId?: number) => {
    setActiveSection(section)
    if (section === "claude" && assignmentId) {
      setClaudeAssignmentId(assignmentId)
    } else if (section !== "claude") {
      setClaudeAssignmentId(undefined)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "syllabus":
        return <SyllabusPage />
      case "assignments":
        return <AssignmentsPage onSectionChange={handleSectionChange} />
      case "lectures":
        return <LecturesPage />
      case "claude":
        return <ClaudePage assignmentId={claudeAssignmentId} />
      default:
        return <SyllabusPage />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
        {renderContent()}
      </MainLayout>
    </div>
  )
}
