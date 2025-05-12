"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "./ui/toaster";

const pagesToExcludeFromLayout = ["/accounting/cashup/new", "/integration", "/emp-management/employees/view-employee", "/emp-management/employees/add-employee", "/emp-management/employees/edit-employee"];

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Render nothing on the server to avoid hydration mismatch
	if (!isMounted) return null;

	// Check if the current pathname is in the exclusion list
	if (pagesToExcludeFromLayout.includes(pathname)) {
		return (
			<>
				<Navbar />
				<SidebarProvider defaultOpen={false}>
					<main className="w-full pt-16">{children}</main>
					<Toaster />
				</SidebarProvider>
			</>
		);
	}
	if (pathname === "/login" || pathname === "/login/auth") {
		return (
			<>{children}</>
		)
	}

	// Default layout
	return (
		<>
			<Navbar />
			<SidebarProvider defaultOpen={false}>
				<AppSidebar />
				<main className="w-full pt-16 pl-20 max-md:pl-0">{children}</main>
				<Toaster />
			</SidebarProvider>
		</>
	);
};

export default LayoutProvider;
