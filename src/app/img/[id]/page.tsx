export default function RecipeModal({
  params: { id: recipeId },
}: {
  params: { id: string };
}) {
  return <div>Recipe {recipeId}</div>;
}
