import { ThemeToggle } from "@/components/ThemeToggle";
import { FilterBar } from "@/components/FilterBar";
import { HabitForm } from "@/components/HabitForm";
import { HabitList } from "@/components/HabitList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <ThemeToggle />
      </div>
      <HabitForm />
      <FilterBar />
      <HabitList />
      <div className="w-full flex justify-end my-5">
        <Link href="/journal" className="w-[200px]">
          <Button className="w-[200px]">
            Go to Journal <SquareArrowOutUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
