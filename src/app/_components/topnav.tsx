import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadButton, UploadDropzone } from "~/utils/uploadthing";

export function TopNav() {
  return (
    <nav className="mb-4 flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <Link href="/">Reppo</Link>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* <UploadButton endpoint="imageUploader" /> */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
