import { RegistarSideBar } from "@/components/ui/registarSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children } : { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <RegistarSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
  