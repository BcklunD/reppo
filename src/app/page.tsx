import Link from "next/link";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export default async function HomePage() {
  const data = await db.select().from(posts);
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      Hello (Reppo in progress)
    </main>
  );
}
