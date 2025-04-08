"use client";

import { useSelector } from "react-redux";
import {
  useGetHabitsQuery,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useUpdateHabitStatusMutation,
  useGetHabitByIdQuery,
} from "@/redux/api/habitApi";
import { selectFilters } from "@/redux/features/filterSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Flame, Trash2 } from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAddToastMutation } from "@/redux/api/toastApi";

export function HabitList() {
  const {
    data: habits,
    isLoading,
    isError,
    error,
  } = useGetHabitsQuery({
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // const habitId = "1";
  // const { data: habitName } = useGetHabitByIdQuery(habitId?? skipToken, {
  //   selectFromResult: ({ data }) => ({
  //     habitName: data?.name,
  //   }),
  //   skip: !habitId,
  // });

  const [updateHabit] = useUpdateHabitMutation();
  const [updateHabitStatus] = useUpdateHabitStatusMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const filters = useSelector(selectFilters);

  const [addToast] = useAddToastMutation();

  // // Optional prefetch hook for UI (hover/anticipate behavior)
  // const prefetchHabit = (dispatch, id) => {
  //   dispatch(habitApi.util.prefetch("getHabitById", id, { force: true }));
  // };

  // // Optional full reset (e.g., on logout)
  // const resetHabitCache = (dispatch) => {
  //   dispatch(habitApi.util.resetApiState());
  // };

  const handleToggleComplete = async (habit) => {
    try {
      const updatedHabit = {
        ...habit,
        completed: !habit.completed,
        streak: !habit.completed
          ? habit.streak + 1
          : Math.max(0, habit.streak - 1),
      };
      await updateHabitStatus({ completed: !habit.completed, id: habit.id });
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      addToast({
        id: Date.now().toString(),
        type: "delete",
        message: "Habit Deleted.",
      });
    } catch (error) {
      addToast({
        id: Date.now().toString(),
        type: "error",
        message: "Something went wrong.",
      });
      console.error("Failed to delete habit:", error);
    }
  };

  // Apply filters
  const filteredHabits = habits
    ? habits.filter((habit) => {
        if (
          filters.frequency !== "all" &&
          habit.frequency !== filters.frequency
        ) {
          return false;
        }
        if (filters.status === "completed" && !habit.completed) {
          return false;
        }
        if (filters.status === "active" && habit.completed) {
          return false;
        }
        return true;
      })
    : [];

  // Apply sorting
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (filters.sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filters.sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (filters.sortBy === "streak") {
      return b.streak - a.streak;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="bg-destructive/10">
        <CardHeader>
          <CardTitle>Error Loading Habits</CardTitle>
          <CardDescription>
            {error?.message || "Failed to load habits. Please try again."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!sortedHabits.length) {
    return (
      <Card className="text-center p-6">
        <CardHeader>
          <CardTitle>No Habits Found</CardTitle>
          <CardDescription>
            {filters.frequency !== "all" || filters.status !== "all"
              ? "Try changing your filters to see more habits."
              : "Create your first habit to get started!"}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sortedHabits.map((habit) => (
        <Card key={habit.id} className={habit.completed ? "bg-muted/50" : ""}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => handleToggleComplete(habit)}
                    id={`habit-${habit.id}`}
                  />
                  <label
                    htmlFor={`habit-${habit.id}`}
                    className={`${
                      habit.completed
                        ? "line-through text-muted-foreground"
                        : ""
                    }`}
                  >
                    {habit.title}
                  </label>
                </CardTitle>
                <CardDescription className="mt-1">
                  {habit.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{habit.frequency}</Badge>
                <Badge className="flex items-center gap-1">
                  <Flame className="h-3 w-3" /> {habit.streak}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="pt-0 justify-between">
            <div className="text-xs text-muted-foreground">
              Created: {new Date(habit.createdAt).toLocaleDateString()}
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Habit</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{habit.title}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
