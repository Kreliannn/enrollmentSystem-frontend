import { StudentSideBar } from "@/components/ui/studentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <StudentSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
  