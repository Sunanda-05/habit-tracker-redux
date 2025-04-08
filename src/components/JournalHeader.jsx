import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function JournalHeader({
  isCalendarVisible,
  setIsCalendarVisible,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Journal</h1>
        <p className="text-muted-foreground mt-1">
          Record and reflect on your thoughts and experiences
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => setIsCalendarVisible(true)}
        >
          <Calendar className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
