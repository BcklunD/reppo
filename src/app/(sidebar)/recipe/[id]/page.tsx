export default function Recipe({
  params: { id: recipeId },
}: {
  params: { id: string };
}) {
  return <div>Recipe {recipeId}</div>;
}
