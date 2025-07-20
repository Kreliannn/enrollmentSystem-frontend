import { PaymentSideBar } from "@/components/ui/paymentSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex min-h-screen">
          <SidebarProvider>
                <PaymentSideBar />
                <main className="w-full">
                    {children}
                </main>
          </SidebarProvider>
      </div>
    );
  }
  