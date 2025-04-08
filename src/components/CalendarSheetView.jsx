import React from "react";
import { DayPicker } from "react-day-picker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function CalendarSheetView({
  isVisible,
  setIsVisible,
  selectedDate,
  setSelectedDate,
  daysWithEntries,
}) {
  return (
    <Sheet open={isVisible} onOpenChange={setIsVisible}>
      <SheetContent side="right" className="sm:max-w-md flex flex-col items-center p-10">
        <SheetHeader>
          <SheetTitle>Calendar View</SheetTitle>
          <SheetDescription>
            Select a date to view or add journal entries
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setIsVisible(false);
              }
            }}
            modifiers={{
              hasEntries: daysWithEntries,
            }}
            modifiersClassNames={{
              selected: "bg-primary text-white rounded-full",
              hasEntries:
                "border-slate-900 border-2 rounded-full",
            }}
            className="mx-auto"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
