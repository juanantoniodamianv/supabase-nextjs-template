import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SidebarProvider } from "@/src/context/sidebar-context";
import { DashboardLayoutContent } from "@/src/components/dashboard-layout-content";
import { createClient } from "@/utils/supabase/server";

import "../globals.css";

export const metadata: Metadata = {
  title: "InPerson - Dashboard",
};

export default async function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const avatarUrl = data.user.user_metadata.avatar_url;

  return (
    <SidebarProvider>
      <DashboardLayoutContent avatarUrl={avatarUrl}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}
