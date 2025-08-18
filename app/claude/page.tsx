"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { MainLayout } from "@/components/layout/main-layout"
import { ClaudePage } from "@/components/pages/claude"

export default function ClaudePageRoute() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const assignmentId = searchParams.get("assignment") ? Number.parseInt(searchParams.get("assignment")!) : undefined

  const handleSectionChange = (section: string, assignmentId?: number) => {
    if (section === "claude" && assignmentId) {
      router.push(`/claude?assignment=${assignmentId}`)
    } else {
      router.push(`/${section}`)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <MainLayout activeSection="claude" onSectionChange={handleSectionChange}>
        <ClaudePage assignmentId={assignmentId} />
      </MainLayout>
    </div>
  )
}
