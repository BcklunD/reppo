"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

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
