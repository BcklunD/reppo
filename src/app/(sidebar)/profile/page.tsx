import { currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) return <h2 className="p-2 text-lg">You are not logged in</h2>;

  return <h2 className="p-2 text-lg">Profile {user.fullName}</h2>;
}
