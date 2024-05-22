"use server";

import { auth } from "@clerk/nextjs/server";
import { count, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { recipe_likes, recipes } from "~/server/db/schema";
import { clerkClient } from "@clerk/nextjs/server";

const recipeSchema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(512),
  private: z.coerce.boolean().nullish(),
});
export async function addRecipe(formData: FormData) {
  const user = auth();
  if (!user.userId) return { error: "Unauthorized" };

  const result = recipeSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);
}

// type RecipeWithLikeAndAuthorProps = InferSelectModel<typeof recipes> & {
//   likes: number;
//   // author: string;
// };
export async function getPopularRecipes(limit: number) {
  const data = await db
    .select({
      recipe: recipes,
      likes: count(recipe_likes),
    })
    .from(recipes)
    .leftJoin(recipe_likes, eq(recipes.id, recipe_likes.recipeId))
    .where(eq(recipes.private, false))
    .groupBy(recipes.id)
    .limit(limit);

  return {
    popularRecipes: data.map((row) => {
      return {
        ...row.recipe,
        likes: row.likes,
      };
    }),
  };
}
