import { Sidebar } from "../_components/Sidebar";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-6">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
