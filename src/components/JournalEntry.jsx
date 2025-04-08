import React from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

export default function JournalEntry({
  entry,
  showViewDayButton = false,
  onViewDay = () => {},
  formatDate = null,
}) {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">
            {entry.title || format(parseISO(entry.createdAt), "PPP")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate
              ? formatDate(entry.createdAt)
              : format(parseISO(entry.createdAt), "h:mm a")}
          </p>
        </div>
        {showViewDayButton && (
          <Button variant="ghost" size="sm" onClick={onViewDay}>
            View Day
          </Button>
        )}
      </div>
      <p className="whitespace-pre-wrap">{entry.content}</p>
    </>
  );
}
