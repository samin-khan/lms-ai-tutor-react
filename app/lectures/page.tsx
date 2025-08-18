"use client"

import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { LecturesPage } from "@/components/pages/lectures"

export default function LecturesPageRoute() {
  const router = useRouter()

  const handleSectionChange = (section: string, assignmentId?: number) => {
    if (section === "claude" && assignmentId) {
      router.push(`/claude?assignment=${assignmentId}`)
    } else {
      router.push(`/${section}`)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainLayout activeSection="lectures" onSectionChange={handleSectionChange}>
        <LecturesPage />
      </MainLayout>
    </div>
  )
}
