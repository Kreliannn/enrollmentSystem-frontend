import { AdmissionSideBar } from "@/components/ui/admissionSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children } : { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <AdmissionSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
  