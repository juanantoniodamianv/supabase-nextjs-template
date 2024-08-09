import dynamic from "next/dynamic";

export const DashboardSidebar = dynamic(
  () => import("@/src/components/sidebar"),
  {
    ssr: false,
  }
);
