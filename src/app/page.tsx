import Link from "next/link";
import { db } from "~/server/db";
import { recipes } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await db.select().from(recipes);
  console.log(data);

  return (
    <main className="">
      <Link href="/recipes/cook">Nytt recept</Link>
      <div className="flex flex-wrap gap-4">
        {data.map((recipe: any) => (
          <div key={`${recipe.id}-${recipe.userId}`}>
            {recipe.title} {recipe.description}
          </div>
        ))}
      </div>
    </main>
  );
}
