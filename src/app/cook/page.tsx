import { RecipeForm } from "../_components/RecipeForm";

export default function NewRecipePage() {
  return (
    <div className="mx-auto w-1/2">
      <h2 className="p-2 text-lg">New Recipe</h2>
      <RecipeForm />
    </div>
  );
}
