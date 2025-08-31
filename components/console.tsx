"use client"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConsoleProps {
  output: string
}

export function Console({ output }: ConsoleProps) {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 font-mono text-xs">
        {output ? (
          <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
        ) : (
          <p className="text-gray-500 italic">No output yet. Run your code to see results.</p>
        )}
      </div>
    </ScrollArea>
  )
}
