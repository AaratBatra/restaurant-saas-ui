"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Calendar1,
  CalendarCheck,
  CalendarMinus,
  Command,
  File,
  FileChartColumn,
  FileCheck,
  FileText,
  Frame,
  GalleryVerticalEnd,
  Globe,
  KeyboardMusic,
  LayoutDashboard,
  LucideIcon,
  LucideProps,
  Map,
  PieChart,
  ScrollText,
  Settings2,
  SquareTerminal,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Input } from "./ui/input"
import SidebarSearch from "./SidebarSearch"

export type NavMain = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: NavMain[]
}
// This is sample data.
const data: {
  navMain: NavMain[]
} = {
  navMain: [
    {
      title: "Dashboard BI",
      url: "/dashboard-bi",
      icon: LayoutDashboard,
      items: []
    },
    {
      title: "Cash Management",
      url: "#",
      icon: KeyboardMusic,
      items: [
        {
          title: "Cash Up",
          url: "/accounting/cashup",
          icon: FileText
        },
        {
          title: "Deposit",
          url: "/accounting/deposit",
          icon: File
        },
        {
          title: "Reconciliation",
          url: "/accounting/reconciliation",
          icon: ScrollText
        },
        {
          title: "Reports",
          url: "/accounting/report",
          icon: FileChartColumn
        },
        {
          title: "Safe Summary",
          url: "/accounting/safesummary",
          icon: FileCheck
        }
      ]
    },
    {
      title: "Integration",
      url: "/integration",
      icon: Globe
    },
    {
      title: "Employees",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Employees",
          url: "/emp-management/employees",
          icon: Users
        },
        {
          title: "Shift Calendar",
          url: "/emp-management/shift-calendar",
          icon: Calendar
        },
        {
          title: "Attendance",
          url: "/emp-management/attendance",
          icon: Calendar1
        },
        {
          title: "Approval",
          url: "/emp-management/approvals",
          icon: CalendarCheck
        },
        {
          title: "Leaves",
          url: "/emp-management/leaves",
          icon: CalendarMinus
        },
        {
          title: "Emp Mapping",
          url: "/emp-management/user-mapping",
          icon: User
        },
        {
          title: "Payroll",
          url: "/emp-management/payroll",
          icon: FileChartColumn
        },
        {
          title: "Profile",
          url: "/emp-management/profile",
          icon: User
        }
      ]
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navData, setNavData] = React.useState(data.navMain);
  const [filter, setFilter] = React.useState("");
  const {state, setOpen} = useSidebar();
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (filter) {
      const filteredData = data.navMain.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) || item.items?.some((subItem) => subItem.title.toLowerCase().includes(filter.toLowerCase()))
      ).map(item => ({...item, isActive: true }));
      setNavData(filteredData);
    } else {
      setNavData(data.navMain);
    }
  }, [filter])
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false); // Collapse the sidebar
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);
  return (
    <Sidebar ref={sidebarRef} collapsible="icon" {...props} variant="floating" className="shadow-lg z-50">
      <SidebarHeader>
        <SidebarTrigger />
        {
          state === "expanded" && (
            <SidebarSearch filter={filter} setFilter={setFilter} />
          )
        }
      </SidebarHeader>
      <SidebarContent className="no-scrollbar">
        <NavMain items={navData} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
