import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WriteTab({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Entry title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-muted"
      />
      <Textarea
        placeholder="What's on your mind today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-36 border-muted"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? "Saving..." : "Save Journal Entry"}
        </Button>
      </div>
    </form>
  );
}
