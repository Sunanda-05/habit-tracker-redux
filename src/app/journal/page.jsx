"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { format, isSameDay, parseISO } from "date-fns";
import {
  useGetJournalsQuery,
  useAddJournalMutation,
} from "@/redux/api/journalApi";
import { selectAllJournals } from "@/redux/features/journalAdapter";
import { Button } from "@/components/ui/button";
import { Calendar, SquareArrowOutUpLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JournalHeader from "@/components/JournalHeader";
import CalendarSheetView from "@/components/CalendarSheetView";
import WriteTab from "@/components/WriteTab";
import EntriesTab from "@/components/EntriesTab";
import AllEntriesTab from "@/components/AllEntriesTab";
import "react-day-picker/dist/style.css";
import { useAddToastMutation } from "@/redux/api/toastApi";

export default function UnifiedJournalPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("write");

  const { isFetching, isLoading } = useGetJournalsQuery();
  const journals = useSelector(selectAllJournals);
  const [addJournal, { isLoading: isSubmitting }] = useAddJournalMutation();
  const [addToast] = useAddToastMutation();

  useEffect(() => {
    if (selectedDate) {
      setActiveTab("entries");
    }
  }, [selectedDate]);

  // Group entries by date string
  const entriesByDate = useMemo(() => {
    const map = new Map();
    journals.forEach((entry) => {
      const dateInUTC = new Date(entry.createdAt);
      const istDate = new Date(dateInUTC.getTime() + 5.5 * 60 * 60 * 1000);

      const formattedDate = istDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD
      if (!map.has(formattedDate)) map.set(formattedDate, []);
      map.get(formattedDate).push(entry);
    });
    return map;
  }, [journals]);

  const selectedEntries = useMemo(() => {
    return journals.filter((entry) =>
      isSameDay(parseISO(entry.createdAt), new Date(selectedDate.toISOString()))
    );
  }, [journals, selectedDate]);

  const daysWithEntries = useMemo(() => {
    return Array.from(entriesByDate.keys()).map((dateStr) => parseISO(dateStr));
  }, [entriesByDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;
    try {
      await addJournal({
        title: title.trim() || format(new Date(), "PP") + " Entry",
        content: content.trim(),
        createdAt: selectedDate.toISOString(),
      });

      addToast({
        id: Date.now().toString(),
        type: "success",
        message: "Journal Entry added.",
      });
      setTitle("");
      setContent("");
      setActiveTab("entries");
    } catch (err) {
      addToast({
        id: Date.now().toString(),
        type: "error",
        message: "Something went wrong.",
      });
      console.log(err);
    }
  };

  const formatDistanceToNow = (date) => {
    const now = new Date();
    const entryDate = parseISO(date);

    if (isSameDay(now, entryDate)) {
      return format(entryDate, "'Today at' h:mm a");
    } else {
      return format(entryDate, "PPP 'at' h:mm a");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col space-y-6">
        {/* Header with title and calendar toggle */}
        <JournalHeader
          isCalendarVisible={isCalendarVisible}
          setIsCalendarVisible={setIsCalendarVisible}
        />

        {/* Calendar Sheet */}
        <CalendarSheetView
          isVisible={isCalendarVisible}
          setIsVisible={setIsCalendarVisible}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          daysWithEntries={daysWithEntries}
        />

        {/* Main content */}
        <Card className="shadow-lg border-muted">
          <CardHeader className="bg-muted/20 py-3 px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">
                  {format(selectedDate, "PPPP")}
                </h2>
              </div>
              <Badge
                variant={selectedEntries.length > 0 ? "success" : "outline"}
              >
                {selectedEntries.length}{" "}
                {selectedEntries.length === 1 ? "entry" : "entries"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none px-6 h-12">
                  <TabsTrigger
                    value="write"
                    className="data-[state=active]:bg-background"
                  >
                    Write
                  </TabsTrigger>
                  <TabsTrigger
                    value="entries"
                    className="data-[state=active]:bg-background"
                  >
                    Entries
                  </TabsTrigger>
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-background"
                  >
                    All Entries
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Write Tab */}
              <TabsContent value="write" className="p-6">
                <WriteTab
                  title={title}
                  setTitle={setTitle}
                  content={content}
                  setContent={setContent}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </TabsContent>

              {/* Entries for Selected Date Tab */}
              <TabsContent value="entries" className="p-0">
                <EntriesTab
                  isLoading={isLoading}
                  selectedEntries={selectedEntries}
                  selectedDate={selectedDate}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>

              {/* All Entries Tab */}
              <TabsContent value="all" className="p-0">
                <AllEntriesTab
                  isLoading={isLoading}
                  journals={journals}
                  setSelectedDate={setSelectedDate}
                  setActiveTab={setActiveTab}
                  formatDistanceToNow={formatDistanceToNow}
                />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-between p-6 pt-0 border-t">
            <Button
              variant="outline"
              onClick={() => setSelectedDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsCalendarVisible(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Open Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full flex justify-start my-5">
        <Link href="/" className="w-[200px]">
          <Button className="w-[200px]">
            <SquareArrowOutUpLeft className="h-4 w-4" /> Return to Habit-Tracker
          </Button>
        </Link>
      </div>
    </div>
  );
}
