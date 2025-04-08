import React from "react";
import { format, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import JournalEntry from "./JournalEntry";

export default function EntriesTab({
  isLoading,
  selectedEntries,
  selectedDate,
  setActiveTab,
}) {
  return (
    <ScrollArea className="h-96 p-6">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : selectedEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No entries for this date</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Write your first journal entry for {format(selectedDate, "PPPP")} by
            switching to the Write tab.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setActiveTab("write")}
          >
            Write New Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {selectedEntries.map((entry, index) => (
            <div key={entry.id} className="space-y-2">
              <JournalEntry entry={entry} showViewDayButton={false} />
              {index < selectedEntries.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
