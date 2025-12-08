import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: {
    template: '%s | All4Pets',
    default: 'All4Pets System',
  },
  description: "Clínica Veterinária",
};

function LoadingSkeleton() {
  return(
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm">
      <div className="h-8 w-1/3 animate-pulse rounded-md bg-muted" />
      <div className="flex-1 animate-pulse rounded-md bg-muted/50" />
    </div>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="h-screen w-full overflow-hidden antialiased">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-12 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10 bg-white">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
            </header>

            <main className="flex flex-1 flex-col gap-4 p-4 overflow-hidden">
              <Suspense fallback={<LoadingSkeleton />}>
                {children}
              </Suspense>
            </main>

          </SidebarInset>
        </SidebarProvider>

      </body>
    </html>
  );
}
