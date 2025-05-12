"use client";

import { ArrowRight, ChevronRight, type LucideIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { NavMain } from "./AppSidebar";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: NavMain[] }) {
	const [data, setData] = useState(items);
	const pathname = usePathname();
	const [expanded, setExpanded] = useState<string[]>([]);
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";
	useEffect(() => {
		setData(items);
	}, [items]);
	return (
		<SidebarGroup>
			<SidebarMenu>
				{data.map((item, idx) => (
					<React.Fragment key={`${item.url}-${idx}`}>
						{item.url !== "#" ? (
							<SidebarMenuItem>
								<SidebarMenuButton
									size={"lg"}
									asChild
									tooltip={item.title}
									className={cn(
										"",
										isCollapsed &&
											"group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:!p-4",
										pathname === item.url && "bg-sidebar-accent"
										
									)}
								>
									<Link
										href={item.url}
										className={cn(
											"w-full flex items-center",
											isCollapsed &&
												"justify-center mx-auto"
										)}
									>
										{item.icon && (
											<item.icon
												className={cn(
													"sidebar-toggle",
													isCollapsed &&
														"mx-auto px-0"
												)}
											/>
										)}
										<span
											className={cn(
												"",
												isCollapsed && "hidden"
											)}
										>
											{item.title}
										</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						) : (
							<Collapsible
								key={idx}
								asChild
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton
											size={"lg"}
											asChild
											tooltip={item.title}
											isActive={item.isActive}
											onClick={() => setExpanded((prev) => (prev.includes(item.title) ? prev.filter((t) => t !== item.title) : [...prev, item.title]))}
											className={cn(
												"",
												isCollapsed &&
													"flex items-center justify-center group-data-[collapsible=icon]:!size-12 group-data-[collapsible=icon]:!p-4"
											)}
										>
											<div
												className={cn(
													"relative w-full flex items-center",
													isCollapsed &&
														"justify-start pl-2 mx-auto"
												)}
											>
												{item.icon && (
													<item.icon
														className={cn(
															"sidebar-toggle data-[state=active]:font-extrabold",
															isCollapsed &&
																"mx-auto px-0"
														)}
													/>
												)}
												<span className={cn("absolute top-1/2 translate-y-[-50%] right-0 w-fit h-fit rounded-full hover:bg-gray-200 duration-200 hover:rotate-90", !isCollapsed && "hidden", expanded.includes(item.title) && "rotate-90")}>
													<ChevronRight className="w-3 h-3" />
												</span>
												<span
													className={cn(
														"",
														isCollapsed && "hidden"
													)}
												>
													{item.title}
												</span>
												{!isCollapsed && (
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												)}
											</div>
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<TooltipProvider>
											<SidebarMenuSub
												className={cn(
													isCollapsed &&
														"ml-0 pl-0 flex group-data-[collapsible=icon]:flex flex-col translate-x-2 border-l-0"
												)}
											>
												{item.items?.map(
													(subItem, i) => (
														<Tooltip
															key={`subItem--${i}`}
														>
															<TooltipTrigger
																asChild
															>
																<SidebarMenuSubItem
																	className={cn(
																		isCollapsed &&
																			"flex items-center justify-center",
																			pathname.startsWith(subItem.url) && (isCollapsed ? "rounded-full bg-sidebar-accent" :"bg-sidebar-accent")
																	)}
																>
																	<SidebarMenuSubButton
																		asChild
																		className={cn(
																			"h-10 text-base",
																			isCollapsed &&
																				"h-10 w-10 flex group-data-[collapsible=icon]:flex justify-center rounded-full"
																		)}
																	>
																		<Link
																			href={
																				subItem.url
																			}
																		>
																			{subItem.icon && (
																				<subItem.icon className="sidebar-sub-icon" />
																			)}
																			<span
																				className={cn(
																					isCollapsed &&
																						"hidden"
																				)}
																			>
																				{
																					subItem.title
																				}
																			</span>
																		</Link>
																	</SidebarMenuSubButton>
																</SidebarMenuSubItem>
															</TooltipTrigger>
															<TooltipContent side="right">
																<p>
																	{
																		subItem.title
																	}
																</p>
															</TooltipContent>
														</Tooltip>
													)
												)}
											</SidebarMenuSub>
										</TooltipProvider>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						)}
					</React.Fragment>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
