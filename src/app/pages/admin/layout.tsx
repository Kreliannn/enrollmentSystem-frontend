import { AdminSideBar } from "@/components/ui/adminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <AdminSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }