"use client";  // Adicione esta linha para marcar o componente como client-side

import { usePathname } from 'next/navigation';  // Agora funciona no cliente

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BreadcrumbDemo } from "@/components/app-breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();  // Obtém o caminho da URL atual

  // Verifique se a página é a de login
  const isLoginPage = pathname === "/login";  // Condicional para a página de login

  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Condicionalmente renderiza o layout */}
          {!isLoginPage ? (
            <SidebarProvider>
              <AppSidebar />

              <main className="flex flex-col w-full h-svh overflow-y-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <BreadcrumbDemo />
                  </div>
                </header>

                <main className="flex flex-col h-svh overflow-y-auto">
                  {children}
                </main>
              </main>
            </SidebarProvider>
          ) : (
            // Se for a página de login, apenas exibe o conteúdo sem o layout
            <main>
              {children}
            </main>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
