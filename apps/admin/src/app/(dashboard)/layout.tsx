import { Sidebar } from "../../components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen relative bg-sand-50">
      <Sidebar />

      <main className="flex-1 flex flex-col relative min-w-0">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
