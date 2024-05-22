import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { LuBook, LuSearch } from "react-icons/lu";

export function Topnav() {
  return (
    <nav className="mb-4 flex w-full items-center justify-between gap-4 border-b p-4">
      <Link
        className="flex w-full items-center gap-1 pb-1 text-xl font-semibold"
        href="/"
      >
        <LuBook className="h-6 w-6" />
        Reppo
      </Link>
      <div className="flex w-full min-w-48 flex-row items-center gap-4">
        <Link
          href="/"
          className="border-b-2 border-transparent hover:border-slate-500"
        >
          Home
        </Link>
        <Link
          href="/explore"
          className="border-b-2 border-transparent hover:border-slate-500"
        >
          Explore
        </Link>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="whitespace-nowrap border-b-2 border-transparent hover:border-slate-500">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          {/* <Link href="/profile">Profile</Link> */}
          <UserButton />
        </SignedIn>
        <div className="search-div relative w-full min-w-40">
          <LuSearch className="absolute left-2 top-3 text-gray-500" />
          <Input placeholder="Find recipe..." className="pl-8" />
        </div>
      </div>
    </nav>
  );
}
