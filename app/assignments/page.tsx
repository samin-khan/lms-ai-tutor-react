"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { AssignmentsPage } from "@/components/pages/assignments"

export default function AssignmentsPageRoute() {
  const router = useRouter()
  const [claudeAssignmentId, setClaudeAssignmentId] = useState<number | undefined>(undefined)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === "#graded") {
      // Scroll to graded assignments section or trigger tab switch
      const gradedSection = document.getElementById("graded-assignments")
      if (gradedSection) {
        gradedSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const handleSectionChange = (section: string, assignmentId?: number) => {
    if (section === "claude" && assignmentId) {
      setClaudeAssignmentId(assignmentId)
      router.push(`/claude?assignment=${assignmentId}`)
    } else {
      router.push(`/${section}`)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainLayout activeSection="assignments" onSectionChange={handleSectionChange}>
        <AssignmentsPage onSectionChange={handleSectionChange} />
      </MainLayout>
    </div>
  )
}
