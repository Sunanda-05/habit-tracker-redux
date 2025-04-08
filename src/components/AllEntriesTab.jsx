import React from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { parseISO } from "date-fns";
import JournalEntry from "./JournalEntry";

export default function AllEntriesTab({
  isLoading,
  journals,
  setSelectedDate,
  setActiveTab,
  formatDistanceToNow,
}) {
  return (
    <ScrollArea className="h-96 p-6">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : journals.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Your journal is empty</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Start your journaling journey by writing your first entry.
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
          {journals
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((entry, index) => (
              <div key={entry.id} className="space-y-2">
                <JournalEntry
                  entry={entry}
                  showViewDayButton={true}
                  onViewDay={() => {
                    setSelectedDate(parseISO(entry.createdAt));
                    setActiveTab("entries");
                  }}
                  formatDate={formatDistanceToNow}
                />
                {index < journals.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
        </div>
      )}
    </ScrollArea>
  );
}
