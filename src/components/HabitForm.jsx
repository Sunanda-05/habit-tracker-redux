"use client";

import { useState } from "react";
import { useAddHabitMutation } from "@/redux/api/habitApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

import { useAddToastMutation } from "@/redux/api/toastApi";

export function HabitForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [addHabit, { isLoading }] = useAddHabitMutation();
  const [addToast] = useAddToastMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newHabit = {
      title,
      description,
      frequency,
      completed: false,
      streak: 0,
      createdAt: new Date().toISOString(),
    };

    try {
      await addHabit(newHabit).unwrap();
      addToast({
        id: Date.now().toString(),
        type: "success",
        message: "Habit entry saved!",
      });
      setTitle("");
      setDescription("");
      setFrequency("daily");
      setIsFormOpen(false);
    } catch (error) {
      addToast({
        id: Date.now().toString(),
        type: "error",
        message: "Something went wrong.",
      });
      console.log("Failed to add habit:", error);
    }
  };

  if (!isFormOpen) {
    return (
      <Button onClick={() => setIsFormOpen(true)} className="w-full mb-6">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Habit
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Habit</CardTitle>
        <CardDescription>
          Add a new habit to track your progress
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Habit title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Habit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
