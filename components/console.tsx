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
          (() => {
            // Find the index of the test results delimiter
            const delimiter = "=== TEST_RESULTS_START ===";
            const idx = output.indexOf(delimiter);
            const displayOutput = idx !== -1 ? output.slice(0, idx) : output;
            return displayOutput.trim() ? (
              <pre className="whitespace-pre-wrap text-gray-800">{displayOutput}</pre>
            ) : (
              <p className="text-gray-500 italic">No output yet. Run your code to see results.</p>
            );
          })()
        ) : (
          <p className="text-gray-500 italic">No output yet. Run your code to see results.</p>
        )}
      </div>
    </ScrollArea>
  )
}
