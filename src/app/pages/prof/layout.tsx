import { ProfSideBar } from "@/components/ui/profSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <ProfSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
  