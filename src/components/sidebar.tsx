import type { FC } from "react";
import Link from "next/link";
import { Sidebar } from "flowbite-react";
import { HiHome, HiUser, HiCog, HiLogout } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "@/src/context/sidebar-context";

const links = [
  { name: "Home", href: "/dashboard", icon: HiHome },
  { name: "My Profile", href: "/dashboard/my-profile", icon: HiUser },
  { name: "Configurations", href: "/dashboard/configurations", icon: HiCog },
  { name: "Log Out", href: "#", icon: HiLogout },
];

const DashboardSidebar: FC = function () {
  const { isCollapsed } = useSidebarContext();
  const pathname = usePathname();

  return (
    <Sidebar
      collapsed={isCollapsed}
      id="sidebar"
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden lg:block w-16"
      )}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {links.map((l, key) => (
            <Sidebar.Item
              as={Link}
              href={l.href}
              prefetch={false}
              icon={l.icon}
              className={twMerge(
                "flex justify-start",
                pathname === l.href && "bg-blue-500 text-white", // Ensure hover styles are consistent
                pathname !== l.href && "hover:bg-blue-100" // Add hover effect for non-active items
              )}
              key={key}
            >
              {l.name}
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
