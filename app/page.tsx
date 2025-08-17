"use client"

import { useState } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { SyllabusPage } from "@/components/pages/syllabus"
import { AssignmentsPage } from "@/components/pages/assignments"
import { LecturesPage } from "@/components/pages/lectures"
import { ClaudePage } from "@/components/pages/claude"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("syllabus")

  const renderContent = () => {
    switch (activeSection) {
      case "syllabus":
        return <SyllabusPage />
      case "assignments":
        return <AssignmentsPage />
      case "lectures":
        return <LecturesPage />
      case "claude":
        return <ClaudePage />
      default:
        return <SyllabusPage />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainLayout activeSection={activeSection} onSectionChange={setActiveSection}>
        {renderContent()}
      </MainLayout>
    </div>
  )
}
