import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await db.select().from(posts);
  console.log(data);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {data.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
      </div>
    </main>
  );
}
