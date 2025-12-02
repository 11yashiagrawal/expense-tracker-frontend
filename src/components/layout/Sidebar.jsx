"use client";

import { usePathname, useRouter } from "next/navigation";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  TrendingUp,
  Home,
  Receipt,
  PieChart,
  CreditCard,
  BarChart,
  Settings,
} from "@mui/icons-material";
import {
  sidebarContainerStyles,
  sidebarNavPanelStyles,
  sidebarLogoButtonStyles,
  sidebarNavItemStyles,
} from "@/components/theme/components/SidebarContainer";

const navItems = [
  { path: "/dashboard", icon: Home, label: "Dashboard" },
  { path: "/expenses", icon: Receipt, label: "Expenses" },
  { path: "/budgets", icon: PieChart, label: "Budgets" },
  { path: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { path: "/transactions", icon: BarChart, label: "Transactions" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = async (path) => {
    // Don't navigate if already on the same page
    if (pathname === path || pathname.startsWith(path + "/")) {
      return;
    }
    
    try {
      // Navigate to the new path
      await router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <Box sx={sidebarContainerStyles({ theme })}>
      <IconButton
        sx={sidebarLogoButtonStyles({ theme })}
        onClick={() => handleNavigation("/dashboard")}
      >
        <TrendingUp sx={{ fontSize: 28 }} />
      </IconButton>

      <Box sx={sidebarNavPanelStyles({ theme })}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <IconButton
              key={item.path}
              sx={sidebarNavItemStyles({ theme, isActive })}
              onClick={() => handleNavigation(item.path)}
              title={item.label}
            >
              <Icon sx={{ fontSize: 24 }} />
            </IconButton>
          );
        })}
      </Box>
    </Box>
  );
}

