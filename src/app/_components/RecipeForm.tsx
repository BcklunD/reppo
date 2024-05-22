"use client";

import { addRecipe } from "~/app/_actions/recipes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";

export function RecipeForm() {
  return (
    <form action={addRecipe}>
      <div className="mb-10 mt-2 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" name="title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>
        <div className="flex items-center gap-4">
          <Switch id="private" name="private" />
          <Label htmlFor="private">Private</Label>
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
